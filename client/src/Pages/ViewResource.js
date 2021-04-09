import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useAuth } from '../context/auth';
import {DELETE_RESOURCE, GET_RESOURCE, PUT_RESOURCE, GET_RESOURCE_COMMENT, POST_RESOURCE_COMMENT} from '../API_calls'; 
import {Link} from 'react-router-dom'; 
import { useParams, useHistory } from 'react-router-dom'; 
import { CenterContainer, Small_Button } from '../GlobalStyle';
import { DescRow, InfoRow, TitleRow, Title, MiniTitle,  MiniContainer } from '../Components/HomeContainer/HomeContainter.elements';


const ViewResource = () => {
    let params = useParams();
    const history = useHistory();
    let content = null; 
    let commentContent = null; 
    
    const {authTokens} = useAuth({col: []}); 
    const [resource, setResource] = useState();
    
    const [update, setUpdate] = useState(false); 
    const [editBox, setEditBox] = useState([]); 
    const [editTitle, setEditTitle] = useState(); 
    const [editURL, setEditUrl] = useState(); 
    const [paramId, setParamId] = useState(params.id); 
    const [comments, setComments] = useState([]); 
    const [newComment, setNewComment] = useState(); 

    let r_id = params.id;  
    const addComment = (id) => {

        let data = {"comment": newComment}; 
        let json = JSON.stringify(data); 
        // what is the JSON 
        axios.post(POST_RESOURCE_COMMENT(id), json, {headers: 
            {'Authorization': 'Bearer ' + authTokens, 'Content-Type': 'application/json'}
        }).then(result => {
            if(result.status === 200) {
                setResource(result.data);
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

    const updateResource = (id) => {
        
        
        let update = {"id": id, "title": editTitle, "url": editURL}; 
        let json = JSON.stringify(update); 
        
        axios.put(PUT_RESOURCE(), json, {headers: 
            {'Authorization': 'Bearer ' + authTokens, 'Content-Type': 'application/json'}
        }).then(result => {
            if(result.status === 200) {
                setResource(result.data);
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

    const deleteResource = (id) =>{
        axios.delete(DELETE_RESOURCE(id), {headers: 
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
        
        history.push('/browseAllResources');
    };

    const getResourceCommentsById = (id) => {
        axios.get(GET_RESOURCE_COMMENT(id), {headers: 
            {'Authorization': 'Bearer ' + authTokens}
        }).then(result => {
            if(result.status === 200) {
                setComments(result.data);
                console.log(result.data);  
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }); 
    };

    const getResourceById = (id) => {
        axios.get(GET_RESOURCE(id), {headers: 
            {'Authorization': 'Bearer ' + authTokens}
        }).then(result => {
            if(result.status === 200) {
                setResource(result.data);
                console.log(result.data);  
                return result.data; 
            } else {
                console.log(result); 
            }
        }).catch(e=>{
            console.log(e); 
        }); 
    } 


    useEffect(() => {
        getResourceById(r_id)
        getResourceCommentsById(r_id); 
    }, []); 


    const editResource = (e) => {
        console.log("clicked"); 
        console.log(update == false); 
        if((update == false) && (resource!=null)) {
            let newInput = `newUpdate`; 
            setEditBox(state => [newInput, ...state]); 
            setUpdate(true);  
        } else {
            // do
        }
        console.log(update == false); 
    }

    if(resource) {
        content = 
        <div>
           {resource.map((item, i) => (
                <CenterContainer key={`res${i}`}> 
                    <DescRow key={`${i}title`} > Resource Title :  {item.title} </DescRow> 
                    <DescRow key={`${i}desc`}> Description: {item.description} </DescRow>
                    <DescRow key={`url${i}`}> URL: {item.url} </DescRow> 
                    <DescRow>
                        <Small_Button onClick={editResource}> Update </Small_Button>
                    </DescRow>
                </CenterContainer>
           ))} 
        </div>
    }

    if(comments) {
        commentContent = 
        <MiniContainer>
            <h3> Comments </h3>
            {comments.map((item, i) => (
                <p key={`${i}comment`}> {item.comment} </p>
            ))}
        </MiniContainer>
    }

    return (
        <div>
        <TitleRow> 
            <Title>
                View Resource
            </Title> 
        </TitleRow>
            {content}
                <div>
                    {editBox.map((editBox, i =>
                        <MiniContainer key={`${i}div`}> 
                        <MiniTitle> Update: </MiniTitle> 
                    <div>
                    <label> Title: </label>
                        <input id={`${i}title`} key={`${i}title`} defaultValue={resource[0].title} onChange={(e)=>setEditTitle(e.target.value)} />
                    </div>
                    <div> 
                     <label> URL: </label>
                        <input id={`${i}url`} key={`${i}url`} defaultValue={resource[0].url} onChange={(e)=>setEditUrl(e.target.value)} />
                    </div>
                    </MiniContainer>   
                        ))}
                </div>
                <MiniContainer>
                <Small_Button onClick={() => updateResource(paramId)}> Save Changes </Small_Button>    
                </MiniContainer> 
            
            {commentContent}
            
            <MiniContainer>
            <h5> Add New Comment </h5>
            
            <input id={`newcomment`} key={`comment`} defaultValue={"New Comment"} onChange={(e)=>setNewComment(e.target.value)} />
            <Small_Button onClick={() => addComment(paramId)}> Add! </Small_Button> 
        

            </MiniContainer>
            <MiniContainer>
                <div>
                    <Small_Button alert onClick={() => deleteResource(paramId)}> Delete This Resource </Small_Button>
                </div>
            </MiniContainer>
            
          
        
        </div>
    )
}

export default ViewResource; 