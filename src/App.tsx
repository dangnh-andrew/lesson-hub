import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./scss/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import DefaultLayout from "./components/layouts/DefaultLayout";
import HomePage from "./pages/Home";
import GeoGebraPage from "./pages/GeoGebra";
import PostDetailsPage from "./pages/Post/PostDetails";
import PostListPage from "./pages/Post/PostList";
import LoginPage from "./pages/Login";
import PublicLayout from "./components/layouts/PublicLayout";
import LessonListPage from "./pages/Lesson/LessonList";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import EditLessonPage from "@/pages/Lesson/EditLesson";
import AddLessonPage from "@/pages/Lesson/AddLesson";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/geogebra" element={<GeoGebraPage />} />
          <Route path="/post" element={<PostListPage />} />
          <Route path="/post/:postUrlKey" element={<PostDetailsPage />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<AdminPanelLayout />}>
          <Route path="/lesson" element={<LessonListPage />} />
          <Route path="/lesson/:id" element={<EditLessonPage />} />
          <Route path="/lesson/add" element={<AddLessonPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
