import React, { useState, useEffect } from 'react'; 
import {Button} from '../GlobalStyle'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {GET_All_RESOURCE, POST_RESOURCE} from '../API_calls'; 
import {Link} from 'react-router-dom'; 


const BrowseAll = () => {
    
    let content = null; 
    const [allResources, setAllResouces] = useState(); 
    const [newResourceTitle, setNewResourceTitle] = useState(); 
    const [newResourceDescription, setNewResourceDescription] = useState(); 
    const [newResourceURL, setNewResourceURL] = useState(); 
    const [newResourceType, setNewResourceType] = useState(); 
    
    const {authTokens} = useAuth(); 

    const AddNewResource = () => {
    
        let data = {"url": newResourceURL, "type": newResourceType, "title": newResourceTitle, "description": newResourceDescription}; 
        let json = JSON.stringify(data); 

        axios.post(POST_RESOURCE(), json, {headers: 
            {'Authorization': 'Bearer ' + authTokens,'Content-Type': 'application/json'}
        }).then(result => {
            if(result.status === 200) {
                console.log(result.data); 
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }); 

        window.location.reload(); 
    }

    const getAll = () => {
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
     
        <div>
        <label> Title: </label>
            <input key="r_title" type="text" id="title" defaultValue={"Snappy Title"} onChange={e=>setNewResourceTitle(e.target.value)} />
        </div>
        <div>
        <label> Description: </label>
            <input key="r_desc" type="text" id="descr" defaultValue={"Exciting Descr"} onChange={e=>setNewResourceDescription(e.target.value)} />
        </div>
        <div>
        <label> Type: </label>
            <input key="r_type" type="text" id="type" defaultValue={"Video?"} onChange={e=>setNewResourceType(e.target.value)} />
        </div>
        <div>
        <label> URL: </label>
            <input key="r_url" type="text" id="url" defaultValue={"URL"} onChange={e=>setNewResourceURL(e.target.value)} />
        </div>   
        <div>
        <button onClick={()=>AddNewResource()}> Add Resource </button> 
        </div>
        </div>
    )
}

export default BrowseAll; 