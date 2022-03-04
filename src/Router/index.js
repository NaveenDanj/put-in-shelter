import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelpProviderOtherInfo from "../Views/HelpProvider/HelpProviderOtherInfo";
import HelpProviderRegister from "../Views/HelpProvider/HelpProviderRegister";
import HelpWantedDashboard from "../Views/HelpWantedDashboard";
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
            <Route path="serviceProvidersignup" element={<HelpProviderRegister />} />
            <Route path="serviceProvidersignupother" element={<HelpProviderOtherInfo />} />
            <Route path="helpwanted" element={<HelpWantedDashboard />} />
            {/* <Route path="*" element={<NoPage />} />  */}
      </Routes>
    </BrowserRouter>
  );
}