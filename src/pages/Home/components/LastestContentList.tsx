import env from "@/app/env";
import React from "react";

interface ILastestContentProps {
  data: any[];
}
const LastestContentList: React.FunctionComponent<ILastestContentProps> = ({
  data,
}) => {
  return (
    <>
      <div className="lastest-contents-wrapper">
        <div className="lastest-contents-header">
          <h2>Lasted Post</h2>
        </div>
        <div className="lastest-contents-container">
          {data.map((item:any, index:number) => (
            <div className="lastest-content">
              <div className="row">
                <div className="col-4">
                  <div className="lastest-content-img">
                    <img
                      src={env.baseGatewayUrl + "media" + item?.thumbnail}
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
                      {
                        item?.title
                      }
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LastestContentList;
