import chapterApi from "@/api/chapterApi";
import ChapterTable from "@/pages/Chapter/components/ChapterTable";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ManageChapterPage: React.FunctionComponent = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [chapters, setChapters] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await chapterApi.fetchChapters();
      if (response.ok && response.body) {
        setChapters(response.body);
      } else {
        console.error("Error: " + response.error);
      }
    };
    fetchChapters();
  }, []);

  const onSubmit = async (data: any) => {
    const response = await chapterApi.createChapter(data);
    if (response.ok) {
      navigate(0);
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container modal-edit">
            <button onClick={() => setShowModal(false)} className="close-btn">
              X
            </button>
            <h2>Edit Chapter</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="form-control"
                />
                <label>Description</label>
                <input
                  type="text"
                  {...register("description", { required: true })}
                  className="form-control"
                />
              </div>
              <div className="modal-buttons">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-outline-danger">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="m-5">
        <div className="d-flex justify-content-end mb-5">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-outline-success"
          >
            Add New Chapter
          </button>
        </div>
        <ChapterTable data={chapters} />
      </div>
    </>
  );
};
export default ManageChapterPage;
