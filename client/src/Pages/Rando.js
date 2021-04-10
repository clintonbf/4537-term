import React, { useState, useEffect } from 'react'
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {GET_RANDOM_RESOURCE} from '../API_calls'; 
import { DescRow, Title, TitleRow } from '../Components/HomeContainer/HomeContainter.elements';
import { CenterContainer } from '../GlobalStyle';


const Rando = () => {

    const {authTokens} = useAuth({col: []}); 
    const [randomResource, setRandomResource] = useState();

    let content = null; 
    
    const getRandomResource = () => {
        axios.get(GET_RANDOM_RESOURCE(), {headers: 
            {'Authorization': 'Bearer ' + authTokens}
        }).then(result => {
            if(result.status === 200) {
                setRandomResource(result.data);
                console.log(result.data);
                console.log(randomResource.title); 
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }); 
    } 
    
    useEffect(() => {
        getRandomResource()
    }, []); 
    
    if(randomResource) {
        content = 
        <CenterContainer>
            <DescRow> Title: {randomResource[0].title} </DescRow>
            <DescRow> Description: {randomResource[0].description} </DescRow>
            <DescRow> URL: {randomResource[0].url} </DescRow>
        </CenterContainer>
    }

    return (
        <div>
            <div>
                <TitleRow>
                    <Title>
                    Random Resource
                    </Title>
                </TitleRow>
            </div>
            {content}
        </div>
    )
}

export default Rando; 