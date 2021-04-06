import React, { useState, useEffect } from 'react'; 
import {Button} from '../GlobalStyle'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {GET_All_RESOURCE} from '../API_calls'; 
import {Link} from 'react-router-dom'; 


const BrowseAll = () => {
    
    let content = null; 
    const [allResources, setAllResouces] = useState(); 
    const {authTokens} = useAuth(); 

    const getAll = (e) => {
        axios.get(GET_All_RESOURCE(), {headers: 
            {'Authorization': 'Bearer ' + authTokens}
        }).then(result => {
            if(result.status === 200) {
                console.log(result.data); 
                setAllResouces(result.data); 
                console.log(allResources); 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }); 
    }

    useEffect(() => {
        getAll(); 
    }, []); 

    if(allResources) {
        content = 
        <div>
            {allResources.map((item, i) => (
                 <div key={`${item.id}index`}> 
                     <Link to={{pathname: `/viewResource/${item.id}`}}> 
                    <div key={`${item.title}_title`}> {item.title} </div> 
                    </Link> 
                </div>
            ))} 
        </div>
    }

    return (
        <div>
        {content} 
        </div>
    )
}

export default BrowseAll; 