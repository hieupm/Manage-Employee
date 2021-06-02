import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import ListEmployee from '../user/profile/ListEmployee';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser} from '../util/APIUtils';
import { getEmployeeById} from '../util/APIUtils';
import EmployeeService from '../services/EmployeeService'
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import ListEmployeeComponent from '../components/ListEmployeeComponent';
import ListEmployeeComponent3 from '../components/ListEmployeeComponent3';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import CreateEmployeeComponent2 from '../components/CreateEmployeeComponent2';
import UpdateEmployeeComponent from '../components/UpdateEmployeeComponent';
import ViewEmployeeComponent from '../components/ViewEmployeeComponent';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      //  employees: null,
      loading: false
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      this.setState({
        loading: false
      });
    });

    // EmployeeService.getEmployees()
    // .then(response => {
    //   this.setState({
    //     employees: response,
    //     authenticated: true,
    //     loading: false
    //   });
    // }).catch(error => {
    //   this.setState({
    //     loading: false
    //   });
    // });

    // EmployeeService.createEmployee()
    // .then(response => {
    //   this.setState({
    //     firstName: response,
    //     lastName: response,
    //     emailId: response,
    //     authenticated: true,
    //     loading: false
    //   });
    // }).catch(error => {
    //   this.setState({
    //     loading: false
    //   });
    // });


    getEmployeeById()
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


  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("Đăng xuất thành công!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Profile}></PrivateRoute>

            <PrivateRoute path = "/employees" authenticated={this.state.authenticated} employees={this.state.employees}
            component = {ListEmployeeComponent3}></PrivateRoute>

            <PrivateRoute path = "/add-employee/" authenticated={this.state.authenticated}
            component = {CreateEmployeeComponent2}></PrivateRoute>

            <PrivateRoute path = "/update-employee/:id" authenticated={this.state.authenticated}
            component = {UpdateEmployeeComponent}></PrivateRoute>

            <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert stack={{limit: 3}}
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default App;
