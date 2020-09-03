import React from 'react';
import './card-posts.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'

const CardPost = ({ posts }) => {
    return (
        <div className="box card-posts">
            <h1 className="box-title">Top Posts</h1>

            {posts && posts.map((post, i) => (
                <div className="row mx-0 post-item" key={i}>
                    <p className="col-12 p-0 post-title">Posted by /{post.author} <span>Time</span></p>

                    <div className="row m-0">
                        <div className="col-4 p-0">
                            {post.preview &&
                                <img className="img-fluid" src={post.thumbnail} alt="img" />
                            }
                        </div>
                        <p className="col-8 pr-0 description">{post.title}</p>
                    </div>

                    <div className="col-12 row m-0 p-0">
                        <p className="col-6 pl-0 close">Close Post</p>
                        <p className="col-6 px-0 comments text-right">
                            <FontAwesomeIcon icon={faComments} /> &nbsp;
                            {post.num_comments} Comments
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardPost;