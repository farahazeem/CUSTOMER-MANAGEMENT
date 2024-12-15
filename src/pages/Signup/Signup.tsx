import { useForm } from "react-hook-form";
import { Customer } from "../../models/customer.model";
import classes from "./signup.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { saveCustomer } from "../../utils/customer-utils";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Customer>();
  const navigate = useNavigate();

  const submit = async (data: Customer) => {
    try {
      const newCustomer = { ...data, employees: [] };
      await saveCustomer(newCustomer);
      navigate("/login");
    } catch (error) {
      console.log("Something went wrong, please try again.", error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Sign Up"></Title>
        <form
          aria-label="Sign Up Form"
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <Input
            type="text"
            label="Full Name"
            {...register("fullName", { required: "This field is required" })}
            error={errors.fullName}
            placeholder="Full Name"
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
          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: true,
              minLength: 5,
            })}
            error={errors.password}
          />
          {/* <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value !== getValues("password")
                  ? "Password Do Not Match"
                  : true,
            })}
            error={errors.confirmPassword}
            placeholder="Confirm Password"
          /> */}
          <Button type="submit" text="Sign Up" />
          <div className={classes.login}>
            Already a user? &nbsp;
            <Link to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
