import React from 'react';
import { useParams } from 'react-router-dom';
import {Badge,Card,Button,Table,Container, Row,Col,Alert} from 'react-bootstrap';
 
function EmployeeEditWrapper() {
  const { id } = useParams();
  return <EmployeeEdit id={id} />;
}

class EmployeeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      employee: {},
      alertVisible: false,
      alertMessage: '',
      alertVariant: 'success',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const response = await fetch(`/api/employees/${this.props.id}`);
    const employee = await response.json();
    this.setState({ employee });
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = document.forms.employeeUpdate;

    const id = form.id.value;
    const name = form.name.value;
    const extension = form.extension.value;
    const email = form.email.value;
    const title = form.title.value;
    const currentlyEmployed = form.currentlyEmployed.checked;

    fetch(`/api/employees/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        extension,
        email,
        title,
        currentlyEmployed,
      }),
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          alertVisible: true,
          alertMessage: data.msg,
          alertColor: data.success ? 'success' : 'danger',
        });
      });
  }

  render() {
    const employee = this.state.employee;

    return (
        <Card>
            <Card.Header as="h5">{employee.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                  <Container fluid>
                    <form name="employeeUpdate" onSubmit={this.handleSubmit}>
                      <Row>
                        <Col md={3}>ID:</Col>
                        <Col md="auto"><input type="text" name="id" readOnly value={employee._id || ''} /></Col>
                      </Row>
                      <Row>
                        <Col md={3}>Name:</Col>
                        <Col md="auto"><input type="text" name="name" defaultValue={employee.name || ''} /></Col>
                      </Row>
                      <Row>
                        <Col md={3}>Extension:</Col>
                        <Col md="auto"><input type="text" name="extension" defaultValue={employee.extension || ''} /></Col>
                      </Row>
                      <Row>
                        <Col md={3}>Email:</Col>
                        <Col md="auto"><input type="text" name="email" defaultValue={employee.email || ''} /></Col>
                      </Row>
                      <Row>
                        <Col md={3}>Title:</Col>
                        <Col md="auto"><input type="text" name="title" defaultValue={employee.title || ''} /></Col>
                      </Row>
                      <Row>
                        <Col md={3}>Date Hired:</Col>
                        <Col md="auto"><input type="date" name="dateHired" defaultValue={employee.dateHired || ''} /></Col>
                      </Row>
                      <Row>
                        <Col md={3}>Currently Employed?:</Col>
                        <Col md="auto"><input type="checkbox" name="currentlyEmployed" defaultChecked={employee.currentlyEmployed} /></Col>
                      </Row>

                      <Button variant="primary" size="sm" type="submit" className='mt-3'>
                      Update
                      </Button>

                      <Alert id="message" variant={this.state.alertVariant} show={this.state.alertVisible} onClose={() => this.setState({ alertVisible: false })} dismissible>
                        {this.state.alertMessage}
                      </Alert>
                    </form>
                  </Container>
                </Card.Text>
            </Card.Body>
        </Card>
    );
  }
}

export default EmployeeEditWrapper;