import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import Icons from './Sections/Icons';
import JoinNumber from './Sections/JoinNumber'
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    inb: {
        display:'inline-block', 
        lineHeight: 'normal',
        verticalAlign: 'middle'
    }
  })
);

function LandingPage(props) {

    const [Writings, setWritings] = useState([])

    const classes = useStyles();

    useEffect(() => {
        axios.get('/api/writing/getWritings')
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.writings)//writings
                    setWritings(response.data.writings)
                } else {
                    alert('Failed to get Writings')
                }
            })
    }, [])

    const renderCards = Writings.sort((a, b) => moment(a.meetingDate) > moment(b.meetingDate) ? 1 : -1)
        .map((writing, index) => {

            return (
            <a key={index} href={`/writing/${writing._id}`} 
                style={{color:'black',width:'100%',height:'70px', lineHeight:'65px',
                borderBottom:'1px solid gray'}}>
                <div>
                    <span className={classes.inb}  style={{width:'8%'}}>
                        {[<Icons sports={writing.category}/>]}
                    </span>
                    <span className={classes.inb} style={{ width:'12%'}}> 
                        {moment(writing.meetingDate).format("YY-MM-DD / HH: mm")}
                        </span>
                    {/* <span className={classes.inb} style={{ width:'8%'}}> {writing.meetingTime} </span> */}
                    <span className={classes.inb} style={{ width:'6%'}}> [{writing.locations}] </span>
                    <span className={classes.inb} style={{ width:'6%'}}> [{writing.category}] </span>
                    <span className={classes.inb} style={{ width:'41%'}}>{writing.title} </span>
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
            <h2 > <b>Meetings</b> </h2>
            <hr />
            {renderCards}
            <Pagination count={5} color="primary"></Pagination>
        </div>
    )
}

export default withRouter(LandingPage)
