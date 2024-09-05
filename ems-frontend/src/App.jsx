import './App.css';
import EmployeeList from "./components/EmployeeList.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Employee from "./components/Employee.jsx";


function App () {

    return (
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route path="/" element={<EmployeeList/>}></Route>
                <Route path="/employees" element={<EmployeeList/>}></Route>
                <Route path="/add-employee" element={<Employee/>}></Route>
                <Route path="/update-employee/:id" element={<Employee/>}></Route>
            </Routes>

            <Footer/>
        </BrowserRouter>
    );
}

export default App;
