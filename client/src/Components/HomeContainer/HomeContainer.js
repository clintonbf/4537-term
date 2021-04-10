import React from 'react'
import {Button, CenterContainer} from '../../GlobalStyle'; 
import {InfoRow, Title, TitleRow, LoginButton} from './HomeContainter.elements'; 
import {Link} from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';


const HomeContainer = () => {

    const ENDPOINT_URL = "https://clintonfernandes.ca/COMP4537/termproject/API/v1/login"
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
        <LoginButton onClick={postLogin}> Get Auth Key </LoginButton>
            <InfoRow>
                <Link to='/browseAllResources'>
                <Button> Browse All </Button>
                </Link>
            </InfoRow>
            <InfoRow>
                <Link to='/browseAllCollections'>
                     <Button> Browse By Collection </Button>
                </Link>
            </InfoRow>
            <InfoRow>
                <Link to='/random'> 
                <Button> Random Reccomendation </Button>
                </Link>
                
            </InfoRow>
        </CenterContainer>
        
        </>
    )
};

export default HomeContainer; 