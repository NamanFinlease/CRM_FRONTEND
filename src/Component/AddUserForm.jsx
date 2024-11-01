import React, { useEffect, useState } from 'react';
import { useAddEmployeeMutation } from '../Service/Query';

const AddUserForm = () => {
    const [addEmployee,{data,isSuccess,isError}] = useAddEmployeeMutation()
    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        email: '',
        gender:'',
        mobile: '',
        password: '',
        confPassword: '',
        empRole: '',
        empId: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(''); // Clear error when user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confPassword) {
            setError('Passwords do not match');
            return;
        }
        addEmployee(formData)
        setFormData({
            fName: '',
            lName: '',
            email: '',
            gender:'',
            mobile: '',
            password: '',
            confPassword: '',
            empRole: '',
            empId: ''
        })

        // Add logic to save the user data
    };

    useEffect(() => {
        if(isSuccess) console.log('data',data)
    },[isSuccess])

    return (
        <div className='add-user-form-container'>
            <form onSubmit={handleSubmit} className="add-user-form">
                <h2 className='form-heading'>Add Employee</h2>

                <div className="form-part">
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="fName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            required
                        />
                    </div>                   

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            placeholder="Enter employee's gender"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confPassword"
                            value={formData.confPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Employee ID</label>
                        <input
                            type="text"
                            name="empId"
                            value={formData.empId}
                            onChange={handleChange}
                            placeholder="Enter Employee ID"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="empRole">Employee Role:</label>
                        <select
                            id="empRole"
                            name="empRole"
                            value={formData.empRole}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="screener">Screener</option>
                            <option value="creditManager">Credit Manager</option>
                            <option value="sanctionHead">Sanction Head</option>
                        </select>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className='form-button'>
                    <button type="submit">Save Employee</button>
                </div>
            </form>

            <style jsx>{`
                .add-user-form-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                    margin-top: 60px;
                }

                .form-heading {
                    margin-bottom: 60px;
                    font-size: 24px;
                    color: #333;
                    text-align: center;
                }

                .add-user-form {
                    width: 100%;
                    max-width: 800px;
                    padding: 20px;
                    border: 1px solid #b6b3b3;
                    border-radius: 8px;
                    background-color: rgb(247, 242, 242);
                }

                .form-part {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .form-group {
                    flex: 1;
                    min-width: 280px;
                    margin-bottom: 15px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }

                .form-group input, .form-group select {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                .form-button {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                }

                button {
                    padding: 8px 12px;
                    width: auto;
                    border: none;
                    border-radius: 20px;
                    background-color: #007bff;
                    color: #fff;
                    font-size: 14px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #0056b3;
                }

                .error-message {
                    color: red;
                    margin-top: 10px;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default AddUserForm;
