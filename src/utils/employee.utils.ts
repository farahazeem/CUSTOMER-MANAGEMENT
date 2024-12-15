import { Customer } from "../models/customer.model";
import { Employee } from "../models/employee.model";
import { getCustomers } from "./customer-utils";

export const saveEmployee = (customerId: number, employee: Employee) => {
  const customers = getCustomers();
  const customerIndex = customers.findIndex(
    (customer: Customer) => customer.id === customerId
  );

  if (customerIndex !== -1) {
    const customer = customers[customerIndex];
    customer.employees.push(employee);
    customers[customerIndex] = customer;

    // Save updated data back to localStorage
    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("loggedInCustomer", JSON.stringify(customer));

    return customer.employees;
  } else {
    throw new Error("Customer not found");
  }
};
