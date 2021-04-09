import React, { useState, useEffect} from 'react'; 
import {Button} from '../GlobalStyle'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {GET_DELETE_COLLECTION} from '../API_calls'; 
import { useHistory, useParams } from 'react-router-dom'; 

const BrowseCollection = () => {
    let params = useParams();

    const history = useHistory(); 
    let content = null; 
    const [singleCollection, setSingleCollection] = useState(); 
    const {authTokens} = useAuth({col: []}); 
    let id = params.id;  
    console.log(id); 

    const getCollectionById = (id) => {
        axios.get(GET_DELETE_COLLECTION(id), {headers: 
            {'Authorization': 'Bearer ' + authTokens}
        }).then(result => {
            if(result.status === 200) {
                setSingleCollection(result.data);
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }); 

    } 

    useEffect(() => {
        getCollectionById(id)
    }, []); 



    if(singleCollection){
        content = 
        <div>
           {singleCollection.map((item, i) => (
                <div key={`res${i}`}> 
                    <div key={`desc${i}`}>{item.r_description} </div> 
                    <div key={`url${i}`}>{item.url} </div> 
                </div>
           ))} 
            </div>
    } 

    const deleteCollection = (e, id) =>{
        
        const c_id = params.id; 
        
        axios.delete(GET_DELETE_COLLECTION(c_id), {headers: 
            {'Authorization': 'Bearer ' + authTokens}
        }).then(result => {
            if(result.status === 200) {
        
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        });
        
        history.push('/browseAllCollections');
        
    }

    return (
        <div>
            COLLECTIONS
            {content}
            <button onClick={()=>deleteCollection(id)}> Delete Collection </button>
        </div>
    )
}

export default BrowseCollection; 