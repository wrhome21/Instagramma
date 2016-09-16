var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('instagramma.db');
var exists = fs.existsSync('.\instagramma.db');
exports.deleteDB=deleteDB;
exports.deleteDBContents=deleteDBContents;

function deleteDB(db)
{
    db.run("DROP TABLE users", function (err) { if (err) { } });
    db.run("DROP TABLE images", function (err) { if (err) { } });
    db.run("DROP TABLE imageLike", function (err) { if (err) { } }); //x
    db.run("DROP TABLE imageComments", function (err) { if (err) { } }); //x
}
function deleteDBContents()
{
    db.run("DELETE from imageLike", function (err) { if (err) { } }); //x
    db.run("DELETE from imageComments", function (err) { if (err) { } }); //x
    db.run("DELETE from images", function (err) { if (err) { } });
    db.run("DELETE from users", function (err) { if (err) { } });
}
function initDB(db) {

    db.serialize(function () {
        console.log("create users table");
        db.run("CREATE TABLE IF NOT EXISTS users \
        (USER_PK INTEGER PRIMARY KEY NOT NULL, \
        UNAME TEXT UNIQUE NOT NULL, \
        NAME TEXT NOT NULL, \
        PASSWORD TEXT NOT NULL, \
        EMAIL TEXT)", function (err) { if (err) { console.log(err); } });
    });
    db.serialize(function () {
        console.log("create images table");
        db.run("CREATE TABLE IF NOT EXISTS images \
        (IMAGE_PK INTEGER PRIMARY KEY NOT NULL, \
        IMAGE_TITLE TEXT, \
        IMAGEBYTES BLOBL, \
        USER_FK INT INTEGER, \
        TS TEXT NOT NULL, \
        FOREIGN KEY (USER_FK) REFERENCES users(USER_PK))", function (err) { if (err) { console.log(err); } });
    });
    db.serialize(function () {
        console.log("create imageLike table");
        db.run("CREATE TABLE IF NOT EXISTS imageLike \
        (LIKE_PK INTEGER PRIMARY KEY NOT NULL, \
        USER_FK INTEGER, \
        IMAGE_FK INTEGER,\
        TS TEXT NOT NULL, \
        FOREIGN KEY (USER_FK) REFERENCES users(USER_PK), \
        FOREIGN KEY (IMAGE_FK) REFERENCES images(IMAGE_PK))", function (err) { if (err) { console.log(err); } });
    });
    db.serialize(function () {
        console.log("create imageComments table");
        db.run("CREATE TABLE IF NOT EXISTS imageComments \
        (CMT_PK INTEGER PRIMARY KEY NOT NULL, \
        MESSAGE TEXT NOT NULL, \
        USER_FK INT NOT NULL, \
        IMAGE_FK INT NOT NULL, \
        TS TEXT, \
        FOREIGN KEY (USER_FK) REFERENCES users(USER_PK), \
        FOREIGN KEY (IMAGE_FK) REFERENCES images(IMAGE_PK))", function (err) { if (err) { console.log(err); } });
    });
}
exports.selectLastPK = selectLastPK;
function asMyQuote(input) {
    return '\'' + input + '\'';
}
function selectLastPK(col, tbl) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var command = "SELECT MAX(" + col + ") AS MAXPK FROM " + tbl;
            db.all(command, function (err, rows) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var value;
            for (thisROW of rows) {
                value = thisROW.MAXPK;
            }
            console.log(value);
            return value;
        },
        (err) => {
            console.log('Error getting last primary key');
            return -1;
        });

    return p;
}
/********************************
 * The following functions access the users table
 * USER_PK, UNAME, NAME, PASSWORD,EMAIL
 ********************************/
exports.insertUserProfile = insertUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.deleteUserProfile = deleteUserProfile;
exports.selectUserProfile = selectUserProfile;
exports.validateUserProfile = validateUserProfile;
exports.selectAllUserProfiles = selectAllUserProfiles;
exports.altSelectUserProfile = altSelectUserProfile;

var user = {
    primaryKey: '',
    userid: '',
    name: '',
    password: '',
    email: ''
};

function createUserFrom(thisRow)
{
    var aUser = Object.create(user);
    aUser.primaryKey = thisRow.USER_PK;
    aUser.userid = thisRow.UNAME;
    aUser.name = thisRow.NAME;
    aUser.password = thisRow.PASSWORD;
    aUser.email = thisRow.EMAIL;
    return aUser;
}
//  Insert User Profile
function insertUserProfile(uname, name, email, pwd) {
     var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var values = asMyQuote(uname) + ', ' + asMyQuote(name) + ', ' + asMyQuote(pwd) + ', ' + asMyQuote(email);
            var insertCommand = "INSERT INTO users (UNAME, NAME, PASSWORD, EMAIL) VALUES (" + values + ")"
            db.run(insertCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });

        });
    }).then( () => {
            console.log("get primary key");
            var pk = selectLastPK('USER_PK', 'users');
            console.log(pk);
            return (pk);
    });
    return p;
}
// Update Profile
function updateUserProfile(uid, name, email, pwd) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var ts = asMyQuote(new Date());
            var command = "UPDATE tweets SET MESSAGE=\'" + message + "\' WHERE TID=" + tid;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
