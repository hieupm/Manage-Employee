import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
            <header className="app-header">
                <div className="container">
                    <div className="app-branding">
                        <Link to="/" className="app-title">Trang chủ</Link>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                                { this.props.authenticated ? (
                                    <ul>
                                        <li>
                                            <NavLink to="/employees">Danh sách nhân viên</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/add-employee/:id">Thêm nhân viên mới</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/profile">Hồ sơ</NavLink>
                                        </li>
                                        <li>
                                            <a onClick={this.props.onLogout}>Đăng xuất</a>
                                        </li>
                                    </ul>
                                ): (
                                    <ul>
                                        <li>
                                            <NavLink to="/login">Đăng nhập</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/signup">Đăng ký</NavLink>
                                        </li>
                                    </ul>
                                )}
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;
