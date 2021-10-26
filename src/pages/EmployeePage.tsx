import React, { useEffect, useState } from 'react';
import {
  Table, Button, ButtonToolbar, Image,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AddEmployeeModal from '../components/employees/AddEmployeeModal';
import DeleteEmployeeModal from
  '../components/employees/DeleteEmployeeModal';
import EditEmployeeModal from '../components/employees/EditEmployeeModal';
import { Employee } from '../types/Employee';

export default (): JSX.Element => {
  const [getEmployeesString] = useState(`${process.env.REACT_APP_API}employee`);
  const [getDepartmentsString] = useState(
    `${process.env.REACT_APP_API}department`,
  );
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
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
    const defImgPath = `${process.env.REACT_APP_API_PHOTO}default.png`;
    return (
      <Image
        height="200px"
        src={imgPath}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = defImgPath;
        }}
      />
    );
  };

  useEffect(() => {
    fetch(getEmployeesString)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.Value);
      });

    fetch(getDepartmentsString)
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data.Value);
      });
  }, [getEmployeesString, getDepartmentsString]);

  return (
    <div className="employee-page-container">
      <ButtonToolbar>
        <Button
          variant="primary"
          title="Add Employee"
          onClick={() => {
            setAddModalShow(true);
          }}
        >
          <FontAwesomeIcon icon="user-plus" />
        </Button>
      </ButtonToolbar>
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
          {employees.map((employee: Employee) => (
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
                  title="Edit Employee"
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
                  <FontAwesomeIcon icon="user-pen" />
                </Button>
                <Button
                  variant="danger"
                  title="Delete Employee"
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
                  <FontAwesomeIcon icon="user-xmark" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddEmployeeModal
        show={addModalShow}
        onHide={addModalClose}
        departments={departments}
      />
      <EditEmployeeModal
        show={editModalShow}
        onHide={editModalClose}
        employeeToEdit={employeeToEdit}
        departments={departments}
      />
      <DeleteEmployeeModal
        show={deleteModalShow}
        onHide={deleteModalClose}
        employeeToEdit={employeeToEdit}
      />
    </div>
  );
};
