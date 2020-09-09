import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchPostsIfNeeded,
  selectPost,
  removePost,
  visitedPost,
  closeAll,
  invalidateSubreddit
} from '../actions/actions';
import CardPost from '../components/card-post/card-posts';
import PostContent from '../components/post-content/post-content';

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleCloseAll = this.handleCloseAll.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  handleChange(selectedPost) {
    this.props.dispatch(selectPost(selectedPost));
    this.props.dispatch(visitedPost(selectedPost));
  }

  handleRemoveItem(e, post) {
    e.stopPropagation();
    this.props.dispatch(removePost(post));
  }

  handleCloseAll() {
    this.props.dispatch(closeAll());
  }

  handleRefreshClick() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { posts, isFetching, selectedPost } = this.props;

    return (
      <div className="container">

        {isFetching && (
          <div className="row m-0">
            <div className="col-12 col-lg-3 sidebar mb-xl-0 px-0 px-lg-3 mb-md-3">
              <div className="loading box"></div>
            </div>
            <div className="col-12 col-lg-9 content p-0">
              <div className="loading box"></div>
            </div>

          </div>
        )}

        {!isFetching && (
          <div className="row m-0">
            <div className="col-12 col-lg-3 sidebar mb-xl-0 px-0 px-lg-3 mb-md-3">
              <CardPost
                posts={posts}
                onChange={this.handleChange}
                removeItem={this.handleRemoveItem}
                closeAll={this.handleCloseAll}
                refresh={this.handleRefreshClick}
              />
            </div>


            <div className="col-12 col-lg-9 content p-0">
              <PostContent selectedPost={selectedPost} />
            </div>
          </div>
        )
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit, selectedPost, removeItem, closeAll } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
    selectedPost,
    removeItem,
    closeAll
  }
}

export default connect(mapStateToProps)(AsyncApp)