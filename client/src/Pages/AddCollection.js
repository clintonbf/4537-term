import React, { useState, useEffect } from 'react'; 
import {Button} from '../GlobalStyle'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {POST_COLLECTION, POST_RESOURCE} from '../API_calls'; 

const AddCollection = () => {
    
    const [title, setTitle] = useState("Title");
    const [description, setDescription] = useState("Description"); 
    const [resources, setResources] = useState(["newResources"]); 
    
    const [rBox, setrBox] = useState([]); 

    const appendInput = (e) => {
        let newInput = `r${rBox.length}`; 
        setrBox(state=>[newInput, ...state]); 
    }

    // const handleNameChange = (e) => {
    //     const newResource = resources.slice(); 
    //     newResource[e.target.id] = e.target.value; 
    //     console.log(newResource); 
    //     setResources(newResource); 
    // }

    const createCollection = (e) => {

        // let collectionID = null; 
        // let resourceIDS = []; .

        const newCollectionData = {"title": title, "c_description": description}; 
        const newCResourceData = {resources}; 
    

        // if no resources just create a new collection w/ post collection  
        if(!newCResourceData){
       axios.post(POST_COLLECTION, {headers: 
            {'Authorization': 'Bearer ' + authTokens}, 
            data: {newCollectionData}
        }).then(result => {
            if(result.status === 200) {
                // get ID 
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }) 
        } else {
        // create collection -- return the ID 
 
        // create resources
        // get the ID's -> put in to an array  

        // ** POST THE RESOURCE COLLECTION TABLE ** // 
        }
        
}

    return (
        <div>
            <form>
            <label> Collection Title: </label>
            <input key="collection_title" type="text" id="title" defaultValue={title} /> 

            <label> Collection Description: </label>
            <input key="collection_desription" type="text" id="descr" defaultValue={description} />
            </form>
                <div>
                    {rBox.map((rBox, i) => <div> <p> New Resource</p> <input id={`name${i}`} key={`name${i}`} name="r_name" type="text" defaultValue="New Resources Name"/> <input id={`url${i}`} key={`url${i}`} name="r_url" type="text" defaultValue="New Resource URL"/> </div> )};
                </div>
            <button onClick={appendInput}> Add Resource </button>
            <button> Create Collection </button>
        </div>
    )
}
export default AddCollection;