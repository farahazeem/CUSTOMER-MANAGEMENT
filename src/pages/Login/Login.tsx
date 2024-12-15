import { useForm } from "react-hook-form";
import { Customer } from "../../models/customer.model";
import classes from "./login.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Customer>();
  const navigate = useNavigate();
  const auth = useAuth();
  if (!auth) {
    return <div>Error: Auth context is not available</div>;
  }
  const { login } = auth;

  const submit = async (data: Customer) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login"></Title>
        <form
          aria-label="Login Form"
          onSubmit={handleSubmit(submit)}
          noValidate
        >
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
          <Button type="submit" text="Login" />
          <div className={classes.register}>
            New user? &nbsp;
            <Link to={"/signup"}>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
