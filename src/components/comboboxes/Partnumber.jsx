import { CCardBody, CFormSelect } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Partnumber({ handleChange, ticketDetails }) {
  Partnumber.propTypes = {
    handleChange: PropTypes.node.isRequired,
  };
  Partnumber.propTypes = {
    ticketDetails: PropTypes.node.isRequired,
  };
  // Part Number
  const [partNumbers, setPartNumbers] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://kepappsp01:8010/api/FGRMDefectsMatrix/GetAllMaterialPartnumber"
      )
      .then((res) => {
        const materialPart = JSON.parse(res.data.data).map(
          (partnumber) => partnumber.material_partnumber
        );
        setPartNumbers(materialPart);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <CCardBody className="justify-content-center align-items-center">
      <label className="control-label">Part</label>
      <CFormSelect
        name="partnumber"
        onChange={handleChange}
        value={ticketDetails.partnumber}
      >
        <option value=""></option>
        {partNumbers.map((partnumber, index) => (
          <option key={index} value={partnumber}>
            {partnumber}
          </option>
        ))}
      </CFormSelect>
    </CCardBody>
  );
}

export default Partnumber;
