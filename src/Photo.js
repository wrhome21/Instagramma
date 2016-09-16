import React from 'react';
import CommentBox from './CommentBox';

class Photo extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: 0,
      src: ''
    };
  }

    render() {
        return (
        <div className='photo'>
            <img src={this.props.src} />

            <div className='bar'>
            <button  onClick={() => {
                        this.setState({ liked: this.state.liked + 1 });
                    }}>
                ♥ {this.state.liked}
            </button>
            
            </div>
            <div className='bar'>
                <CommentBox/>
            </div>
        </div>
        );
  }
}
export default Photo;

