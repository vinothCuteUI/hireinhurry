import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LoginImg from '../../assets/images/login-screen-image.png';
import './Login-page.css';

const Loginpage = (pops)=> {
    return (
        <section className='card-section d-flex align-items-center vh-100 card-bg'>
            
            <div className='card-container d-flex align-items-center login-container'>
                <Card className='card-register' style={{borderTopRightRadius:"0px", borderBottomRightRadius:"0px"}}>
                    <Card.Body className='d-flex flex-column align-items-start justify-content-between'>
                        <Card.Text className='txt-white'>
                            Discover top talent effortlessly. Hire in Hurry connects you with skilled professionals for seamless hiring, saving you time and resources.
                        </Card.Text>
                        <Button className="btn-secondary mt-3">Register as a Customer</Button>
                    </Card.Body>
                </Card>
                <div className='login-forms'>

                </div>
                <Card className='card-register text-end' style={{borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}}>
                    <Card.Body className='d-flex flex-column align-items-end justify-content-between'>
                        <Card.Text className='txt-white'>
                            Expand your reach. Join Hire in Hurry as a <span style={{fontWeight:600}}>vendor partner</span> and gain access to a vast pool of job opportunities, enhancing your business growth.
                        </Card.Text>
                        <Button className="btn-secondary mt-3">Register as a Vendor</Button>
                    </Card.Body>
                </Card>
                <img src={LoginImg} alt="banner img" className='card-img img-right' />
            </div>
        </section>
    )
}

export default Loginpage;