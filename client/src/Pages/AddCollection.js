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
    const [resourceDesc, setResourceDesc] = useState(["Resource Descrition"]); 
    const [resourceIDs, setResourceIDs] = useState([]); 

    const [rBox, setrBox] = useState([]); 
    
    const appendInput = (e) => {
        let newInput = `r${rBox.length}`; 
        setrBox(state=>[newInput, ...state]); 
    }

    const handleResourceTitleChange = (e) => {
        const newResource = resources.slice();  
        let parsedID = parseInt(e.target.id);  
        newResource[parsedID] = e.target.value;
        setResources(newResource); 
    }

    const handleResourceURLChange = (e) => {
        const newResource = resourcesURL.slice();  
        let parsedID = parseInt(e.target.id);  
        newResource[parsedID] = e.target.value; 
        setResourcesURL(newResource); 
    }

    const handleResourceDescriptionChange = (e) => {
        const newResource = resourcesURL.slice();  
        let parsedID = parseInt(e.target.id);  
        newResource[parsedID] = e.target.value; 
        setResourceDesc(newResource); 
    }


    const createCollection = async(e) => { 
        
        const newArray = []; 

        for(let i =0; i < rBox.length; i++) {
            let newResource = {"url": resourcesURL[i], "type": "video", "title": resources[i], "description": resourceDesc[i]}; 
            let json_r = JSON.stringify(newResource); 
            console.log("new respurces " + json_r); 
            await axios.post(POST_RESOURCE(), json_r, {headers: {'Authorization': 'Bearer ' + authTokens, 'Content-Type': 'application/json'}
        }).then(result => {
            if(result.status === 200) {
                const newvalue = result.data.inserted_id; 
                newArray.push(newvalue); 
                console.log(newArray); 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        })
        }

        console.log(newArray);
        
        const newCollectionData = {"collection": {
                "title": title, "description": description, "theme": theme
            }, "resources": newArray
        }
        let json = JSON.stringify(newCollectionData); 
        console.log(json); 

        await axios.post(POST_COLLECTION(), json, {headers: 
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
                    {rBox.map((rBox, i) => 
                    <div key={`${i}div`}> 
                    <p> New Resource</p> 
                    <input id={`${i}name`} key={`${i}name`} name="r_name" type="text" defaultValue="New Resources Name" onChange={handleResourceTitleChange}/> 
                    <input id={`${i}desc`} key={`${i}desc`} name="r_desc" type="text" defaultValue="New Resource Description" onChange={handleResourceDescriptionChange}/> 
                    <input id={`${i}url`} key={`${i}url`} name="r_url" type="text" defaultValue="New Resource URL" onChange={handleResourceURLChange}/> 
                    </div> )};
                </div>
            <button onClick={appendInput}> Add Resource </button>
            <button onClick={createCollection}> Create Collection </button>
        </div>
    )
}
export default AddCollection;