import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import EmployeeService from '../services/EmployeeService'
import { deleteEmployee } from '../util/APIUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-s-alert';

class ListEmployeeComponent3 extends Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            // id: this.props.match.params.id,
            id: '',
            firstName: '',
            lastName: '',
            emailId: '',
            employees: [],
        }
        this.deleteEm = this.deleteEm.bind(this)
        this.loadEmployees = this.loadEmployees.bind(this)
    }

    componentDidMount() {
        this.loadEmployees()
    }

    loadEmployees() {
        EmployeeService.getEmployees()
            .then(response => {
                this.setState({
                    employees: response,
                    authenticated: true,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    deleteEm(id){

        // const employee = Object.assign({}, this.state);

        deleteEmployee(id)
        .then(response => {
            Alert.success("Xóa nhân viên thành công!");
            this.loadEmployees()
        }).catch(error => {
            Alert.error((error && error.message) || 'Xóa nhân viên thất bại');
        });
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/update-employee/${id}`);
    }
    // onSubmit={this.handleSubmit}
    render() {
        return (
            <div>
                 <h2 className="text-center">Danh sách nhân viên</h2>
                 <div className = "row">
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr style={{textAlign:'center'}}>
                                    <th> ID</th>
                                    <th> Tên</th>
                                    <th> Họ</th>
                                    <th> Email</th>
                                    <th> Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr style={{textAlign:'center'}} key = {employee.id}>
                                        <td> {employee.id} </td>
                                        <td> {employee.firstName} </td>
                                        <td> {employee.lastName}</td>
                                        <td> {employee.emailId}</td>
                                        <td>
                                            <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Sửa </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEm(employee.id)} className="btn btn-danger">Xóa </button>
                                            {/* <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button> */}
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent3
