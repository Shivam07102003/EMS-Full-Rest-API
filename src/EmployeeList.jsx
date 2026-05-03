import React from 'react';
import EmployeeFilter from './EmployeeFilter.jsx';
import { Badge, Card, Button, Table, Modal } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import EmployeeAdd from './EmployeeAdd.jsx';

function EmployeeRow(props) {
  const employee = props.employee;

  return (
    <tr>
      <td><Link to={`/edit/${employee._id}`}>{employee.name}</Link></td>
      <td>{employee.extension}</td>
      <td>{employee.email}</td>
      <td>{employee.title}</td>
      <td>{new Date(employee.dateHired).toDateString()}</td>
      <td>{employee.currentlyEmployed ? 'Yes' : 'No'}</td>
      <td>
        <Button
          variant="danger"
          size="sm"
          onClick={() => props.showDeleteModal(employee._id)}
        >
          X
        </Button>
      </td>
    </tr>
  );
}

function EmployeeTable(props) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const q = query.get('employed');

  const employeeRows = props.employees
    .filter(employee => (q ? String(employee.currentlyEmployed) === q : true))
    .map(employee => (
      <EmployeeRow
        key={employee._id}
        employee={employee}
        showDeleteModal={props.showDeleteModal}
      />
    ));

  return (
    <Card>
      <Card.Header as="h5">
        All Employees <Badge bg="secondary">{props.employees.length}</Badge>
      </Card.Header>

      <Card.Body>
        <EmployeeFilter />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Extension</th>
              <th>Email</th>
              <th>Title</th>
              <th>Date Hired</th>
              <th>Currently Employed?</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{employeeRows}</tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default class EmployeeList extends React.Component {
  constructor() {
    super();

    this.state = {
      employees: [],
      showDeleteModal: false,
      employeeToDelete: null,
    };

    this.createEmployee = this.createEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/employees')
      .then(response => response.json())
      .then(data => {
        this.setState({ employees: data });
      })
      .catch(err => {
        console.error('Error loading employees:', err);
      });
  }

  createEmployee(employee) {
    fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    })
      .then(response => response.json())
      .then(newEmployee => {
        this.setState(prevState => ({
          employees: [...prevState.employees, newEmployee],
        }));
      })
      .catch(err => {
        console.error('Error creating employee:', err);
      });
  }

  showDeleteModal(id) {
    this.setState({
      showDeleteModal: true,
      employeeToDelete: id,
    });
  }

  hideDeleteModal() {
    this.setState({
      showDeleteModal: false,
      employeeToDelete: null,
    });
  }

  confirmDelete() {
    this.deleteEmployee(this.state.employeeToDelete);
    this.hideDeleteModal();
  }

  deleteEmployee(id) {
    fetch(`/api/employees/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        this.setState(prevState => ({
          employees: prevState.employees.filter(
            employee => employee._id !== id
          ),
        }));
      })
      .catch(err => {
        console.error('Error deleting employee:', err);
      });
  }

  render() {
    return (
      <>
        <EmployeeAdd createEmployee={this.createEmployee} />

        <EmployeeTable
          employees={this.state.employees}
          showDeleteModal={this.showDeleteModal}
        />

        <Modal
          show={this.state.showDeleteModal}
          onHide={this.hideDeleteModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Employee?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Are you sure you want to delete this employee?
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.hideDeleteModal}>
              Cancel
            </Button>
            <Button variant="success" onClick={this.confirmDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
