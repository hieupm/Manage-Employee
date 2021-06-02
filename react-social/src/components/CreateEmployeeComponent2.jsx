import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import { createEmployee } from '../util/APIUtils';
import Alert from 'react-s-alert';
class CreateEmployeeComponent2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event,field) {
        this.setState({ [field]: event.target.value });   
    }
    

    handleSubmit(event) {
         event.preventDefault();   

         const employee = Object.assign({}, this.state);

        createEmployee(employee)
        .then(response => {
            Alert.success("Thêm mới thành công!");
            this.props.history.push("/employees");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Thêm mới thất bại');            
        });
        console.log(this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="firstName" 
                        className="form-control" placeholder="Tên"
                        value={this.state.firstName} onChange={(event)=>this.handleInputChange(event,"firstName")} required/>
                </div>
                <div className="form-item">
                    <input type="text" name="lastName" 
                        className="form-control" placeholder="Họ"
                        value={this.state.lastName} onChange={(event)=>this.handleInputChange(event,"lastName")} required/>
                </div>
                <div className="form-item">
                    <input type="text" name="emailId" 
                        className="form-control" placeholder="Email"
                        value={this.state.emailId} onChange={(event)=>this.handleInputChange(event,"emailId")} required/>
                </div>

                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Lưu</button>
                </div>
            </form>                    

        );
    }





   
    // componentDidMount(){

       
    //     if(this.state.id === '_add'){
    //         return
    //     }else{
    //         EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
    //             let employee = res.data;
    //             this.setState({firstName: employee.firstName,
    //                 lastName: employee.lastName,
    //                 emailId : employee.emailId
    //             });
    //         });
    //     }        
    // }
    // saveOrUpdateEmployee = (e) => {
    //     e.preventDefault();
    //     let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
    //     console.log('employee => ' + JSON.stringify(employee));

    //     // step 5
    //     if(this.state.id === '_add'){
    //         EmployeeService.createEmployee(employee).then(res =>{
    //             this.props.history.push('/employees');
    //         });
    //     }else{
    //         EmployeeService.updateEmployee(employee, this.state.id).then( res => {
    //             this.props.history.push('/employees');
    //         });
    //     }
    // }
    
    // changeFirstNameHandler= (event) => {
    //     this.setState({firstName: event.target.value});
    // }

    // changeLastNameHandler= (event) => {
    //     this.setState({lastName: event.target.value});
    // }

    // changeEmailHandler= (event) => {
    //     this.setState({emailId: event.target.value});
    // }

    // cancel(){
    //     this.props.history.push('/employees');
    // }

    // getTitle(){
    //     if(this.state.id === '_add'){
    //         return <h3 className="text-center">Add Employee</h3>
    //     }else{
    //         return <h3 className="text-center">Update Employee</h3>
    //     }
    // }
    // render() {
    //     return (
    //         <div>
    //             <br></br>
    //                <div className = "container">
    //                     <div className = "row">
    //                         <div className = "card col-md-6 offset-md-3 offset-md-3">
    //                             {
    //                                 this.getTitle()
    //                             }
    //                             <div className = "card-body">
    //                                 <form>
    //                                     <div className = "form-group">
    //                                         <label> First Name: </label>
    //                                         <input placeholder="First Name" name="firstName" className="form-control" 
    //                                             value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
    //                                     </div>
    //                                     <div className = "form-group">
    //                                         <label> Last Name: </label>
    //                                         <input placeholder="Last Name" name="lastName" className="form-control" 
    //                                             value={this.state.lastName} onChange={this.changeLastNameHandler}/>
    //                                     </div>
    //                                     <div className = "form-group">
    //                                         <label> Email Id: </label>
    //                                         <input placeholder="Email Address" name="emailId" className="form-control" 
    //                                             value={this.state.emailId} onChange={this.changeEmailHandler}/>
    //                                     </div>

    //                                     <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
    //                                     <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
    //                                 </form>
    //                             </div>
    //                         </div>
    //                     </div>

    //                </div>
    //         </div>
    //     )
    // }
}

export default CreateEmployeeComponent2
