import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

function RegisterPage(props) {

    const dispatch = useDispatch();
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {

        event.preventDefault();

        if (Password !== ConfirmPassword )
            return alert('비밀번호가 일치하지않습니다')

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response=>{
                if (response.payload.success){
                    alert('회원가입에 성공하셨습니다')
                    props.history.push('/login')
                }
                else {
                    alert('Failed to Sign Up')
                }
            })
    }

    return (

        <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh'}}> 
            <div style={{display:'flex', flexDirection: 'column'}}>
                <FormControl onSubmit = {onSubmitHandler}>
                    
                    <br/><br/>
                    <div style={{ width:'300px'}}></div><br/>

                    <label>Email</label>
                    <TextField type = "email" value={Email} onChange={onEmailHandler}/><br/>

                    <label>Name</label>
                    <TextField type = "text" value={Name} onChange={onNameHandler}/><br/>
                    
                    <label>Password</label>
                    <TextField type = "password" value={Password} onChange={onPasswordHandler}/><br/>

                    <label>Confirm password</label>
                    <TextField type = "password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/><br/><br/>

                    <Button  variant="contained" color="primary" onClick = {onSubmitHandler}
                        style={{width:'50%',marginLeft:'auto',marginRight:'auto'}}>
                        회원가입
                    </Button>
                </FormControl>
            </div>
        </div>
    )
}

export default withRouter(RegisterPage)

