import ApproverTable from "../components/approvercomponents/ApproverTable";

const Approver = () => {
  const role = sessionStorage.getItem("rolename");

  if (role !== "approver" && role !== "admin") {
    return (
      <div className="body">
        <h1>This page is only for approvers</h1>
      </div>
    );
  } else {
    return (
      <div className="body">
        <ApproverTable />
      </div>
    );
  }
};

export default Approver;
