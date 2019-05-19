import React from "react";
import ReactTable from "react-table";
import FuzzySearch from "fuzzy-search";
import dateFormat from "dateformat";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Form,
  DatePicker
} from "shards-react";
import { Modal } from "react-bootstrap";
import PageTitle from "../components/common/PageTitle";
// import RangeDatePicker from "../components/common/RangeDatePicker";
// import getBidBoardData from "../data/transaction-history-data";

class BidBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 15,
      tableData: [],
      show: false,
      startDate: new Date(),
    };

    this.searcher = null;

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemAdd = this.handleItemAdd.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemConfirm = this.handleItemConfirm.bind(this);
    this.handleItemViewDetails = this.handleItemViewDetails.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onBidAdd = this.onBidAdd.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
  }

  componentWillMount() {
    const tableData = [{
    "id": 1,
    "job-number": "19-001",
    "job-name": "Shake Shack Passadena",
    "date": "12/1/2017",
    "assigned-to": "Berton Overthrow",
    "products": 104,
    "status": "Complete",
    "client": "Cannon Building"
   }]

    this.setState({
      ...this.state,
      tableData
    });

    // Initialize the fuzzy searcher.
    this.searcher = new FuzzySearch(tableData, ["customer", "status"], {
      caseSensitive: false
    });
  }

  /**
   * Returns the appropriate status class for the `Status` column.
   */
  getStatusClass(status) {
    const statusMap = {
      "Not Bidding": "danger",
      "Complete": "success",
      "Bidding": "warning",
    };

    return `text-${statusMap[status]}`;
  }

  /**
   * Handles the page size change event.
   */
  handlePageSizeChange(e) {
    this.setState({
      ...this.state,
      pageSize: e.target.value
    });
  }
  /**
   * Handles the global search.
   */
  handleFilterSearch(e) {
    this.setState({
      ...this.state,
      tableData: this.searcher.search(e.target.value)
    });
  }

  /**
   * Mock method for editing transactions.
   */

  handleClose() {
   this.setState({ show: false });
 }
 
 handleShow() {
   this.setState({ show: true });
 }

  handleItemAdd() {
   const item = {
    id: "2",
    "job-number": document.getElementById('jobNumber').value,
    "job-name": document.getElementById('jobName').value,
    "date": document.getElementById('date').value,
    "assigned-to": document.getElementById('assignedTo').value,
    "status": document.getElementById('status').value,
    "client": document.getElementById('client').value,
    };
    this.setState({
      tableData: [...this.state.tableData, item]
    });
  }

  onBidAdd() {
     this.handleClose();
     this.handleItemAdd();
  }
  /**
   * Mock method for deleting transactions.
   */
  handleItemDelete(row) {
   this.deleteRow(row.original.id);

 }
   deleteRow = (id) => {
      this.setState({
      tableData: [...this.state.tableData.filter(row => row.id !== id)]
      });
   }

  /**
   * Mock method for confirming transactions.
   */
  handleItemConfirm(row) {
    alert(`Confirming transaction "${row.original.status}"!`);
    
  }

  /**
   * Mock method for confirming transactions.
   */
  handleItemViewDetails(row) {
    alert(`Viewing details for "${row.original.id}"!`);
  }

  handleStartDateChange(value) {
   this.setState({
     ...this.state,
     ...{ startDate: new Date(value)}
   });
 }

  render() {
    const { tableData, pageSize, pageSizeOptions } = this.state;
    const tableColumns = [
      {
         Header: "Id",
         accessor: "id",
         maxWidth: 50,
         className: "text-center",
       },
     
      {
        Header: "Job Number",
        accessor: "job-number",
        maxWidth: 100,
        className: "text-left"
      },
      {
      Header: "Job Name",
      accessor: "job-name",
      minWidth: 150,
      className: "text-left"
      },
      {
        Header: "Client",
        accessor: "client",
        className: "text-left"
      },
      {
         Header: "Date",
         accessor: "date",
         className: "text-center",
         minWidth: 50,
         Cell: row =>
           dateFormat(new Date(row.original.date), "mm/dd/yy")
       },
      {
        Header: "Status",
        accessor: "status",
        maxWidth: 100,
        Cell: row => (
          <span className={this.getStatusClass(row.original.status)}>
            {row.original.status}
          </span>
        ),
        className: "text-center"
      },
      {
         Header: "Assigned To",
         accessor: "assigned-to",
         maxWidth: 200,
         className: "text-center"
       },
      // {
      //   Header: "Total",
      //   accessor: "total",
      //   maxWidth: 100,
      //   Cell: row => <span className="text-success">{row.original.total}</span>,
      //   className: "text-center"
      // },
      {
        Header: "Actions",
        accessor: "actions",
        maxWidth: 200,
        minWidth: 180,
        sortable: false,
        Cell: row => (
          <ButtonGroup size="sm" className="d-table mx-auto">
            <Button theme="white" onClick={() => this.handleItemConfirm(row)}>
              <i className="material-icons">check_circle</i>
            </Button>
            <Button theme="white" onClick={() => this.handleItemDelete(row)}>
              <i className="material-icons">timelapse</i>
            </Button>
            <Button
              theme="white"
              onClick={() => this.handleItemDelete(row)}
            >
              <i className="material-icons">cancel</i>
            </Button>
            <Button theme="white" onClick={() => this.handleItemAdd()}>
              <i className="material-icons">&#xE254;</i>
            </Button>
          </ButtonGroup>
        )
      }
    ];
   
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-2">
          <PageTitle title="" subtitle="" className="text-sm-left mb-3" />
          {/* <Col sm="4" className="d-flex ml-auto my-auto">
            <RangeDatePicker id="bidDate" className="justify-content-end" />
          </Col> */}
        </Row>
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">
              <Row>
                {/* Filters :: Page Size */}
                <Col className="file-manager__filters__rows d-flex" md="6">
                  <span>Show</span>
                  <FormSelect
                    size="sm"
                    value={this.state.pageSize}
                    onChange={this.handlePageSizeChange}
                  >
                    {pageSizeOptions.map((size, idx) => (
                      <option key={idx} value={size}>
                        {size} rows
                      </option>
                    ))}
                  </FormSelect>
                </Col>

                {/* Filters :: Search */}
                <Col className="file-manager__filters__search d-flex" md="6">
                <Button className="ml-auto" variant="primary" onClick={this.handleShow}>
                    Add New Bid
                </Button>
                  {/* <InputGroup seamless size="sm" className="ml-auto">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>
                        <i className="material-icons">search</i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput onChange={this.handleFilterSearch} />
                  </InputGroup> */}
                </Col>
              </Row>
            </Container>
          </CardHeader>
          <CardBody className="p-0">
            <div className="">
              <ReactTable
                columns={tableColumns}
                data={tableData}
                pageSize={pageSize}
                showPageSizeOptions={false}
                resizable={false}
              />
            </div>
          </CardBody>
        </Card>

        {/* Add Bid Modal */}
        <Modal 
        show={this.state.show} 
        onHide={this.handleClose}
         {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
         >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Add New Bid</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                                 <InputGroup className="d-flex my-auto date-range">
                                    <DatePicker
                                       id="date"
                                       size="md"
                                       selected={this.state.startDate}
                                       onChange={this.handleStartDateChange}
                                       placeholderText="Select Due Date"
                                       dropdownMode="select"
                                       className="text-center btn btn-white"
                                    />
                                    <InputGroupAddon type="append">
                                       <InputGroupText>
                                          <i className="material-icons">&#xE916;</i>
                                       </InputGroupText>
                                    </InputGroupAddon>
                                 </InputGroup>
                              </Col>

                              {/* Status */}
                              <Col md="6" className="form-group">
                                 <label htmlFor="status">Status</label>
                                 <InputGroup seamless>
                                 {/* <FormInput
                                    id="status"
                                    onChange={() => {}}
                                 /> */}
                                 <FormSelect id="status">
                                    <option>Complete</option>
                                    <option>Bidding</option>
                                    <option>Not Bidding</option>
                            </FormSelect>
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
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" 
            onClick={this.onBidAdd}
            >
              Add Bid
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    );
  }
}

export default BidBoard;

