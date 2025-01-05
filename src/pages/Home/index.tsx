import React, { useEffect, useState } from "react";
import MainContentSlide from "./components/MainContentSlide";
import LastestContentList from "./components/LastestContentList";
import lessonApi from "@/api/lessonApi";

const HomePage: React.FunctionComponent = () => {
  const [slideData, setSlideData] = useState([]);
  useEffect(() => {
    const fetchContents = async () => {
      const response = await lessonApi.fetchLessons(0, 5);
      if (response.ok && response.body) {
        setSlideData(response.body);
      }
    };
    fetchContents();
  }, []);
  return (
    <div className="row">
      <div className="col-sm-12 col-lg-8 mb-4">
        {slideData && <MainContentSlide data={slideData} />}
      </div>
      <div className="col-sm-12 col-lg-4 mb-4">
        <LastestContentList data={slideData} />
      </div>
    </div>
  );
};

export default HomePage;
