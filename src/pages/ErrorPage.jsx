import React from 'react';
import {ContentWrapper} from "../components/ui/ContentWrapper";
import {useRouteError} from "react-router-dom";
import Text from "../components/ui/Text";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <ContentWrapper>
            <Text font-size="24px" color='red'>{error.statusText || error.message}</Text>
        </ContentWrapper>
    );
};

export default ErrorPage;