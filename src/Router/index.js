import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelpWantedOtherInfo from "../Views/HelpWantedOtherInfo";
import HelpWantedRegister from "../Views/HelpWantedRegister";
import Home from "../Views/Home";

export default function RouterView() {
  return (
    <BrowserRouter>
      <Routes>
            <Route index element={<Home />} />
            <Route path="helpwantsignup" element={<HelpWantedRegister />} />
            <Route path="helpwantsignupother" element={<HelpWantedOtherInfo />} />
            {/* <Route path="*" element={<NoPage />} />  */}
      </Routes>
    </BrowserRouter>
  );
}
