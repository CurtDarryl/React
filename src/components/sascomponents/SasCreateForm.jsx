import { useState, useEffect } from "react";
import uuid from "react-uuid";
import * as Coreui from "@coreui/react";
import * as Fa6 from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Partnumber from "../comboboxes/Partnumber";
import Factory from "../comboboxes/Factory";
import LinePlanner from "../comboboxes/LinePlanner";
import Remarks from "../comboboxes/Remarks";
import Machine from "../comboboxes/Machine";

function SasCreateForm() {
  // Ticket Details
  const [ticketDetails, setTicketDetails] = useState({
    id: uuid(),
    partnumber: "",
    machinename: "",
  });

  const [ticketDetailsData, setTicketDetailsData] = useState([]);
  const [editTicketId, setEditTicketId] = useState(null);

  useEffect(() => {
    const storedTicketDetailsData = JSON.parse(
      localStorage.getItem("sasTicketDetails")
    );
    if (storedTicketDetailsData && storedTicketDetailsData.length > 0) {
      setTicketDetailsData(storedTicketDetailsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sasTicketDetails", JSON.stringify(ticketDetailsData));
  }, [ticketDetailsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails((prevTicketD) => ({ ...prevTicketD, [name]: value }));
  };

  const handleAddTicketDetails = (e) => {
    e.preventDefault();
    if (validateTicketD()) {
      if (editTicketId !== null) {
        const updatedTicketDetails = ticketDetailsData.map((ticket) =>
          ticket.id === editTicketId ? ticketDetails : ticket
        );
        setTicketDetailsData(updatedTicketDetails);
        setEditTicketId(null);
      } else {
        setTicketDetailsData((prevTicketD) => [
          ...prevTicketD,
          { ...ticketDetails },
        ]);
      }
      setTicketDetails({
        id: uuid(),
        partnumber: "",
        machinename: "",
      });
    }
  };

  // Edit ticket details
  const handleEditTicket = (id) => {
    const ticketToEdit = ticketDetailsData.find((ticket) => ticket.id === id);
    setTicketDetails({ ...ticketToEdit });
    setEditTicketId(id);
  };

  const handleUpdateTicket = () => {
    const updatedTicketDetails = ticketDetailsData.map((ticket) =>
      ticket.id === editTicketId ? ticketDetails : ticket
    );
    setTicketDetailsData(updatedTicketDetails);
    setEditTicketId(null);
    setTicketDetails({
      partnumber: "",
      machinename: "",
    });
  };

  const handleDeleteTicketD = (id) => {
    const updatedTicketDetails = ticketDetailsData.filter(
      (ticket) => ticket.id !== id
    );
    setTicketDetailsData(updatedTicketDetails);
  };

  // validate ticket details
  const validateTicketD = () => {
    let result = true;
    if (ticketDetails.partnumber === "" || ticketDetails.partnumber === null) {
      result = false;
      toast.warning("Please Select Part Number");
    }
    if (
      ticketDetails.machinename === "" ||
      ticketDetails.machinename === null
    ) {
      result = false;
      toast.warning("Please Select Machine");
    }
    return result;
  };

  // Create Ticket
  const [ticket, setTicketHead] = useState({
    factoryname: "",
    costcode: "",
    plannercode: "",
    stationname: "",
    subassyname: "",
    defectreason: "",
    totalquantity: "",
    remarks: "",
    reviewer: "",
    ticketDetails: ticketDetailsData,
  });

  const handleChangeH = (e) => {
    const value = e.target.value;
    setTicketHead({ ...ticket, [e.target.name]: value });
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();

    if (ticketDetailsData.length === 0) {
      toast.warning("Please Add Ticket Details");
      return;
    }

    try {
      const formattedTicketDetails = ticketDetailsData.map((detail) => ({
        partnumber: detail.partnumber,
        machinename: detail.machinename,
        statusid: 1,
      }));

      const postData = {
        ticket: {
          factoryname: ticket.factoryname,
          costcode: ticket.costcode,
          plannercode: ticket.plannercode,
          stationname: ticket.stationname,
          subassyname: ticket.subassyname,
          defectreason: ticket.defectreason,
          totalquantity: ticket.totalquantity,
          tickettypeid: 1,
          ticketstatusid: 1,
          remarks: ticket.remarks,
        },
        ticketdetails: formattedTicketDetails,
        user: {
          name: "CPenote",
        },
      };
      await axios.post(
        "http://kepappsp01:8031/api/Ticket/CreateTicket",
        postData
      );

      localStorage.clear();

      setTicketDetailsData([]);

      console.log(postData);

      toast.success("Ticket Created Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occured while creating a ticket.");
    }
    setTicketHead({
      factoryname: "",
      costcode: "",
      plannercode: "",
      stationname: "",
      subassyname: "",
      defectreason: "",
      totalquantity: "",
      remarks: "",
      reviewer: "",
    });
  };

  // ComboBoxes

  // Defect/reason
  const [reasons, setReasons] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://kepappsp01:8020/api/Camstar/Modeling/LossReasonMaint/GetAllLossReason"
      )
      .then((res) => {
        // console.log(res.data);
        const defectReason = JSON.parse(res.data.data).map(
          (reason) => reason.LOSSREASONNAME
        );
        setReasons(defectReason);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <form className="rm-ticket-form" onSubmit={handleCreateTicket}>
      <Coreui.CRow>
        <Coreui.CCol>
          <Coreui.CCardHeader>
            <span className="ticket-name">SubAssy Scrapping</span>
          </Coreui.CCardHeader>
          <Coreui.CCard className="p-4">
            <Coreui.CCardHeader>
              <span>Create Ticket Head</span>
            </Coreui.CCardHeader>

            {/* Factory */}
            <Factory handleChangeH={handleChangeH} ticket={ticket} />

            {/* Cost Code */}
            <Coreui.CCardBody className="justify-content-center align-items-center">
              <label className="control-label">Cost Code</label>
              <Coreui.CFormSelect
                name="costcode"
                onChange={handleChangeH}
                value={ticket.costcode}
              >
                <option></option>
                <option value="KP-KE.RME&O">KP-KE.RME&O</option>
                <option value="Sample">Sample</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
              </Coreui.CFormSelect>
            </Coreui.CCardBody>

            {/* Line/Planner */}
            <LinePlanner handleChangeH={handleChangeH} ticket={ticket} />

            {/* Station */}
            <Coreui.CCardBody className="justify-content-center align-items-center">
              <label className="control-label">Station</label>
              <Coreui.CFormSelect
                name="stationname"
                onChange={handleChangeH}
                value={ticket.stationname}
              >
                <option></option>
                <option value="WIP-KEVAM">WIP-KEVAM</option>
                <option value="Sample">Sample</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
              </Coreui.CFormSelect>
            </Coreui.CCardBody>
            {/* SubAssy */}
            <Coreui.CCardBody className="justify-content-center align-items-center">
              <label className="control-label">SubAssy</label>
              <Coreui.CFormSelect
                name="subassyname"
                onChange={handleChangeH}
                value={ticket.subassyname}
              >
                <option></option>
                <option value="WIP-KEVAM">WIP-KEVAM</option>
                <option value="Sample">Sample</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
              </Coreui.CFormSelect>
            </Coreui.CCardBody>
            <Coreui.CCardBody className="justify-content-center align-items-center">
              <label className="control-label">Reason</label>
              <Coreui.CFormSelect
                name="defectreason"
                onChange={handleChangeH}
                value={ticket.defectreason}
              >
                <option></option>
                {reasons.map((reason, index) => (
                  <option key={index} value={reason}>
                    {reason}
                  </option>
                ))}
              </Coreui.CFormSelect>
            </Coreui.CCardBody>
            <Coreui.CCardBody>
              <label className="control-label">Quantity</label>
              <input
                min={1}
                type="number"
                name="totalquantity"
                className="form-control"
                onChange={handleChangeH}
                value={ticket.totalquantity}
              />
            </Coreui.CCardBody>

            {/* Remarks */}
            <Remarks handleChangeH={handleChangeH} ticket={ticket} />

            <hr className="separator" />
            {/* Add Ticket Details Form */}
            <Coreui.CCardBody>
              <Coreui.CCardHeader>
                <span>Add Ticket Details</span>
              </Coreui.CCardHeader>
              <Coreui.CRow className="g-0">
                <Coreui.CCol>
                  <Partnumber
                    handleChange={handleChange}
                    ticketDetails={ticketDetails}
                  />
                </Coreui.CCol>

                {/* Machine */}
                <Coreui.CCol>
                  <Machine
                    handleChange={handleChange}
                    ticketDetails={ticketDetails}
                  />
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
            </Coreui.CCardBody>

            {/* Display Ticket Details Table */}

            <section className="panel mt-3">
              <div className="panel-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-condensed mb-none">
                    <thead>
                      <tr>
                        <th className="text-center">SubAssy</th>
                        <th className="text-center">Part Number</th>
                        <th className="text-center">Machine</th>
                        <th className="text-center">Defect/Reason</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Cost</th>
                        <th className="text-center">Account</th>
                        <th className="text-center">Remarks</th>
                        <th className="text-center">Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ticketDetailsData.map((ticket) => (
                        <tr key={ticket.id}>
                          <td>{ticket.subassyname}</td>
                          <td>{ticket.partnumber}</td>
                          <td>{ticket.machinename}</td>
                          <td>{ticket.defectreason}</td>
                          <td className="text-center">{ticket.quantity}</td>
                          <td className="text-center">{ticket.cost}</td>
                          <td>{}</td>
                          <td>{ticket.remarks}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-primary me-2"
                              type="button"
                              onClick={() => handleEditTicket(ticket.id)}
                            >
                              Edit <Fa6.FaPen />
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteTicketD(ticket.id)}
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
            <hr className="separator" />

            <div className="col-sm-4 mb-3">
              <label className="control-label">Reviewer</label>
              <Coreui.CFormSelect
                name="reviewer"
                onChange={handleChangeH}
                value={ticket.reviewer}
              >
                <option></option>
                <option value="Neo Perez">Neo Perez</option>
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
              </Coreui.CFormSelect>
            </div>

            <footer className="panel-footer">
              <button className="btn btn-success me-2" type="submit">
                Create <Fa6.FaCheck />
              </button>
              <Link to="/rmlist">
                <button className="btn btn-primary">
                  View List <Fa6.FaEye />
                </button>
              </Link>
            </footer>
          </Coreui.CCard>
        </Coreui.CCol>
      </Coreui.CRow>
    </form>
  );
}

export default SasCreateForm;
