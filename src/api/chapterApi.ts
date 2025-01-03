import axiosClient, { handleRequest } from "@/api/axiosClient";

const chapterApi = {
  fetchChapters: (): Promise<any> => {
    return handleRequest(axiosClient.get('/chapter'));
  },
}

export default chapterApi;