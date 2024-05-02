import { CCardBody } from "@coreui/react";
import PropTypes from "prop-types";

function Remarks({ handleChangeH, ticket }) {
  Remarks.propTypes = {
    handleChangeH: PropTypes.node.isRequired,
  };
  Remarks.propTypes = {
    ticket: PropTypes.node.isRequired,
  };
  return (
    <CCardBody className="justify-content-center align-items-center">
      <label className="control-label">Remarks</label>
      <textarea
        className="form-control"
        rows="2"
        placeholder="Type your message"
        name="remarks"
        onChange={handleChangeH}
        value={ticket.remarks}
      ></textarea>
    </CCardBody>
  );
}

export default Remarks;
