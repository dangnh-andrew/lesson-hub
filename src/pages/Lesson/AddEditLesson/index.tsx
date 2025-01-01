import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const chapters = [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
    "Chapter 6",
    "Chapter 7",
];

const EditLessonPage: React.FunctionComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const lessonData = {
                id: Number(id),
                title: `Lesson ${id}`,
                description: `Description for Lesson ${id}`,
                content: `<p>Content for Lesson ${id}</p>`,
                chapter: `Chapter ${id}`,
            };
            setLesson(lessonData);
        }
    }, [id]);

    const handleContentChange = (event: any, editor: any) => {
        const data = editor.getData();
        setLesson((prev: any) => ({
            ...prev,
            content: data,
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLesson((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLesson((prev: any) => ({
            ...prev,
            description: e.target.value,
        }));
    };

    const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLesson((prev: any) => ({
            ...prev,
            chapter: e.target.value,
        }));
    };

    const handleSave = () => {
        console.log("Saved lesson:", lesson);
        navigate("/lesson");
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!lesson) return <div>Loading...</div>;

    return (
        <div className="edit-lesson-page">
            <div className="top-row">
                <button onClick={handleBack} className="btn btn-secondary">
                    Back
                </button>
                <h2>Edit Lesson</h2>
            </div>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={lesson.title}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    value={lesson.description}
                    onChange={handleDescriptionChange}
                />
            </div>
            <div className="form-group">
                <label>Content</label>
                <CKEditor
                    editor={ClassicEditor}
                    data={lesson.content}
                    onChange={handleContentChange}
                />
            </div>
            <div className="form-group">
                <label>Chapter</label>
                <select
                    name="chapter"
                    value={lesson.chapter}
                    onChange={handleChapterChange}
                >
                    {chapters.map((chapter, index) => (
                        <option key={index} value={chapter}>
                            {chapter}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={handleSave} className="btn btn-success">
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditLessonPage;
