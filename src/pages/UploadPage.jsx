import React, {useEffect, useRef, useState} from 'react';
import Text from "../components/ui/Text";
import {ContentWrapper} from "../components/ui/ContentWrapper";
import TextBox from "../components/ui/TextBox";
import Button from "../components/ui/Button";
import RadioButton from "../components/ui/RadioButton";
import {Separator} from "../components/ui/Separator";
import Slider from "../components/ui/Slider";
import Image from "../components/ui/Image";
import {dupixApi} from "../store/api/DupixApi";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "../components/ui/CircularProgress";
import {FlexContainer} from "../components/ui/containers/FlexContainer";
import TextButton from "../components/ui/TextButton";
import {RiAccountBoxFill, RiMessage3Line} from "react-icons/ri";
import {MdPhotoLibrary} from "react-icons/md";
import Sidebar from "../components/Sidebar";
import {useNavigate} from "react-router-dom";




const UploadPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = useSelector(state => state.authSlice.username)
    const [isLoading, setLoading] = useState(false)
    const inputFile = useRef()
    const [imgSrc, setImgSrc] = useState()
    const [result, setResult] = useState()
    const [error, setError] = useState()

    const [title, setTitle] =useState('')
    const [tag, setTag] = useState('')
    const [angle, setAngle] = useState(0)
    const [format, setFormat] = useState('4:3')

    const updateImageDisplay = (e) =>
        setImgSrc(window.URL.createObjectURL(e.target.files[0]))

    const uploadFn = async () => {
        const isEmpty = title && format && imgSrc
        if (!isEmpty)
        {
            setError("Заполните необходимые поля")
            return
        }
        setError('')
        setLoading(true)
        const params = [
            ['title', title],
            ['tag', tag],
            ['angle', angle],
            ['aspect', format],
        ]
        const photo = {
            name:'photo',
            blob:inputFile.current.files[0],
            filename:inputFile.current.files[0].filename
        }
        const {data} = await dispatch(dupixApi.endpoints.uploadPhoto.initiate([params, photo]))
        if (data.success)
            setResult(data.result)
        else
            setError("Не удалось загрузить фото. Ошибка:\n" + data.error)

        setLoading(false)
    }

    if (result)
        return (
            <ContentWrapper>
                <Text fontSize='33px' color='green'>Фотография успешно загружена!</Text>
                <Button onClick={() => setResult(null)} margin='10px' width='300px' filled>Загрузить ещё</Button>
                <Button onClick={() => window.document.location = result} margin='10px' width='300px'>Посмотреть фото на dupix</Button>
            </ContentWrapper>
        )
    else
    return (
        <FlexContainer width='600px' align='start' direction='row'>
            <Sidebar muted>
                <TextButton menu onClick={() => window.location.href = 'https://dupix.art/profile.php?id=' + username}
                            icon={<RiAccountBoxFill/>}>
                    Профиль
                </TextButton>
                <TextButton onClick={() => navigate('/recs')} menu icon={<MdPhotoLibrary/>}>
                    Фотографии
                </TextButton>
                <TextButton menu icon={<RiMessage3Line/>}>
                    Сообщения
                </TextButton>
            </Sidebar>

            <ContentWrapper justify="start">
                <Text fontSize='33px'>Загрузка фотографий</Text>
                <Separator/>
                <Text>Название</Text>
                <TextBox onChange={(e) => setTitle(e.target.value)} value={title} placeholder='тяу тяу'/>
                <Text>Фото</Text>
                <Image src={imgSrc}/>
                <Button width="280px" onClick={()=>inputFile.current.click()}>Выбрать</Button>
                <input onChange={updateImageDisplay} accept=".png, .jpg, .jpeg" type='file' style={{ display:'none' }} ref={inputFile}/>
                <Text>Теги</Text>
                <TextBox onChange={(e) => setTag(e.target.value)} value={tag}/>
                <Text>Угол поворота(необязательно)</Text>
                <Slider value={angle} onChange={(e) => setAngle(e.target.value)} min='0' max='360'/>
                <Text>Формат изображения</Text>
                <RadioButton props={{name:'ratio', onChange: () => setFormat('16b9')}}>16:9</RadioButton>
                <RadioButton props={{name:'ratio', onChange: () => setFormat('9b16')}}>9:16</RadioButton>
                <RadioButton props={{name:'ratio', onChange: () => setFormat('4b3')}}>4:3</RadioButton>
                <Button onClick={() => uploadFn()} filled width="280px">
                    {isLoading ?
                        <CircularProgress small/> :
                        'Загрузить'
                    }
                </Button>
                {error && <Text color='red' fontSize='28px'>{error}</Text>}
            </ContentWrapper>
        </FlexContainer>
    );
};

export default UploadPage;