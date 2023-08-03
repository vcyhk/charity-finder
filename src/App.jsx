import { Route,Routes } from "react-router-dom";
import Layout from './Layout';
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import CharityCausesPage from "./pages/CharityCausesPage";
import CharityDetailPage from "./pages/CharityDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="/favorites" element={<FavoritesPage/>}/>
        <Route path="/search/:causes" element={<CharityCausesPage/>}/>
        <Route path="/charity/:id" element={<CharityDetailPage/>}/>
        <Route path="/404NotFound" element={<NotFoundPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Route>     
    </Routes>
  )
}

export default App
