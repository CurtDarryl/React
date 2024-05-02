import { CCardBody, CFormSelect } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function LinePlanner({ handleChangeH, ticket }) {
  LinePlanner.propTypes = {
    handleChangeH: PropTypes.node.isRequired,
  };
  LinePlanner.propTypes = {
    ticket: PropTypes.node.isRequired,
  };
  // line/plannercode
  const [plannercodes, setPlannercodes] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://kepappsp01:8020/api/Camstar/Query/WCMesProductSeries/GetAllPlannercode"
      )
      .then((res) => {
        // console.log(res.data);
        const plannerCode = JSON.parse(res.data.data).map(
          (plannercode) => plannercode.PLANNERCODE
        );
        setPlannercodes(plannerCode);
        // console.log(plannerCode);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <CCardBody className="justify-content-center align-items-center">
      <label className="control-label">Line/Planner Code</label>
      <CFormSelect
        name="plannercode"
        onChange={handleChangeH}
        value={ticket.plannercode}
      >
        <option></option>
        {plannercodes.map((plannercode, index) => (
          <option key={index} value={plannercode}>
            {plannercode}
          </option>
        ))}
      </CFormSelect>
    </CCardBody>
  );
}

export default LinePlanner;
