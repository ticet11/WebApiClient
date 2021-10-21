import React, { useState } from 'react';
import {
  Modal, Button, Row, Form,
} from 'react-bootstrap';
import { Department } from '../../types/Department';

interface DeleteDepartmentModalProps {
  show: boolean;
  onHide: () => void;
  departmentToEdit: Department;
}
export default (props: DeleteDepartmentModalProps): JSX.Element => {
  const [deleteString] = useState(`${process.env.REACT_APP_API}department`);
  const { show, onHide, departmentToEdit } = props;

  const handleSubmit = (event): void => {
    event.preventDefault();
    fetch(deleteString, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: event.target.DepartmentID.value,
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
            Delete Department
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Form.Group controlId="DepartmentID">
                <Form.Label>Department Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="DepartmentID"
                  required
                  disabled
                  value={departmentToEdit.departmentID}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="DepartmentName">
                <Form.Label>Department Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="DepartmentName"
                  required
                  disabled
                  defaultValue={departmentToEdit.departmentName}
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
