import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  DatePicker
} from "shards-react";

import classNames from "classnames";

class AddNewBid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: undefined,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }

  handleStartDateChange(value) {
   this.setState({
     ...this.state,
     ...{ startDate: new Date(value) }
   });
 }

  render() {
   const { className } = this.props;
   const classes = classNames(className, "d-flex", "my-auto", "date-range");
    return (
      <div>
        <Container fluid>
          <Row>
            <Col lg="12" className="mx-auto">
               <Form className="py-4" onSubmit={this.handleFormSubmit}>
                  <Row form className="mx-4">
                     <Col lg="12">
                     <Row form>
                        {/* Job Number */}
                        <Col md="6" className="form-group">
                           <label htmlFor="status">Job Number</label>
                           <InputGroup seamless>
                           <InputGroupAddon type="prepend">
                           </InputGroupAddon>
                           <FormInput
                              id="jobNumber"
                              onChange={() => {}}
                           />
                           </InputGroup>
                        </Col>

                        {/* Job Name */}
                        <Col md="6" className="form-group">
                           <label htmlFor="status">Job Name</label>
                           <InputGroup seamless>
                           <InputGroupAddon type="prepend">
                           </InputGroupAddon>
                           <FormInput
                              id="jobName"
                              onChange={() => {}}
                           />
                           </InputGroup>
                        </Col>

                        {/* Client */}
                        <Col md="6" className="form-group">
                           <label htmlFor="status">Client</label>
                           <InputGroup seamless>
                           <InputGroupAddon type="prepend">
                           </InputGroupAddon>
                           <FormInput
                              id="client"
                              onChange={() => {}}
                           />
                           </InputGroup>
                        </Col>

                        {/* Date */}
                        <Col md="6" className="form-group">
                           <label htmlFor="dueDate">Due Date</label>
                           <InputGroup className= {classes} seamless>
                           <DatePicker size="md"
                              selected={this.state.startDate}
                              onChange={this.handleStartDateChange}
                              placeholderText="Due Date"
                              dropdownMode="select"
                              className="text-center" />
                           <InputGroupAddon type="prepend">
                              <InputGroupText>
                              <i className="material-icons">&#xE916;</i>
                              </InputGroupText>
                           </InputGroupAddon>
                           <FormInput
                              id="dueDate"
                              value={this.state.startDate}
                              onChange={() => {}}
                           />
                           </InputGroup>
                        </Col>

                        {/* Status */}
                        <Col md="6" className="form-group">
                           <label htmlFor="status">Status</label>
                           <InputGroup seamless>
                           <InputGroupAddon type="prepend">
                           </InputGroupAddon>
                           <FormInput
                              id="status"
                              onChange={() => {}}
                           />
                           </InputGroup>
                        </Col>
                        {/* Assigned To */}
                        <Col md="6" className="form-group">
                        <label htmlFor="assignedTo">Assigned To</label>
                           <InputGroup seamless>
                           <InputGroupAddon type="prepend">
                           </InputGroupAddon>
                           <FormInput
                              id="assignedTo"
                              onChange={() => {}}
                           />
                           </InputGroup>
                        </Col>
                     </Row>
                     </Col>
                  </Row>
               </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AddNewBid;
