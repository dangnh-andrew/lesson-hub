import React from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const MainContentSlide: React.FunctionComponent = () => {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

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
    <>
      <Slide {...properties}>
        <div className="each-slide-effect">
          <Link to={"/post/Test1"} className="link">
            <div className="slide-container">
              <div className="img-slide">
                <img src={images[0]} />
              </div>
              <div className="slide-content">
                <span className="content-chapter">CHAPTER 1</span>
                <h4>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </h4>
                <span className="content-created-date">2024-12-24</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="each-slide-effect">
          <Link to={"/post/Test2"} className="link">
            <div className="slide-container">
              <div className="img-slide">
                <img src={images[1]} />
              </div>
              <div className="slide-content">
                <span className="content-chapter">CHAPTER 2</span>
                <h4>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </h4>
                <span className="content-created-date">2024-12-24</span>
              </div>
            </div>
          </Link>
        </div>
      </Slide>
    </>
  );
};

export default MainContentSlide;
