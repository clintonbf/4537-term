import React, { useState, useEffect } from 'react'
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {GET_RANDOM_RESOURCE} from '../API_calls'; 


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
        <div>
            <p> {randomResource[0].title} </p>
            <p> {randomResource[0].description} </p>
            <p> {randomResource[0].url} </p>
        </div>
    }

    return (
        <div>
            <div>
                <h3>
                     Random Resource
                </h3>
            </div>
            {content}
        </div>
    )
}

export default Rando; 