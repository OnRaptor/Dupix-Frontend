import React from 'react';
import {ContentWrapper} from "../components/ui/ContentWrapper";
import styled from "styled-components";
import PhotoViewer from "../components/PhotoViewer";
import {dupixApi, useGenTokenQuery} from "../store/api/DupixApi";
import Text from "../components/ui/Text";

const NewsPageWrapper = styled.div`
`

const Recs = () => {
    return (
        <NewsPageWrapper>
            <ContentWrapper>
                <PhotoViewer src="https://dupix.art/%2Fphoto%2Fmid_1S8cS31634nyYWFt2E9zHfkVO.jpg"/>
            </ContentWrapper>
        </NewsPageWrapper>
    );
};

export default Recs;