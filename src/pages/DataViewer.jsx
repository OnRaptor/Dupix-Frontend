import React, {useEffect, useRef, useState} from 'react';
import {ContentWrapper} from "../components/ui/ContentWrapper";
import PhotoViewer from "../components/PhotoViewer";
import {useGetGenericDataQuery} from "../store/api/DupixApi";
import CircularProgress from "../components/ui/CircularProgress";
import Text from "../components/ui/Text";
import {useDispatch, useSelector} from "react-redux";
import {addPhotos, resetData, syncPage} from "../store/slices/PageSlice";
import {GenTokenErrorResult, GetDataErrorResult} from "../store/api/DupixApiGeneric";
import { v4 as uuid } from 'uuid';
import {FlexContainer} from "../components/ui/containers/FlexContainer";
import Button from "../components/ui/Button";
import TextButton from "../components/ui/TextButton";
import {RiAccountBoxFill, RiMessage3Line} from "react-icons/ri";
import {MdPhotoLibrary} from "react-icons/md";
import Sidebar from "../components/Sidebar";
import {Separator} from "../components/ui/Separator";
import {FloatContainer} from "../components/ui/containers/FloatContainer";
import {useNavigate} from "react-router-dom";


const RecsViewer = ({recs}) => {
    return (
        <>
            {recs.map((item)=>
                <PhotoViewer key={uuid()} item={item}/>
            )}
        </>
    );
};

const DataViewer = ({dataType}) => {
    const page = useSelector(state => state.pageSlice.page)
    const photos = useSelector(state => state.pageSlice.photos)
    const username = useSelector(state => state.authSlice.username)
    const dispatch = useDispatch()
    const { data, isLoading } = useGetGenericDataQuery([dataType, page === 1 ? '' : page])
    const [error, setError] = useState()
    const lastElement = useRef()
    const observer = useRef()
    const navigate = useNavigate()

    //reset redux data between navigates
    useEffect(()=>{
        dispatch(resetData())
    }, [dataType])

    //resolve fetched data
    useEffect(()=>{
        if (data) {
            console.log(data)
            if (data.photos) {
                dispatch(addPhotos(data.photos))
                if (window.scrollY !== 0)
                    window.scrollTo({
                        top: window.scrollY - 0.1,
                        behavior: "smooth"
                    });
                return
            }
            if (data === GetDataErrorResult.serverError)
                setError("Ошибка сервера, попробуйте позже")
            else if (data === GetDataErrorResult.invalidArgs)
                setError("Ошибка на стороне клиента, ждите фикса")
            else if (data === GenTokenErrorResult.haveAlready)
                setError("Вы авторизованы в другом месте")
            else if (data === GetDataErrorResult.endOfData) {
                if (photos.length !== 0)
                    observer.current.unobserve(lastElement.current)
                setError("Нет данных")
            }
            else {
                setError("Unhandled error")
                //document.location.reload()
            }
        }
    }, [data])

    useEffect(()=>{
        const callback = (entries, observer) =>{
            if (isLoading) return;
            if (entries[0].isIntersecting){
                dispatch(syncPage())
                console.log('callback with page:')
                console.log(page)
            }
        }
        observer.current = new IntersectionObserver(callback)
        observer.current.observe(lastElement.current)
        document.title = dataType
    })


    return (
        <FlexContainer direction='row'>
            <Sidebar muted>
                <TextButton menu onClick={() => window.location.replace('https://dupix.art/profile.php?id=' + username)}
                            icon={<RiAccountBoxFill/>}>
                    Профиль
                </TextButton>
                <TextButton onClick={() => navigate('/')} menu icon={<MdPhotoLibrary/>}>
                    Фотографии
                </TextButton>
                <TextButton menu icon={<RiMessage3Line/>}>
                    Сообщения
                </TextButton>
            </Sidebar>

            <ContentWrapper>
                {photos.length !== 0 && <RecsViewer recs={photos}/> }
                <div ref={lastElement} style={{width:"100%", height: '20px'}}/>
                {!error && <CircularProgress/>}
                {error && <Text color="red">{error}</Text>}
            </ContentWrapper>

            <Sidebar outlined>
                <Button onClick={() => navigate('/recs')} menu>Рекомендации</Button>
                <Button onClick={() => navigate('/legends')} menu>Легенды</Button>
                <Button onClick={() => navigate('/fresh')} menu>Свежее</Button>
                <Separator fill/>
                <Button onClick={() => navigate('/upload')} menu>Загрузить своё</Button>
            </Sidebar>
        </FlexContainer>
    );
};

export default DataViewer;