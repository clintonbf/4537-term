const URL = "http://localhost:3000/COMP4537/termproject/API/v1"; 

const POST_RESOURCE = () => {
    return `${URL}/resources`; 
}; 

const PUT_RESOURCE = () => {
    return `${URL}/resouces`; 
}; 

const GET_RESOURCE = (id) => {
    return `${URL}/resources/${id}`; 
}

const DELETE_RESOURCE = (id) => {
    return `${URL}/resources/${id}`; 
}

const POST_RESOURCE_COMMENT = (id) => {
    return `${URL}/resouces/${id}`; 
}

const POST_COLLECTION = () => {
    return `${URL}/collections`; 
}

const GET_DELETE_COLLECTION = (id) => {
    return `${URL}/collections/${id}`; 
}




module.exports = {
    GET_RESOURCE, 
    POST_RESOURCE, 
    PUT_RESOURCE, 
    DELETE_RESOURCE, 
    POST_RESOURCE_COMMENT, 
    POST_COLLECTION, 
    GET_DELETE_COLLECTION
}
