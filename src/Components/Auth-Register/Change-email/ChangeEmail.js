import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ChangeEmail.css";
import OtpImg from "../../../assets/images/opt_img.png";
import { useEffect, useReducer, useState } from "react";
import { REQUIRE_EMAIL } from "../../Validation/Validation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangeEmail = () => {

  const navigate = useNavigate();
  const getRegUser = JSON.parse(localStorage.getItem("userLogEmail"));
  const [email, dispatchEmail] = useReducer(REQUIRE_EMAIL, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setformIsValid] = useState(false);
  const { isValid: isEmail } = email;

  //Form validation ---------------------------//
  useEffect(() => {
    if (!getRegUser) {
      return navigate("/auth/Welcomeregister");
    }
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
  const onChangeEmail = async (event) => {
    event.preventDefault();
    const getUserId = JSON.parse(localStorage.getItem('userReg'));
    const dataId = getUserId.data.user_id;
    console.log(getUserId)
    console.log(dataId)
    if (formIsValid) {
      const setRegisterEmail = {
        email: email.value,
      };
      try {
        const response = await axios.patch(
          `https://hihdev.datawomb.com/hihmos/api/company/register/${dataId}/email/change`,
          setRegisterEmail
        );
        localStorage.removeItem("userLogEmail");
        localStorage.setItem(
          "userLogEmail",
          JSON.stringify({
            registerEmail: email.value,
            msg: `We have sent you the one time password to ${email.value}. If you wish to
            modify your email address please`,
            isAlreadyUser:true,
            verifyType:"REGISTER"
          })
        );
        dispatchEmail({ type: "" });
        navigate("/auth/verification");
      } catch (err) {
        console.log(err);
      }
    }
  };

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
              
              
              <Form className="reg-form pb-1" onSubmit={onChangeEmail}>
                <a
                  href="#"
                  className="go-back underline mb-30 d-inb mt-2 d-inb ml-3"
                >
                  &lt;&lt; Go Back
                </a>
                <h2 className="form-title mb-30">Change Email Address</h2>
                <Form.Group className="mb-20">
                  <Form.Label className="form-lable">
                    Email Address for sending OTP
                  </Form.Label>
                  <Form.Control
                    placeholder="Enter your email address"
                    value={email.value}
                    onChange={onInputHandler}
                    className="userinput"
                  />
                  {email.isValid == false ? (
                    <p className="error-msg">Invalid Email ID</p>
                  ) : (
                    ""
                  )}
                </Form.Group>

                <div className="d-flex justify-content-center mt-30 mb-2">
                  <Button type="submit" disabled={!formIsValid} className="btn-primary">
                    Send OTP
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangeEmail;
