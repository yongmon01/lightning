import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
//import searchPlace from './SearchPlace';

const { kakao } = window;

const TestPage = ({ searchPlace }) => {
    // useEffect(() => {
      
    //   const container = document.getElementById("myMap");
    //   const options = {
    //     center: new kakao.maps.LatLng(33.450701, 126.570667),
    //     level: 3,
    //   };
    //   const map = new kakao.maps.Map(container, options);
  
    //   const ps = new kakao.maps.services.Places();
  
    //   ps.keywordSearch(searchPlace, placesSearchCB);
  
    //   function placesSearchCB(data, status, pagination) {
    //     if (status === kakao.maps.services.Status.OK) {
    //       let bounds = new kakao.maps.LatLngBounds();
  
    //       for (let i = 0; i < data.length; i++) {
    //         displayMarker(data[i]);
    //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //       }
  
    //       map.setBounds(bounds);
    //     }
    //   }
  
    //   function displayMarker(place) {
    //     let marker = new kakao.maps.Marker({
    //       map: map,
    //       position: new kakao.maps.LatLng(place.y, place.x),
    //     });
    //   }
    // }, [searchPlace]);

    return (
        <div style={{width: '700px', 
        height: '700px', marginTop:'100px'}}>
        <div id='myMap' style={{
            width: '500px', 
            height: '500px'
        }}></div>
        </div>
        
    );
}

export default withRouter(TestPage); 
///
///







// /*global kakao*/
// import React from 'react';
// import { withRouter } from 'react-router-dom';

// class TestPage extends React.Component {
//    constructor(props) {
//         super(props);	
//     }
    
//     map;
//     markers = []
//     infowindows = []
//     componentDidMount(){
//         var container = document.getElementById('myMap'); //지도를 담을 영역의 DOM 레퍼런스
//         var options = { //지도를 생성할 때 필요한 기본 옵션
//             center: new kakao.maps.LatLng(35.157588, 129.058822), //지도의 중심좌표.
//             level: 4 //지도의 레벨(확대, 축소 정도)
//         };
//         this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
//         this.kakao.event.addListener(this.map,'mousedown',(mouseEvent)=>{
//             console.log('aaa')
//         })
//         kakao.event.addListener(this.map, 'click', (mouseEvent) => {
//         	// 원하는 액션 넣어주기
// 		    console.log('...!')
//         })
//     }
    

    
//     render() {
//         return (
            
//                <div id='myMap' style = {{
//                 marginLeft: 'auto', marginRight:'auto', marginTop:'50px',
//                 width: '600px', height: '500px'
//                 }}></div>
            
//         )
//     }
// }
// export default withRouter(TestPage);





// import React, { useEffect } from "react"; 
// import { withRouter } from 'react-router-dom';
// const { kakao } = window; 
// const TestPage = () => { useEffect(() => { 
//     const container = document.getElementById('mask-map'); 
//     const options = { center: new kakao.maps.LatLng(33.450701, 126.570667), level: 3 }; 
//     const map = new kakao.maps.Map(container, options); }, []); 
//     return <div id="mask-map" style={{ height: "100%" }}> </div> }; 
// export default withRouter(TestPage);











// /*global kakao*/

// import React,{useEffect} from 'react'
// import axios from 'axios'
// import { withRouter } from 'react-router-dom';
// const { kakao } = window;

// var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
// var options = { //지도를 생성할 때 필요한 기본 옵션
// 	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
// 	level: 3 //지도의 레벨(확대, 축소 정도)
// };

// var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// function TestPage(props) {
    
//     return (
//         // <div style = {{
//         //     display: 'flex', justifyContent: 'center', alignItems: 'center',
//         //     width: '100%', height: '100vh'
//         // }}>
        
//             <div id="map" style="width:500px;height:400px;"></div>
//             // {/* <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=5ea2114a3263ea89e6029ed1dee46e59"></script> */}
//     )
// }

// export default withRouter(TestPage)


