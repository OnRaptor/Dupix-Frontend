import styled from "styled-components";

import React from 'react';

const Layout = styled.div`
  position: relative;
  max-width: 800px;
  max-height: 800px;
  margin: 0 auto;
`

const AmbientLight = styled.img`
  opacity: 0.75; 
  filter: blur(60px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  max-width: 100%;
  height: 100%;
`

const ImageWrapper = styled.img`
  max-width: 100%;
  height: auto;
`

const ImageAmbientLight = ({src}) => {
    return (
        <Layout>
            <ImageWrapper src={src} alt="image"/>
            <AmbientLight src={src}/>
        </Layout>
    );
};

export default ImageAmbientLight;