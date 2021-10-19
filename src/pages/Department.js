import React, { Component } from "react";
import { Table } from "react-bootstrap";

interface dep {
	departmentID: number;
	departmentName: string;
}
export default class Department extends Component<{}, { deps: dep[] }> {
	constructor(props) {
		super(props);
		this.state = { deps: [] };
	}

	componentDidMount() {
		this.refreshList();
	}

	componentDidUpdate() {}

	refreshList() {
		fetch(process.env.REACT_APP_API + "department")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ deps: data.Value });
				console.log(this.state.deps);
			});
	}

	render() {
		const { deps } = this.state;
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
			</div>
		);
	}
}
