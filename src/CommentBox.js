import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }

  handleCommentSubmit(comment) {
    this.setState({ 
      comments: this.state.comments.concat([comment])
    })
  }

  componentDidMount() {
        this.setState({comments: [{author: 'test', text: 'test comment'}]});
  }

  render() {
    return (<div className="commentBox">
        <h3>Comments</h3>
        <CommentList comments={this.state.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>);
 }
}
export default CommentBox;