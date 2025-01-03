import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LessonItemProps {
    title: string;
    thumbnail: string;
    description: string;
    content: string;
    chapter: string;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    lessonId: number;
}

const LessonItem: React.FunctionComponent<LessonItemProps> = ({
    thumbnail,
    title,
    description,
    content,
    chapter,
    onDelete,
    onEdit,
    lessonId,
}) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleDelete = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        if (lessonId) {
            await onDelete(lessonId);
            setShowModal(false);
            navigate("/lesson");
        } else {
            console.error("Invalid lesson ID");
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        navigate("/lesson");
    };
    return (
        <div className="lesson-item-wrapper">
            <div className="row">
                <div className="col-sm-12 col-md-4 post-item-img">
                    {thumbnail && (
                        <img
                            src={thumbnail}
                            alt="Lesson Thumbnail"
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                objectFit: "cover",
                            }}
                        />
                    )}
                </div>

                <div className="col-sm-12 col-md-8">
                    <div className="lesson-item-content">
                        <h4>{title}</h4>
                        <p style={{ color: "gray" }}>{description}</p>
                        <p>{content}</p>
                    </div>
                    <div>
                        <span className="secondary-text">{chapter}</span>
                    </div>

                    <div className="action-buttons">
                        <button className="btn btn-danger" onClick={handleDelete}>
                            Delete
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => onEdit(lessonId)}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container modal-delete">
                        <button onClick={handleCancelDelete} className="close-btn">
                            X
                        </button>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this lesson?</p>
                        <div className="modal-buttons">
                            <button
                                onClick={handleCancelDelete}
                                className="btn btn-outline-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="btn btn-outline-danger"
                            >
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
