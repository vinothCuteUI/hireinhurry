import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import welcomeRegisterImg from '../../assets/images/welcome-register-image.png';
import logo from '../../assets/images/welcome-Logo.png';
import './Welcome-register.css';
import { Link } from 'react-router-dom';

const Welcomeregister = (props) => {
    return (
        <section className='card-section d-flex align-items-center vh-100 welcome-register'>
            
            <div className='card-container welocme-container'>
                <img src={welcomeRegisterImg} alt="banner img" className='card-img card-register-img img-left' />
                <h2 className='welcome-title'>Welcome to Hire in Hurry Registration</h2>
                <div className='welcome-content d-flex bg-prime' >
                    <div className='welcome-logo w-100 bg-secondary'>
                        <img src={logo} alt="hir in Hurry" className='logo' />
                    </div>
                    <Card className='card-register p-0 w-50'>
                        <Card.Body className='d-flex flex-column align-items-start justify-content-between pt-0 ps-0'>
                            <Card.Title className='txt-white'>Want to fill your open positions?</Card.Title>
                            <Card.Text className='txt-white'>
                                Discover top talent effortlessly. Hire in Hurry connects you <br/>with skilled professionals for seamless hiring, saving you time and resources.
                            </Card.Text>
                            <Button className="btn-secondary mt-3" style={{width:"100%"}}>Register as a Customer</Button>
                        </Card.Body>
                    </Card>
                    <Card className='card-register text-end p-0 w-50' >
                        <Card.Body className='d-flex flex-column align-items-end justify-content-between pt-0 pe-0'>
                            <Card.Title className='txt-white'>Want to place your bench candidates?</Card.Title>
                            <Card.Text className='txt-white'>
                                Expand your reach. Join Hire in Hurry as a <span style={{fontWeight:600}}>vendor partner</span> and <br/>gain access to a vast pool of job opportunities, enhancing your business growth.
                            </Card.Text>
                            <Button className="btn-secondary mt-3" style={{width:"100%"}}>Register as a Vendor</Button>
                        </Card.Body>
                    </Card>
                    <div className='login-item w-100 text-center'>
                        <Link to='/login' className='login-link'>Already Registered? - <span>Login</span></Link>
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default Welcomeregister;