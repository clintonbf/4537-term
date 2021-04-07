import React from 'react'
import {Button, CenterContainer} from '../../GlobalStyle'; 
import {InfoRow, Title, TitleRow} from './HomeContainter.elements'; 
import {Link} from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';




const HomeContainer = () => {

    const ENDPOINT_URL = "http://localhost:3000/login"
    const {setAuthTokens } = useAuth(); 

    function postLogin(e) {
        e.preventDefault(); 
        axios.post(ENDPOINT_URL).then(result => {
            if(result.status === 200) {
                console.log(result.data.accessToken);
                setAuthTokens(result.data.accessToken); 
            } else {
                console.log(result); 
            }
        }).catch(e=> {
            console.log(e.response); 
        });
    }

    return (
        <>
        <TitleRow> 
            <Title>
                BlockBuster 2.0
            </Title> 
        </TitleRow>
        <CenterContainer>
            <button onClick={postLogin}> Login </button>
            <InfoRow>
                <Link to='/browseAll'>
                <Button> Browse All </Button>
                </Link>
            </InfoRow>
            <InfoRow>
                <Link to='/browseCollections'>
                     <Button> Browse By Category </Button>
                </Link>
            </InfoRow>
            <InfoRow>
                <Button> Random Reccomendation </Button>
            </InfoRow>
        </CenterContainer>
        
        </>
    )
};

export default HomeContainer; 