import { useState, forwardRef, useImperativeHandle } from "react";
import classes from "./employeeForm.module.css";
import { useForm } from "react-hook-form";
import { Employee } from "../../models/employee.model";
import Input from "../../components/Input/Input";
import { saveEmployee } from "../../utils/employee.utils";
import { useAuth } from "../../hooks/useAuth";

export interface EmployeeFormRef {
  openModal: () => void;
}

interface EmployeeFormProps {
  employees: Employee[];
  onAddEmployee: (employee: Employee) => void;
}

const AddEmployee = forwardRef<EmployeeFormRef, EmployeeFormProps>(
  ({ employees, onAddEmployee }, ref) => {
    const user = useAuth()?.user;
    const [modalState, setModalState] = useState(false);
    const {
      handleSubmit,
      register,
      reset,
      formState: { errors },
    } = useForm<Employee>();
    useImperativeHandle(ref, () => ({
      openModal: () => setModalState(true),
    }));

    if (!modalState) return null;

    const submit = async (data: Employee) => {
      try {
        const nextEmployeeId =
          employees.length > 0
            ? Math.max(...employees.map((emp) => emp.id || 0)) + 1
            : 1;
        const employeeWithId = { ...data, id: nextEmployeeId };
        await saveEmployee(user?.id || 0, employeeWithId);
        onAddEmployee(employeeWithId);
        setModalState(false);
        reset();
      } catch (error) {
        console.log("Something went wrong, please try again.", error);
      }
    };
    return (
      <div className={classes.modal_wrapper}>
        <div className={classes.modal}>
          <div className={classes.modal_header}>
            <h3>Add Employee</h3>
            <button
              className={classes.close_button}
              onClick={() => setModalState(false)}
            >
              ✕
            </button>
          </div>
          <div className={classes.body}>
            <form
              aria-label="Sign Up Form"
              onSubmit={handleSubmit(submit)}
              noValidate
            >
              <Input
                type="text"
                label="Name"
                {...register("name", { required: "This field is required" })}
                error={errors.name}
                placeholder="Name"
              />
              <Input
                type="text"
                label="Role"
                {...register("role", {
                  required: "This field is required",
                })}
                error={errors.role}
              />
              <Input
                type="email"
                label="Email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email}
                placeholder="Email"
              />
              <div className={classes.footer}>
                <button className={classes.add_button} type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
);

export default AddEmployee;
