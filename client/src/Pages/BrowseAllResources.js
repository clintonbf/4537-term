import React, { useState, useEffect } from 'react'; 
import {Button} from '../GlobalStyle'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {GET_RESOURCE} from '../API_calls'; 

const BrowseAll = () => {
    
    const [resources, setResouces] = useState(); 
    const {authTokens} = useAuth(); 

    useEffect(() => {
        axios.get(GET_RESOURCE(), {headers: 
            {'Authorization': 'Bearer ' + authTokens}
        }).then(result => {
            if(result.status === 200) {
                console.log(result.data); 
                setResouces(result.data[1]); 
                console.log(resources); 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }); 
    }, [GET_RESOURCE()]); 

    return (
        <>
           {/* {
               resources.map((url) => {
                   return <div>{url}</div>;
               })
           } */}
        </>
    )
}

export default BrowseAll; 