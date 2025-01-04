import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import PostItem from "./components/PostItem";
import { Input } from "antd";
import { FunnelPlotOutlined } from "@ant-design/icons";
import lessonApi from "@/api/lessonApi";

interface Chapter {
    id: number;
    title: string;
    description: string;
}

const { Search } = Input;

const PostListPage: React.FunctionComponent = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [totalPosts, setTotalPosts] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [chapterList, setChapterList] = useState<Chapter[]>([]);
    const [currentSearchText, setCurrentSearchText] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

    const fetchChapters = async () => {
        try {
            const response = await lessonApi.getChapter();
            console.log('Fetched chapters:', response.body);
            setChapterList(response.body);
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage, itemsPerPage, currentSearchText, sortOrder);
        fetchChapters();
    }, [currentPage, searchQuery, sortOrder]);

    const fetchPosts = async (page: number, limit: number, searchText: string = '', sort: string = '') => {
        try {
            setLoading(true);
            const response = searchText
                ? await lessonApi.searchLessons(searchText, searchText, page - 1, limit, sort)
                : await lessonApi.fetchLessons(page - 1, limit);

            setPosts(response.body);
            setTotalPosts(response.pagination.total);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (searchText: string) => {
        setCurrentSearchText(searchText);
        setCurrentPage(1);
        fetchPosts(1, itemsPerPage, searchText, sortOrder);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSortClick = () => {
        const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        setSortOrder(newSortOrder);
        fetchPosts(currentPage, itemsPerPage, currentSearchText, newSortOrder);
    };

    return (
        <div>
            <div className="search-sort-row">
                <Search
                    placeholder="Search title or description..."
                    onSearch={(value) => handleSearch(value)}
                    enterButton
                    className="custom-search"
                    style={{ width: 300, marginRight: 10 }}
                />


                <div className="icon-wrapper" onClick={handleSortClick}>
                    <FunnelPlotOutlined
                        style={{ fontSize: '24px', cursor: 'pointer' }}
                        onClick={() => console.log('Sort clicked')}
                    />
                </div>
            </div>

            <div className="post-list">
                {loading ? (
                    <div>Loading...</div>
                ) : posts.length === 0 ? (
                    <div>No posts available.</div>
                ) : (
                    posts.map((post) => {
                        const chapter = chapterList.find((ch) => ch.id === post.chapterId);
                        return (
                            <PostItem
                                key={post.id}
                                lesson={post}
                                chapterTitle={ chapter?.title || "Unknown Chapter"}
                            />
                        );
                    })
                )}
            </div>

            <div className="pagination-container">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalPosts}
                    showLessItems
                    onChange={handlePageChange}
                    showQuickJumper
                />
            </div>
        </div>
    );
};

export default PostListPage;
