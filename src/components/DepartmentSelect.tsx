import React from 'react';
import { Form } from 'react-bootstrap';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import { Department } from '../types/Department';

interface DepartmentSelectProps {
    name: string;
    departments: Department[];
    register: UseFormRegister<FieldValues>;
    defaultValue?: string;
}
const DepartmentSelect = (props: DepartmentSelectProps):JSX.Element => {
  const {
    name, departments, register, defaultValue,
  } = props;
  return (
    <Form.Select
    // eslint-disable-next-line react/jsx-props-no-spreading
      {...register(name)}
      name="employeeDepartment"
      required
      defaultValue={defaultValue}
    >
      <option>-- Select a Department --</option>
      {
        departments.map(
          (department) => (
            <option
              key={department.departmentID}
            >
              {department.departmentName}
            </option>
          ),
        )
                }
    </Form.Select>

  );
};

DepartmentSelect.defaultProps = {
  defaultValue: '',
};

export default DepartmentSelect;
