import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import About from "./pages/About.jsx";
import News from "./pages/News.jsx";
import PostPage from "./pages/PostPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import { LocaleProvider } from "./i18n/LocaleContext.jsx";

const AdminApp = lazy(() => import("./admin/AdminApp.jsx"));

function AdminShell() {
  return (
    <Suspense fallback={null}>
      <AdminApp />
    </Suspense>
  );
}

/** The same page tree, reused under each locale's path prefix. */
function pageRoutes(key) {
  return [
    <Route key={`${key}-home`} index element={<Home />} />,
    <Route key={`${key}-product`} path="product" element={<Product />} />,
    <Route key={`${key}-team`} path="team" element={<TeamPage />} />,
    <Route key={`${key}-contact`} path="contact" element={<ContactPage />} />,
    <Route key={`${key}-about`} path="about" element={<About />} />,
    <Route key={`${key}-news`} path="news" element={<News />} />,
    <Route key={`${key}-post`} path="news/:slug" element={<PostPage />} />,
    <Route key={`${key}-404`} path="*" element={<NotFound />} />,
  ];
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminShell />} />

        <Route
          path="/fi"
          element={
            <LocaleProvider locale="fi">
              <Layout />
            </LocaleProvider>
          }
        >
          {pageRoutes("fi")}
        </Route>

        <Route
          path="/sv"
          element={
            <LocaleProvider locale="sv">
              <Layout />
            </LocaleProvider>
          }
        >
          {pageRoutes("sv")}
        </Route>

        <Route
          path="/"
          element={
            <LocaleProvider locale="en">
              <Layout />
            </LocaleProvider>
          }
        >
          {pageRoutes("en")}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
