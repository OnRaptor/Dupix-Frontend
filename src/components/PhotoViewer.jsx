import React, {useState} from 'react';
import {FlexContainer} from "./ui/containers/FlexContainer";
import styled from "styled-components";
import {BaseElement} from "./ui/Base";
import Text from "./ui/Text";
import Button from "./ui/Button";
import ImageAmbientLight from "./ui/Image";
import {dupixApi} from "../store/api/DupixApi";
import {useDispatch} from "react-redux";
import CircularProgress from "./ui/CircularProgress";

const RecItemWrapper = styled.div`
  ${props => BaseElement(props)}
  margin-top:50px;
  max-width: 500px;
  min-width: 300px;
  min-height: 300px;
`

const PhotoViewer = ({item}) => {
    const dispatch = useDispatch()
    const [isLiked, setLiked] = useState()
    const [likeLoading, setLikeLoading] = useState()

    const likePhoto = async () => {
        if (!isLiked) {
            setLikeLoading(true)
            const {data, isLoading} = await dispatch(dupixApi.endpoints.makeAction.initiate(['likePhoto', {
                id: item.id,
                angle: 90,
                mode: 'toggle'
            }]))
            if (data)
                setLiked(true)
            setLikeLoading(false)
        }
        else
            setLiked(false)
    }

    const addView = () => {
        /*dispatch(dupixApi.endpoints.makeAction.initiate(['addview', {
            id: item.id
        }]))*/
    }

    return (
        <RecItemWrapper onMouseOver={() => addView()}>
            <Text fontSize="23px">{item.title}</Text>
            <Text primary fontSize="15px">{item.date}</Text>
            <a href='/'>
                <ImageAmbientLight src={"https://dupix.art/" + item.raw_images.big}/>
            </a>

            <Text fontSize="17px">
                Автор:
                <Text link href={`https://dupix.art/profile.php?id=${item.author}`}>{item.author}</Text>
            </Text>
            <FlexContainer justify="space-between" align="center">
                <FlexContainer margin="4px">
                    <Button width='100px' filled={isLiked} onClick={() => likePhoto()}>
                        {likeLoading && <CircularProgress small/>}
                        {!likeLoading && "Лукис"}
                    </Button>
                    <Button>Оставить коментарий</Button>
                </FlexContainer>
                <Text primary fontSize="15px">{item.views + ' просмотров'} </Text>
            </FlexContainer>
        </RecItemWrapper>
    );
};

export default PhotoViewer;