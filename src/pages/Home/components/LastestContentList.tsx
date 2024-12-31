import React from "react";

const LastestContentList: React.FunctionComponent = () => {
  return (
    <>
      <div className="lastest-contents-wrapper">
        <div className="lastest-contents-header">
          <h2>Lasted Post</h2>
        </div>
        <div className="lastest-contents-container">
        <div className="lastest-content">
            <div className="row">
              <div className="col-4">
                <div className="lastest-content-img">
                  <img
                    src={
                      "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                    }
                  />
                </div>
              </div>
              <div className="col-8 lastest-content-meta">
                <div>
                  <span className="created-date">25-10-2024</span>
                  <span className="primary-text"> CHAPTER 1</span>
                </div>
                <p>
                  <strong>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. simply dummy text of the printing and
                    typesetting industry
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastestContentList;
