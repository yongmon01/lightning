import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
// import Axios from 'axios';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {

        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response=>{
                if (response.payload.loginSuccess){
                    window.localStorage.setItem('userId', response.payload.userId);
                    props.history.push('/')
                }
                else {
                    alert('로그인 실패')
                }
            })
    }

    return (
        
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '80vh'}}> 
            
            <div style={{display:'flex', flexDirection: 'column'}}>
                <FormControl onSubmit = {onSubmitHandler} style={{}}>
                    
                    <br/><br/>
                    <img src={ require('../../../images/img_ball.jpg') } style={{ width:'400px', height:'280px'}} /><br/>

                    <label style={{width:'70%',marginLeft:'auto',marginRight:'auto'}}>Email</label>
                    <TextField type = "email" value={Email} onChange={onEmailHandler} style={{width:'70%',marginLeft:'auto',marginRight:'auto'}}/><br/>
                    
                    <label style={{width:'70%',marginLeft:'auto',marginRight:'auto'}}>password</label>
                    <TextField type = "password" value={Password} onChange={onPasswordHandler}
                        style={{width:'70%',marginLeft:'auto',marginRight:'auto'}} /><br/>

                    <Button  variant="contained" color="primary" onClick = {onSubmitHandler}
                        style={{width:'70%',marginLeft:'auto',marginRight:'auto'}}>
                        로그인
                    </Button><br/>

                    <Button  variant="contained" color="primary"
                        style={{width:'70%',marginLeft:'auto',marginRight:'auto'}}>
                        <a href='/register' style={{color:'white'}}>회원가입</a>
                    </Button>
        
                </FormControl>
            </div>
        </div>
    )
}

export default withRouter(LoginPage)
