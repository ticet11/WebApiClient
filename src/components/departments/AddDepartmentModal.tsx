/* eslint-disable no-alert */
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  Modal, Button, Row, Form,
} from 'react-bootstrap';

interface AddDepartmentModalProps {
  show: boolean;
  onHide: () => void;
}
export default (props: AddDepartmentModalProps): JSX.Element => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FieldValues>();
  const [addString] = useState(`${process.env.REACT_APP_API}department`);
  const { show, onHide } = props;

  const onSubmit = handleSubmit((formData) => {
    if (formData.departmentName != null) {
      fetch(addString, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          DepartmentName: formData.departmentName,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => alert(JSON.stringify(result.Value, null, 4)),
          (error) => alert(error),
        )
        .then(onHide);
    }
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
            Add Department
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Row>
              <Form.Group controlId="departmentName">
                <Form.Label>Department Name:</Form.Label>
                <Form.Control
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('departmentName')}
                  type="text"
                  name="departmentName"
                  required
                />
                {
                  errors.departmentName
                  && <div className="error">Choose a name, please!</div>
                }
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
