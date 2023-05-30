// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './LoginPage.css';
import LoginImg from '../../../assets/images/login-screen-image.png';
import {
    VALIDATOR_REQUIRE,
    REQUIRE_EMAIL,
  } from "../../Validation/Validation";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';

const Loginpage = (pops)=> {
    const navigate = useNavigate()

    const [email, dispatchEmail] = useReducer(REQUIRE_EMAIL, {
        value: "",
        isValid: null,
    });
    const [password, dispatchPassword] = useReducer(VALIDATOR_REQUIRE, {
        value: "",
        isValid: null,
    });
    const [formIsValid, setformIsValid] = useState(false);
    const { isValid: isEmail } = email;
    const { isValid: isPassword } = password;
    
    //Form validation ---------------------------///
    useEffect(() => {
        const identifier = setTimeout(() => {
            setformIsValid(
                isEmail &&
                isPassword
        );
        }, 500);
        return () => {
        clearTimeout(identifier);
        };
    }, [
        isEmail &&
        isPassword
    ]);
    const onInputHandler = (event) => {
        if (event.target.name === "user_email") {
            dispatchEmail({ type: "EMAIL", val: event.target.value });
        }
        if (event.target.name === "user_password") {
            dispatchPassword({ type: "REQUIRE", val: event.target.value });
        }
        setformIsValid(isEmail && isPassword);
    };

    //On login function
    const onLogIn = async (event)=>{
        event.preventDefault()
        const getUserPassword = {
            "email": email.value,
            "password": password.value
        }
        try {
            const response = await axios.post(
                "https://hihdev.datawomb.com/hihmos/api/login",
                getUserPassword
            );
            console.log(response)
            const data = response.data.data;
            const accessToken = data.access_token;
            if (!accessToken) {
                return;
            }
            localStorage.clear();
            localStorage.setItem('user-token', accessToken);
            setTimeout(() => {
                navigate('/companydetails');
            }, 500);

            dispatchEmail({ type: "" });
            dispatchPassword({ type: "" });
            navigate("/companyDetails");
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <section className='card-section d-flex align-items-center vh-100 card-bg'>
            <div className='card-container d-flex align-items-center login-container'>
                <Card className='card-register' style={{borderTopRightRadius:"0px", borderBottomRightRadius:"0px"}}>
                    <Card.Body className='d-flex flex-column align-items-start justify-content-between'>
                        <Card.Text className='txt-white'>
                            Discover top talent effortlessly. Hire in Hurry connects you with skilled professionals for seamless hiring, saving you time and resources.
                        </Card.Text>
                        <Link to="/auth/registration/customer" className="btn btn-secondary mt-3">Register as a Customer</Link>
                    </Card.Body>
                </Card>
                <div className='login-forms'>
                    <Form className="reg-form h-100" onSubmit={onLogIn}>
                          <h2 className="form-title mt-4 mb-20">Welcome</h2>
                        <Form.Group className="mb-20">
                          <Form.Label className="form-lable">Email Address</Form.Label>
                          <Form.Control placeholder="Enter your registered email address" name='user_email' className="userinput" onChange={onInputHandler}/>
                            {email.isValid == false ? (
                            <p className="error-msg">Invalid Email</p>
                            ) : ("")}
                            
                        </Form.Group>
                        <Form.Group className="mb-20">
                          <div className="d-flex justify-content-between">
                                <Form.Label className="form-lable">Password</Form.Label>
                                <Link to="/auth/forgot-password" className="forgot-pass">Forgot Password?</Link>
                          </div>
                          <Form.Control type='password' placeholder="Enter your registered password" name='user_password' className="userinput" onChange={onInputHandler}/>
                          {password.isValid == false ? (
                            <p className="error-msg">Invalid Password</p>
                            ) : ("")}
                        </Form.Group>
                        <Form.Group className="mb-20">
                          <div className="checkbox d-flex justify-content-center">
                            <input type="checkbox" id="terms" name="terms" value="" className="checkbox-input" />
                            <label className="term-link" htmlFor="terms">Remember Me</label>
                          </div>
                        </Form.Group>
                        <div className="d-flex justify-content-center mb-4">
                            <Button type="submit" className="btn-primary" disabled={!formIsValid}>Login to my Account</Button>
                        </div>
                      </Form>
                </div>
                <Card className='card-register text-end' style={{borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}}>
                    <Card.Body className='d-flex flex-column align-items-end justify-content-between'>
                        <Card.Text className='txt-white'>
                            Expand your reach. Join Hire in Hurry as a <span style={{fontWeight:600}}>vendor partner</span> and gain access to a vast pool of job opportunities, enhancing your business growth.
                        </Card.Text>
                        <Link to="/auth/registration/vendor" className="btn btn-secondary mt-3">Register as a Vendor</Link>
                    </Card.Body>
                </Card>
                <img src={LoginImg} alt="banner img" className='card-img img-right' />
            </div>
        </section>
    )
}

export default Loginpage;