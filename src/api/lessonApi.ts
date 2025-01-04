import axiosClient, { handleRequest } from './axiosClient';

const lessonApi = {
  fetchLessons: (page: number, size: number): Promise<any> => {
    const params = { page, size };
    return handleRequest(axiosClient.get('/lesson', { params }));
  },
  addLesson: (lesson: any): Promise<any> => {
    const url = '/admin/lesson';
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return handleRequest(axiosClient.post(url, lesson, { headers }));
  },
  updateLesson: (id: number, lesson: any): Promise<any> => {
    const url = `/admin/lesson/${id}`;
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return handleRequest(axiosClient.put(url, lesson, { headers }));
  },
  detailLesson: (id: number): Promise<any> => {
    const url = `/lesson/${id}`;
    return handleRequest(axiosClient.get(url));
  },
  deleteLesson: (id: number): Promise<any> => {
    const url = `/admin/lesson/${id}`;
    return handleRequest(axiosClient.delete(url));
  },
  getLesson: (id: number): Promise<any> => {
    const url = `/lesson/${id}`;
    return handleRequest(axiosClient.get(url));
  },

  getChapter: (): Promise<any> => {
    const url = '/chapter';
    return handleRequest(axiosClient.get(url));
  },

  searchLessons: (title: string, description: string, page: number, size: number): Promise<any> => {
    const params: any = { page, size };
    if (title) params['title.contains'] = title;
    if (description) params['description.contains'] = description;

    return handleRequest(axiosClient.get('/lesson', { params }));
  },

};

export default lessonApi;
