import "./Verification.css";
import { useEffect, useReducer, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import DropDown from "../../assets/images/dropdown.png";
import OtpImg from "../../../assets/images/opt_img.png";
import { VALIDATOR_REQUIRE, OPT_VALIDATE } from "../../Validation/Validation";
import axios from "axios";

const Verification = (props) => {
  const navigate = useNavigate();
  const getRegUser = JSON.parse(localStorage.getItem("userLogEmail"));
  const [password, dispatchPassword] = useReducer(VALIDATOR_REQUIRE, {
    value: "",
    isValid: null,
  });
  const [repassword, dispatchRePassword] = useReducer(VALIDATOR_REQUIRE, {
    value: "",
    isValid: null,
  });
  const [optInput, dispatchOtpInput] = useReducer(OPT_VALIDATE, {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    isValid: null,
  });
  const [formIsValid, setformIsValid] = useState(false);
  const [matchPass, setMatchPass] = useState(true);
  const { isValid: isPassword } = password;
  const { isValid: isRePassword } = repassword;
  const { isValid: isOtpOne } = optInput;

  //Form validation ---------------------------///
  useEffect(() => {
    if (!getRegUser) {
      return navigate("/auth/Welcomeregister");
    }
    const identifier = setTimeout(() => {
      setformIsValid(isPassword && isRePassword && isOtpOne);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [isPassword && isRePassword && isOtpOne]);

  const onInputHandler = (event) => {
    if (event.target.name === "password") {
      dispatchPassword({ type: "REQUIRE", val: event.target.value });
    }
    if (event.target.name === "repassword") {
      dispatchRePassword({ type: "REQUIRE", val: event.target.value });
    }
    if (event.target.name === "otp") {
      dispatchOtpInput({
        type: "OTP",
        otpID: event.target.id,
        val: event.target.value,
      });
    }
    setformIsValid(isPassword && isRePassword && isOtpOne);
  };

  //On Verification submition-----------------------------//
  const onVerificationForm = async (event) => {
    event.preventDefault();

    if (password.value === repassword.value) {
      let optNum =
        optInput.otp1 +
        "" +
        optInput.otp2 +
        "" +
        optInput.otp3 +
        "" +
        optInput.otp4;

      if (formIsValid) {
        const getUserPassword = {
          email: getRegUser.registerEmail,
          otp: optNum,
          password: password.value,
        };
        try {
          const response = await axios.post(
            "https://hihdev.datawomb.com/hihmos/api/otp/verify",
            getUserPassword
          );
          dispatchPassword({ type: "" });
          dispatchRePassword({ type: "" });
          dispatchOtpInput({ type: "" });
          setformIsValid(true);
          setMatchPass(true);
          localStorage.removeItem("userLogEmail");
          //Navigate to verification
          navigate("/auth/login");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setMatchPass(false);
    }
  };

  //OPT time out-------------------------------//
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          navigate("/auth/regenerateotp");
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div className="reg-sec">
      <Container>
        <Row>
          <Col xl={7}>
            <div className="regimg">
              <img src={OtpImg} alt="OtpImg" className="img-res reg-img" />
            </div>
          </Col>
          <Col xl={5}>
            <Form className="reg-form" onSubmit={onVerificationForm}>
              <Link
                to="/registration"
                className="go-back underline mb-30 d-inb mt-2"
              >
                &lt;&lt; Go Back
              </Link>
              <h2 className="form-title mb-20">OTP Verification</h2>
              <p className="mb-30 text-center">
                {getRegUser.msg ? getRegUser.msg : ''} 
                {" "}{!getRegUser.isAlreadyUser && <Link to="/auth/change-email" className="click-link">
                  <b>click here</b>
                </Link>}
              </p>
              <Form.Group className="mb-20 text-center">
                <Form.Label className="form-lable otp-label text-center d-block mb-3">
                  One Time Password (OTP) <span className="important">*</span>
                </Form.Label>
                <Form.Control
                  className="otp-input"
                  name="otp"
                  id="otp1"
                  maxLength="1"
                  value={optInput.otp1}
                  onChange={onInputHandler}
                />
                <Form.Control
                  className="otp-input"
                  name="otp"
                  id="otp2"
                  maxLength="1"
                  value={optInput.otp2}
                  onChange={onInputHandler}
                />
                <Form.Control
                  className="otp-input"
                  name="otp"
                  id="otp3"
                  maxLength="1"
                  value={optInput.otp3}
                  onChange={onInputHandler}
                />
                <Form.Control
                  className="otp-input"
                  name="otp"
                  id="otp4"
                  maxLength="1"
                  value={optInput.otp4}
                  onChange={onInputHandler}
                />
              </Form.Group>

              {seconds > 0 || minutes > 0 ? (
                <span className="timeleft">
                  Time Left - {minutes < 10 ? `0${minutes}` : minutes}:{" "}
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              ) : (
                <span></span>
              )}
              <Form.Group className="mb-20">
                <Form.Label className="form-lable">
                  Password <span className="important">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Password"
                  className="userinput"
                  onChange={onInputHandler}
                  name="password"
                  value={password.value}
                  minLength="8"
                />
                {/*{password.isValid == false ? <p className="error-msg">Invalid Password</p> : ''}*/}
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label className="form-lable">
                  Re-enter Password <span className="important">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Re-Password"
                  className="userinput"
                  onChange={onInputHandler}
                  name="repassword"
                  value={repassword.value}
                  minLength="8"
                />
                {!matchPass ? (
                  <p className="error-msg">Invalid Re-Password</p>
                ) : (
                  ""
                )}
              </Form.Group>
              <p className="error-msg mb-30 text-center">
                Password should be minimum of <b>8 Characters</b> with{" "}
                <b>1 Upper Case, 1 Number</b> and <b>1 Special Character</b>.
              </p>

              <div className="d-flex justify-content-center mb-4">
                <Button
                  type="submit"
                  className="btn-primary"
                  disabled={!formIsValid}
                >
                  {getRegUser.verifyType === "REGISTER" ? "Submit for Account Verification" : "Change My Password - Navigate to Login Screen"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Verification;
