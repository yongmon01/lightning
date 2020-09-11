import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import moment from 'moment';
import JoinNumber from '../LandingPage/Sections/JoinNumber'

import { createStyles, makeStyles} from '@material-ui/core/styles';
import Icons from '../LandingPage/Sections/Icons'

const { Title } = Typography;
const { Meta } = Card;

const useStyles = makeStyles((theme) =>
  createStyles({
    inb: {
        display:'inline-block', 
        lineHeight: 'normal',
        verticalAlign: 'middle'
    }
  })
);

function JoinedPage() {
    //initial state 는 empty array []
    const [Writings, setWritings] = useState([])

    const classes = useStyles();

    useEffect(() => {

        const JoinedWritings = {
            user: localStorage.getItem('userId')
        }

        axios.post('/api/writing/getJoinedWritings', JoinedWritings)
            .then(response => {
                if (response.data.success) {
                    setWritings(response.data.writings)
                } else {
                    alert('Failed to get writings')
                }
            })
    }, [])
//////
const renderCards = Writings.map((writing, index) => {

    return (
        <a key={index} href={`/writing/${writing._id}`} 
            style={{color:'black',width:'100%',height:'70px', lineHeight:'65px',
            borderBottom:'1px solid gray'}}>
            <div>
                <span className={classes.inb}  style={{width:'8%'}}>
                    {[<Icons sports={writing.category}/>]}
                </span>
                <span className={classes.inb} style={{ width:'8%'}}> {moment(writing.meetingDate).format("YY-MM-DD")} </span>
                <span className={classes.inb} style={{ width:'8%'}}> {writing.meetingTime} </span>
                <span className={classes.inb} style={{ width:'6%'}}> [{writing.locations}] </span>
                <span className={classes.inb} style={{ width:'6%'}}> [{writing.category}] </span>
                <span className={classes.inb} style={{ width:'37%'}}>{writing.title} </span>
                <span className={classes.inb} style={{width:'12%'}}>{writing.writer.name} </span>
                {/* <span className={classes.inb} style={{width:'10%',textAlign:'right'}}>12명 </span> */}
                <span >
                    {[<JoinNumber className={classes.inb} style={{width:'14%'}}
                        meeting={writing._id} user ={localStorage.getItem('userId')}/>]}
                </span>
            </div>
        </a>
    )
})

return (
    <div style={{ width: '75%', margin: 'auto' }}>
        <Title level={2} > My Meetings </Title>
        <hr />

        {renderCards}
    </div>
)
}

export default withRouter(JoinedPage)
