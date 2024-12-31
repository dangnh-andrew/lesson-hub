import React from "react";
import { Link } from "react-router-dom";

const PostItem: React.FunctionComponent = () => {
  return (
    <>
      <Link to={"/post/PostDetails"} className="link">
        <div className="post-item-wrapper">
          <div className="row">
            <div className="col-sm-12 col-md-4 post-item-img">
              <img
                src={
                  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                }
                alt="image"
              />
            </div>
            <div className="col-sm-12 col-md-8">
              <div className="post-item-content">
                <h4>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </h4>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text
                </p>
              </div>
              <div>
                <span className="created-date">2024-12-24</span>
                <span className="primary-text"> CHAPTER 1</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PostItem;