// Delete Profile
function deleteUserProfile(uid) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "DELETE FROM users WHERE USER_PK=" + uid;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
// Select Profile
function selectUserProfile(uid) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM users WHERE USER_PK = " + pk;
            console.log(command);
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aUser = createUserFrom(thisRow);

                outputData[aUser.primaryKey] = aUser;
                console.log('User:  ' + aUser.primaryKey);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting user profile: ' + pk);
            return {};
        }
        );
    return p;
}
function altSelectUserProfile(uname) {
     var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var qlogon = asMyQuote(uname);
            var command = "SELECT * FROM users WHERE UNAME = " + qlogon;
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aUser = createUserFrom(thisRow);

                outputData[aUser.primaryKey] = aUser;
                console.log('User:  ' + aUser.primaryKey);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting alt profile');
            return {};
        }
        );
    return p;
}
function selectAllUserProfiles() {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM users";
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aUser = createUserFrom(thisRow);

                outputData[aUser.primaryKey] = aUser;
                console.log('User:  ' + aUser.primaryKey);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting all profiles');
            return {};
        }
        );
    return p;
}
function validateUserProfile(uname, pwd) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var qlogon = asMyQuote(uname);
            var qpwd = asMyQuote(pwd);

            var command = "SELECT * FROM users WHERE UNAME = " + qlogon + " AND PASSWORD = " + qpwd;
            console.log(command);
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aUser = createUserFrom(thisRow);

                outputData[aUser.primaryKey] = aUser;
                console.log('User:  ' + aUser.primaryKey);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting validating user');
            return {};
        }
        );
    return p;
}
/********************************
 * The following functions access the images table
*  IMAGE_PK, IMAGE_TITLE, IMAGEBYTES USER_FK, TS
********************************/
exports.insertImage = insertImage;
exports.updateImage = updateImage;
exports.deleteImage = deleteImage;
exports.selectImage = selectImage;
exports.selectMyImages = selectMyImages;

var postedImage = {
    primaryKey: '',
    title: '',
    img: '',
    userid: '',
    timestamp: ''
};
function createPostedImageFrom(thisRow)
{
    var anImage = Object.create(postedImage);

    anImage.primaryKey = thisRow.IMAGE_PK;
    anImage.title = thisRow.IMAGE_TITLE;
    anImage.img = thisRow.IMAGEBYTES;
    anImage.userid = thisRow.USER_FK;
    anImage.timestamp = thisRow.TS;
    return anImage;
}
// Insert a new Image
function insertImage(title, bytes, user) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var values = asMyQuote(title) + ', ' + asMyQuote(bytes) + ', ' + user + ', ' + ts;
            var insertCommand = "INSERT INTO images (IMAGE_TITLE, IMAGEBYTES, USER_FK, TS) VALUES (" + values + ")";
            db.run(insertCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });

        });
    }).then( () => {
            console.log("get primary key");
            var pk = selectLastPK('IMAGE_PK', 'images');
            console.log(pk);
            return (pk);
    });
    return p;
}
// Update Profile
function updateImage(pk, title) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var qtitle = asMyQuote(title);
            var command = "UPDATE images SET IMAGE_TITLE=" + qtitle + " WHERE IMAGE_PK=" + pk;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
// Delete Profile
function deleteImage(pk) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "DELETE FROM images WHERE IMAGE_PK=" + pk;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
// Select Profile
function selectImage(pk) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM images WHERE IMAGE_PK = " + pk;
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var anImage = createImageFrom(thisRow);

                outputData[aLike.primaryKey] = anImage;
                console.log('Image:  ' + anImage.primaryKey);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting image');
            return {};
        }
        );
    return p;
}
function selectMyImages(userid) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM images WHERE IMAGE_PK = " + pk;
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aLike = createImageFrom(thisRow);

                outputData[aLike.primaryKey] = aLike;
                console.log('IMage:  ' + aLike.primaryKey);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting my images');
            return {};
        }
        );
    return p;
}
/********************************
 * The following functions access the imageLike table
 * LIKE_PK , USER_FK,IMAGE_FK ,TS
 ********************************/
