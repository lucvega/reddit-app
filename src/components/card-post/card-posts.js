import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faCircle, faTimes, faTimesCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip';
import './card-posts.scss';

export default class CardPost extends Component {

    render() {
        const { posts, onChange, removeItem, closeAll, refresh } = this.props;

        return (
            <div className="box card-posts">
                <h1 className="box-title">
                    Top Posts

                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="float-right mt-1 fa-xs cursor-pointer"
                        data-tip="Close all"
                        onClick={() => closeAll()}
                    />

                    <FontAwesomeIcon
                        icon={faSyncAlt}
                        className="float-right mt-1 fa-xs mr-2 cursor-pointer"
                        data-tip="Refresh"
                        onClick={() => refresh()}
                    />
                </h1>

                <div className="post-wrapper custom-scrollbar">

                    {posts.length > 0 && posts.map((post, i) => (
                        <div className="row mx-0 post-item" key={i} onClick={() => onChange(post)}>
                            <p className="col-12 p-0 post-title">
                                Posted by /{post.author} &nbsp;
                                <Moment unix fromNow>{post.created_utc}</Moment>
                                {!post.visited &&
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        className="text-danger float-right mt-1 fa-xs"
                                        data-tip="Unread Post"
                                    />
                                }
                            </p>

                            <div className="row m-0">
                                <div className="col-4 p-0">
                                    {post.preview &&
                                        <img className="img-fluid" src={post.thumbnail} alt="img" />
                                    }
                                </div>
                                <p className="col-8 pr-0 description">{post.title}</p>
                            </div>

                            <div className="col-12 row m-0 p-0">
                                <p className="col-6 pl-0 pt-1 close" onClick={(e) => removeItem(e, post)}>
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className="mr-1"
                                    />
                                    Close Post
                                </p>
                                <p className="col-6 px-0 pt-1 comments text-right">
                                    <FontAwesomeIcon icon={faComments} /> &nbsp;
                            {post.num_comments} Comments
                        </p>
                            </div>
                        </div>
                    ))}

                    {posts.length === 0 && (
                        <Fragment>
                            <img src={require('../../images/no-posts.jpg')} alt="no-post" className="img-fluid" />
                            <p className="text-center py-3">I don't have posts</p>

                            <button className="btn btn-primary mx-auto d-block" onClick={() => refresh()}>Get Posts</button>
                        </Fragment>
                    )}
                </div>

                <ReactTooltip />
            </div>
        )
    }
}
