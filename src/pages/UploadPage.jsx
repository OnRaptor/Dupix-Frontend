import React from 'react';
import Text from "../components/ui/Text";
import {ContentWrapper} from "../components/ui/ContentWrapper";
import TextBox from "../components/ui/TextBox";
import Button from "../components/ui/Button";
import RadioButton from "../components/ui/RadioButton";
import {Separator} from "../components/ui/Separator";
import Slider from "../components/ui/Slider";

const UploadPage = () => {
    return (
        <ContentWrapper justify="start">
            <Text fontSize='33px'>Загрузка фотографий</Text>
            <Separator/>
            <Text>Название</Text>
            <TextBox/>
            <Text>Фото</Text>
            <Button>Выбрать</Button>
            <Text>Теги</Text>
            <TextBox/>
            <Text>Угол поворота(необязательно)</Text>
            <Slider min='0' max='360'/>
            <Text>Формат изображения</Text>
            <RadioButton props={{name:'ratio'}}>16:9</RadioButton>
            <RadioButton props={{name:'ratio'}}>9:16</RadioButton>
            <RadioButton props={{name:'ratio'}}>4:3</RadioButton>
            <Button filled width="80%">Загрузить</Button>
        </ContentWrapper>
    );
};

export default UploadPage;