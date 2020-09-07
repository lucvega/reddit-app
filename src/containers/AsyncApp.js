import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchPostsIfNeeded,
  selectPost,
  removePost
} from '../actions/actions'
import CardPost from '../components/card-post/card-posts'
import PostContent from '../components/post-content/post-content'

class AsyncApp extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentDidUpdate(prevProps) {
    if (this.props.posts !== prevProps.posts) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(selectedPost) {
    this.props.dispatch(selectPost(selectedPost))
  }

  removeItem(e, post) {
    e.stopPropagation();
    this.props.dispatch(removePost(post));
  }

  render() {
    const { posts, isFetching, selectedPost } = this.props
    return (
      <div className="container">

        {isFetching && posts.length === 0 && (
          <div className="row">
            <div className="col-3">
              <div className="loading box"></div>
            </div>

            <div className="col-9">
              <div className="loading box"></div>
            </div>
          </div>
        )}

        {posts.length > 0 && (
          <div className="row">
            <div className="col-3">
              <CardPost posts={posts} onChange={this.handleChange} removeItem={this.removeItem} />
            </div>

            <div className="col-9">
              <PostContent selectedPost={selectedPost} />
            </div>
          </div>
        )}
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
  console.log('state', state);
  const { selectedSubreddit, postsBySubreddit, selectedPost, removeItem } = state
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
    removeItem
  }
}

export default connect(mapStateToProps)(AsyncApp)