import React, { useState, useEffect } from 'react'; 
import {Button} from '../GlobalStyle'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {POST_COLLECTION, POST_RESOURCE} from '../API_calls'; 

const AddCollection = () => {
    const {authTokens} = useAuth({col: []}); 

    const [title, setTitle] = useState("Title");
    const [description, setDescription] = useState("Description"); 
    const [theme, setTheme] = useState("Theme"); 
    
    const [resources, setResources] = useState(["ResourceName"]); 
    const [resourcesURL, setResourcesURL] = useState(["ResourceDesc"]); 
    
    const [rBox, setrBox] = useState([]); 
    
    const appendInput = (e) => {
        let newInput = `r${rBox.length}`; 
        setrBox(state=>[newInput, ...state]); 
    }

    const handleResourceTitleChange = (e) => {
        const newResource = resources.slice();  
        console.log(e.target.id); 
        let parsedID = parseInt(e.target.id);  
        newResource[parsedID] = e.target.value; 
        console.log(newResource); 
        setResources(newResource); 
    }

    const handleResourceURLChange = (e) => {
        const newResource = resourcesURL.slice();  
        console.log(e.target.id); 
        let parsedID = parseInt(e.target.id);  
        newResource[parsedID] = e.target.value; 
        console.log(newResource); 
        setResourcesURL(newResource); 
    }

    const createCollection = (e) => {

        // let collectionID = null; 
        let resourceIDS = []; 
        console.log("create collection"); 
        
        const newCResourceData = {rBox};  
        
        // resources 
        for(let i =0; i < rBox.length; i++) {
            let newResource = {"url": resourcesURL[i], "type": "video", "title": resources[i]}; 
            let json = JSON.stringify(newResource); 

            axios.post(POST_RESOURCE(), json, {headers: {'Authorization': 'Bearer ' + authTokens, 'Content-Type': 'application/json'}
        }).then(result => {
            if(result.status === 200) {
                console.log(result.data); 
                console.log(JSON.stringify(result.data));
                console.log(JSON.stringify(result.data.inserted_id));  
                resourceIDS.push(parseInt(JSON.stringify(result.data.inserted_id))); 
                console.log(resourceIDS); 
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        })
        }
        
        console.log(resourceIDS); 

        const newCollectionData = {"collection": {
                "title": title, "description": description, "theme": theme
            }, "resources": resourceIDS
        }
        let json = JSON.stringify(newCollectionData); 

        axios.post(POST_COLLECTION(), json, {headers: 
            {'Authorization': 'Bearer ' + authTokens, 'Content-Type': 'application/json'} 
        }).then(result => {
            if(result.status === 200) {
                console.log(result.data); 
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }) 

}

    return (
        <div>
            <form>
            <label> Collection Title: </label>
            <input key="collection_title" type="text" id="title" defaultValue={title} onChange={e=>setTitle(e.target.value)} /> 

            <label> Collection Description: </label>
            <input key="collection_desription" type="text" id="descr" defaultValue={description} onChange={e=>setDescription(e.target.value)} />

            <label> Theme: </label>
            <input key="collection_theme" type="text" id="theme" defaultValue={theme} onChange={e=>setTheme(e.target.value)} />
            
            </form>
                <div>
                    {rBox.map((rBox, i) => <div key={`${i}div`}> <p> New Resource</p> <input id={`${i}name`} key={`${i}name`} name="r_name" type="text" defaultValue="New Resources Name" onChange={handleResourceTitleChange}/> <input id={`${i}url`} key={`${i}url`} name="r_url" type="text" defaultValue="New Resource URL" onChange={handleResourceURLChange}/> </div> )};
                </div>
            <button onClick={appendInput}> Add Resource </button>
            <button onClick={createCollection}> Create Collection </button>
        </div>
    )
}
export default AddCollection;