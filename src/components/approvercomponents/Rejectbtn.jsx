import { BiSolidDislike } from "react-icons/bi";

function Rejectbtn() {
  return (
    <div className="d-inline ">
      <button className=" btn btn-danger me-2" type="button">
        Reject <BiSolidDislike />
      </button>
    </div>
  );
}

export default Rejectbtn;
