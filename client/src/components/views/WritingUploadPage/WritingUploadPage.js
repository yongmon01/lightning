import React, {useState} from 'react'
import Axios from 'axios';
import {useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MyMap from './MyMap/MyMap';

const { kakao } = window;

const LocationOptions = [
    {value: "서울", label: "서울"},
    {value: "경기", label: "경기"},
    {value: "대구", label: "대구"},
    {value: "인천", label: "인천"},
    {value: "부산", label: "부산"},
]

const CategoryOptions = [
    {value: "축구", label: "축구"},
    {value: "족구", label: "족구"},
    {value: "농구", label: "농구"},
    {value: "러닝", label: "러닝"},
    {value: "야구", label: "야구"}
]

function WritingUploadPage(props)  {

    const user = useSelector(state => state.user)

    const [WritingTitle, setWritingTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Location, setLocation] = useState("서울")
    const [Category, setCategory] = useState("축구")
    const [MeetingDate,setMeetingDate] = useState("")
    
    const onTitleChange = (e) =>{
        setWritingTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) =>{
        setDescription(e.currentTarget.value)
    }
    const onLocationChange = (e) =>{
        setLocation(e.currentTarget.value)
    }
    const onCategoryChange = (e) =>{
        setCategory(e.currentTarget.value)
    }
    const onMeetingDateChange = (e) =>{
        setMeetingDate(e.currentTarget.value)
    }
    
    const onSubmit = (e) =>{
        e.preventDefault();

        const RoadAddress = window.sessionStorage.getItem('road_address')
        const Address = window.sessionStorage.getItem('address')

        const variables = {
            writer: user.userData._id,
            title: WritingTitle,
            description: Description,
            locations: Location,
            category: Category,
            meetingDate: MeetingDate,
            address: Address,
            roadAddress: RoadAddress
        }

        window.sessionStorage.clear()

        Axios.post('/api/writing/uploadWriting',variables)
            .then(response=>{
                if (response.data.success){
                    alert('글 작성 성공')
                    props.history.push('/')
                }
                else{
                    alert('글 작성 실패')
                    console.log('실패')
                }
            })
    }

    return (
        <div style = {{maxWidth: '700px', margin: '2rem auto'}}>
            <div style = {{ textAlign: 'center', marginBottom: '1rem', fontSize:'32px'}}>
                <label><b>Upload Meeting</b></label>
            </div>

            <MyMap/><br/><br/><br/>

            <FormControl onSubmit={onSubmit} style={{width: '100%'}}><br/><br/>

                <TextField onChange = {onMeetingDateChange} value = {MeetingDate} style ={{width:'42%'}}
                    id="datetime"
                    label="시간"
                    type="datetime-local"
                    InputLabelProps={{
                    shrink: true,
                    }}/><br/><br/>
                
                <TextField onChange = {onTitleChange} value = {WritingTitle} label="제목" variant="outlined"
                style={{width:'98%'}} /><br/>

                <TextareaAutosize onChange = {onDescriptionChange} value = {Description}
                    rowsMax={10}
                    rowsMin={6}
                    aria-label="maximum height"
                    placeholder="내용을 입력하세요"
                    style={{width:'98%', padding:'10px'}}
                /><br/>

                <label>지역</label>
                <select onChange={onLocationChange} style={{width:'10%'}}>
                    {
                    LocationOptions.map((item, index)=>(
                        <option key = {index} value = {item.value}>{item.label}</option>
                    ))
                    }
                </select>

                <label>분류</label>
                <select onChange={onCategoryChange} style={{width:'10%'}}>
                    {
                    CategoryOptions.map((item, index)=>(
                        <option key = {index} value = {item.value}>{item.label}</option>
                    ))
                    }
                </select><br/>

                <Button variant="contained" color="primary" onClick={onSubmit} 
                    style={{width: '20%', display: 'block', marginLeft:'auto', marginRight:'auto'}}>
                    작성
                </Button>
            </FormControl>

        </div>
    )
}

export default withRouter(WritingUploadPage)
