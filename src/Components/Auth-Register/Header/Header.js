import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import logo from '../../../assets/images/logo.png';
import './Header.css'
import { Link, NavLink } from 'react-router-dom';

const Header = ()=> {
    return (
        <header className='header-nav'>
            <Container fluid>
                <div className='d-flex align-items-center'>
                    <h1 className='header-logo'>  
                        <Link to='' className='d-block'><img src={logo} alt="hireinhurry" /></Link>
                    </h1>
                
                    <ul className='navbar-list'>
                        <li className='navbar-item'>
                            <NavLink to="" className={({isActive}) => isActive ? 'navbar-link active' : 'navbar-link' } end>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="about" className={({isActive}) => isActive ? 'navbar-link active' : 'navbar-link' }>About Us</NavLink>
                        </li>
                        <li>
                            <NavLink to="services" className={({isActive}) => isActive ? 'navbar-link active' : 'navbar-link' } >Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="contact" className={({isActive}) => isActive ? 'navbar-link active' : 'navbar-link' } >Contact Us</NavLink>
                        </li>
                        <li>
                            <NavLink to="blog" className={({isActive}) => isActive ? 'navbar-link active' : 'navbar-link' } >Blog</NavLink>
                        </li>
                    </ul>
                        
                    
                </div>
            </Container>
        </header>
    )
}

export default Header;