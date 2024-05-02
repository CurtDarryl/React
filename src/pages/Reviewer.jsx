import RmReviewerTable from "../components/reviewercomponents/ReviewerTable";

const RmReviewer = () => {
  let role = sessionStorage.getItem("rolename");
  // console.log(role);

  if (role !== "reviewer" && role !== "admin") {
    return (
      <div className="body">
        <h1>This page is only for reviewers</h1>
      </div>
    );
  } else {
    return (
      <div className="body">
        <RmReviewerTable />
      </div>
    );
  }
};

export default RmReviewer;
