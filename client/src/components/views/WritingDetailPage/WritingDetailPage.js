import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import Join from './Section/Join'
import MapInfo from './Section/MapInfo'

const { kakao } = window;

function WritingDetailPage(props) {

    const writingId = props.match.params.writingId
    const [writingDetail, setWritingDetail] = useState([])

    const variable = {
        writingId: writingId
    }

    useEffect(() => {
        Axios.post('/api/writing/getWritingDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setWritingDetail(response.data.writingDetail)
                } else {
                    alert('Failed to get writing Info')
                }
            })
    }, [])
    
    if (writingDetail.writer) {
        return (
            <div style = {{maxWidth: '700px', margin: '2rem auto'}}>
            <div style = {{ textAlign: 'center', marginBottom: '1rem', fontSize:'32px'}}>
                <label><b>Meeting</b></label>
            </div>
                <MapInfo address={writingDetail.address} /><br/><br/>

                <label style ={{width:'20%'}}>{moment(writingDetail.meetingDate).format(
                    "YYYY년 MM월 DD일 / HH: mm")}</label>

                <label style={{marginLeft:'60px'}}>지역</label>
                <label>[{writingDetail.locations}]</label>

                <label style={{marginLeft:'10px'}}>분류</label>
                <label>[{writingDetail.category}]</label><br/><br/>

                <div style ={{width:'100%', borderBottom:'1px solid gray', padding:'5px'}}><b>{writingDetail.title}</b></div><br/>

                <div style ={{width:'100%', padding:'10px',border:'1px solid gray',
                    overflow: 'auto', height: '240px', borderRadius:'11px 0px 0px 11px'}}>{writingDetail.description}</div><br/><br/>

                <div>
                    {[<Join meeting={writingDetail._id} user ={localStorage.getItem('userId')}/>]}
                </div>
            </div>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
}


export default withRouter(WritingDetailPage)