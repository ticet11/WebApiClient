import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

interface AddDepartmentModalProps {
	show: any;
	onHide: any;
}
export default class AddDepartmentModal extends Component {
	props: AddDepartmentModalProps;

	handleSubmit = (event) => {
		event.preventDefault();
		fetch(process.env.REACT_APP_API + "department", {
			method: "POST",
			headers: { Accept: "application/json", "Content-Type": "application/json" },
			body: JSON.stringify({
				departmentID: null,
				departmentName: event.target.DepartmentName.value,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => alert(JSON.stringify(result.Value, null, "\t")),
				(error) => alert(error)
			);
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
					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="DepartmentName">
										<Form.Label>Department Name</Form.Label>
										<Form.Control type="text" name="DepartmentName" required />
									</Form.Group>
									<Form.Group>
										<Button variant="primary" type="submit">
											Submit
										</Button>
									</Form.Group>
								</Form>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={this.props.onHide}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}