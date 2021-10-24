import React, { useEffect, useState } from 'react';
import {
  Table, Button, ButtonToolbar, Image,
} from 'react-bootstrap';

import AddEmployeeModal from '../components/employees/AddEmployeeModal';
import DeleteEmployeeModal from
  '../components/employees/DeleteEmployeeModal';
import EditEmployeeModal from '../components/employees/EditEmployeeModal';
import { Employee } from '../types/Employee';

export default (): JSX.Element => {
  const [getString] = useState(`${process.env.REACT_APP_API}employee`);
  const [deps, setDeps] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState({
    employeeID: 0,
    employeeDepartment: '',
    employeeName: '',
    employeeJoinDate: new Date(),
    employeePhotoFile: '',
  });

  const addModalClose = (): void => {
    setAddModalShow(false);
  };

  const editModalClose = (): void => {
    setEditModalShow(false);
  };

  const deleteModalClose = (): void => {
    setDeleteModalShow(false);
  };

  const createImageTag = (fileName: string): JSX.Element => {
    const imgPath = `${process.env.REACT_APP_API_PHOTO}${fileName}`;
    return <Image height="200px" src={imgPath} />;
  };

  useEffect(() => {
    fetch(getString)
      .then((response) => response.json())
      .then((data) => {
        setDeps(data.Value);
      });
  }, [getString]);

  return (
    <div className="">
      <Table className="mt-4" striped bordered hover size="small">
        <thead>
          <tr>
            <th>Photo</th>
            <th>ID</th>
            <th>Department</th>
            <th>Name</th>
            <th>Join Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {deps.map((employee: Employee) => (
            <tr key={`${employee.employeeID}`}>
              <td>{createImageTag(employee.employeePhotoFile)}</td>
              <td>{employee.employeeID}</td>
              <td>{employee.employeeDepartment}</td>
              <td>{employee.employeeName}</td>
              <td>
                {
              new Date(employee.employeeJoinDate).toISOString().substr(0, 10)
              }
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setEmployeeToEdit({
                      employeeID: employee.employeeID,
                      employeeDepartment: employee.employeeDepartment,
                      employeeName: employee.employeeName,
                      employeeJoinDate: employee.employeeJoinDate,
                      employeePhotoFile: employee.employeePhotoFile,
                    });
                    setEditModalShow(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setEmployeeToEdit({
                      employeeID: employee.employeeID,
                      employeeDepartment: employee.employeeDepartment,
                      employeeName: employee.employeeName,
                      employeeJoinDate: employee.employeeJoinDate,
                      employeePhotoFile: employee.employeePhotoFile,
                    });
                    setDeleteModalShow(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonToolbar>
        <Button
          variant="primary"
          onClick={() => {
            setAddModalShow(true);
          }}
        >
          Add
        </Button>

        <AddEmployeeModal show={addModalShow} onHide={addModalClose} />
        <EditEmployeeModal
          show={editModalShow}
          onHide={editModalClose}
          employeeToEdit={employeeToEdit}
        />
        <DeleteEmployeeModal
          show={deleteModalShow}
          onHide={deleteModalClose}
          employeeToEdit={employeeToEdit}
        />
      </ButtonToolbar>
    </div>
  );
};
