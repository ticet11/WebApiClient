/* eslint-disable no-alert */
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  Modal, Button, Row, Form,
} from 'react-bootstrap';
import { Employee } from '../../types/Employee';

interface EditEmployeeModalProps {
  show: boolean;
  onHide: () => void;
  employeeToEdit: Employee;
}
export default (props: EditEmployeeModalProps): JSX.Element => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const [putString] = useState(`${process.env.REACT_APP_API}employee`);
  const [addPhotoString] = useState(`${putString}/AddEmployeePhoto`);
  const { show, onHide, employeeToEdit } = props;

  const onSubmit = handleSubmit((formData) => {
    let newFileName = employeeToEdit.employeePhotoFile;
    if (formData.employeePhotoFile.length > 0) {
      const formattedDate = formData.employeeJoinDate.replace(/[^0-9]/g, '');
      const formattedName = formData.employeeName.replace(/\s+/g, '');
      const fileExt = formData.employeePhotoFile[0].name
        .substr(formData.employeePhotoFile[0].name.lastIndexOf('.'));
      newFileName = `${formattedDate}_${formattedName}${fileExt}`;
    }
    fetch(putString, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: employeeToEdit.employeeID,
        Name: formData.employeeName,
        Department: formData.employeeDepartment,
        JoinDate: new Date(formData.employeeJoinDate)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
        PhotoFile: newFileName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => alert(JSON.stringify(result.Value, null, 4)),
        (error) => alert(error),
      )
      .then(() => {
        if (newFileName !== 'default.png'
          && formData.employeePhotoFile.length > 0) {
          const data = new FormData();
          data.append(
            formData.employeePhotoFile[0].name,
            formData.employeePhotoFile[0],
            newFileName,
          );
          fetch(addPhotoString, {
            method: 'POST',
            body: data,
          })
            .then((res) => res.json())
            .then((result) => alert(JSON.stringify(result.Value, null, 4)));
        }
      })
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
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Row>
              <Form.Group controlId="employeeID">
                <Form.Label>ID:</Form.Label>
                <Form.Control
                  type="text"
                  name="employeeID"
                  disabled
                  value={employeeToEdit.employeeID}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="employeeName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('employeeName')}
                  type="text"
                  name="employeeName"
                  required
                  defaultValue={employeeToEdit.employeeName}
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
                  defaultValue={employeeToEdit.employeeDepartment}
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
                  name="employeeJoinDate"
                  required
                  defaultValue={
                    new Date(employeeToEdit.employeeJoinDate)
                      .toISOString()
                      .substr(0, 10)
                  }
                />
                {
                  errors.employeePhotoFile
                  && <div className="error">Choose a photo file, please!</div>
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
