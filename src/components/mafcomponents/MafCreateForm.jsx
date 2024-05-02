import { useState, useEffect } from "react";
import uuid from "react-uuid";
import * as Coreui from "@coreui/react";
import * as Fa6 from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Partnumber from "../comboboxes/Partnumber";

function MafCreateForm() {
  // Ticket Details
  const [ticketDetails, setTicketDetails] = useState({
    id: uuid(),
    subinventoryname: "",
    partnumber: "",
    // partnumber: "",
    actualcount: "",
    defectreason: "",
  });

  const [ticketDetailsData, setTicketDetailsData] = useState([]);
  const [editTicketId, setEditTicketId] = useState(null);

  useEffect(() => {
    const storedTicketDetailsData = JSON.parse(
      localStorage.getItem("mafTicketDetails")
    );
    if (storedTicketDetailsData && storedTicketDetailsData.length > 0) {
      setTicketDetailsData(storedTicketDetailsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mafTicketDetails", JSON.stringify(ticketDetailsData));
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
        subinventoryname: "",
        partnumber: "",
        // partnumber: "",
        actualcount: "",
        uomid: "",
        defectreason: "",
        transactiontypeid: "",
        netvariance: "",
        absolutevariance: "",
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
      subinventoryname: "",
      partnumber: "",
      // partnumber: "",
      actualcount: "",
      uomid: "",
      defectreason: "",
      transactiontypeid: "",
      netvariance: "",
      absolutevariance: "",
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
          costcode: ticket.costcode,
          tickettypeid: 2,
          ticketstatusid: 1,
          path: ticket.path,
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

  return (
    <form className="rm-ticket-form" onSubmit={handleCreateTicket}>
      <Coreui.CRow>
        <Coreui.CCol>
          <Coreui.CCardHeader className="ticket-name">
            <span>Material Adjustment</span>
          </Coreui.CCardHeader>
          <Coreui.CCard className="p-4">
            <Coreui.CCardHeader>
              <span>Create Ticket Head</span>
            </Coreui.CCardHeader>
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
            <Coreui.CCardBody className="justify-content-center align-items-center">
              <label className="control-label">Remarks</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Type your message"
                name="remarks"
                onChange={handleChangeH}
                value={ticket.remarks}
              ></textarea>
            </Coreui.CCardBody>
            <Coreui.CCardBody className="justify-content-center align-items-center">
              <label className="control-label">File Path</label>
              <input
                className="form-control"
                type="text"
                rows="1"
                placeholder="Enter File Path"
                name="path"
                onChange={handleChangeH}
                value={ticket.path}
              ></input>
            </Coreui.CCardBody>
            <hr className="separator" />
            {/* Add Ticket Details Form */}
            <Coreui.CCardBody>
              <Coreui.CCardHeader>
                <span>Add Ticket Details</span>
              </Coreui.CCardHeader>
              <Coreui.CRow className="g-0">
                <Coreui.CCol>
                  <Coreui.CCardBody className="justify-content-center align-items-center">
                    <label className="control-label">Sub Inventory</label>
                    <Coreui.CFormSelect
                      name="subinventoryname"
                      onChange={handleChange}
                      value={ticketDetails.subinventoryname}
                    >
                      <option></option>
                      <option value="TS-MILLIN-1002">TS-MILLIN-1002</option>
                      <option value="One">One</option>
                      <option value="Two">Two</option>
                      <option value="Three">Three</option>
                    </Coreui.CFormSelect>
                  </Coreui.CCardBody>
                </Coreui.CCol>
                <Coreui.CCol>
                  <Partnumber
                    handleChange={handleChange}
                    ticketDetails={ticketDetails}
                  />
                </Coreui.CCol>

                <Coreui.CRow className="pe-0">
                  <Coreui.CCol className="">
                    <label className="control-label">System Count</label>
                    <input
                      min={1}
                      type="number"
                      name="adjustedquantity"
                      className="form-control"
                      onChange={handleChange}
                      value={ticketDetails.adjustedquantity}
                    />
                  </Coreui.CCol>
                  <Coreui.CCol className="">
                    <label className="control-label">Actual Count</label>
                    <input
                      min={1}
                      type="number"
                      name="actualcount"
                      className="form-control"
                      onChange={handleChange}
                      value={ticketDetails.actualcount}
                    />
                  </Coreui.CCol>
                  <Coreui.CCol className="pe-1">
                    <label className="control-label">Reason</label>
                    <textarea
                      className="form-control"
                      rows="1"
                      placeholder="Type your message"
                      name="defectreason"
                      onChange={handleChange}
                      value={ticketDetails.defectreason}
                    ></textarea>
                  </Coreui.CCol>
                </Coreui.CRow>
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
                        <th className="text-center">Sub Inventory</th>
                        <th className="text-center">Part Number</th>
                        <th className="text-center">System Quantity</th>
                        <th className="text-center">Actual Count</th>
                        <th className="text-center">Adjusted Quantity</th>
                        <th className="text-center">UOM</th>
                        <th className="text-center">Reason</th>
                        <th className="text-center">
                          Transaction Type &#40;Php&#41;
                        </th>
                        <th className="text-center">
                          Net Variance &#40;Php&#41;{" "}
                        </th>
                        <th className="text-center">
                          Absolute Variance &#40;Php&#41;
                        </th>
                        <th className="text-center">Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ticketDetailsData.map((ticket) => (
                        <tr key={ticket.id}>
                          <td>{ticket.subinventoryname}</td>
                          <td>{ticket.partnumber}</td>
                          <td>{ticket.machinename}</td>
                          <td>{ticket.actualcount}</td>
                          <td className="text-center">
                            {ticket.adjustedquantity}
                          </td>
                          <td className="text-center">{ticket.uomid}</td>
                          <td>{ticket.defectreason}</td>
                          <td>{ticket.transactiontypeid}</td>
                          <td>{ticket.netvariance}</td>
                          <td>{ticket.absolutevariance}</td>
                          <td className="text-center d-inline-block">
                            <button
                              className="btn btn-primary w-100"
                              type="button"
                              onClick={() => handleEditTicket(ticket.id)}
                            >
                              Edit <Fa6.FaPen />
                            </button>
                            <button
                              className="btn btn-danger mt-1 w-100"
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
              <Link to="/maf/list">
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

export default MafCreateForm;
