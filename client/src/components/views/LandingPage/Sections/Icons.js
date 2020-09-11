import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import SportsSoccerTwoToneIcon from '@material-ui/icons/SportsSoccerTwoTone';
import SportsBasketballTwoToneIcon from '@material-ui/icons/SportsBasketballTwoTone';
import SportsBaseballTwoToneIcon from '@material-ui/icons/SportsBaseballTwoTone';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { rgbToHex } from '@material-ui/core';

function Icons(props) {

    const sports = props.sports

    // const [JoinedNumber, setJoinedNumber] = useState(0)
    // const [Joined, setJoined] = useState(false)
    if (sports=="축구")
        return (
            <span>
                <SportsSoccerTwoToneIcon/>
            </span>
        )
    else if (sports=="농구")
        return (
            <span style={{color: '#CC6600', width: '10%'}}>
                <SportsBasketballTwoToneIcon/>
            </span>
        )
    else if (sports=="야구")
        return (
            <span style={{color: '#808080'}}>
                <SportsBaseballTwoToneIcon/>
            </span>
        )
    else if (sports=="족구")
        return (
            <span style={{color: '#0000CC'}}>
                <SportsSoccerTwoToneIcon/>
            </span>
        )
    else
        return(
            <span>
                <DirectionsRunIcon/>
            </span>
        )
}

export default withRouter(Icons)