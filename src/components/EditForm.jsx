import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Coreui from "@coreui/react";
import * as Fa6 from "react-icons/fa6";
import uuid from "react-uuid";

const EditForm = () => {
  const { Uid } = useParams();

  const [ticketDdata, setTicketDdata] = useState([]);

  const [ticketH, setTicketH] = useState();

  useEffect(() => {
    axios
      .get("http://kepappsp01:8031/api/Ticket/GetTicketDetail", {
        params: {
          ticketid: Uid,
        },
      })
      .then((res) => {
        const ticketDetails = JSON.parse(res.data.data);
        const ticketD = ticketDetails.ticketdetails;
        setTicketDdata(ticketD);
        console.log(ticketD);

        const ticket = ticketDetails.ticket;
        setTicketH(ticket);
        console.log(ticket);
      })
      .catch((err) => console.log(err));
  }, [Uid]);

  const [ticketDetails, setTicketDetails] = useState({
    id: uuid(),
    Partnumber: "",
    Machinename: "",
    Defectreason: "",
    Quantity: "",
    Remarks: "",
  });

  const [editTicketId, setEditTicketId] = useState(null);

  useEffect(() => {
    const storedTicketDetailsData = JSON.parse(localStorage.getItem("ticketD"));
    if (storedTicketDetailsData && storedTicketDetailsData.length > 0) {
      setTicketDdata(storedTicketDetailsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketD", JSON.stringify(ticketDdata));
  }, [ticketDdata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails((prevTicketD) => ({ ...prevTicketD, [name]: value }));
  };

  const handleAddTicketDetails = (e) => {
    e.preventDefault();
    {
      if (editTicketId !== null) {
        const updatedTicketDetails = ticketDdata.map((ticket) =>
          ticket.id === editTicketId ? ticketDetails : ticket
        );
        setTicketDdata(updatedTicketDetails);
        setEditTicketId(null);
      } else {
        setTicketDdata((prevTicketD) => [...prevTicketD, { ...ticketDetails }]);
      }
      setTicketDetails({
        id: uuid(),
        Partnumber: "",
        Machinename: "",
        Defectreason: "",
        Quantity: "",
        Remarks: "",
      });
    }
    console.log(ticketDdata);
  };

  // Edit ticket details
  const handleEditTicket = (id) => {
    const ticketToEdit = ticketDdata.find((ticket) => ticket.id === id);
    setTicketDetails({ ...ticketToEdit });
    setEditTicketId(id);
  };

  const handleUpdateTicket = () => {
    const updatedTicketDetails = ticketDdata.map((ticket) =>
      ticket.id === editTicketId ? ticketDetails : ticket
    );
    setTicketDdata(updatedTicketDetails);
    setEditTicketId(null);
    setTicketDetails({
      partnumber: "",
      machinename: "",
      defectreason: "",
      quantity: "",
      remarks: "",
    });
  };

  const handleDeleteTicketD = (id) => {
    const updatedTicketDetails = ticketDdata.filter(
      (ticket) => ticket.id !== id
    );
    setTicketDdata(updatedTicketDetails);
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

  // Defect/reason
  const [reasons, setReasons] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://kepappsp01:8020/api/Camstar/Modeling/LossReasonMaint/GetAllLossReason"
      )
      .then((res) => {
        const defectReason = JSON.parse(res.data.data).map(
          (reason) => reason.LOSSREASONNAME
        );
        setReasons(defectReason);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="me-5 ms-5">
      <h1>Edit ticket {Uid}</h1>
      <Coreui.CCard>
        <Coreui.CCardHeader>Ticket Details</Coreui.CCardHeader>
        <Coreui.CCardBody>
          <Coreui.CRow>
            <Coreui.CCol>
              <label className="control-label">Part</label>
              <Coreui.CFormSelect
                name="Partnumber"
                onChange={handleChange}
                value={ticketDetails.Partnumber}
              >
                <option value=""></option>
                {partNumbers.map((partnumber, index) => (
                  <option key={index} value={partnumber}>
                    {partnumber}
                  </option>
                ))}
              </Coreui.CFormSelect>
            </Coreui.CCol>
            <Coreui.CCol>
              <label className="control-label">Machine</label>
              <Coreui.CFormSelect
                name="Machinename"
                onChange={handleChange}
                value={ticketDetails.Machinename}
              >
                <option value=""></option>
                {machines.map((machinename, index) => (
                  <option key={index} value={machinename}>
                    {machinename}
                  </option>
                ))}
              </Coreui.CFormSelect>
            </Coreui.CCol>
          </Coreui.CRow>
          <Coreui.CRow>
            <Coreui.CCol>
              <label className="control-label">Defect/Reason</label>
              <Coreui.CFormSelect
                name="Defectreason"
                onChange={handleChange}
                value={ticketDetails.Defectreason}
              >
                <option value=""></option>
                {reasons.map((reason, index) => (
                  <option key={index} value={reason}>
                    {reason}
                  </option>
                ))}
              </Coreui.CFormSelect>
            </Coreui.CCol>
            <Coreui.CCol className="">
              <label className="control-label">Quantity</label>
              <input
                min={1}
                type="number"
                name="Quantity"
                className="form-control"
                onChange={handleChange}
                value={ticketDetails.Quantity}
              />
            </Coreui.CCol>
            <Coreui.CCol>
              <label className="control-label">Remarks</label>
              <textarea
                className="form-control"
                rows="1"
                placeholder="Type your message"
                name="Remarks"
                onChange={handleChange}
                value={ticketDetails.Remarks}
              ></textarea>
            </Coreui.CCol>
          </Coreui.CRow>
          <button
            className={
              !editTicketId
                ? "btn btn-primary mt-3 ms-3"
                : "btn btn-success mt-3 ms-3"
            }
            type="button"
            onClick={
              !editTicketId ? handleAddTicketDetails : handleUpdateTicket
            }
          >
            {!editTicketId ? `Add Ticket Detail ` : `Update Ticket Detail `}
            {!editTicketId ? <Fa6.FaPlus /> : <Fa6.FaCheck />}
          </button>

          <section className="panel mt-3">
            <div className="panel-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-condensed mb-none">
                  <thead>
                    <tr>
                      <th>Part Number</th>
                      <th>Machine</th>
                      <th>Defect/Reason</th>
                      <th>Quantity</th>
                      <th>Cost</th>
                      <th>Account</th>
                      <th>Remarks</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketDdata.map((ticket) => (
                      <tr key={ticket.id}>
                        <td>{ticket.Partnumber}</td>
                        <td>{ticket.Machinename}</td>
                        <td>{ticket.Defectreason}</td>
                        <td>{ticket.Quantity}</td>
                        <td>{ticket.Cost}</td>
                        {/* Account here */}
                        <td>{}</td>
                        <td>{ticket.Remarks}</td>
                        <td>
                          <button
                            className="btn btn-primary me-2"
                            type="button"
                            onClick={handleEditTicket}
                          >
                            Edit <Fa6.FaPen />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={handleDeleteTicketD}
                          >
                            Delete <Fa6.FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Coreui.CCardBody>
      </Coreui.CCard>
    </div>
  );
};

export default EditForm;
