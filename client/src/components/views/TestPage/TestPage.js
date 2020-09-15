import React, { useEffect,useState } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

const { kakao } = window;

const TestPage = () => {

    const [CenterAddr, setCenterAddr] = useState("initial")
    const onCenterAddrChange = (e) =>{
        setCenterAddr(e.currentTarget.value)
    }

    const [WritingTitle, setWritingTitle] = useState("w")
    const onTitleChange = (e) =>{
        setWritingTitle(e.currentTarget.value)

    }

    
    useEffect(() => {

      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);
  
      const ps = new kakao.maps.services.Places();

      const geocoder = new kakao.maps.services.Geocoder();
  
      const marker = new kakao.maps.Marker() // 클릭한 위치를 표시할 마커입니다
      const infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
  
//
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
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
            }   
        });
    });

    kakao.maps.event.addListener(map, 'idle', function() {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
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
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === 'H') {
                    infoDiv.innerHTML = result[i].address_name;
                    break;
                }
            }
        }    
    }


    }, []);



    return (
        <div className="map_wrap" style={{width:'70%',height:'350px'}}> 
            <div id='map' style={{
                width: '100%', 
                height: '100%'
            }}></div>
            <div className="hAddr" >
                    {/* position:'absolute',left:'10px',top:'40px',borderRadius: '4px',
                background:'#fff',background:'rgba(255,255,255,0.8)',Zindex:1, padding:'5px' */}
                <span className="title" >주소정보</span>
                <br/>
                <span id="centerAddr" style={{display:'block',marginTop:'2px',fontWeight: 'normal'}} onChange = {onCenterAddrChange} value = {CenterAddr}>a</span>
                <br/>

                <br/>
            </div>
            <TextField onChange = {onTitleChange} value = {WritingTitle} label="제목" variant="outlined"
                style={{width:'98%'}} />
        </div>
        
    );
}

export default withRouter(TestPage); 

