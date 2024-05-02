import MafListTable from "../../components/mafcomponents/MafListTable";

function MafList() {
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
        <MafListTable />
      </div>
    );
  }
}

export default MafList;
