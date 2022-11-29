import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import {ContentWrapper} from "../components/ui/ContentWrapper";

import React from 'react';
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/auth")
    }

    return (
        <ContentWrapper>
            <Logo>DUPIX</Logo>
            <Button onClick={onClick} width="300px">Начать</Button>
        </ContentWrapper>
    );
};

export default LandingPage;

