import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("initialState")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        //페이지 새로고침 방지
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response=>{
                if (response.payload.loginSuccess){
                    props.history.push('/')
                }
                else {
                    alert('Error')
                }
            })
    }

    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            
            <form style = {{display:'flex', flexDirection: 'column'}}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type = "email" value={Email} onChange={onEmailHandler} />
                <label>password</label>
                <input type = "password" value={Password} onChange={onPasswordHandler} />

                <br/>
                <button type = "submit">Login</button>
            </form>

        </div>
    )
}

export default withRouter(LoginPage)
