import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import * as Fa6 from "react-icons/fa6";
import { IoIosReturnLeft } from "react-icons/io";
import * as Coreui from "@coreui/react";

const RmReviewerTable = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://kepappsp01:8031/api/Ticket/GetAllTickets")
      .then((res) => {
        // console.log(res.data);
        const rmTickets = JSON.parse(res.data.data).filter(
          (ticket) => ticket.TicketType === "RM"
        );
        setTickets(rmTickets);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleRow = (ticketId) => {
    if (expandedRows.includes(ticketId)) {
      setExpandedRows(expandedRows.filter((id) => id !== ticketId));
    } else {
      setExpandedRows([...expandedRows, ticketId]);
      const ticket = tickets.find((ticket) => ticket.Uid === ticketId);
      if (ticket) {
        axios
          .get("http://kepappsp01:8031/api/Ticket/GetTicketDetail", {
            params: {
              ticketid: ticketId, // Use the ticket UID to fetch details
            },
          })
          .then((res) => {
            const ticketD = JSON.parse(res.data.data);
            const ticketDetailsCopy = { ...ticketDetails };
            ticketDetailsCopy[ticket.Uid] = ticketD.ticketdetails;
            // console.log("Updated ticket details state:", ticketDetailsCopy);
            setTicketDetails(ticketDetailsCopy);
          })
          .catch((err) => console.log(err));
      }
    }
  };
  return (
    <div>
      <div className="rm-ticket-form">
        <Coreui.CCard>
          <Coreui.CCardHeader>Review</Coreui.CCardHeader>
          <Coreui.CCardBody>
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-condensed table-hover mb-none">
                <thead>
                  <tr>
                    <th>Factory</th>
                    <th>Costcode</th>
                    <th>Plannercode</th>
                    <th>Station</th>
                    <th>Remarks</th>
                    <th>Status</th>
                    <th>View Details</th>

                    <th>Option</th>
                  </tr>
                </thead>
                <tbody className="ticket-data">
                  {tickets.map((ticket) => (
                    <React.Fragment key={ticket.Id}>
                      <tr>
                        <td>{ticket.Factoryname}</td>
                        <td>{ticket.Costcode}</td>
                        <td>{ticket.Plannercode}</td>
                        <td>{ticket.Stationname}</td>
                        <td>{ticket.Remarks}</td>

                        <td>{ticket.TicketStatus}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-success"
                            onClick={() => toggleRow(ticket.Uid)}
                          >
                            View{" "}
                            {expandedRows.includes(ticket.Uid) ? (
                              <Fa6.FaEyeSlash />
                            ) : (
                              <Fa6.FaEye />
                            )}
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-primary me-2"
                            type="button"
                          >
                            Approve <BiSolidLike />
                          </button>
                          <button className="btn btn-danger">
                            Return <IoIosReturnLeft />
                          </button>
                        </td>
                      </tr>
                      {expandedRows.includes(ticket.Uid) && (
                        <tr className="nested-row" key={`nested-${ticket.Uid}`}>
                          <td colSpan="9">
                            <span>Ticket Details</span>
                            <table className="table table-bordered table-hover table-striped table-condensed mb-none">
                              <thead>
                                <tr>
                                  <th>Part</th>
                                  <th>Machine</th>
                                  <th>Defect/Reason</th>
                                  <th>Quantity</th>
                                  <th>Remarks</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ticketDetails[ticket.Uid] &&
                                  ticketDetails[ticket.Uid].map(
                                    (detail, index) => (
                                      <tr key={`detail-${index}`}>
                                        <td>{detail.Partnumber}</td>
                                        <td>{detail.Machinename}</td>
                                        <td>{detail.Defectreason}</td>
                                        <td>{detail.Quantity}</td>
                                        <td>{detail.Remarks}</td>
                                      </tr>
                                    )
                                  )}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Coreui.CCardBody>
        </Coreui.CCard>
      </div>
    </div>
  );
};

export default RmReviewerTable;
