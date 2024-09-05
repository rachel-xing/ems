import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService.js";

function Employee () {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const navigator = useNavigate();


    const [ errors, setErrors ] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const {id} = useParams();

    useEffect(()=> {
        getEmployee(id).then(response => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
        }).catch(error => console.log(error));
    },[id])



    function saveOrUpdateEmployee (event) {
        event.preventDefault();
        const isValid = validateForm();

        if(isValid) {
            const employee = { firstName, lastName, email};

            if (id) {
                updateEmployee(id, employee).then(response => {
                    console.log(response.data);
                    navigator("/");
                }).catch(error => console.log(error))
            } else {
                createEmployee(employee).then(response => {
                    console.log(response.data);
                    navigator("/");
                }).catch(error => console.log(error));
            }
        }
    }

    function validateForm () {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        console.log(id);
        if (id) {
            return <h2 className="text-center">Update Employee</h2>;
        } else {
            return <h2 className="text-center">Add Employee</h2>;
        }
    }
    //
    // function findValue(id) {
    //     return employees.forEach(e=> e.id === id)
    // }

    return (
        <div className="container">
            <br/> <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">First Name</label>
                                <input type="text" placeholder="First Name"
                                       name="firstName" value={ firstName }
                                       className={ `form-control ${errors.firstName ? 'is-invalid' : ''}` }
                                       onChange={ (event) => setFirstName(
                                           event.target.value) }/>
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Last Name</label>
                                <input type="text" placeholder="Last Name"
                                       name="lastName" value={ lastName }
                                       className={ `form-control ${errors.lastName ? 'is-invalid' : ''}` }
                                       onChange={ (event) => setLastName(
                                           event.target.value) }/>
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}

                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Email</label>
                                <input type="email" placeholder="Email"
                                       name="email"  value={email }
                                       className={ `form-control ${errors.email ? 'is-invalid' : ''}` }
                                       onChange={ (event) => setEmail(
                                           event.target.value) }/>
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <button className="btn btn-success"
                                    onClick={ saveOrUpdateEmployee }>Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Employee;