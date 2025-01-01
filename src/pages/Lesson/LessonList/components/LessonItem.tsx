import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LessonItemProps {
  title: string;
  description: string;
  content: string;
  chapter: string;
  onDelete: () => void;
  onEdit: () => void;
}

const LessonItem: React.FunctionComponent<LessonItemProps> = ({
                                                                  title, description, content, chapter, onDelete, onEdit
                                                              }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    return (
        <div className="lesson-item-wrapper">
            <Link to={"/post/PostDetails"} className="link">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="lesson-item-content">
                            <h4>{title}</h4>
                            <p style={{ color: "gray" }}>{description}</p>
                            <p>{content}</p>
                        </div>
                        <div>
                            <span className="secondary-text">{chapter}</span>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="action-buttons">
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
                <button className="btn btn-secondary" onClick={onEdit}>
                    Edit
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container modal-delete">
                        <button onClick={handleCancelDelete} className="close-btn">X</button>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this lesson?</p>
                        <div className="modal-buttons">
                            <button onClick={handleCancelDelete} className="btn btn-outline-secondary">
                                Cancel
                            </button>
                            <button onClick={handleConfirmDelete} className="btn btn-outline-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default LessonItem;
