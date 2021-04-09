import React, { useState, useEffect } from 'react'; 
import {Button} from '../GlobalStyle'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {Link,  useHistory} from 'react-router-dom';
import {GET_ALL_COLLECTION} from '../API_calls'; 

const BrowseAllCollections = () => {
    
    const history = useHistory();
    let content = null; 
    const [allCollections, setAllCollections] = useState(); 
    
    const {authTokens} = useAuth({col: []}); 

    // let dummy = [{"collection_id":1,"title":"PThreads","c_description":"pthreads from Jacob Sorber","theme":"videos","url":"https://www.youtube.com/watch?v=It0OFCbbTJE","r_description":"Arguments and values in threads"},{"collection_id":1,"title":"PThreads","c_description":"pthreads from Jacob Sorber","theme":"videos","url":"https://www.youtube.com/watch?v=uA8X5zNOGw8&t=3s","r_description":"A video about pthreads"}]; 
    // console.log(dummy); 
    
   
    const getAll = () => {
        axios.get(GET_ALL_COLLECTION(), {headers: 
            {'Authorization': 'Bearer ' + authTokens}
        }).then(result => {
            if(result.status === 200) {
                setAllCollections(result.data); 
                console.log(result.data); 
                console.lod(allCollections);  
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }) 
    }

    const handleClick = () =>{
        history.push("/addCollection"); 
    }

    useEffect(() => {
        getAll(); 
    }, []); 

    if(allCollections) {
        console.log(allCollections); 
        content = 
        <div>
           {allCollections.map((item, i) => (
                <div key={`${item.id}index`}> 
                    <Link to={{pathname: `/browseCollection/${item.id}`}}> 
                    <div key={`${item.title}_title`}> {item.title} </div> 
                    </Link> 
                </div>
           ))} 
            </div>
    }


    return (
        <div>
            COLLECTIONS
            {content}
            <button onClick={handleClick}> Create a Collection </button>
        
        </div>
    )
}

export default BrowseAllCollections; 