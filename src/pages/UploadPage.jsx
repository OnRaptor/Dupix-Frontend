import React from 'react';
import Text from "../components/ui/Text";
import {ContentWrapper} from "../components/ui/ContentWrapper";
import TextBox from "../components/ui/TextBox";
import {FlexContainer} from "../components/ui/containers/FlexContainer";
import Button from "../components/ui/Button";

const UploadPage = () => {
    return (
        <ContentWrapper>
            <Text fontSize='33px'>Загрузка фотографий</Text>
            <TextBox placeholder='Title'/>
            <TextBox placeholder='tags'/>
            <TextBox placeholder='Aspect ratio' list="ice-cream-flavors"/>
            <datalist id="ice-cream-flavors">
                <option value="4 на 3"/>
                <option value="16 на 9"/>
                <option value="9 на 16"/>
            </datalist>
            <TextBox type='range' placeholder='angle'/>
            <FlexContainer align='center'>
                <Button>Выбрать файл</Button>
                <Text>Aboba.jpf</Text>
            </FlexContainer>
        </ContentWrapper>
    );
};

export default UploadPage;