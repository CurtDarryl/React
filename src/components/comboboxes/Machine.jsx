import { CCardBody, CFormSelect } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Machine({ handleChange, ticketDetails }) {
  Machine.propTypes = {
    handleChange: PropTypes.node.isRequired,
  };
  Machine.propTypes = {
    ticketDetails: PropTypes.node.isRequired,
  };
  // Machine
  const [machines, setMachines] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://kepappsp01:8020/api/Camstar/Modeling/ResourceVP/GetAllAssemblyEquipmentMaint"
      )
      .then((res) => {
        const machineName = JSON.parse(res.data.data).map(
          (machinename) => machinename.EQUIPMENTNAME
        );
        setMachines(machineName);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <CCardBody className="justify-content-center align-items-center">
      <label className="control-label">Machine</label>
      <CFormSelect
        name="machinename"
        onChange={handleChange}
        value={ticketDetails.machinename}
      >
        <option value=""></option>
        {machines.map((machinename, index) => (
          <option key={index} value={machinename}>
            {machinename}
          </option>
        ))}
      </CFormSelect>
    </CCardBody>
  );
}

export default Machine;
