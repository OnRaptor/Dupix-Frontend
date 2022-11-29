import React, {useEffect, useState} from 'react';
import TextBox from "../components/ui/TextBox";
import {ContentWrapper} from "../components/ui/ContentWrapper";
import Button from "../components/ui/Button";
import Text from "../components/ui/Text";
import {useNavigate} from "react-router-dom";
import {GenTokenResult, useGenTokenQuery} from "../store/api/DupixApi";
import {useDispatch} from "react-redux";
import {setToken} from "../store/slices/AuthSlice";

const LoginPage = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [canLogin, setCanLogin] = useState(true)
    const { data } = useGenTokenQuery([login, password], {skip: canLogin})
    const dispatch = useDispatch()

    const LoginFunc = () =>{
        setCanLogin(false)
    }

    useEffect(() =>{
        console.log(data)
        if (data !== undefined) {
            if (data !== GenTokenResult) {
                localStorage.setItem("isAuth", '1')
                localStorage.setItem("login", login)
                localStorage.setItem("password", password)
                const tokenData = { token: data, timestamp: new Date() }
                localStorage.setItem("token", tokenData.toString())
                dispatch(setToken(tokenData))
                navigate("/recs")
            }
            else
                return <h1>Error</h1>
        }
    }, [data])

    return (
        <ContentWrapper>
            <Text fontSize="25px">Авторизация</Text>
            <TextBox value={login} onChange={(e) => setLogin(e.target.value)} width="300px" placeholder="Login"/>
            <TextBox value={password} onChange={(e) => setPassword(e.target.value)} type="password" width="300px" placeholder="Password"/>
            <br/>
            <Button width="300px" onClick={LoginFunc}>Войти</Button>
            <br/>
            <Text>
                Нет аккаунта? <Text href="https://dupix.art/login.php" link>Зарегистрироваться</Text>
            </Text>
        </ContentWrapper>
    );
};

export default LoginPage;