import { IoIosReturnLeft } from "react-icons/io";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Returnbtn = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function handleModal() {
    setShow(true);
  }
  return (
    <div className="d-inline me-2">
      <button className=" btn return-btn" onClick={handleModal}>
        Return <IoIosReturnLeft />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Return Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Add you comment here..."
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Return
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Returnbtn;
