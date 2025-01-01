import axiosClient, { handleRequest } from './axiosClient';

const lessonApi = {
  fetchLessons: (page: number, size: number): Promise<any> => {
    const params = { page, size };
    return handleRequest(axiosClient.get('/lesson', { params }));
  },
  addLesson: (lesson: any, config: any): Promise<any> => {
    const url = '/admin/lesson';

    const headers = {
      'Content-Type': 'application/json',
      ...config?.headers,
    };

    return handleRequest(axiosClient.post(url, lesson, { headers }));
  },

  updateLesson: (id: number): Promise<any> => {
    const url = `/admin/lesson/${id}`;
    return handleRequest(axiosClient.put(url));
  },
  detailLesson: (id: number): Promise<any> => {
    const url = `/admin/lesson/${id}`;
    return handleRequest(axiosClient.get(url));
  },
  deleteLesson: (id: number): Promise<any> => {
    const url = `/admin/lesson/${id}`;
    return handleRequest(axiosClient.delete(url));
  },
  getChapter: (): Promise<any> => {
    const url = '/chapter';
    return handleRequest(axiosClient.get(url));
  },
};

export default lessonApi;
