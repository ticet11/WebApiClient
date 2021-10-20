import React, { Component } from "react";
import { Modal, Button, Row, Form } from "react-bootstrap";
import { dep } from "../../types/dep";

interface EditDepartmentModalProps {
	show: any;
	onHide: any;
	departmentToEdit: dep;
}
export default class EditDepartmentModal extends Component {
	props: EditDepartmentModalProps;

	handleSubmit = (event) => {
		event.preventDefault();
		fetch(process.env.REACT_APP_API + "department", {
			method: "PUT",
			headers: { Accept: "application/json", "Content-Type": "application/json" },
			body: JSON.stringify({
				ID: event.target.DepartmentID.value,
				DepartmentName: event.target.DepartmentName.value,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => alert(JSON.stringify(result.Value, null, 4)),
				(error) => alert(error)
			)
			.then(this.props.onHide);
	};

	render() {
		return (
			<div className="container">
				<Modal
					{...this.props}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton={true}>
						<Modal.Title id="contained-modal-title-vcenter">Add Department</Modal.Title>
					</Modal.Header>
					<Form onSubmit={this.handleSubmit}>
						<Modal.Body>
							<Row>
								<Form.Group controlId="DepartmentID">
									<Form.Label>Department Name:</Form.Label>
									<Form.Control
										type="text"
										name="DepartmentID"
										required
										disabled
										value={this.props.departmentToEdit.departmentID}
									/>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group controlId="DepartmentName">
									<Form.Label>Department Name:</Form.Label>
									<Form.Control
										type="text"
										name="DepartmentName"
										required
										defaultValue={this.props.departmentToEdit.departmentName}
									/>
								</Form.Group>
							</Row>
						</Modal.Body>
						<Modal.Footer>
							<Form.Group>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Form.Group>
							<Button variant="danger" onClick={this.props.onHide}>
								Cancel
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</div>
		);
	}
}
