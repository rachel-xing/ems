import { useEffect, useState } from "react";
import { employeesList, deleteEmployee} from "../services/EmployeeService.js";
import {useNavigate} from "react-router-dom";


function EmployeeList () {

    const [ employees, setEmployees ] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        employeesList().then(response => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addEmployee() {
        navigator("/add-employee")
    }

    function updateEmployee(id) {
        navigator(`/update-employee/${id}`);
    }

    function removeEmployee(id) {
        deleteEmployee(id).then(response => {
            console.log(response.data)
            getAllEmployees();
        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <div className="container">
            <h2 className="text-center">List of Employees</h2>
            <button className="btn btn-primary mb-2" onClick={addEmployee}>Add Employee</button>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                { employees.map(e =>
                    <tr key={ e.id }>
                        <td>{ e.id }</td>
                        <td>{ e.firstName }</td>
                        <td>{ e.lastName }</td>
                        <td>{ e.email }</td>
                        <td>
                            <button className="btn btn-success" onClick={()=>updateEmployee(e.id)}>Update</button>
                            <button className="btn btn-danger" onClick={()=>removeEmployee(e.id)} style={{marginLeft: "10px"}}>Delete</button>
                        </td>
                    </tr>,
                )

                }
                </tbody>
            </table>

        </div>
    );
}

export default EmployeeList;