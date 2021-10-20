import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";

import AddDepartmentModal from "../components/department/AddDepartmentModal";
import EditDepartmentModal from "../components/department/EditDepartmentModal";
import { dep } from "../types/dep";

interface DepartmentState {
	getString: string;
	deps: dep[];
	addModalShow: boolean;
	editModalShow: boolean;
	departmentToEdit: dep;
}
export default class Department extends Component<
	{},
	{ deps: dep[], addModalShow: boolean, editModalShow: boolean, departmentToEdit: dep }
> {
	handleSubmit: any;
	state: DepartmentState;
	constructor(props) {
		super(props);
		this.state = {
			getString: [process.env.REACT_APP_API, "department"].join(""),
			deps: [],
			addModalShow: false,
			editModalShow: false,
			departmentToEdit: { departmentID: 0, departmentName: "" },
		};
	}

	componentDidMount = () => {
		this.refreshList();
	};

	componentDidUpdate = () => {};

	refreshList = () => {
		fetch(this.state.getString)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ deps: data.Value });
			});
	};

	render() {
		const { deps } = this.state;
		const addModalClose = () => {
			this.setState({
				addModalShow: false,
			});
		};
		const editModalClose = () => {
			this.setState({
				editModalShow: false,
			});
		};

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
						{deps.map((dep) => (
							<tr key={`${dep.departmentID}`}>
								<td>{dep.departmentID}</td>
								<td>{dep.departmentName}</td>
								<td>
									<Button
										variant="primary"
										onClick={() => {
											this.setState({
												departmentToEdit: {
													departmentID: dep.departmentID,
													departmentName: dep.departmentName,
												},
												editModalShow: true,
											});
										}}
									>
										Edit
									</Button>{" "}
									Delete
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<ButtonToolbar>
					<Button
						variant="primary"
						onClick={() =>
							this.setState({
								addModalShow: true,
							})
						}
					>
						Add
					</Button>

					<AddDepartmentModal
						show={this.state.addModalShow}
						onHide={addModalClose}
					></AddDepartmentModal>
					<EditDepartmentModal
						show={this.state.editModalShow}
						onHide={editModalClose}
						departmentToEdit={this.state.departmentToEdit}
					></EditDepartmentModal>
				</ButtonToolbar>
			</div>
		);
	}
}
