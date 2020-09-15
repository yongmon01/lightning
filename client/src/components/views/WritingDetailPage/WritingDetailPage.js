import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Join from './Section/Join'
import MapInfo from './Section/MapInfo'

const { kakao } = window;

function WritingDetailPage(props) {

    const writingId = props.match.params.writingId
    const [writingDetail, setWritingDetail] = useState([])
    const [number,setNumber] = useState(0)
//
    const variable = {
        writingId: writingId
    }

    useEffect(() => {
        if (number % 2 === 0){
            Axios.post('/api/writing/getWritingDetail', variable)
                .then(response => {
                    if (response.data.success) {
                        setWritingDetail(response.data.writingDetail)
                    } else {
                        alert('Failed to get writing Info')
                    }
                })
        }
        else{
            const mapContainer = document.getElementById("map");
            const mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };
            const map = new kakao.maps.Map(mapContainer, mapOption);
            const geocoder = new kakao.maps.services.Geocoder();

            geocoder.addressSearch(writingDetail.address, function(result, status) {

                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
            
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            
                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });
            
                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;">위치</div>'
                    });
                    infowindow.open(map, marker);
            
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                } 
            }); 
        }

    }, [number])

    // const mapContainer = document.getElementById("map");
    // const mapOption = {
    //     center: new kakao.maps.LatLng(33.450701, 126.570667),
    //     level: 3,
    // };
    // const map = new kakao.maps.Map(mapContainer, mapOption);
    // const geocoder = new kakao.maps.services.Geocoder();

    // geocoder.addressSearch(writingDetail.address, function(result, status) {

    //     // 정상적으로 검색이 완료됐으면 
    //      if (status === kakao.maps.services.Status.OK) {
    
    //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    
    //         // 결과값으로 받은 위치를 마커로 표시합니다
    //         var marker = new kakao.maps.Marker({
    //             map: map,
    //             position: coords
    //         });
    
    //         // 인포윈도우로 장소에 대한 설명을 표시합니다
    //         var infowindow = new kakao.maps.InfoWindow({
    //             content: '<div style="width:150px;text-align:center;padding:6px 0;">위치</div>'
    //         });
    //         infowindow.open(map, marker);
    
    //         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    //         map.setCenter(coords);
    //     } 
    // }); 
    
    if (writingDetail.writer) {
        return (
            <div style = {{maxWidth: '700px', margin: '2rem auto'}}>
            <div style = {{ textAlign: 'center', marginBottom: '1rem', fontSize:'32px'}}>
                <label><b>Meeting</b></label>
            </div>
                {number % 2 === 0 ? '' : 
                    <div className="map_wrap" style={{width:'100%',height:'450px'}}> 
                    <div id='map' style={{
                        width: '100%', 
                        height: '100%'
                    }}></div>
                    </div>
                }
                {/* <div className="map_wrap" style={{width:'100%',height:'450px'}}> 
                    <div id='map' style={{
                        width: '100%', 
                        height: '100%'
                    }}></div>
                </div> */}
                {/* {[<MapInfo address={writingDetail.address} />]} */}
                <br/>
                <button onClick={() => {
                        setNumber(number + 1)}} style={{width: '20%',display:'inline'}}>
                        {number % 2 === 0 ? '지도보기' : '지도숨기기'}
                </button>  
                <br/><br/>
                <label style ={{width:'20%'}}>{moment(writingDetail.meetingDate).format(
                    "YYYY년 MM월 DD일 / HH: mm")}</label>
                    
                <br/><br/>
                
                <div style ={{width:'100%', borderBottom:'1px solid gray', padding:'5px'}}><b>{writingDetail.title}</b></div>
                <br/>



                {/* <div className="map_wrap" style={{width:'100%',height:'450px'}}> 
                    <div id='map' style={{
                        width: '100%', 
                        height: '100%'
                    }}></div>
                    <div className="hAddr" style={{height:'36px',marginTop:'4px'}} >
                        <span className="title" >주소정보:   </span>
                        <span id="centerAddr"  
                            ></span>
                    </div>
                    
                </div> */}
                



                <div style ={{width:'100%', padding:'10px',border:'1px solid gray'
                    ,overflow: 'auto', height: '240px', borderRadius:'11px 0px 0px 11px'}}>{writingDetail.description}</div>
                <br/><br/>

                

                <label>지역       </label>
                <label>[{writingDetail.locations}]       </label>
                <br/><br/>

                <label>분류       </label>
                <label>[{writingDetail.category}]       </label>
                <br/>
                <br/><br/>

                <div>
                    {[<Join meeting={writingDetail._id} user ={localStorage.getItem('userId')}/>]}
                    {/* {[<Subscribe userTo={videoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>]} */}
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