import { Customer } from "../models/customer.model";

export const getCustomers = () => {
  const customers = JSON.parse(localStorage.getItem("customers") || "[]");
  return customers;
};

export const saveCustomer = (customer: Customer) => {
  const customers = getCustomers();
  const nextId = customers.length ? customers[customers.length - 1].id + 1 : 1;
  const newCustomer = { ...customer, id: nextId };
  customers.push(newCustomer);
  localStorage.setItem("customers", JSON.stringify(customers));
};

export const loginCustomer = (email: string, password: string) => {
  const customers = getCustomers();
  const customer = customers.find(
    (customer: Customer) =>
      customer.email === email && customer.password === password
  );
  if (customer) {
    localStorage.setItem("loggedInCustomer", JSON.stringify(customer));
    return customer;
  } else {
    throw new Error("Invalid email or password");
  }
};

export const logoutCustomer = () => {
  localStorage.removeItem("loggedInCustomer");
};

export const getUser = () =>
  localStorage.getItem("loggedInCustomer")
    ? JSON.parse(localStorage.getItem("loggedInCustomer") || "null")
    : null;
