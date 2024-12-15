Objective: Build a simple React app in TypeScript where a user can create
customer accounts, log in, and log out. The application should have basic form
validation, and use local storage as the &quot;database&quot; for storing customer data.

 Sign-Up (Customer Creation): After creating a customer, users can also create
and view employees associated with that customer. Each customer can have
multiple employees.
 Create Employees: When the user creates a customer, there should be an
option to create employees. Employees should have the following properties:
o Name (required)
o Role (required)
o Email (required, must be a valid email format)
 View Employees: After creating an employee, users should be able to see a list
of employees associated with their account.
 Employee Management: Employees should be stored in localStorage under the
customer&#39;s profile. The data structure should include both customer and
employee details.

Updated App Flow:

1. Sign Up Form:
   o Collect customer information (Full Name, Email, Password).
   o After the customer is created, provide the option to create employees.
2. Employee Creation:
   o Create an employee form after sign-up.
   o Collect employee details: Name, Role, and Email.
   o The employee will be stored under the customer in localStorage.
3. View Employees:
   o Once employees are created, the user can view them in a list.
