import env from "@/app/env";
import React from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface IContentSlideProps {
  data: any[];
}

const MainContentSlide: React.FunctionComponent<IContentSlideProps> = ({data}) => {

  const properties = {
    prevArrow: (
        <button className="btn-slide">
          <span>&#10094;</span>
        </button>
    ),
    nextArrow: (
        <button className="btn-slide">
          <span>&#10095;</span>
        </button>
    ),
  };

  return (
      <div>
        <Slide {...properties}>
          {data.map((item:any, index:number) => (
              <div className="each-slide-effect" key={index}>
                <Link to={`/post/Test${index + 1}`} className="link">
                  <div className="slide-container">
                    <div className="img-slide">
                      <img src={env.baseGatewayUrl + "media" + item?.thumbnail || "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-1024.png"} alt={`Slide ${index + 1}`} />
                    </div>
                    <div className="slide-content">
                      <span className="content-chapter"></span>
                      <h4>{item?.title}</h4>
                      <span className="content-created-date">2024-12-24</span>
                    </div>
                  </div>
                </Link>
              </div>
          ))}
        </Slide>
      </div>
  );
};

export default MainContentSlide;
