import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LessonItem from "./components/LessonItem";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const lessons = [
    { id: 1, title: "Lesson 1", description: "Introduction to programming", content: "Content of Lesson 1", chapter: "Chapter 1" },
    { id: 2, title: "Lesson 2", description: "Variables and Data Types", content: "Content of Lesson 2", chapter: "Chapter 2" },
    { id: 3, title: "Lesson 3", description: "Control Flow", content: "Content of Lesson 3", chapter: "Chapter 3" },
    { id: 4, title: "Lesson 4", description: "Functions and Methods", content: "Content of Lesson 4", chapter: "Chapter 4" },
    { id: 5, title: "Lesson 5", description: "Object-Oriented Programming", content: "Content of Lesson 5", chapter: "Chapter 5" },
    { id: 6, title: "Lesson 6", description: "Data Structures", content: "Content of Lesson 6", chapter: "Chapter 6" },
    { id: 7, title: "Lesson 7", description: "Algorithms", content: "Content of Lesson 7", chapter: "Chapter 7" },
];

const LessonListPage: React.FunctionComponent = () => {
    const [lessonList, setLessonList] = useState(lessons);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"add" | "delete" | null>(null);
    const [newLesson, setNewLesson] = useState({
        title: "",
        description: "",
        chapter: "",
        content: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Number of lessons per page
    const navigate = useNavigate();

    // Pagination logic
    const indexOfLastLesson = currentPage * itemsPerPage;
    const indexOfFirstLesson = indexOfLastLesson - itemsPerPage;
    const currentLessons = lessonList.slice(indexOfFirstLesson, indexOfLastLesson);

    const handleDelete = (id: number) => {
        setModalType("delete");
        setShowModal(true);
    };

    const handleEdit = (id: number) => {
        navigate(`/lesson/${id}`);
    };

    const handleAddLesson = () => {
        setModalType("add");
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddNewLesson = () => {
        const newLessonObj = {
            id: lessonList.length + 1,
            title: newLesson.title || `Lesson ${lessonList.length + 1}`,
            description: newLesson.description || "New lesson description",
            content: newLesson.content || "<p>Content of the lesson</p>",
            chapter: newLesson.chapter || `Chapter ${lessonList.length + 1}`,
        };
        setLessonList([...lessonList, newLessonObj]);
        setShowModal(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewLesson((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewLesson((prev) => ({
            ...prev,
            description: e.target.value,
        }));
    };

    const handleContentChange = (event: any, editor: any) => {
        const data = editor.getData();
        setNewLesson((prev) => ({
            ...prev,
            content: data,
        }));
    };

    const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewLesson((prev) => ({
            ...prev,
            chapter: e.target.value,
        }));
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(lessonList.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="lesson-list-container">
            <button onClick={handleAddLesson} className="btn btn-outline-success">
                Add New Lesson
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className={`modal-container ${modalType === "add" ? "modal-add" : "modal-delete"}`}>
                        <button onClick={handleCloseModal} className="close-btn">X</button>
                        <h2 className="modal-title">{modalType === "add" ? "Add New Lesson" : "Delete Lesson"}</h2>

                        {modalType === "add" ? (
                            <>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Lesson Title"
                                    value={newLesson.title}
                                    onChange={handleInputChange}
                                />
                                <textarea
                                    name="description"
                                    placeholder="Lesson Description"
                                    value={newLesson.description}
                                    onChange={handleDescriptionChange}
                                />
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={newLesson.content}
                                    onChange={handleContentChange}
                                />
                                <select name="chapter" value={newLesson.chapter} onChange={handleChapterChange}>
                                    <option value="">Select Chapter</option>
                                    {lessons.map((lesson) => (
                                        <option key={lesson.id} value={lesson.chapter}>{lesson.chapter}</option>
                                    ))}
                                </select>
                                <button onClick={handleAddNewLesson} className="btn btn-outline-primary">Add Lesson</button>
                            </>
                        ) : (
                            <div className="delete-modal-content">
                                <p>Are you sure you want to delete this lesson?</p>
                                <div className="modal-buttons">
                                    <button onClick={handleCloseModal} className="btn btn-outline-secondary">Cancel</button>
                                    <button onClick={() => handleDelete(1)} className="btn btn-outline-danger">Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="row mt-3">
                {currentLessons.map((lesson) => (
                    <div key={lesson.id} className="col-md-6">
                        <LessonItem
                            title={lesson.title}
                            description={lesson.description}
                            content={lesson.content}
                            chapter={lesson.chapter}
                            onDelete={() => handleDelete(lesson.id)}
                            onEdit={() => handleEdit(lesson.id)}
                        />
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button onClick={handlePrevPage} className="btn btn-outline-secondary" disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} className="btn btn-outline-secondary" disabled={currentPage === Math.ceil(lessonList.length / itemsPerPage)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default LessonListPage;
