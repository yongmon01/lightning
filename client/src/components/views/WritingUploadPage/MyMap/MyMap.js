import React, { useEffect,useState } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const { kakao } = window;

const MyMap = (props) => {

    const [CenterAddr, setCenterAddr] = useState("initial")
    const [SearchAddress, setSearchAddress] = useState("")
    const [number, setNumber] = useState(0);

    const onCenterAddrChange = (e) =>{
        setCenterAddr(e.currentTarget.value)
    }
    const onSearchAddressChange = (e) =>{
        setSearchAddress(e.currentTarget.value)
    }

    useEffect((props) => {
        
        const mapContainer = document.getElementById("map");
        const mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
       
        const geocoder = new kakao.maps.services.Geocoder();
        const marker = new kakao.maps.Marker() 
        const infowindow = new kakao.maps.InfoWindow({zindex:1});

        if (navigator.geolocation && number===0) {
    
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon)
                // 마커와 인포윈도우를 표시합니다
                marker.setPosition(locPosition);
                marker.setMap(map);
                map.setCenter(locPosition);

                searchDetailAddrFromCoords(locPosition, function(result, status) {
                    
                    if (status === kakao.maps.services.Status.OK) {
                        
                        if (!!result[0].road_address)
                            window.sessionStorage.setItem('road_address', result[0].road_address.address_name)
                        else   
                            window.sessionStorage.setItem('road_address', '')
                    
                        if (!!result[0].address.address_name)
                            window.sessionStorage.setItem('address', result[0].address.address_name)
                        else
                            window.sessionStorage.setItem('address', '')
                    }
                })
              });
            
        }


        if (number > 0){
            geocoder.addressSearch(SearchAddress, function(result, status) {

                if (status === kakao.maps.services.Status.OK) {
                    try{
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                
                        marker.setPosition(coords);
                        marker.setMap(map);
                        map.setCenter(coords);
                        console.log(result[0])//
                        if (!!result[0].road_address)
                            window.sessionStorage.setItem('road_address', result[0].road_address.address_name)
                        else   
                            window.sessionStorage.setItem('road_address', '')
                        
                        if (result[0].address.address_name !== "")
                            window.sessionStorage.setItem('address', result[0].address.address_name)
                        else
                            window.sessionStorage.setItem('address', '')
                    }
                    catch{
                        alert('주소를 정확히 입력해주세요')
                    }
                } 
            }); 
        }
  
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
            searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                console.log(result[0])//
                if (status === kakao.maps.services.Status.OK) {
                    
                    var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                    detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                    
                    var content = '<div class="bAddr" style="padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">' +
                                    '<span class="title" style="font-weight:bold;display:block;">주소정보</span>' + 
                                    detailAddr + 
                                '</div>';
                                
                    // 마커를 클릭한 위치에 표시합니다 
                    marker.setPosition(mouseEvent.latLng);
                    marker.setMap(map);
        
                    // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시합니다
                    infowindow.setContent(content);
                    infowindow.open(map, marker);

                    if (!!result[0].road_address)
                        window.sessionStorage.setItem('road_address', result[0].road_address.address_name)
                    else   
                        window.sessionStorage.setItem('road_address', '')
                    
                    if (result[0].address.address_name !== "")
                        window.sessionStorage.setItem('address', result[0].address.address_name)
                    else
                        window.sessionStorage.setItem('address', '')

                }   
            });
        });

        kakao.maps.event.addListener(map, 'idle', function() {
            searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });

        function searchAddrFromCoords(coords, callback) {
            // 좌표로 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
        }

        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const infoDiv = document.getElementById('centerAddr');
        
                for(var i = 0; i < result.length; i++) {
                    infoDiv.innerHTML = result[i].address_name;
                }
            }    
        }

    }, [number]);

    
    return (
        <div className="map_wrap" style={{width:'100%',height:'450px'}}> 
            <div id='map' style={{
                width: '100%', 
                height: '100%'
            }}></div>
            <div className="hAddr" style={{height:'36px',marginTop:'4px'}} >
                <span className="title" >주소정보:   </span>
                <span id="centerAddr"  
                    onChange = {onCenterAddrChange} value = {CenterAddr}></span>
            </div>
            
            <Grid container>
                <Grid item xs={5} sm={4}>
                    <TextField onChange = {onSearchAddressChange} value = {SearchAddress} 
                    placeholder="주소 검색"/>
                </Grid>
                <Grid item xs={5} sm={4}>
                    <Button variant="outlined" color="primary" onClick={() => {
                        setNumber(number + 1)}} style={{width: '20%',display:'inline'}}>
                        검색
                    </Button>                    
                </Grid>
            </Grid>
                
        </div>
        
    );
}

export default withRouter(MyMap); 

