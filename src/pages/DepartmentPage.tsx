import React, { useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';

import AddDepartmentModal from '../components/departments/AddDepartmentModal';
import DeleteDepartmentModal from
  '../components/departments/DeleteDepartmentModal';
import EditDepartmentModal from '../components/departments/EditDepartmentModal';

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

  const refreshList = (): void => {
    fetch(getString)
      .then((response) => response.json())
      .then((data) => {
        setDeps(data.Value);
      });
  };

  const addModalClose = (): void => {
    setAddModalShow(false);
  };

  const editModalClose = (): void => {
    setEditModalShow(false);
  };

  const deleteModalClose = (): void => {
    setDeleteModalShow(false);
  };

  refreshList();

  return (
    <div className="">
      <Table className="mt-4" striped bordered hover size="small">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {deps.map((department) => (
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
                  Edit
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
      </ButtonToolbar>
    </div>
  );
};
