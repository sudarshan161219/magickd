import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import styles from "./navbar.module.css"
import { useEffect, useState } from "react"
import logo from "../../assets/logo.png"
import { useAppContext } from "../../context/Context";
import { BiMenu } from "react-icons/bi"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AiOutlineSearch } from "react-icons/ai"


const Navbar = () => {
  const { toggleMenu, toggleProfileMenu, toggleAuthModalFn, toggleAuthModal, user, QlogoutUser } = useAppContext()
  const [scrollPosition, setScrollPosition] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`/api/search?search=${search}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    if (search !== '') {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [search]);


  const open = Boolean(anchorEl);
  // const open1 = Boolean(anchorEl1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const location = useLocation()

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    if (toggleMenu || toggleProfileMenu || toggleAuthModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toggleMenu, toggleProfileMenu, toggleAuthModal]);


  const pathName1 = '/Terms-and-Conditions'
  const pathName2 = "/Privacy-Policy"
  const pathName3 = '/Cookie-Policy'
  const pathName4 = "/payment_success"

  if (location.pathname === pathName4) {
    return null
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const clearProducts = () => {
    setProducts([])
  }

  return (
    // <nav
    //   className={
    //     `${scrollPosition > 100 ? ` ${styles.stickyNav}` : `${styles.container}`}`
    //   }>
    <nav
      className={
        styles.container
      }>
      <div className={styles.LogoContainer}>
        <Link to="/" ><img className={styles.logo} src={logo} alt="logo" /></Link>
      </div>

      {
        location.pathname === pathName1 || location.pathname === pathName2 || location.pathname === pathName3 ? null :
          <div className={styles.search} >
            <AiOutlineSearch className={styles.icon} />
            <input className={styles.input} type="text" onChange={handleInputChange} placeholder="Search Images" name="" id="" />
            {products && products.length !== 0 ?
              <div className={styles.searchItem} >
                {products.map((item) => (
                  <Link onClick={clearProducts} className={styles.links} to={`/explore/?category=${item.category}`} key={item._id}>{item.category}</Link>
                ))}
              </div>
              :
              null
            }
          </div>
      }


      <div className={styles.flexContainer}>
        <div className={styles.firstChild}>
          {user && Object.keys(user).length !== 0 ?
            null
            :
            <button className={styles.authBtn} onClick={toggleAuthModalFn}>Log in</button>

          }
        </div>
        <div className={styles.mdContainer}>
          <Link to="/Blog" className={styles.mdLinks}>Blog</Link>
          <span className={styles.mdLinks} >|</span>
          <Link to="/explore" className={styles.mdLinks}>Explore</Link>
        </div>
        <div className={styles.imgContainer}>
          {user && Object.keys(user).length !== 0 &&
            <Link to='user-profile' className={styles.imgContainer}>
              <img className={styles.img} onClick={handleClick1} src={user.userImg} alt={user.name} />
            </Link>
          }
        </div>
        <div className={styles.mdContainer}>

          <BiMenu id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined} onClick={handleClick} className={styles.icon} />
          <Menu
            sx={{ width: '50%', flexShrink: 0 }}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Company</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MenuItem onClick={handleClose}>
                  <Link className={styles.link} to="/">Home</Link>
                </MenuItem>


                <MenuItem onClick={handleClose}>
                  <Link className={styles.link} to="/AboutUs">About</Link>
                </MenuItem>


                <MenuItem onClick={handleClose}>
                  <Link className={styles.link} to="/Blog"> Blog</Link>
                </MenuItem>

                {/* <MenuItem onClick={handleClose}>
                  <Link className={styles.link} to="/Portfolio">portfolio</Link>
                </MenuItem> */}
                <MenuItem onClick={handleClose}>
                  <Link className={styles.link} to="/ContactUs">Contact us</Link>
                </MenuItem>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Product</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MenuItem onClick={handleClose}>
                  <Link className={styles.link} to="/">Explore</Link>
                </MenuItem>
              </AccordionDetails>
            </Accordion>


            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Legal</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MenuItem onClick={handleClose}>
                  <Link className={styles.link} to="/Privacy-Policy">Privacy & Policy</Link>
                </MenuItem>


                <MenuItem onClick={handleClose}>
                  <Link className={styles.link} to="/Terms-and-Conditions ">Terms & Conditions</Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <Link className={styles.link} to="/Cookie-Policy">Cookie Policy</Link>
                </MenuItem>
              </AccordionDetails>
            </Accordion>

            {
              user && Object.keys(user).length !== 0 ? null :
                <div className={styles.menuItem} >
                  <MenuItem onClick={handleClose}>
                    <button className={styles.authBtn} onClick={toggleAuthModalFn}>Log In</button>
                  </MenuItem>
                </div>}
          </Menu>
        </div>
      </div>

    </nav >
  )
}

export default Navbar