import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_POST,
  REMOVE_POST,
  VISITED_POST,
  CLOSE_ALL
} from '../actions/actions'

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function selectedPost(state = null, action) {
  switch (action.type) {
    case SELECT_POST:
      return action.post
    case CLOSE_ALL:
      return null
    default:
      return state
  }
}

function visitedPost(state = null, action) {
  switch (action.type) {
    case VISITED_POST:
      return action.post.visited = true
    default:
      return state
  }
}


function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    case CLOSE_ALL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [],
        lastUpdated: action.receivedAt
      })
    case REMOVE_POST:
      return Object.assign({}, state, console.log('state', state), {
        isFetching: false,
        didInvalidate: false,
        items: state,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    case CLOSE_ALL:
      return Object.assign({}, state, {
        'reactjs': posts(state[action.subreddit], action),
        selectedPost: selectedPost([], action)
      })
    case REMOVE_POST:
      return Object.assign({}, state, {
        'reactjs': posts(state['reactjs'].items.filter(item => item !== action.post), action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
  selectedPost,
  visitedPost
})

export default rootReducer