import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";

import AddDepartmentModal from "../components/department/AddDepartmentModal";

interface dep {
	departmentID: number;
	departmentName: string;
}
interface DepartmentState {
	getString: string;
	deps: dep[];
	addModalShow: boolean;
}
export default class Department extends Component<{}, { deps: dep[], addModalShow: boolean }> {
	handleSubmit: any;
	state: DepartmentState;
	constructor(props) {
		super(props);
		this.state = {
			getString: [process.env.REACT_APP_API, "department"].join(""),
			deps: [],
			addModalShow: false,
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
								<td>Edit / Delete</td>
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
				</ButtonToolbar>
			</div>
		);
	}
}
