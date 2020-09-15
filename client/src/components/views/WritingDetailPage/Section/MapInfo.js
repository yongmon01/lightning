import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
const { kakao } = window;

const MapInfo = (props) => {

    const address = props.address

    useEffect((props) => {
        const mapContainer = document.getElementById("map");
        const geocoder = new kakao.maps.services.Geocoder();
        const marker = new kakao.maps.Marker() // 클릭한 위치를 표시할 마커입니다
        
        geocoder.addressSearch(address, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
             if (status === kakao.maps.services.Status.OK) {
                const mapOption = {
                    center: new kakao.maps.LatLng(result[0].y, result[0].x),
                    level: 3,
                }
                const map = new kakao.maps.Map(mapContainer, mapOption);
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
                marker.setPosition(coords);
                marker.setMap(map);
        
                map.setCenter(coords);
            } 
        }); 
    })

    return(
        <div style={{width:'100%',height:'410px'}}>
            {address}
            <div id='map' style={{
                width: '100%', 
                height: '100%'
            }}></div>
        </div>
    )
}

export default withRouter(MapInfo)