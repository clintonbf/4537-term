import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {Link,  useHistory} from 'react-router-dom';
import {GET_ALL_COLLECTION} from '../API_calls'; 
import {Button, CenterContainer, Small_Button} from '../GlobalStyle';
import {InfoRowLeft, TitleRow, Title, MiniContainer} from '../Components/HomeContainer/HomeContainter.elements'; 

const BrowseAllCollections = () => {
    
    const history = useHistory();
    let content = null; 
    const [allCollections, setAllCollections] = useState(); 
    
    const {authTokens} = useAuth({col: []}); 

    
   
    const getAll = () => {
        axios.get(GET_ALL_COLLECTION(), {headers: 
            {'Authorization': 'Bearer ' + authTokens}
        }).then(result => {
            if(result.status === 200) {
                setAllCollections(result.data); 
                console.log(result.data); 
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
        <CenterContainer>
           {allCollections.map((item, i) => (
                <InfoRowLeft key={`${item.id}index`}> 
                    <Link to={{pathname: `/browseCollection/${item.id}`}}> 
                    <Button key={`${item.title}_title`}> {item.title} </Button> 
                    </Link> 
                </InfoRowLeft>
           ))} 
            </CenterContainer>
    }


    return (
        <div>
            <TitleRow>
                <Title>
                     Collections
                </Title>
            </TitleRow>
            {content}
            <MiniContainer>
                  <Button onClick={handleClick}> Create New Collection </Button>
            </MiniContainer>
            <MiniContainer>
                
            </MiniContainer>
        </div>
    )
}

export default BrowseAllCollections; 