import React, {useState} from 'react'
import {Typography, Button, Form, message, Input} from 'antd';
import Icon from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

import {useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';


const {Title} = Typography;
const {TextArea} = Input;

const LocationOptions = [
    {value: 0, label: "서울"},
    {value: 1, label: "경기"},
    {value: 2, label: "대구"},
    {value: 3, label: "인천"},
    {value: 4, label: "부산"},
]

const CategoryOptions = [
    {value: 0, label: "축구"},
    {value: 1, label: "족구"},
    {value: 2, label: "농구"},
    {value: 3, label: "러닝"},
    {value: 4, label: "야구"}
]

function WritingUploadPage(props) {
    //유저의 모든정보를 유저에담아
    const user = useSelector(state => state.user)

    const [WritingTitle, setWritingTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Location, setLocation] = useState("서울")
    const [Category, setCategory] = useState("축구")

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
    // const onDrop = (files) => {
    //     let formData = new FormData;
    //     const config = {
    //         header: {'content-type': 'multipart/form-data'}
    //     }
    //     formData.append("file",files[0])

    //     Axios.post('/api/video/uploadfiles',formData, config)
    //         .then(response => {
    //             if (response.data.success){
    //                 console.log(response.data)

    //                 let variable = {
    //                     url: response.data.url,
    //                     fileName: response.data.fileName
    //                 }

    //                 setFilePath(response.data.url)

    //                 Axios.post('/api/video/thumbnail',variable)
    //                 .then(response=>{
    //                     if (response.data.success){
    //                         setDuration(response.data.fileDuration)
    //                         setThumbnailPath(response.data.url)
    //                     }
    //                     else{
    //                         alert('썸네일 생성 실패')
    //                     }
    //                 })
    //             }
    //             else{
    //                 alert('비디오 업로드 실패')
    //             }
    //         })
    // }

    const onSubmit = (e) =>{
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: WritingTitle,
            description: Description,
            locations: Location,
            //filePath: FilePath,
            category: Category,
            //duration: Duration,
            //thumbnail: ThumbnailPath
        }

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
            <div style = {{ textAlign: 'center', marginBottom: '2rem'}}>
                <Title level = {2}>upload meeting</Title>
            </div>

            <Form onSubmit={onSubmit}>
                {/* <div style = {{display: 'flex', justifyContent:'space-between'}}> */}
                    {/* Drop Zone */}

                    {/* <Dropzone 
                    onDrop = {onDrop} multiple = {false} maxSize={100000000}>
                    {({getRootProps, getInputProps})=>(
                        <div style = {{width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                        alignItems: 'center', justifyContent: 'center'}}{...getRootProps()}>
                            <input {...getInputProps()}/>
                            <Icon type = "plus" style = {{fontSize: '3rem'}}/>

                        </div>
                    )}

                    </Dropzone> */}

                    {/* Thumbnail */}

                    {/* 썸네일이 있을때만 나타내기 &&를 사용 */}
                    
                    {/* {ThumbnailPath &&
                    <div>
                        <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"/>
                    </div>
                    }
                </div> */}

                <br/>
                <br/>
                
                <label>Title</label>
                <Input onChange = {onTitleChange} value = {WritingTitle}/>
                {/* <input onChange = {onTitleChange} value = {WritingTitle}/> */}

                <br/>
                <br/>

                <label>Description</label>
                <TextArea onChange = {onDescriptionChange} value = {Description}/>
                {/* <textarea onChange = {onDescriptionChange} value = {Description}/> */}

                <br/>
                <br/>

                <select onChange={onLocationChange}>
                    {
                    LocationOptions.map((item, index)=>(
                        <option key = {index} value = {item.value}>{item.label}</option>
                    ))
                    }
                </select>

                <br/><br/>

                <select onChange={onCategoryChange}>
                    {
                    CategoryOptions.map((item, index)=>(
                        <option key = {index} value = {item.value}>{item.label}</option>
                    ))
                    }
                </select>

                <br/><br/>

                <Button type="primary" size = "large" onClick={onSubmit}>
                    Submit
                </Button>

                
            </Form>

        </div>
    )
}

export default withRouter(WritingUploadPage)
