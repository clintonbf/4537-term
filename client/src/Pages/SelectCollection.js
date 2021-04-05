import React, { useState, useEffect } from 'react'; 
import {Button} from '../GlobalStyle'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {Link,  useHistory} from 'react-router-dom';
import {GET_COLLECTION} from '../API_calls'; 

const SelectCollection = () => {
    
    let content = null; 
    const history = useHistory();
    const [collections, setCollecions] = useState(); 
    
    const {authTokens} = useAuth({col: []}); 

    // let dummy = [{"collection_id":1,"title":"PThreads","c_description":"pthreads from Jacob Sorber","theme":"videos","url":"https://www.youtube.com/watch?v=It0OFCbbTJE","r_description":"Arguments and values in threads"},{"collection_id":1,"title":"PThreads","c_description":"pthreads from Jacob Sorber","theme":"videos","url":"https://www.youtube.com/watch?v=uA8X5zNOGw8&t=3s","r_description":"A video about pthreads"}]; 
    // console.log(dummy); 
    
    useEffect(() => {
       axios.get(GET_COLLECTION(1), {headers: 
            {'Authorization': 'Bearer ' + authTokens}
        }).then(result => {
            if(result.status === 200) {
                setCollecions(result.data); 
                console.log(JSON.stringify(collections)); 
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }); 
    }, [GET_COLLECTION(1)]); 


    function handleClick(){
        history.push("/addCollection"); 
    }

    return (
        <div>
            COLLECTIONS
            <div>
           {dummy.map(item => (
                <div> 
                    <Link to={{pathname: `/browseCollection/${item.collection_id}`}}> 
                    <div key={item.title}> {item.title} </div> 
                    </Link> 
                    <div key={item.c_description}>{item.c_description} </div> 
                </div>
           ))} 
            </div>
            <button onClick={handleClick}> Create a Collection </button>
        
        </div>
    )
}

export default SelectCollection; 