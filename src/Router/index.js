import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Views/Home";

export default function RouterView() {
  return (
    <BrowserRouter>
      <Routes>
            <Route index element={<Home />} />
            {/* <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
