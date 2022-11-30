import React, {useEffect, useRef, useState} from 'react';
import {ContentWrapper} from "../components/ui/ContentWrapper";
import PhotoViewer from "../components/PhotoViewer";
import {GetDataErrorResult, GetDataType, useGenTokenQuery, useGetGenericDataQuery} from "../store/api/DupixApi";
import CircularProgress from "../components/ui/CircularProgress";
import Text from "../components/ui/Text";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../store/slices/PageSlice";

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
    const [parsedData, setData] = useState(null)
    const [error, setError] = useState()
    const lastElement = useRef()
    const observer = useRef()

    useEffect(()=>{
        if (data) {
            if (typeof data === typeof {})
                setData([...data.photos, ...data.photos])
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
            console.log(isLoading)
            if (isLoading) return;
            if (entries[0].isIntersecting){
                dispatch(setPage(1 + page))
                console.log(page)
                console.log(parsedData)
            }
        }
        observer.current = new IntersectionObserver(callback)
    }, [isLoading])

    return (
        <ContentWrapper>
            {!parsedData ?
                <CircularProgress/> :
                <>
                    <RecsViewer recs={parsedData}/>
                    {()=>observer.current.observe(lastElement.current)
                    }
                    <div ref={lastElement} style={{width:"100%", height: '20px', background:'red'}}></div>
                </>
            }
            {error && <Text color="red">{error}</Text>}
        </ContentWrapper>
    );
};

export default Recs;