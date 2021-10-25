/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  Modal, Button, Row, Form,
} from 'react-bootstrap';
import { Employee } from '../../types/Employee';

interface DeleteEmployeeModalProps {
  show: boolean;
  onHide: () => void;
  employeeToEdit: Employee;
}
export default (props: DeleteEmployeeModalProps): JSX.Element => {
  const [deleteString] = useState(`${process.env.REACT_APP_API}employee`);
  const { show, onHide, employeeToEdit } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any): void => {
    event.preventDefault();
    fetch(deleteString, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: event.target.EmployeeID.value,
        Name: event.target.EmployeeName.value,
        PhotoFile: employeeToEdit.employeePhotoFile,
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
            Delete Employee
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Form.Group controlId="EmployeeID">
                <Form.Label>Employee Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="EmployeeID"
                  required
                  disabled
                  value={employeeToEdit.employeeID}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="EmployeeName">
                <Form.Label>Employee Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="EmployeeName"
                  required
                  disabled
                  defaultValue={employeeToEdit.employeeName}
                />
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
