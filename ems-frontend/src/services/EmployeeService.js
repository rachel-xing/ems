import axios from "axios";

const REST_API_BASIC_URL ="http://localhost:8080/api/employees";


export const employeesList = () => axios.get(REST_API_BASIC_URL);

export const createEmployee = (employee) => axios.post(REST_API_BASIC_URL,employee);

export const getEmployee = (employeeId) => axios.get(REST_API_BASIC_URL + '/' + employeeId);

export const updateEmployee = (employeeId, updatedEmployee) => axios.put(REST_API_BASIC_URL + '/' + employeeId, updatedEmployee);

export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASIC_URL+ '/' + employeeId);
