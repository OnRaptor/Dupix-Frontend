import React from 'react';
import {FlexContainer} from "./ui/containers/FlexContainer";
import styled from "styled-components";
import {BaseElement} from "./ui/Base";
import Text from "./ui/Text";
import Button from "./ui/Button";
import ImageAmbientLight from "./ui/Image";

const RecItemWrapper = styled.div`
  ${props => BaseElement(props)}
  margin-top:50px
`

const PhotoViewer = ({item}) => {
    return (
        <RecItemWrapper>
            <Text fontSize="23px">{item.title}</Text>
            <Text primary fontSize="15px">{item.date}</Text>
            <ImageAmbientLight src={"https://dupix.art/" + item.raw_images.big}/>
            <Text fontSize="17px">
                Автор:
                <Text link href={`https://dupix.art/profile.php?id=${item.author}`}>{item.author}</Text>
            </Text>
            <FlexContainer justify="space-between" align="center">
                <FlexContainer margin="4px">
                    <Button>Лукис</Button>
                    <Button>Оставить коментарий</Button>
                </FlexContainer>
                <Text primary fontSize="15px">{item.views + ' просмотров'} </Text>
            </FlexContainer>

        </RecItemWrapper>
    );
};

export default PhotoViewer;