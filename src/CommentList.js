import React from 'react';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderComment({author, text}) {
    return <li>{text}—{author}</li>;
  }

  render() { 
    return <ul> {this.props.comments.map(comment => this.renderComment(comment))} </ul>;
  }
 
}
CommentList.propTypes = {
  comments: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
export default CommentList;