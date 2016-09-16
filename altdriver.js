
var express = require('express');
var app = express();
var db = require('./db.js');
var user = {
    primaryKey: '',
    userid: '',
    name: '',
    password: '',
    email: ''
};

function printUser(aUser)
{
   console.log('User<: ' +aUser.primaryKey+ ':' +aUser.userid+ ':' +aUser.name+ ':' +aUser.email+ ':' +aUser.password+ '>');
}
function insertUser(aUser)
{
    var p = db.insertUserProfile(aUser.userid, aUser.name, aUser.email, aUser.password);
    p.then((val) => {
        console.log("PK: " + val);
        aUser.primaryKey=val;
        printUser(aUser);
    }).catch((err) => {console.log(err);});
    return aUser;
}
function driver()
{
   db.deleteDBContents();
  var userids = ['user1', 'user2','user3','user4','user5','user6'];
  var names = ['name11', 'name12','name13','name14','name15','name16'];
  var emails = ['useremail1@gmail.com1', 'useremail1@gmail.com2','useremail1@gmail.com3','useremail1@gmail.com4','useremail1@gmail.com5','useremail1@gmail.com6'];
var allUsers = [];
for (var i = 0; i < userids.length; i++)
{
  var tuser = Object.create(user);
    tuser.userid=userids[i];
    tuser.name=names[i];
    tuser.email=emails[i];
    tuser.password=userids[i]+"password";

    insertUser(tuser);
    allUsers.push(tuser);
}
for (aUser of allUsers)
{
    printUser(aUser);
}
//    db.selectUserProfile(1);
//    user1.name="Bobby";
//    console.log("after select");
//    db.updateUserProfile(user1.primaryKey, user1.userid, user1.name, user1.email, user1.password);
//    console.log("after update");
//    db.validateUserProfile("PhotoDog", "password");
 //  console.log("after validate");
//    db.selectAllUserProfiles();
//   console.log("after selectAll");
//    db.altSelectUserProfile("PhotoDog");
//   console.log("after altSelect");
//    db.deleteUserProfile(1);
/*     db.insertImage("look at this", "", 2);  // 1
    db.insertImage("look at that", "", 2);  // 2
    db.updateImage(1, "will you please look at this");
    db.selectImage(2);
    db.selectMyImages(2);

    db.insertImageLike(1,1);
    db.insertImageLike(1,2);
 //   db.deleteImageLike();
    db.selectImageLike(1);
    db.selectLikesForImage(2);
    db.selectLikedByUser(1);


    db.insertImageComment("Love it", 1, 1);
    db.insertImageComment("Do not Love it", 1, 2);
    db.updateImageComment("really Love it", 1);
 //   db.deleteImageComment();
    db.selectImageComment(1);
    db.selectImageCommentsForImage(2);
    db.selectImageCommentsForUser(1);
*/
/* https://github.com/MusicBuilder/GroupProject2/invitations
    */
}
driver();