import React from 'react';
import Photo from './Photo';
import AddUserForm from './AddUserForm';
 
class Gallery extends React.Component {
  renderImage(imageUrl) {
    return (
      <div>
        <Photo src={imageUrl} />
      </div>
    );
  }
 
  render() {
    return (
      <div className="gallery">
	  <AddUserForm />
	  <div className="images">
          {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
        </div>
      </div>
    );
  }
}
Gallery.propTypes = {
  imageUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
export default Gallery;