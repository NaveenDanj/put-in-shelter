import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelpProviderLogin from "../Views/HelpProvider/HelpProviderLogin";
import HelpProviderOtherInfo from "../Views/HelpProvider/HelpProviderOtherInfo";
import HelpProviderRegister from "../Views/HelpProvider/HelpProviderRegister";
import HelpWantedDashboard from "../Views/HelpWantedDashboard";
import HelpWantedLogin from "../Views/HelpWantedLogin";
import HelpWantedOtherInfo from "../Views/HelpWantedOtherInfo";
import HelpWantedRegister from "../Views/HelpWantedRegister";
import Home from "../Views/Home";

import ProtectedRoute from "./ProtectedRoute";

export default function RouterView() {
  return (
    <BrowserRouter>
      <Routes>
            <Route index element={<Home />} />

            <Route path="helpwantsignup" element={<HelpWantedRegister />} />
            <Route path="helpwantsignupother" element={<HelpWantedOtherInfo />} />
            <Route path="helpwantedlogin" element={<HelpWantedLogin />} />

            <Route path="serviceProvidersignup" element={<HelpProviderRegister />} />
            <Route path="serviceProvidersignupother" element={<HelpProviderOtherInfo />} />
            <Route path="serviceProviderlogin" element={<HelpProviderLogin />} />

            <Route 
              exact
              path="helpwanted"
              element={
                <ProtectedRoute>
                  <HelpWantedDashboard />
                </ProtectedRoute>
              }
            />
            {/* <Route path="helpwanted" element={<HelpWantedDashboard />} /> */}
            {/* <Route path="*" element={<NoPage />} />  */}
      </Routes>
    </BrowserRouter>
  );
}
