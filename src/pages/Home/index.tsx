import React from "react";
import MainContentSlide from "./components/MainContentSlide";
import LastestContentList from "./components/LastestContentList";

const HomePage: React.FunctionComponent = () => {
  return (
      <div className="row">
        <div className="col-sm-12 col-lg-8 mb-4">
          <MainContentSlide />
        </div>
        <div className="col-sm-12 col-lg-4 mb-4">
          <LastestContentList />
        </div>
      </div>
  );
};

export default HomePage;
