import React from 'react';
import styled from "styled-components";
import Text from "./ui/Text";
import {FlexContainer} from "./ui/containers/FlexContainer";
import {useSelector} from "react-redux";
import {StyledNavLink} from "./ui/NavLink";
import {useNavigate} from "react-router-dom";
import {DupixApiUtils} from "../store/api/DupixApiUtils";

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
    const name = useSelector(state => state.authSlice.username)
    const navigate = useNavigate()
    const logoutFn = async () => {
        await DupixApiUtils.logout()
        navigate('/auth')
    }
    return (
        <AppbarWrapper>
            <FlexContainer align="center">
                <Text animated margin="10px" fontSize="30px">Dupix</Text>
                {/*<Text margin="10px" fontSize="20px">
                    <StyledNavLink style={{textDecoration:'none'}} to='/recs'>Рекомендации</StyledNavLink>
                </Text>
                <Text margin="10px" fontSize="20px">
                    <StyledNavLink style={{textDecoration:'none'}} to='/legends'>Легенды</StyledNavLink>
                </Text>
                <Text margin="10px" fontSize="20px">
                    <StyledNavLink style={{textDecoration:'none'}} to='/fresh'>Свежее мясо</StyledNavLink>
                </Text>
                <Text StyledNavLink margin="10px" fontSize="20px">
                    <StyledNavLink style={{textDecoration:'none'}} to='/'>Сообщения?</StyledNavLink>
                </Text>*/}
            </FlexContainer>
            <FlexContainer align="center">
                {/*<Text StyledNavLink padding="0 10px 0 0">
                    <StyledNavLink style={{textDecoration:'none'}} to='/upload'>Загрузить</StyledNavLink>
                </Text>*/}
                <Text title='Нажмите чтобы выйти из аккаунта' StyledNavLink padding="0 10px 0 0">
                    <StyledNavLink style={{textDecoration:'none'}} onClick={() => logoutFn()}>{name}</StyledNavLink>
                </Text>
            </FlexContainer>
        </AppbarWrapper>
    );
};

export default Appbar;