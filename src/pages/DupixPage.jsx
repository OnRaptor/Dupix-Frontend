import React, {useEffect} from 'react';
import LandingPage from "./LandingPage";
import {AppWrapper} from "../components/ui/AppWrapper";
import {ContentWrapper} from "../components/ui/ContentWrapper";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import PageWrapper from "../components/ui/PageWrapper";
import Appbar from "../components/Appbar";



const DupixPage = () => {
    return (
        <PageWrapper>
            <Appbar/>
            <AppWrapper>
                <ContentWrapper>
                    <Outlet/>
                </ContentWrapper>
            </AppWrapper>
        </PageWrapper>
    );
};

export default DupixPage;