import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import About from "./pages/About.jsx";
import News from "./pages/News.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
