import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';

import AddDepartmentModal from '../components/departments/AddDepartmentModal';
import DeleteDepartmentModal from
  '../components/departments/DeleteDepartmentModal';
import EditDepartmentModal from '../components/departments/EditDepartmentModal';
import { Department } from '../types/Department';

export default (): JSX.Element => {
  const [getString] = useState(`${process.env.REACT_APP_API}department`);
  const [deps, setDeps] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] = useState({
    departmentID: 0,
    departmentName: '',
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

  useEffect(() => {
    fetch(getString)
      .then((response) => response.json())
      .then((data) => {
        setDeps(data.Value);
      });
  }, [getString]);

  return (
    <div className="department-page-container">
      <ButtonToolbar>
        <Button
          variant="primary"
          onClick={() => {
            setAddModalShow(true);
          }}
        >
          <FontAwesomeIcon icon="plus" />
        </Button>
      </ButtonToolbar>
      <Table className="mt-4" striped bordered hover size="small">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {deps.map((department: Department) => (
            <tr key={`${department.departmentID}`}>
              <td>{department.departmentID}</td>
              <td>{department.departmentName}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setDepartmentToEdit({
                      departmentID: department.departmentID,
                      departmentName: department.departmentName,
                    });
                    setEditModalShow(true);
                  }}
                >
                  <FontAwesomeIcon icon="pen-to-square" />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setDepartmentToEdit({
                      departmentID: department.departmentID,
                      departmentName: department.departmentName,
                    });
                    setDeleteModalShow(true);
                  }}
                >
                  <FontAwesomeIcon icon="trash-can" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddDepartmentModal show={addModalShow} onHide={addModalClose} />
      <EditDepartmentModal
        show={editModalShow}
        onHide={editModalClose}
        departmentToEdit={departmentToEdit}
      />
      <DeleteDepartmentModal
        show={deleteModalShow}
        onHide={deleteModalClose}
        departmentToEdit={departmentToEdit}
      />
    </div>
  );
};
