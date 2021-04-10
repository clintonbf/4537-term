const URL = "https://clintonfernandes.ca/COMP4537/termproject/API/v1"; 


const POST_RESOURCE = () => {
    return `${URL}/resources`; 
}; 

const PUT_RESOURCE = () => {
    return `${URL}/resources`; 
}; 

const GET_RESOURCE = (id) => {
    return `${URL}/resources/${id}`; 
}

const DELETE_RESOURCE = (id) => {
    return `${URL}/resources/${id}`; 
}

const GET_RESOURCE_COMMENT = (id) => {
    return `${URL}/resourcescomments/${id}`; 
}

const GET_RANDOM_RESOURCE = (id) => {
    return `${URL}/resourcesrandom`
}

const POST_RESOURCE_COMMENT = (id) => {
    return `${URL}/resources/${id}`; 
}

const POST_COLLECTION = () => {
    return `${URL}/collections`; 
}

const GET_DELETE_COLLECTION = (id) => {
    return `${URL}/collections/${id}`; 
}

const GET_ALL_COLLECTION = (id) => {
    return `${URL}/collectionsAll`;
}

const GET_All_RESOURCE = (id) => {
    return `${URL}/resourcesAll`; 
}



module.exports = {
    GET_RESOURCE, 
    POST_RESOURCE, 
    PUT_RESOURCE, 
    DELETE_RESOURCE, 
    POST_RESOURCE_COMMENT, 
    POST_COLLECTION, 
    GET_DELETE_COLLECTION, 
    GET_ALL_COLLECTION, 
    GET_All_RESOURCE, 
    GET_RESOURCE_COMMENT, 
    GET_RANDOM_RESOURCE
}
