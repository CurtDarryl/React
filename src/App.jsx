import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RmList from "./pages/rm/RmList";
import MafCreate from "./pages/maf/MafCreate";
import SasCreate from "./pages/sas/SasCreate";
import RmCreate from "./pages/rm/RmCreate";
import RmReviewer from "./pages/Reviewer";
import NotFound from "./pages/NotFound";
import Approver from "./pages/Approver";
import "./assets/css/components.css";
import Draft from "./pages/Drafts";
import RmReport from "./pages/rm/RmReport";
import SasList from "./pages/sas/SasList";
import MafList from "./pages/maf/MafList";
import RmEdit from "./pages/Edit";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/rm/create" element={<RmCreate />}></Route>
        <Route path="/rm/list" element={<RmList />}></Route>
        <Route path="/rm/report" element={<RmReport />}></Route>
        <Route path="/rm/edit/:Uid" element={<RmEdit />}></Route>

        <Route path="/sas/create" element={<SasCreate />}></Route>
        <Route path="/sas/list" element={<SasList />}></Route>
        <Route path="/sas/report" element={<SasCreate />}></Route>

        <Route path="/maf/create" element={<MafCreate />}></Route>
        <Route path="/maf/list" element={<MafList />}></Route>
        <Route path="/maf/create" element={<MafCreate />}></Route>

        <Route path="/drafts" element={<Draft />}></Route>

        <Route path="/review" element={<RmReviewer />} />

        <Route path="/approve" element={<Approver />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
