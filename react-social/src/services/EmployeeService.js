import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

class EmployeeService {

    getEmployees(){
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: API_BASE_URL + "/api/v1/employees",
            method: 'GET'
        });
    }


    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return request({
            url: API_BASE_URL + "/api/v1/employees" + '/' + employeeId,
            method: 'GET'
        });
        // return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return request({
            url: API_BASE_URL + "/api/v1/employees"+ '/' + employeeId,
            method: 'DELETE',
       //     body: JSON.stringify(employeeId)
        });
 //       return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);

    }
}

export default new EmployeeService()
