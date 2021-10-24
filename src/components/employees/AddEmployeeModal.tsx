/* eslint-disable no-alert */
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  Modal, Button, Row, Form,
} from 'react-bootstrap';

interface AddEmployeeModalProps {
  show: boolean;
  onHide: () => void;
}
export default (props: AddEmployeeModalProps): JSX.Element => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FieldValues>();
  const [addEmpString] = useState(`${process.env.REACT_APP_API}employee`);
  const [addPhotoString] = useState(`${addEmpString}/AddEmployeePhoto`);
  const [currentDate] = useState(new Date().toISOString().substr(0, 10));
  const { show, onHide } = props;

  const onSubmit = handleSubmit((formData) => {
    if (
      formData.employeeName != null
      && formData.employeeDepartment != null
    ) {
      const formattedDate = formData.employeeJoinDate.replace(/[^0-9]/g, '');
      const formattedName = formData.employeeName.replace(/\s+/g, '');
      const fileExt = formData.employeePhotoFile[0].name
        .substr(formData.employeePhotoFile[0].name.lastIndexOf('.'));
      fetch(addEmpString, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: formData.employeeName,
          Department: formData.employeeDepartment,
          JoinDate: new Date(formData.employeeJoinDate)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
          PhotoFile: `${formattedDate}_${formattedName}${fileExt}`,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => alert(JSON.stringify(result.Value, null, 4)),
          (error) => alert(error),
        )
        .then(() => {
          const data = new FormData();
          data.append(
            formData.employeePhotoFile[0].name,
            formData.employeePhotoFile[0],
            `${formattedDate}_${formattedName}${fileExt}`,
          );
          fetch(addPhotoString, {
            method: 'POST',
            body: data,
          })
            .then((res) => res.json())
            .then((result) => alert(JSON.stringify(result.Value, null, 4)));
        })
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
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Row>
              <Form.Group controlId="employeeName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('employeeName')}
                  type="text"
                  name="employeeName"
                  required
                />
                {
                  errors.employeeName
                  && <div className="error">Choose a name, please!</div>
                }
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="employeeDepartment">
                <Form.Label>Department:</Form.Label>
                <Form.Control
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('employeeDepartment')}
                  type="text"
                  name="employeeDepartment"
                  required
                />
                {
                  errors.employeeDepartment
                  && <div className="error">Choose a department, please!</div>
                }
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="employeePhotoFile" className="mb-3">
                <Form.Label>Employee Photo:</Form.Label>
                <Form.Control
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('employeePhotoFile')}
                  type="file"
                  name="employeePhotoFile"
                  accept="image/jpeg, image/png"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="employeeJoinDate">
                <Form.Label>Join Date:</Form.Label>
                <Form.Control
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('employeeJoinDate')}
                  type="date"
                  defaultValue={currentDate}
                  name="employeeJoinDate"
                  required
                />
                {
                  errors.employeeJoinDate
                  && <div className="error">Choose a join date, please!</div>
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
