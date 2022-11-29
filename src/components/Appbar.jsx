import React from 'react';
import styled from "styled-components";
import Text from "./ui/Text";
import {FlexContainer} from "./ui/containers/FlexContainer";

const AppbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #1c1b1b;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 1;
  width: 100%;
`

const Appbar = () => {
    return (
        <AppbarWrapper>
            <FlexContainer align="center">
                <Text animated margin="10px" fontSize="30px">Dupix</Text>
                <Text href='/recs' link margin="10px" fontSize="20px">Рекомендации</Text>
                <Text href='/legends' link margin="10px" fontSize="20px">Легенды</Text>
                <Text href='/fresh' link margin="10px" fontSize="20px">Свежее</Text>
                <Text href='/fresh' link margin="10px" fontSize="20px">Сообщения</Text>
            </FlexContainer>
            <FlexContainer align="center">
                <Text href="/upload" link padding="0 10px 0 0">Загрузить</Text>
                <Text href="/profile" link padding="0 10px 0 0">Пользователь</Text>
            </FlexContainer>
        </AppbarWrapper>
    );
};

export default Appbar;