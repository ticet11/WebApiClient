/* eslint-disable no-alert */
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  Modal, Button, Row, Form,
} from 'react-bootstrap';
import { Department } from '../../types/Department';

interface EditDepartmentModalProps {
  show: boolean;
  onHide: () => void;
  departmentToEdit: Department;
}
export default (props: EditDepartmentModalProps): JSX.Element => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const [putString] = useState(`${process.env.REACT_APP_API}department`);
  const { show, onHide, departmentToEdit } = props;

  const onSubmit = handleSubmit((formData) => {
    fetch(putString, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: departmentToEdit.departmentID,
        DepartmentName: formData.departmentName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => alert(JSON.stringify(result.Value, null, 4)),
        (error) => alert(error),
      )
      .then(onHide);
  });

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
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Row>
              <Form.Group controlId="departmentID">
                <Form.Label>Department Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="departmentID"
                  disabled
                  value={departmentToEdit.departmentID}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="departmentName">
                <Form.Label>Department Name:</Form.Label>
                <Form.Control
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('departmentName', { required: true })}
                  type="text"
                  name="departmentName"
                  defaultValue={departmentToEdit.departmentName}
                />
                {errors.departmentName
                && (
                  <div className="error">
                    Please provide a department name.
                  </div>
                )}
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
