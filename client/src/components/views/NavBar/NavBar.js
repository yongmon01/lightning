import React from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';

import './Sections/NavBar.css';

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function NavBar(props) {

    const classes = useStyles();

    const user = useSelector(state => state.user)

    const logoutHandler = () =>{

        localStorage.removeItem('userId')

        axios.get('/api/users/logout')
        .then(response=>{
            if (response.data.success){
                props.history.push('/login')
            }
            else{
                alert('로그아웃 실패')
            }
        })
    }

    if (user.userData && !user.userData.isAuth) {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    
                    <Typography variant="h6" className={classes.title}>
                    <Button  ><a href='/' className="no-underline">Home</a></Button>
                    </Typography>
                    <Button  color="inherit"><a href='/login' className="no-underline">로그인</a></Button>
                    <Button color="inherit"><a href='/register' className="no-underline">회원가입</a></Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
      } 
    else {
        return (
            <AppBar position="static">
                <Toolbar>
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                
                <Typography variant="h6" className={classes.title}>
                <Button ><a href='/'>Home</a></Button>
                <Button ><a href='/writing/upload' style={{color:'white'}}>글쓰기</a></Button>
                <Button ><a href='/join/joinedPage' style={{color:'white'}}>내 활동</a></Button>
                </Typography>
                <Button onClick={logoutHandler} color="inherit">로그아웃</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(NavBar)
