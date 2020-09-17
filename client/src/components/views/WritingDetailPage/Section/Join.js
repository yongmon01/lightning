import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

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
                    alert('Failed to get joined number')
                }
            })
        
        Axios.post('/api/join/Joined', JoinedNumberVariable)
            .then(response=>{
                if(response.data.success){
                    setJoined(response.data.joined)
                }
                else{
                    alert('Failed to get joined')
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
                        alert('Failed to cancel join')
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
                        alert('Failed to join')
                    }
                })
        }
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={onJoin}
                    style={{width: '20%', display: 'block', marginLeft:'auto', marginRight:'auto',
                    backgroundColor: `${Joined ? 'gray': '#0000FF'}`,}}>
                    {JoinedNumber} {Joined ? 'JOINED' : 'JOIN'}
            </Button>
        </div>
    )
}

export default withRouter(Join)