import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import Icons from './Sections/Icons';
import JoinNumber from './Sections/JoinNumber'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    inb: {
        display:'inline-block', 
        lineHeight: 'normal',
        verticalAlign: 'middle'
    },
    btn: {
        marginLeft:'3px',
        marginRight:'3px'
    }
  })
);

function LandingPage(props) {

    const [Writings, setWritings] = useState([])
    const classes = useStyles();
    const [Category, setCategory] = useState("All")

    useEffect(() => {
        var rts = "/api/writing/getWritings" + Category
        axios.get(rts)
        .then(response => {
            if (response.data.success) {
                setWritings(response.data.writings)
            } else {
                alert('Failed to get Writings')
            }
        })
    }, [Category])

    Writings.sort((a, b) => moment(a.meetingDate) > moment(b.meetingDate) ? 1 : -1)

    const renderCards = Writings.map((writing, index) => {

        return (
            <a key={index} href={`/writing/${writing._id}`} 
                style={{color:'black',width:'100%',height:'70px', lineHeight:'65px',
                borderBottom:'1px solid gray',textDecoration:'none'}}>
                <div>
                    <span className={classes.inb}  style={{width:'8%'}}>
                    {[<Icons sports={writing.category}/>]}
                    </span>
                    <span className={classes.inb} style={{ width:'12%'}}> 
                        {moment(writing.meetingDate).format("YY-MM-DD / HH: mm")}
                    </span>
                    <span className={classes.inb} style={{ width:'6%'}}> [{writing.locations}] </span>
                    <span className={classes.inb} style={{ width:'6%'}}> [{writing.category}] </span>
                    <span className={classes.inb} style={{ width:'41%'}}>{writing.title} </span>
                    <span className={classes.inb} style={{width:'12%'}}>{writing.writer.name} </span>
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
            <br/>
            <h2 > <b>Meetings</b>
                <Button className={classes.btn} style={{backgroundColor: `${Category==="All" ? 'gray': 'white'}`}}
                    onClick={() => {setCategory("All")}}>ALL</Button>
                <Button className={classes.btn} style={{backgroundColor: `${Category==="Soccer" ? '#3399FF': 'white'}`}}
                    onClick={() => {setCategory("Soccer")}}>축구</Button> 
                <Button className={classes.btn} style={{backgroundColor: `${Category==="SoccerTennis" ? '#0000FF': 'white'}`,
                    color: `${Category==="SoccerTennis" ? 'white': 'black'}`}}
                    onClick={() => {setCategory("SoccerTennis")}}>족구</Button>
                <Button className={classes.btn} style={{backgroundColor: `${Category==="Basketball" ? '#CC6600': 'white'}`}} 
                    onClick={() => {setCategory("Basketball")}}>농구</Button>
                <Button className={classes.btn} style={{backgroundColor: `${Category==="Baseball" ? '#808080': 'white'}`,
                    color: `${Category==="Baseball" ? 'white': 'black'}`}}
                    onClick={() => {setCategory("Baseball")}}>야구</Button> 
                <Button className={classes.btn} style={{backgroundColor: `${Category==="Running" ? '#006633': 'white'}`}}
                    onClick={() => {setCategory("Running")}}>러닝</Button> 
            </h2>
            <hr />

            {renderCards}
        </div>
    )
}

export default withRouter(LandingPage)
