import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import styles from "./navbar.module.css"
import { useEffect, useState } from "react"
import logov1 from "../../assets/logov1.webp"
import logov2 from "../../assets/logov2.webp"
import { useAppContext } from "../../context/Context";
import { BiMenu } from "react-icons/bi"
import {
  BsSun,
  BsMoon
} from "react-icons/bs"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const sxS = {
  // backgroundColor: 'var(--softBg)',
  color: ['var(--softTextColor)'],
  width: '50%', 
  flexShrink: 0,
  padding: '0'
}

const sxxs = {
    backgroundColor: 'var(--softBg)',
    color: ['var(--softTextColor)'],
}

const Navbar = () => {
  const { toggleMenu, toggleProfileMenu, toggleAuthModalFn, toggleAuthModal, user, toggleThemefn } = useAppContext()
  const [scrollPosition, setScrollPosition] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [alignment, setAlignment] = useState('light');

  const [colorScheme, setColorScheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const theme = localStorage.getItem("theme")

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };


  const handleTChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      toggleThemefn(newAlignment)
      console.log(newAlignment);
    }
  };

  const handleClear = () => {
    setSearch('')
  }


  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setAlignment(theme)
    const handleChange = (e) => {
      setColorScheme(e.matches ? 'dark' : 'light');
      toggleThemefn(e.matches ? 'dark' : 'light')
    };
    mediaQuery.addEventListener('change', handleChange);
    if (!theme) {
      toggleThemefn(mediaQuery.matches ? 'dark' : 'light')
    }
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

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
  const pathName5 = "/Blog"
  const pathName6 = "/ContactUs"
  const pathName7 = "/AboutUs"
  const pathName8 = "/user-profile"


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
    <nav
      className={
        styles.container
      }>
      <div className={styles.LogoContainer}>
        <Link to="/" ><img className={styles.logo} src={theme === 'light' ? logov2 : logov1} alt="logo" /></Link>
      </div>

      {
        location.pathname === pathName1 ||
          location.pathname === pathName2 ||
          location.pathname === pathName3 ||
          location.pathname === pathName4 ||
          location.pathname === pathName5 ||
          location.pathname === pathName6 ||
          location.pathname === pathName7 ||
          location.pathname === pathName8 
         
          ? null :
          <div className={styles.search} >
            <AiOutlineSearch className={styles.icon} />
            {search && <AiOutlineClose onClick={handleClear} className={styles.cicon} />}

            <input className={styles.input} type="text" value={search} onChange={handleInputChange} placeholder="Search Images" />
            {products && products.length !== 0 ?
              (search &&
                (
                  <div className={styles.searchItem} >
                    {products.map((item) => (
                      <Link onClick={clearProducts} className={styles.links} to={`/explore/?category=${item.category}`} key={item._id}>{item.category}</Link>
                    ))}
                  </div>
                )
              )
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

        {user && Object.keys(user).length !== 0 && <div className={styles.imgContainer}>
          {user && Object.keys(user).length !== 0 &&
            <Link to='user-profile' className={styles.imgContainer}>
              <img className={styles.img} onClick={handleClick1} src={user.userImg} alt={user.name} />
            </Link>
          }
        </div>}
        <div className={styles.mdContainer}>

          <BiMenu
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined} onClick={handleClick} className={styles.icon} />
          <Menu
            sx={sxS}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            <Accordion sx={sxxs} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={styles.eIcon} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Company</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{
                '& .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root': {
                  padding: '5px',
                },
              }}>
                <MenuItem sx={{
                  padding: '5px',
                  '.css-1e9fcvw-MuiAccordionDetails-root': {
                    padding: '5px',
                  },
                }} onClick={handleClose}>
                  <Link className={styles.link} to="/">Home</Link>
                </MenuItem>


                <MenuItem sx={{
                  padding: '5px',
                  '.css-1e9fcvw-MuiAccordionDetails-root': {
                    padding: '5px',
                  },
                }} onClick={handleClose}>
                  <Link className={styles.link} to="/AboutUs">About</Link>
                </MenuItem>


                <MenuItem sx={{
                  padding: '5px',
                  '.css-1e9fcvw-MuiAccordionDetails-root': {
                    padding: '5px',
                  },
                }} onClick={handleClose}>
                  <Link className={styles.link} to="/Blog"> Blog</Link>
                </MenuItem>


                <MenuItem sx={{
                  padding: '5px',
                  '.css-1e9fcvw-MuiAccordionDetails-root': {
                    padding: '5px',
                  },
                }} onClick={handleClose}>
                  <Link className={styles.link} to="/ContactUs">Contact us</Link>
                </MenuItem>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={sxxs} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={styles.eIcon} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Product</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MenuItem sx={{
                  padding: '5px',
                  '.css-1e9fcvw-MuiAccordionDetails-root': {
                    padding: '5px',
                  },
                }} onClick={handleClose}>
                  <Link className={styles.link} to="/">Explore</Link>
                </MenuItem>
              </AccordionDetails>
            </Accordion>


            <Accordion sx={sxxs} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={styles.eIcon} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0, }}>Legal</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MenuItem sx={{
                  padding: '5px',

                  '.css-1e9fcvw-MuiAccordionDetails-root': {
                    padding: '5px',
                  },
                }} onClick={handleClose}>
                  <Link className={styles.link} to="/Privacy-Policy">Privacy & Policy</Link>
                </MenuItem>


                <MenuItem sx={{
                  padding: '5px',
                  '.css-1e9fcvw-MuiAccordionDetails-root': {
                    padding: '5px',
                  },
                }} onClick={handleClose}>
                  <Link className={styles.link} to="/Terms-and-Conditions ">Terms & Conditions</Link>
                </MenuItem>

                <MenuItem sx={{
                  padding: '5px',
                  '.css-1e9fcvw-MuiAccordionDetails-root': {
                    padding: '5px',
                  },
                }} onClick={handleClose}>
                  <Link className={styles.link} to="/Cookie-Policy">Cookie Policy</Link>
                </MenuItem>
              </AccordionDetails>
            </Accordion>



            <Accordion sx={sxxs} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={styles.eIcon} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Appearance</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0px 10px 10px 10px'
                }}
              >
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleTChange}
                  aria-label="Platform"
                  fullWidth
                  sx={{
                    display: 'flex',
                    outline: '1px solid var(--softTextColor)',
                    justifyContent: 'center',
                  }}
                >
                  <ToggleButton value="light"   ><BsSun className={styles.eIcon} /></ToggleButton>
                  <ToggleButton value="dark" >< BsMoon className={styles.eIcon} /> </ToggleButton>
                </ToggleButtonGroup>
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