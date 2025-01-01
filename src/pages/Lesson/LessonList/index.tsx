import React, { useState } from "react";
import LessonItem from "./components/LessonItem";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const lessons = [
    {
        id: 1,
        title: "Lesson 1",
        description: "Introduction to programming",
        content: "Content of Lesson 1",
        chapter: "Chapter 1",
    },
    {
        id: 2,
        title: "Lesson 2",
        description: "Variables and Data Types",
        content: "Content of Lesson 2",
        chapter: "Chapter 2",
    },
    {
        id: 3,
        title: "Lesson 3",
        description: "Control Flow",
        content: "Content of Lesson 3",
        chapter: "Chapter 3",
    },
];

const chapters = [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
    "Chapter 6",
    "Chapter 7",
];

const LessonListPage: React.FunctionComponent = () => {
    const [lessonList, setLessonList] = useState(lessons);
    const [showModal, setShowModal] = useState(false);
    const [newLesson, setNewLesson] = useState({
        title: "",
        description: "",
        chapter: "",
        content: "",
    });

    const handleDelete = (id: number) => {
        setLessonList((prev) => prev.filter((lesson) => lesson.id !== id));
    };

    const handleEdit = (id: number) => {
        console.log(`Edit lesson with ID: ${id}`);
    };

    const handleAddLesson = () => {
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

    return (
        <div className="lesson-list-container">
            <button onClick={handleAddLesson} className="btn btn-outline-success">
                Add New Lesson
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button onClick={handleCloseModal} className="close-btn">X</button>
                        <h2 className="modal-title">Add New Lesson</h2>
                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={newLesson.title}
                                onChange={handleInputChange}
                                placeholder="Enter lesson title"
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={newLesson.description}
                                onChange={handleDescriptionChange}
                                placeholder="Enter lesson description"
                            />
                        </div>

                        <div>
                            <label>Content</label>
                            <textarea
                                name="content"
                                value={newLesson.content}
                                onChange={handleContentChange}
                                placeholder="Enter lesson content"
                            />
                        </div>

                        <div>
                            <label>Chapter</label>
                            <select
                                name="chapter"
                                value={newLesson.chapter}
                                onChange={handleChapterChange}
                            >
                                <option value="">Select Chapter</option>
                                {chapters.map((chapter, index) => (
                                    <option key={index} value={chapter}>
                                        {chapter}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="modal-buttons">
                            <button onClick={handleCloseModal} className="btn btn-outline-secondary">
                                Cancel
                            </button>
                            <button onClick={handleAddNewLesson} className="btn btn-outline-primary">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="row mt-3">
                {lessonList.map((lesson) => (
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
        </div>
    );
};

export default LessonListPage;
