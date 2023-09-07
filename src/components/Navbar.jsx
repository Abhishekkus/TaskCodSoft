import React,{useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link,  useNavigate, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as actionType from '../constants/actionTypes';
import jwtDecode from 'jwt-decode';

const linkCSS={
  textDecoration:'none',
  color:'white',
  fontWeight:'400'
}

export default function Navbar() {
 const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const location = useLocation();

 const logout = () => {
  dispatch({ type: actionType.LOGOUT });
  navigate('/login');
  setUser(null);
  localStorage.removeItem('profile');
};

const checkTokenExpiration = () => {
  const token = user?.token;

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      logout();
    }
  }
};

useEffect(() => {
  checkTokenExpiration();
  setUser(JSON.parse(localStorage.getItem('profile')));
}, [location]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor:' #424854'}}>
        <Toolbar>
          <img src="./job.png" style={{width:"25px", height:'25px'}}/> &nbsp;&nbsp;&nbsp;
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JOB PORTAL
          </Typography>
 
          
          {user ? (<>
          
           
            <Button color="inherit"><Link to="/" exact style={linkCSS}>Home</Link></Button>
          <Button color="inherit"><Link to="/joblist" exact style={linkCSS}>Jobs</Link></Button>
          <Button color="inherit"><Link to="/dashboard" exact style={linkCSS}>DashBoard</Link></Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Typography sx={{backgroundColor:'white', color:"black", padding:'0.3rem', borderRadius:'0.3rem'}}>{user?.result.name}</Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button color="inherit" variant="outlined" onClick={logout}>LogOut</Button>
          </>
          ): (<>
            <Button color="inherit"><Link to="/login" exact style={{textDecoration:'none', color:'white'}}>Login</Link></Button>
          <Button color="inherit"><Link to="/signup" exact style={{textDecoration:'none', color:'white'}}>SignUp</Link></Button>
          </>
          )}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
