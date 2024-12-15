import classes from "./employeeList.module.css";
import { Employee } from "../../models/employee.model";
import Title from "../../components/Title/Title";

interface EmployeeListProps {
  employees: Employee[];
}

export default function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="List of Employees"></Title>
        {employees &&
          employees.map((employee: Employee) => (
            <div
              key={employee.id || `temp-${employee.name}`}
              className={classes.list_item}
            >
              <img src="/image.png" alt={employee.name} />
              <span>{employee.name}</span>
              <span>{employee.email}</span>
              <span>{employee.role}</span>
              <div className={classes.employee_acion}>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
