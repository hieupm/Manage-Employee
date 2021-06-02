import React, { Component } from 'react';
import './Profile.css';

class ListEmployee extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                this.props.listEmployee.first_name ? (
                                    <div src={this.props.listEmployee.first_name} />
                                ) : (
                                    <div src={this.props.listEmployee.first_name} />
                                )
                            }
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}

export default ListEmployee