import { Button, TextField } from "@mui/material"
import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useState } from "react"
import * as Yup from "yup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues={firstName:"",lastName:"",email:"",password:"",gender:""}
    const validationSchema={email:Yup.string().email("Invalid email").required("Email is required"),
        password:Yup.string().min(6,"Password must  be at least 6 characters").required("Password is required")};

const Register = () => {
    
    const dispatch = useDispatch();
    const [formValue,setFormValue] = useState();
    const [gender,setGender] = useState();
    const navigate = useNavigate();
    const handleChange=(e)=>{
        setGender(e.target.value);
        
    }
    const handleSubmit=(values)=>{
        values.gender=gender;
        console.log("handlesubmit",values);
        dispatch(registerUserAction(values));

    }
    return (
        <div>
            <Formik onSubmit={handleSubmit}  initialValues={initialValues}>
                <Form className="space-y-5">
                    <div className="space-y-5">
                        <div>
                            <Field as={TextField} name="firstName" placeholder="First Name" type="text" variant="outlined" fullWidth/>
                            <ErrorMessage name="firstName" component="div" className="text-red-500"/>
                        </div>
                        <div>
                            <Field as={TextField} name="lastName" placeholder="Last Name" type="text" variant="outlined" fullWidth/>
                            <ErrorMessage name="lastName" component="div" className="text-red-500"/>
                        </div>
                        <div>
                            <Field as={TextField} name="email" placeholder="Email" type="email" variant="outlined" fullWidth/>
                            <ErrorMessage name="email" component="div" className="text-red-500"/>
                        </div>
                        <div>
                            <Field as={TextField} name="password" placeholder="password" type="password" variant="outlined" fullWidth/>
                            <ErrorMessage name="password" component="div" className="text-red-500"/>
                        </div>
                        <RadioGroup
                            onChange={handleChange}
                            row
                            aria-label="gender"
                            name="gender"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                            <ErrorMessage name="gender" component="div" className="text-red-500"/>
                        </RadioGroup>
                    </div>
                    <Button sx={{padding:".8rem 0 rem"}} fullWidth type="submit" variant="contained" >Register</Button>
                </Form>
            </Formik>
            <div className="flex gap-2 items-center justify-center pt-5">
                            <p>If you already have an account</p>
                            <Button onClick={()=>navigate("/login")}>
                                Login
                            </Button>
                        </div>
        </div>
    )
}
export default Register