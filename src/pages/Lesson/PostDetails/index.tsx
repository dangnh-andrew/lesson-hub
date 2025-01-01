import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetailsPage: React.FunctionComponent = () => {
  const { postUrlKey } = useParams();
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    setContent(`<h1>${postUrlKey}</h1>`);
  }, []);

  return (
    <>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default PostDetailsPage;
