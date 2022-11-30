import React, {useEffect, useState} from 'react';
import TextBox from "../components/ui/TextBox";
import {ContentWrapper} from "../components/ui/ContentWrapper";
import Button from "../components/ui/Button";
import Text from "../components/ui/Text";
import {useNavigate} from "react-router-dom";
import {GenTokenErrorResult, useGenTokenQuery} from "../store/api/DupixApi";
import {useDispatch} from "react-redux";
import {setToken} from "../store/slices/AuthSlice";
import CircularProgress from "../components/ui/CircularProgress";
import {DupixApiUtils} from "../store/api/DupixApiUtils";

const LoginPage = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [preventLogin, setPreventLogin] = useState(true)
    const { data, isLoading } = useGenTokenQuery([login, password], {skip: preventLogin})
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    useEffect(() =>{
        console.log(data)
        console.log(typeof data)
        if (data !== undefined) {
            if (typeof data === typeof "") {
                DupixApiUtils.cacheAuth(login, password, data)
                dispatch(setToken(data))
                setPreventLogin(true)
                navigate("/recs")
            }
            else {
                setPreventLogin(true)
                if (data === GenTokenErrorResult.invalidCred)
                    setError("Проверьте данные")
                else if (data === GenTokenErrorResult.haveAlready)
                    setError("Вы уже авторизированы на другом сайте")
            }
        }
    }, [data])

    return (
        <ContentWrapper>
            <Text fontSize="25px">Авторизация</Text>
            <TextBox value={login} onChange={(e) => setLogin(e.target.value)} width="300px" placeholder="Login"/>
            <TextBox value={password} onChange={(e) => setPassword(e.target.value)} type="password" width="300px" placeholder="Password"/>
            {error !== "" &&
                <Text font-size='22px' color='red'>{error}</Text>
            }
            <br/>
            {isLoading
                ?
                <CircularProgress/>
                :
                <Button width="300px" onClick={() => setPreventLogin(false)}>Войти</Button>
            }
            <br/>

            <Text>
                Нет аккаунта? <Text href="https://dupix.art/login.php" link>Зарегистрироваться</Text>
            </Text>
        </ContentWrapper>
    );
};

export default LoginPage;