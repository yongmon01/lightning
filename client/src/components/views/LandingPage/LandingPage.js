import React,{useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response=>console.log(response.data))
    }, [])
    return (
        // <div style = {{
        //     display: 'flex', justifyContent: 'center', alignItems: 'center',
        //     width: '100%', height: '100vh'
        // }}>
        <div>
            This is landing page!~!
        </div>
    )
}

export default withRouter(LandingPage)
