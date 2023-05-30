import { useEffect, useReducer, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Regsitration.css";
import DropDown from "../../../assets/images/dropdown.png";
import RegImg from "../../../assets/images/reg_img.png";
import {
  VALIDATOR_REQUIRE,
  IS_CHECKED,
  REQUIRE_LETTER,
  REQUIRE_EMAIL,
} from "../../Validation/Validation";
import axios from "axios";
import CountryData from "./CountryData";

const Registration = (props) => {
  // const authContext = useContext(Authcontext);
  const getUserRegister = useParams();
  localStorage.setItem("userType", getUserRegister.registeruser);
  const navigate = useNavigate();
  const [firstName, dispatchFirstName] = useReducer(REQUIRE_LETTER, {
    value: "",
    isValid: null,
  });
  const [lastName, setLastName] = useState("");
  const [email, dispatchEmail] = useReducer(REQUIRE_EMAIL, {
    value: "",
    isValid: null,
  });
  const [companyName, dispatchCompanyName] = useReducer(VALIDATOR_REQUIRE, {
    value: "",
    isValid: null,
  });
  const [countryName, dispatchCountryName] = useReducer(VALIDATOR_REQUIRE, {
    value: "India",
    isValid: null,
  });
  const [dialingCode, dispatchDialingCode] = useReducer(VALIDATOR_REQUIRE, {
    value: "+91",
    isValid: null,
  });
  const [contactNo, dispatchContactNo] = useReducer(VALIDATOR_REQUIRE, {
    value: "",
    isValid: null,
  });
  const [istermCondition, setIstermCondition] = useState(false);
  const [formIsValid, setformIsValid] = useState(false);
  const { isValid: isfName } = firstName;
  const { isValid: isEmail } = email;
  const { isValid: isCompanyName } = companyName;
  const { isValid: isCountryName } = countryName;
  const { isValid: isDialingCode } = dialingCode;
  const { isValid: isContactNo } = contactNo;

  //Form validation ---------------------------///
  useEffect(() => {
    localStorage.removeItem("userLogEmail");
    const identifier = setTimeout(() => {
      setformIsValid(
        isfName && isEmail && isCompanyName && isContactNo && istermCondition
      );
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [isfName && isEmail && isCompanyName && isContactNo && istermCondition]);

  const onInputHandler = (event) => {
    if (event.target.name === "first_name") {
      dispatchFirstName({ type: "REQUIRELETTER", val: event.target.value });
    }
    if (event.target.name === "last_name") {
      let isLetters = /^[A-Za-z ]+$/;
      if (event.target.value != "") {
        if (event.target.value.match(isLetters)) {
          setLastName(event.target.value);
        }
      } else {
        setLastName("");
      }
    }
    if (event.target.name === "user_email") {
      dispatchEmail({ type: "EMAIL", val: event.target.value });
    }
    if (event.target.name === "company_name") {
      dispatchCompanyName({ type: "REQUIRE", val: event.target.value });
    }
    if (event.target.name === "country_name") {
      dispatchCountryName({ type: "REQUIRE", val: event.target.value });
    }
    if (event.target.name === "dialing_code") {
      dispatchDialingCode({ type: "REQUIRE", val: event.target.value });
    }
    if (event.target.name === "contact_no") {
      dispatchContactNo({ type: "REQUIRE", val: event.target.value });
    }
    if (event.target.name === "terms_condition") {
      setIstermCondition((current) => !current);
    }
    setformIsValid(
      isfName && isEmail && isCompanyName && isContactNo && istermCondition
    );
  };

  //On Register ------------------------------------------------///
  const onRegisterForm = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      let setLName = lastName === "" ? "null" : lastName;
      const getUserDetails = {
        email: email.value,
        first_name: firstName.value,
        last_name: setLName,
        company_name: companyName.value,
        dialing_code: dialingCode.value,
        contact_no: Number(contactNo.value),
        type: getUserRegister.registeruser,
        domain: "hihdev.datawomb.ca",
        country: countryName.value,
      };

      try {
        const response = await axios.post(
          "https://hihdev.datawomb.com/hihmos/api/company/register",
          getUserDetails
        );
        const data = response.data;
        localStorage.setItem("userReg", JSON.stringify(data));
        localStorage.setItem(
          "userLogEmail",
          JSON.stringify({
            registerEmail: email.value,
            msg: `We have sent you the one time password to ${email.value}. If you wish to
            modify your email address please`,
            isAlreadyUser:false,
            verifyType:"REGISTER"
          })
        );
        dispatchFirstName({ type: "" });
        setLastName("");
        dispatchEmail({ type: "" });
        dispatchCountryName({ type: "" });
        dispatchCompanyName({ type: "" });
        dispatchDialingCode({ type: "" });
        dispatchContactNo({ type: "" });
        setIstermCondition(false);

        //Navigate to verification
        navigate("/auth/verification");
      } catch (err) {
        const data = err.response;
        const isUserStatus = data.data.data;
        if (isUserStatus.data === "user_not_verified") {
          localStorage.setItem(
            "userLogEmail",
            JSON.stringify({
              registerEmail: email.value,
              msg: `You are already a ${getUserRegister.registeruser}. We have generated an OTP and sent to ${email.value}. 
              Please use the OTP to set your password.`,
              isAlreadyUser:true,
              verifyType:"REGISTER"
            })
          );
          navigate("/auth/verification");
        } else {
          localStorage.removeItem("userLogEmail");
          localStorage.removeItem("userType");
          navigate("/auth/login");

        }
      }
    }
  };

  return (
    <div className="reg-sec">
      <Container>
        <Row>
          <Col xl={7}>
            <div className="regimg">
              <img src={RegImg} alt="RegImg" className="img-res reg-img" />
            </div>
          </Col>
          <Col xl={5}>
            <Form className="reg-form" onSubmit={onRegisterForm}>
              <h2 className="form-title mb-20">
                Register as a{" "}
                <span style={{ textTransform: "capitalize", fontSize: "100%" }}>
                  {getUserRegister.registeruser}
                </span>
              </h2>
              <Form.Group className="mb-20">
                <Form.Label className="form-lable">
                  First Name <span className="important">*</span>
                </Form.Label>
                <Form.Control
                  placeholder="Enter your First Name"
                  value={firstName.value}
                  className="userinput"
                  name="first_name"
                  onChange={onInputHandler}
                />

                {firstName.isValid == false ? (
                  <p className="error-msg">Invalid First Name</p>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label className="form-lable">Last Name</Form.Label>
                <Form.Control
                  placeholder="Enter your Last Name"
                  value={lastName}
                  onChange={onInputHandler}
                  className="userinput"
                  name="last_name"
                />
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label className="form-lable">
                  Email Address <span className="important">*</span>
                </Form.Label>
                <Form.Control
                  placeholder="Enter your email address"
                  value={email.value}
                  className="userinput"
                  name="user_email"
                  onChange={onInputHandler}
                />

                {email.isValid == false ? (
                  <p className="error-msg">Invalid Email ID</p>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label className="form-lable">
                  Company Name <span className="important">*</span>
                </Form.Label>
                <Form.Control
                  placeholder="Enter your company name"
                  className="userinput"
                  name="company_name"
                  onChange={onInputHandler}
                  value={companyName.value}
                />

                {companyName.isValid == false ? (
                  <p className="error-msg">Enter the Company Name</p>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label className="form-lable">
                  Country <span className="important">*</span>
                </Form.Label>
                <div className="dropdown-list">
                  <Form.Select
                    className="userinput dropdown"
                    name="country_name"
                    value={countryName.value}
                    onChange={onInputHandler}
                  >
                    {CountryData.map((data, index) => (
                      <option key={data.iso}>{data.country}</option>
                    ))}
                  </Form.Select>
                  <img
                    src={DropDown}
                    alt="DropDown"
                    className="dropdown-icon"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-20">
                <Form.Label className="form-lable">
                  Contact Number <span className="important">*</span>
                </Form.Label>
                <Row>
                  <Col xl={3}>
                    <div className="dropdown-list">
                      <Form.Select
                        className="userinput dropdown"
                        name="dialing_code"
                        value={dialingCode.value}
                        onChange={onInputHandler}
                      >
                        {CountryData.map((data, index) => (
                          <option key={data.iso}>{data.code}</option>
                        ))}
                      </Form.Select>
                      <img
                        src={DropDown}
                        alt="DropDown"
                        className="dropdown-icon"
                      />
                    </div>
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Enter your contact number"
                      className="userinput"
                      name="contact_no"
                      onChange={onInputHandler}
                      value={contactNo.value}
                    />
                    {contactNo.isValid == false ? (
                      <p className="error-msg">Enter the Contact Number</p>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-20">
                <div className="checkbox d-flex justify-content-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms_condition"
                    className="checkbox-input"
                    value={istermCondition}
                    onChange={onInputHandler}
                  />
                  <label className="term-link" htmlFor="terms">
                    I agree Terms and Conditions
                  </label>
                </div>
              </Form.Group>
              <div className="d-flex justify-content-center mb-4">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!formIsValid}
                >
                  Proceed to verfiy email address
                </Button>
              </div>

              <div className="d-flex justify-content-center">
                <Link to="/auth/login" className="underline login">
                  Already a Vendor? - <b>Login</b>
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registration;
