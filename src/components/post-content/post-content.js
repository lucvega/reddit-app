import React, { Component } from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShareSquare, faComment } from '@fortawesome/free-regular-svg-icons'
import './post-content.scss';

export default class PostContent extends Component {

    render() {
        const { selectedPost } = this.props;

        return (
            <div className="box post-content">

                {selectedPost != null && (
                    <div>
                        <h1>{selectedPost.title}</h1>

                        {selectedPost.preview.images[0] != null && (
                            <img
                                src={selectedPost.preview.images[0].source.url.replaceAll('amp;', '')}
                                alt="img"
                                className="post-img img-fluid" />
                        )}

                        <div className="row m-0">
                            <p className="col-6 p-0 post-author">
                                Posted by /{selectedPost.author} &nbsp;
                                <Moment unix fromNow>{selectedPost.created_utc}</Moment>
                            </p>
                            <div className="col-6 pr-0 text-right post-icons">
                                <FontAwesomeIcon icon={faHeart}/>
                                <FontAwesomeIcon icon={faComment}/>
                                <FontAwesomeIcon icon={faShareSquare}/>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        )
    }
}
