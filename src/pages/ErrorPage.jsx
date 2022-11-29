import React from 'react';
import Logo from "../components/ui/Logo";
import {ContentWrapper} from "../components/ui/ContentWrapper";
import {useRouteError} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <ContentWrapper>
            <Logo>{error.statusText || error.message}</Logo>
        </ContentWrapper>
    );
};

export default ErrorPage;