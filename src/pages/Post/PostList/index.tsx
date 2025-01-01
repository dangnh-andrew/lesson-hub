import React, { useEffect, useState } from "react";
import PostItem from "./components/PostItem";
import lessonApi from "@/api/lessonApi";

const PostListPage: React.FunctionComponent = () => {
    const [lessons, setLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await lessonApi.fetchLessons(0, 10);
                console.log(response); // Log dữ liệu API trả về
                // Kiểm tra mảng 'body' trong response
                if (Array.isArray(response.body)) {
                    setLessons(response.body); // Cập nhật trạng thái với dữ liệu trong 'body'
                    console.log("Updated lessons:", response.body); // Log sau khi cập nhật
                } else {
                    setError("Lessons data is not an array");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load lessons");
            } finally {
                setLoading(false);
            }

        };


        fetchLessons();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!lessons || lessons.length === 0) {
        return <div>No lessons available.</div>;
    }

    return (
        <>
            {lessons.map((lesson) => (
                <PostItem key={lesson.id} lesson={lesson} />
            ))}
        </>
    );

};

export default PostListPage;
