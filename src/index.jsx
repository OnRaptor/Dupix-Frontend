import React from 'react'
import ReactDOM from 'react-dom/client'
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import DataViewer from "./pages/DataViewer";
import LoginPage from "./pages/LoginPage";
import DupixPage from "./pages/DupixPage";
import LandingPage from "./pages/LandingPage";
import {AppWrapper} from "./components/ui/AppWrapper";
import {ContentWrapper} from "./components/ui/ContentWrapper";
import {Provider} from "react-redux";
import {store} from "./store";
import {GetDataType} from "./store/api/DupixApiGeneric";
import UploadPage from "./pages/UploadPage";

const Global = createGlobalStyle`
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    @font-face {
      font-family: "Montserrat";
      src: url('/Montserrat.ttf')
    }
`

const theme = {
    colors:{
        accent : '#BE008A',
        primary : '#646cff',
        secondary: '#FF9200',
        hover: '#5d5d5d'
    },
    media:{
        phone: '(max-width: 425px)'
    }
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <DupixPage/>,
        errorElement:
            <AppWrapper>
                <ContentWrapper>
                    <ErrorPage/>
                </ContentWrapper>
            </AppWrapper>,
        children: [
            {
                path: 'recs',
                element: <DataViewer dataType={GetDataType.Recs}/>
            },
            {
                path: 'legends',
                element: <DataViewer dataType={GetDataType.Legends}/>
            }
            ,{
                path: 'fresh',
                element: <DataViewer dataType={GetDataType.Fresh}/>
            },
            {
                path: 'upload',
                element: <UploadPage/>
            }
        ]
    },
    {
        path: 'auth',
        element:
            <AppWrapper>
                <ContentWrapper>
                    <LoginPage/>
                </ContentWrapper>
            </AppWrapper>
    },
    {
        path: 'welcome',
        element:
            <AppWrapper>
                <ContentWrapper>
                    <LandingPage/>
                </ContentWrapper>
            </AppWrapper>
    }
]);

if (localStorage.getItem("isAuth") === "1"){
    if (router.state.location.pathname === '/')
        router.navigate("/recs")
}
else
    router.navigate('/welcome')

document.title = "Dupix"
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
      <Global/>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </ThemeProvider>
)
