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

const PhotoViewer = ({src}) => {
    return (
        <RecItemWrapper>
            <Text fontSize="23px">Красивый закат</Text>
            <Text primary fontSize="15px">23.09.2022 06:55</Text>
            <ImageAmbientLight src={src}/>
            <Text fontSize="17px">
                Автор:
                <Text link href="https://dupix.art/profile.php?id=Sirhimus">Sirhimus</Text>
            </Text>
            <FlexContainer justify="space-between" align="center">
                <FlexContainer margin="4px">
                    <Button>Лукис</Button>
                    <Button>Оставить коментарий</Button>
                </FlexContainer>
                <Text primary fontSize="15px">10 просмотров</Text>
            </FlexContainer>

        </RecItemWrapper>
    );
};

export default PhotoViewer;