exports.insertImageLike = insertImageLike;
exports.deleteImageLike = deleteImageLike;
exports.selectImageLike = selectImageLike;
exports.selectLikesForImage = selectLikesForImage;
exports.selectLikedByUser = selectLikedByUser;
var imageLike = {
    primaryKey: '',
    userid: '',
    imageid: '',
    timestamp: ''
};
function createImageLikeFrom(row)
{
    var aLike = Object.create(imageLike);

    aLike.primaryKey = thisRow.LIKE_PK;
    aLike.userid = thisRow.USER_FK;
    aLike.imageid = thisRow.IMAGE_FK;
    aLike.timestamp = thisRow.TS;
    return aLike;
}
function insertImageLike(user, image) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var ts = asMyQuote(new Date());
            var values = user + ', ' + image + ', ' + ts;
            var insertCommand = "INSERT INTO imageLike (USER_FK, IMAGE_FK, TS) VALUES (" + values + ")";
            db.run(insertCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });

        });
    }).then( () => {
            console.log("get primary key");
            var pk = selectLastPK('LIKE_PK', 'imageLike');
            console.log(pk);
            return (pk);
    });
    return p;
}
function deleteImageLike(pk) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "DELETE FROM imageLike WHERE LIKE_PK=" + pk;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
function unlikeImage(pk) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "DELETE FROM imageLike WHERE LIKE_PK=" + pk;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
function selectImageLike(pk) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM imageLike WHERE LIKE_PK = " + pk;
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aLike = createImageLikeFrom(thisRow);

                outputData[aLike.primaryKey] = aLike;
                console.log('Like Image:  ' + aComment.primaryKey);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting likeImage');
            return {};
        }
        );
    return p;
}
function selectLikesForImage(imgPK) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM imageLike WHERE IMAGE_FK = " + imgPK;
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aLike = createImageLikeFrom(thisRow);

                outputData[aLike.primaryKey] = aComment;
                console.log('The output of row:  ' + outputData.primaryKey);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting tweets');
            return {};
        }
        );
    return p;
}
function selectLikedByUser(usrPK) {
     var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM imageLike WHERE USER_FK = " + usrPK;
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aComment = createImageLikeFrom(thisRow);

                outputData[aComment.primaryKey] = aComment;
                console.log('Like Image:  ' + aComment.primaryKey);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting tweets');
            return {};
        }
        );
    return p;
}

/********************************
 * The following functions access the imageComments table
 * CMT_PK, MESSAGE, USER_FK, IMAGE_FK, TS
 ********************************/
exports.insertImageComment = insertImageComment;
exports.updateImageComment = updateImageComment;
exports.deleteImageComment = deleteImageComment;
exports.selectImageComment = selectImageComment;
exports.selectImageCommentsForImage = selectImageCommentsForImage;
exports.selectImageCommentsForUser = selectImageCommentsForUser;
//  Create Database Tables
var imageComment = {
    primaryKey: '',
    userid: '',
    imageid: '',
    message: '',
    timestamp: ''
};
function createImageCommentFrom(row) {
    var aComment = Object.create(imageComment);

    aTweet.primaryKey = thisRow.AUTHOR;
    aTweet.userid = thisRow.USER_FK;
    aTweet.imageid = thisRow.IMAGE_FK;
    aTweet.message = thisRow.MESSAGE;
    aTweet.timestamp = thisRow.TS;
    return aComment;
}
function insertImageComment(msg, user, image) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var ts = asMyQuote(new Date());
            var values = asMyQuote(msg) + ', ' + user + ', ' + image + ', ' + ts;
            var insertCommand = "INSERT INTO imageComments (MESSAGE, USER_FK, IMAGE_FK, TS) VALUES (" + values + ")";
            db.run(insertCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });

        });
    }).then( () => {
            console.log("get primary key");
            var pk = selectLastPK('CMT_PK', 'imageComments');
            console.log(pk);
            return (pk);
    });
    return p;
}
function updateImageComment(msg, pk) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var messsage = asMyQuote(msg);
            var command = "UPDATE imageComments SET MESSAGE=" + message + " WHERE CMT_PK=" + pk;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
function deleteImageComment(pk) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "DELETE imageComments tweets WHERE CMT_PK=" + pk;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
function selectImageComment(pk) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var command = "SELECT * FROM imageComments WHERE CMT_PK=" + pk;
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aComment = createImageCommentFrom(thisRow);

                outputData[aComment.primaryKey] = aComment;
                console.log('Comment:  ' + aComment.message);
            }
            return outputData;
        },
        (err) => {
            console.log(err);
            console.log('Error getting imageComment');
            return {};
        }
        );
    return p;
}
function selectImageCommentsForImage(imgPK) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM imageComments WHERE IMAGE_FK = " + imgPK;
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aComment = createImageCommentFrom(thisRow);

                outputData[aComment.primaryKey] = aComment;
                console.log('Comment:  ' + aComment.message);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting imageComment for image');
            return {};
        }
        );
    return p;
}
function selectImageCommentsForUser(usrPK) {
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM imageComments WHERE USER_FK = " + usrPK;
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aComment = createImageCommentFrom(thisRow);

                outputData[aComment.primaryKey] = aComment;
                console.log('Comment:  ' + aComment.message);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting image comments for user');
            return {};
        }
        );
    return p;
}


initDB(db);