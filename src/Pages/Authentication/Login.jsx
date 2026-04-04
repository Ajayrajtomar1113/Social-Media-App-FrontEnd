import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const initialValues = {
    email: "",
    password: ""
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(loginUserAction(values));
  };

  return (
    <div>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className="space-y-5">

          <div className="space-y-5">

            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>

          </div>

          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Login
          </Button>

        </Form>
      </Formik>

      <div className="flex gap-2 items-center justify-center pt-5">
        <p>If you don't have an account?</p>
        <Button onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>

    </div>
  );
};

export default Login;