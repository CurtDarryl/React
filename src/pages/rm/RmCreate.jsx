import "../../assets/css/rm.css";
import RmCreateForm from "../../components/rmcomponents/RmCreateForm";

function RmCreate() {
  const role = sessionStorage.getItem("rolename");
  if (role !== "requestor" && role !== "admin") {
    return (
      <div className="body">
        <h1>This page is for requestor only</h1>
      </div>
    );
  } else {
    return (
      <div className="body">
        <RmCreateForm />
      </div>
    );
  }
}

export default RmCreate;
