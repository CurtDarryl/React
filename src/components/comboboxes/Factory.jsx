import { CCardBody, CFormSelect } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Factory({ handleChangeH, ticket }) {
  Factory.propTypes = {
    handleChangeH: PropTypes.node.isRequired,
  };
  Factory.propTypes = {
    ticket: PropTypes.node.isRequired,
  };
  const [factories, setFactories] = useState([]);
  useEffect(() => {
    axios
      .get("http://kepappsp01:8071/api/Factory/GetAllFactories")
      .then((res) => {
        // console.log(res.data);
        const factoryname = JSON.parse(res.data.data).map(
          (factory) => factory.Name
        );
        setFactories(factoryname);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <CCardBody className="justify-content-center align-items-center">
      <label className="control-label">Factory</label>
      <CFormSelect
        name="factoryname"
        onChange={handleChangeH}
        value={ticket.factoryname}
      >
        <option value=""></option>
        {factories.map((factory, index) => (
          <option key={index} value={factory}>
            {factory}
          </option>
        ))}
      </CFormSelect>
    </CCardBody>
  );
}

export default Factory;
