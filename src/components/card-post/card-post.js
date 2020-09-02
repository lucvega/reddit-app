import React, { Fragment } from 'react';

const CardPost = ({posts}) => {
    return (
        <Fragment>
            {posts && posts.map((post, i) => (
                <div className="row" key={i}>
                    <p className="col-12">{post.title} <span>Time</span></p>

                    <div className="row">
                        <img className="col-3" src="" alt="" />
                        <p className="col-9">Description</p>
                    </div>

                    <div>
                        <p>Close Post</p>
                        <p>Comments</p>
                    </div>
                </div>
            ))}
        </Fragment>
    )
}

export default CardPost;