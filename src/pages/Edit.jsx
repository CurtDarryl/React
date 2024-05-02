import EditForm from "../components/EditForm";

function RmEdit() {
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
        <EditForm />
      </div>
    );
  }
}

export default RmEdit;
