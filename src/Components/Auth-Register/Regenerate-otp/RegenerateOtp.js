import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import Form from 'react-bootstrap/Form';
import "./RegenerateOtp.css";
import OtpImg from "../../../assets/images/opt_img.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function RegenerateOtp() {
  const navigate = useNavigate();
  const getRegUser = JSON.parse(localStorage.getItem("userLogEmail"));

  useEffect(() => {
    if (!getRegUser) {
      return navigate("/auth/Welcomeregister");
    }
  }, []);

  const onRegenerateOtp = async () => {
    try {
      let response;
      if(getRegUser.verifyType === "REGISTER"){
        response = await axios.post(
          "https://hihdev.datawomb.com/hihmos/api/company/register/otp/resend",
          { email: getRegUser.registerEmail }
        );
      }else{
        response = await axios.post(
          "https://hihdev.datawomb.com/hihmos/api/password/forget/resend",
          { email: getRegUser.registerEmail }
        );
      }
      
      navigate("/auth/verification");
    } catch (err) {
      console.log(err);
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
          <Col xl={5}>
            <div className="reg-otp form-bg padd-20">
              <div className="reg-otp-cont">
                <h2 className="form-title mb-30">Regenerate OTP</h2>
                <p className="mb-30 text-center">
                  We have sent you the one time password to{" "}
                  {getRegUser ? getRegUser.registerEmail : ""}. If you wish to
                  modify your email address please{" "}
                  <Link to="/auth/change-email" className="click-link">
                    <b>click here</b>
                  </Link>
                </p>
                <span className="timeout mb-30">Timer Expired - 0:00</span>
                <div className="d-flex justify-content-center mb-2">
                  <Button
                    onClick={onRegenerateOtp}
                    type="button"
                    className="btn-primary"
                  >
                    Regenerate OTP
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegenerateOtp;
