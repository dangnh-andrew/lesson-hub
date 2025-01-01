import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LessonItem from "./components/LessonItem";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Pagination } from "antd";
import lessonApi from "@/api/lessonApi";
import env from "@/app/env";

interface Lesson {
    id: number;
    title: string;
    description: string;
    content: string;
    chapter: string;
    thumbnail: string;
}

interface Chapter {
    id: number;
    title: string;
    description: string;
}

const LessonListPage: React.FunctionComponent = () => {
    const [lessonList, setLessonList] = useState<Lesson[] | null>(null); // Use null as the initial state
    const [chapterList, setChapterList] = useState<Chapter[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"add" | "delete" | null>(null);
    const [newLesson, setNewLesson] = useState({
        title: "",
        description: "",
        chapterId: "",
        content: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [totalLessons, setTotalLessons] = useState(0);
    const navigate = useNavigate();

    const indexOfFirstLesson = 0;
    const indexOfLastLesson = itemsPerPage;

    const currentLessons = lessonList && lessonList.length > 0
        ? lessonList.slice(indexOfFirstLesson, Math.min(indexOfLastLesson, lessonList.length))
        : [];

    useEffect(() => {
        console.log('Fetching lessons for page:', currentPage);
        fetchLessons(currentPage, itemsPerPage);
        fetchChapters();
    }, [currentPage]);

    const fetchLessons = async (page: number, limit: number) => {
        try {
            setLoading(true);
            const response = await lessonApi.fetchLessons(page-1, limit);
            console.log('Fetched lessons:', response.body);

            setLessonList(response.body);
            setTotalLessons(response.pagination.total);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChapters = async () => {
        try {
            const response = await lessonApi.getChapter(); // Call API to get chapters
            console.log('Fetched chapters:', response.body);
            setChapterList(response.body);
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await lessonApi.deleteLesson(id);
            setLessonList((prev) => prev.filter((lesson) => lesson.id !== id)); // Safely update the state
        } catch (error) {
            console.error('Error deleting lesson:', error);
        }
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
        setNewLesson({ title: "", description: "", chapterId: "", content: "" });
    };

    const handleAddNewLesson = async () => {
        try {
            const payload = {
                title: newLesson.title,
                description: newLesson.description,
                content: newLesson.content,
                chapterId: newLesson.chapterId,
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await lessonApi.addLesson(payload, config);

            setLessonList((prev) => (prev ? [...prev, response.data] : [response.data]));
            handleCloseModal();
        } catch (error) {
            console.error("Error adding new lesson:", error);
        }
    };



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "chapter") {
            setNewLesson((prev) => ({
                ...prev,
                chapterId: value ? Number(value) : "",
            }));
        } else {
            setNewLesson((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleContentChange = (event: any, editor: any) => {
        const data = editor.getData();
        setNewLesson((prev) => ({
            ...prev,
            content: data,
        }));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="lesson-list-container">
            <button onClick={handleAddLesson} className="btn btn-outline-success">
                Add New Lesson
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className={`modal-container ${modalType === "add" ? "modal-add" : "modal-delete"}`}>
                        <button onClick={handleCloseModal} className="close-btn">
                            X
                        </button>
                        <h2 className="modal-title">{modalType === "add" ? "Add New Lesson" : "Delete Lesson"}</h2>

                        {modalType === "add" ? (
                            <>
                                <div className="modal-item">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newLesson.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter lesson title"
                                    />
                                </div>
                                <div className="modal-item">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={newLesson.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter lesson description"
                                    />
                                </div>

                                <div className="modal-item">
                                    <label>Content</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={newLesson.content}
                                        onChange={handleContentChange}
                                        config={{ ckfinder: { uploadUrl: "/upload" } }}
                                    />
                                </div>

                                <div className="modal-item">
                                    <label>Chapter</label>
                                    <select
                                        name="chapter"
                                        value={newLesson.chapterId}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Chapter</option>
                                        {chapterList.map((chapter) => (
                                            <option key={chapter.id} value={chapter.id}>
                                                {chapter.title}
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
                            </>
                        ) : (
                            <div className="delete-modal-content">
                                <p>Are you sure you want to delete this lesson?</p>
                                <div className="modal-buttons">
                                    <button onClick={handleCloseModal} className="btn btn-outline-secondary">
                                        Cancel
                                    </button>
                                    <button onClick={() => handleDelete(1)} className="btn btn-outline-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="row mt-3">
                {loading ? (
                    <p>Loading...</p>
                ) : lessonList && lessonList.length > 0 ? (
                    currentLessons.map((lesson) => (
                        <div key={lesson.id} className="col-md-6">
                            <LessonItem
                                title={lesson.title}
                                thumbnail={`${ env.baseGatewayUrl + 'media' + lesson.thumbnail }`}
                                description={lesson.description}
                                content={lesson.content}
                                chapter={lesson.chapter}
                                onDelete={handleDelete}
                                onEdit={() => handleEdit(lesson.id)}
                                lessonId={lesson.id}
                            />
                        </div>
                    ))
                ) : (
                    <p>No lessons available</p>
                )}
            </div>


            <div className="pagination-container">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalLessons}
                    showLessItems
                    onChange={handlePageChange}
                    showQuickJumper
                />
            </div>
        </div>
    );
};

export default LessonListPage;
