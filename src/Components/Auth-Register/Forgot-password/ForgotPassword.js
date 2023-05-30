import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ForgotPassword.css';
import OtpImg from "../../../assets/images/opt_img.png";
import { useNavigate } from 'react-router-dom';
import { REQUIRE_EMAIL } from '../../Validation/Validation';
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

const ForgotPassword = ()=> {

  const navigate = useNavigate()
  const [email, dispatchEmail] = useReducer(REQUIRE_EMAIL, {
      value: "",
      isValid: null,
  });
  const [formIsValid, setformIsValid] = useState(false);
  const { isValid: isEmail } = email;

  //Form validation ---------------------------///
  useEffect(() => {
    const identifier = setTimeout(() => {
        setformIsValid(isEmail);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [isEmail]);
  const onInputHandler = (event) => {
    dispatchEmail({ type: "EMAIL", val: event.target.value });
    setformIsValid(isEmail);
  };

  //On login function
  const onChangePassword = async (event)=>{
    event.preventDefault()
    if(formIsValid){
      const setRegisterEmail = {
        "email": email.value
      }
      try {
        const response = await axios.post(
            "https://hihdev.datawomb.com/hihmos/api/password/forget",
            setRegisterEmail
          );
          localStorage.removeItem("userLogEmail");
          localStorage.setItem(
            "userLogEmail",
            JSON.stringify({
              registerEmail: email.value,
              msg: `Based on your request to change password, we have generated an OTP and sent to ${email.value}. 
              Please use the OTP to reset your password.`,
              isAlreadyUser:true,
              verifyType:"FORGOTPASS"
            })
          );
          dispatchEmail({ type: ""});
          navigate("/auth/verification");
        } catch (err) {
            console.log(err);
        }
    }
      
  }

  return (
    <div className="reg-sec">
       <Container>
          <Row className="align-items-center">
            <Col xl={7}>
              <div className="regimg">
                  <img src={OtpImg} alt="OtpImg" className="img-res reg-img" />
              </div>
            </Col>
            <Col xl={5} className="">
              <div className="reg-otp form-bg pt-4 pb-4">
                  <h2 className="form-title mb-30">Enter your registered email address</h2>
                  <Form className="reg-form pb-1" onSubmit={onChangePassword}>
                    <Form.Group className="mb-20" >
                      <Form.Label className="form-lable">Registered Email Address</Form.Label>
                      <Form.Control placeholder="Enter your registered email address" value={email.value} onChange={onInputHandler} className="userinput" />
                      {email.isValid == false ? (
                        <p className="error-msg">Invalid Email ID</p>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    <div className="d-flex justify-content-center mt-30 mb-2"><Button type="submit" disabled={!formIsValid} className="btn-primary">Send OTP</Button></div>
                  </Form>
              </div>
            </Col>
          </Row>
        </Container>
      
    </div>
  );
}

export default ForgotPassword;
