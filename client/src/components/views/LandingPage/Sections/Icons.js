import React from 'react'
import { withRouter } from 'react-router-dom';
import SportsSoccerTwoToneIcon from '@material-ui/icons/SportsSoccerTwoTone';
import SportsBasketballTwoToneIcon from '@material-ui/icons/SportsBasketballTwoTone';
import SportsBaseballTwoToneIcon from '@material-ui/icons/SportsBaseballTwoTone';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

function Icons(props) {

    const sports = props.sports

    if (sports==="축구")
        return (
            <span>
                <SportsSoccerTwoToneIcon/>
            </span>
        )
    else if (sports==="농구")
        return (
            <span style={{color: '#CC6600', width: '10%'}}>
                <SportsBasketballTwoToneIcon/>
            </span>
        )
    else if (sports==="야구")
        return (
            <span style={{color: '#808080'}}>
                <SportsBaseballTwoToneIcon/>
            </span>
        )
    else if (sports==="족구")
        return (
            <span style={{color: '#0000CC'}}>
                <SportsSoccerTwoToneIcon/>
            </span>
        )
    else
        return(
            <span style={{color: '#006633'}}>
                <DirectionsRunIcon/>
            </span>
        )
}

export default withRouter(Icons)