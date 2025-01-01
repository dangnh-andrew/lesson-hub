import React from "react";
import { Link } from "react-router-dom";
import env from "@/app/env";

interface PostItemProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    content: string;
    chapterId: number;
    createdDate: string;
    chapterName: string;
    thumbnail: string;
  };
}

const PostItem: React.FunctionComponent<PostItemProps> = ({ lesson }) => {
  const thumbnailSrc =`${ env.baseGatewayUrl + 'media' + lesson.thumbnail }`

  return (
      <>
        <Link to={`/post/PostDetails/${lesson.id}`} className="link">
          <div className="post-item-wrapper">
            <div className="row">
              <div className="col-sm-12 col-md-4 post-item-img">
                <img
                    src={thumbnailSrc}
                    alt="Lesson Thumbnail"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                    }}
                />
              </div>
              <div className="col-sm-12 col-md-8">
                <div className="post-item-content">
                  <h4>{lesson.title}</h4>
                  <p>{lesson.description}</p>
                </div>
                <div>
                  <span className="created-date">{lesson.createdDate}</span>
                  <span className="primary-text"> CHAPTER {lesson.chapterName}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </>
  );
};

export default PostItem;
