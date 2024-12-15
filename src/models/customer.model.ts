import { Employee } from "./employee.model";

export interface Customer {
    id: number;
    fullName: string;
    email: string;
    password: string;
    employees: Employee[];
}