import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

function Join(props) {

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
                    alert('참가수 정보 받아오기 실패')
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

    const onJoin = () => {

        let JoinedVariable = {
            meeting: meeting,
            user: user
        }
        if (Joined){
            Axios.post('/api/join/cancelJoin',JoinedVariable)
                .then(response => {
                    if(response.data.success){
                        setJoinedNumber(JoinedNumber - 1)
                        setJoined(!Joined)
                    }
                    else{
                        alert('failed to cancel join')
                    }
                })
        }
        else{
            Axios.post('/api/join/join',JoinedVariable)
                .then(response => {
                    if(response.data.success){
                        setJoinedNumber(JoinedNumber + 1)
                        setJoined(!Joined)
                    }
                    else{
                        alert('참여 실패')
                    }
                })

        }
    }

    return (
        <div>
            <button style = {{
                backgroundColor: `${Joined ? '#AAAAAA': '#CC0000'}`, borderRadius: '4px',
                color: 'white', padding: '10px 16px',
                fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}
            onClick = {onJoin}
            >
                {JoinedNumber} {Joined ? 'Joined' : 'Join'}
            </button>
        </div>
    )
}

export default withRouter(Join)