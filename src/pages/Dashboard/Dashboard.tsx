import { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import classes from "./dashboard.module.css";
import Button from "../../components/Button/Button";
import EmployeeForm, { EmployeeFormRef } from "../EmployeeForm/EmployeeForm";
import EmployeeList from "../EmployeeList/EmployeeList";
import { Employee } from "../../models/employee.model";

export default function Dashboard() {
  const auth = useAuth();
  const [employeeList, setEmployeeList] = useState(auth?.user?.employees || []);
  const modalRef = useRef<EmployeeFormRef>(null);
  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    }
  };

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployeeList((prevList) => [...prevList, newEmployee]);
  };

  return (
    <>
      <div className={classes.employees}>
        <Button text="Add Employee +" onClick={handleOpenModal} />
      </div>
      <EmployeeForm
        ref={modalRef}
        employees={employeeList}
        onAddEmployee={handleAddEmployee}
      />
      {employeeList.length === 0 ? (
        <div className={classes.noEmployees}>You don't have any Employees.</div>
      ) : (
        <EmployeeList employees={employeeList} />
      )}
    </>
  );
}
