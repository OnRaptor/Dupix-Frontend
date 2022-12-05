import React, {useEffect, useRef, useState} from 'react';
import {ContentWrapper} from "../components/ui/ContentWrapper";
import PhotoViewer from "../components/PhotoViewer";
import {useGetGenericDataQuery} from "../store/api/DupixApi";
import CircularProgress from "../components/ui/CircularProgress";
import Text from "../components/ui/Text";
import {useDispatch, useSelector} from "react-redux";
import {addPhotos, syncPage} from "../store/slices/PageSlice";
import {GenTokenErrorResult, GetDataErrorResult} from "../store/api/DupixApiGeneric";

const RecsViewer = ({recs}) => {
    return (
        <>
            {recs.map((item)=>
                <PhotoViewer key={item.id} item={item}/>
            )}
        </>
    );
};

const DataViewer = ({dataType}) => {
    const page = useSelector(state => state.pageSlice.page)
    const photos = useSelector(state => state.pageSlice.photos)
    const dispatch = useDispatch()
    const { data, isLoading } = useGetGenericDataQuery([dataType, page === 1 ? '' : page])
    const [error, setError] = useState()
    const lastElement = useRef()
    const observer = useRef()

    //resolve fetched data
    useEffect(()=>{
        if (data) {
            console.log(data)
            if (data.photos) {
                dispatch(addPhotos(data.photos))
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
        <ContentWrapper>
            {photos.length !== 0 && <RecsViewer recs={photos}/> }
            <div ref={lastElement} style={{width:"100%", height: '20px'}}/>
            {!error && <CircularProgress/>}
            {error && <Text color="red">{error}</Text>}
        </ContentWrapper>
    );
};

export default DataViewer;