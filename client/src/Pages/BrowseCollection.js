import React, { useState, useEffect} from 'react'; 
import {Button, Container, Small_Button, CenterContainer} from '../GlobalStyle'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {GET_DELETE_COLLECTION} from '../API_calls'; 
import { useHistory, useParams } from 'react-router-dom'; 
import { TitleRow, Title, DescRow, MiniContainer, GroupingDiv } from '../Components/HomeContainer/HomeContainter.elements';

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
        <CenterContainer>
           {singleCollection.map((item, i) => (
                <GroupingDiv key={`res${i}`}> 
                    <DescRow key={`desc${i}`}> {i} : {item.r_description} </DescRow> 
                    <DescRow key={`url${i}`}> URL : {item.url} </DescRow> 
                </GroupingDiv>
           ))} 
            </CenterContainer>
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
            <TitleRow>
                <Title>
                    Collection
                </Title>
            </TitleRow>
            {content}

            <MiniContainer>
                 <Small_Button alert onClick={()=>deleteCollection(id)}> Delete Collection </Small_Button>  
            </MiniContainer>
         
        </div>
    )
}

export default BrowseCollection; 