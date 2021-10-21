import React, { useState } from 'react';
import {
  Modal, Button, Row, Form,
} from 'react-bootstrap';

interface AddDepartmentModalProps {
  show: boolean;
  onHide: () => void;
}
export default (props: AddDepartmentModalProps): JSX.Element => {
  const [addString] = useState(`${process.env.REACT_APP_API}department`);
  const { show, onHide } = props;

  const handleSubmit = (event): void => {
    event.preventDefault();
    fetch(addString, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        departmentID: null,
        departmentName: event.target.DepartmentName.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => alert(JSON.stringify(result.Value, null, 4)),
        (error) => alert(error),
      )
      .then(onHide);
  };

  return (
    <div className="container">
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Department
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Form.Group controlId="DepartmentName">
                <Form.Label>Department Name:</Form.Label>
                <Form.Control type="text" name="DepartmentName" required />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
            <Button variant="danger" onClick={onHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
