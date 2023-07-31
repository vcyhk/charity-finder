import { Route,Routes } from "react-router-dom";
import './App.css'
import Layout from './Layout';
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import CharityDetailPage from "./pages/CharityDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="/favorites" element={<FavoritesPage/>}/>
        <Route path="/charity/:id" element={<CharityDetailPage/>}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Route>     
    </Routes>
  )
}

export default App
