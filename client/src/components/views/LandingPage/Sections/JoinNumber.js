import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

function JoinNumber(props) {

    const meeting = props.meeting
    const user = props.user

    const [JoinedNumber, setJoinedNumber] = useState(0)
    const [Joined, setJoined] = useState(false)

    useEffect(() => {
        
        let JoinedNumberVariable = {meeting: meeting, user:
            user}
        
        Axios.post('/api/join/JoinedNumber',JoinedNumberVariable)
            .then(response=>{
                if(response.data.success){
                    setJoinedNumber(response.data.joinedNumber)
                }
                else{
                    alert('구독자수 정보 받아오기 실패')
                }
            })
        
        Axios.post('/api/join/Joined', JoinedNumberVariable)
            .then(response=>{
                if(response.data.success){
                    setJoined(response.data.joined)
                }
                else{
                    alert('정보받아오기 실패')
                }
            })
    }, [])

    if (!Joined){
        return (
            <span>
                {JoinedNumber} &nbsp;&nbsp;&nbsp;
                <b><span >Join</span></b>
            </span>
        )
    }
    else
        return (
            <span>
                {JoinedNumber} &nbsp;&nbsp;&nbsp;
                <b><span style ={{color:'red'}}>
                    Joined</span></b>
            </span>
        )
}

export default withRouter(JoinNumber)