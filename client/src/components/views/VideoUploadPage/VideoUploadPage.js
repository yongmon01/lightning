import React, {useState} from 'react'
import {Form, message} from 'antd';
import Icon from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

import { withRouter } from 'react-router-dom';

// const {Title} = Typography;
// const {TextArea} = Input;

const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
]

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"}
]

function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = (e) =>{
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) =>{
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange = (e) =>{
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) =>{
        setCategory(e.currentTarget.value)
    }
    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file",files[0])

        Axios.post('/api/video/uploadfiles',formData, config)
            .then(response => {
                if (response.data.success){
                    console.log(response.data)
                }
                else{
                    alert('비디오 업로드 실패')
                }
            })
    }

    return (
        <div style = {{maxWidth: '700px', margin: '2rem auto'}}>
            <div style = {{ textAlign: 'center', marginBottom: '2rem'}}>
                <Typography level = {2}>Upload Video</Typography>
            </div>

            <FormControl onSubmit>
                <div style = {{display: 'flex', justifyContent:'space-between'}}>
                    {/* Drop Zone */}

                    <Dropzone 
                    onDrop = {onDrop} multiple = {false} maxSize={100000000}>
                    {({getRootProps, getInputProps})=>(
                        <div style = {{width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                        alignItems: 'center', justifyContent: 'center'}}{...getRootProps()}>
                            <input {...getInputProps()}/>
                            <Icon type = "plus" style = {{fontSize: '3rem'}}/>

                        </div>
                    )}

                    </Dropzone>

                    {/* Thumnail */}
                    <div>
                        <img src alt/>
                    </div>
                </div>

                <br/>
                <br/>
                
                <label>Title</label>
                <Input onChange = {onTitleChange} value = {VideoTitle}/>
                {/* <input onChange = {onTitleChange} value = {VideoTitle}/> */}

                <br/>
                <br/>

                <label>Description</label>
                <Input onChange = {onDescriptionChange} value = {Description}/>
                {/* <textarea onChange = {onDescriptionChange} value = {Description}/> */}

                <br/>
                <br/>

                <select onChange={onPrivateChange}>
                    {
                    PrivateOptions.map((item, index)=>(
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

                <Button type="primary" size = "large" onClick>
                    Submit
                </Button>

                
            </FormControl>

        </div>
    )
}

//export default withRouter(VideoUploadPage)
export default VideoUploadPage

//////