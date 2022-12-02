import React, {useEffect, useRef, useState} from 'react';
import {ContentWrapper} from "../components/ui/ContentWrapper";
import PhotoViewer from "../components/PhotoViewer";
import {GetDataErrorResult, GetDataType, useGenTokenQuery, useGetGenericDataQuery} from "../store/api/DupixApi";
import CircularProgress from "../components/ui/CircularProgress";
import Text from "../components/ui/Text";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../store/slices/PageSlice";
import {FloatContainer} from "../components/ui/containers/FloatContainer";

const RecsViewer = ({recs}) => {
    return (
        <>
            {recs.map((item)=>
                    <PhotoViewer key={item.id} item={item}/>
            )}
        </>
    );
};

const Recs = () => {
    const page = useSelector(state => state.pageSlice.page)
    const dispatch = useDispatch()
    const { data, isLoading } = useGetGenericDataQuery([GetDataType.Legends, page === 1 ? '' : page])
    const [parsedData, setData] = useState({ photos: null })
    const [error, setError] = useState()
    const lastElement = useRef()
    const observer = useRef()

    useEffect(()=>{
        if (data) {
            console.log(parsedData)
            console.log(data)
            if (typeof data === typeof {})
                if (parsedData.photos === null)
                    setData([...data.photos])
                else
                    setData([...parsedData, ...data.photos])
            else
            {
                if (data.data === GetDataErrorResult.serverError)
                    setError("Ошибка сервера, попробуйте позже")
                else if (data.data === GetDataErrorResult.invalidArgs)
                    setError("Ошибка на стороне клиента, ждите фикса")
            }
        }
    }, [data])

    useEffect(()=>{
        if (isLoading) return;
        const callback = (entries, observer) =>{
            if (isLoading) return;
            if (entries[0].isIntersecting){
                console.log('callback with page:')
                console.log(page)
                dispatch(setPage(1 + page))
            }
        }
        setTimeout(()=>{
            observer.current = new IntersectionObserver(callback)
            observer.current.observe(lastElement.current)
        }, 1000)
    })

    return (
        <ContentWrapper>
            {parsedData.photos === null ?
                <CircularProgress/> :
                <>
                    <RecsViewer recs={parsedData}/>
                    <div ref={lastElement} style={{width:"100%", height: '20px', background:'red'}}></div>
                </>
            }
            {error && <Text color="red">{error}</Text>}

            <FloatContainer justify="end">
                <Text fontsize='23px'>{page}</Text>
            </FloatContainer>
        </ContentWrapper>
    );
};

export default Recs;