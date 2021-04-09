import React, { useState, useEffect} from 'react'; 
import {Button} from '../GlobalStyle'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {GET_DELETE_COLLECTION} from '../API_calls'; 
import { useParams } from 'react-router-dom'; 

const BrowseCollection = () => {
    let params = useParams();

    let content = null; 
    const [singleCollection, setSingleCollection] = useState(); 
    const {authTokens} = useAuth({col: []}); 
    let id = params.id;  
    console.log(id); 

    // let dummy = [{"collection_id":1,"title":"PThreads","c_description":"pthreads from Jacob Sorber","theme":"videos","url":"https://www.youtube.com/watch?v=It0OFCbbTJE","r_description":"Arguments and values in threads"},{"collection_id":1,"title":"PThreads","c_description":"pthreads from Jacob Sorber","theme":"videos","url":"https://www.youtube.com/watch?v=uA8X5zNOGw8&t=3s","r_description":"A video about pthreads"}]; 
    
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
        axios.delete(GET_COLLECTION(id), {headers: 
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
    }

    return (
        <div>
            COLLECTIONS
            {content}
            <button onClick={deleteCollection}> Delete Collection </button>
        </div>
    )
}

export default BrowseCollection; 