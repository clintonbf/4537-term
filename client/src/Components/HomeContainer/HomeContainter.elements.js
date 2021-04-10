import styled from 'styled-components'; 

export const TitleRow = styled.div`
    display: flex; 
    flex-wrap: nowrap; 
    justify-content: center; 
    font-size: 30px; 
    letter-spacing: 1.4px; 
    margin-bottom: 5px; 
    color: #FFB800; 
`; 

export const Title = styled.h2`
    color: #FFB800; 
    padding: 20px; 
    border: 2px solid #FFB800; 
`; 

export const MiniContainer = styled.div`
    width: 100%; 
    margin-right: auto; 
    margin-left: auto; 
    padding-right: 20%; 
    padding-left: 20%;
    padding-top: 2%; 
    padding-bottom: 3px; 

    @media screen and (max-width: 991px){
        padding-right: 20px; 
        padding-left: 20px;    
    }

`; 

export const InputOutline = styled.div`
    border: 2px solid #FFB800; 
    margin-right: 50%; 
    margin-left: auto; 
`; 

export const DesTitle = styled.h3`
    color: #FFB800; 
    padding: 10px; 
`;


export const GroupingDiv = styled.div`
    padding: 20px; 
`; 

export const MiniTitle = styled.h2`
    color: #FFB800; 
    padding: 10px; 

`; 


export const InfoRow = styled.div`
display: flex; 
margin: 0 25px 25px 25px;
flex-wrap: wrap; 
/* align-items: center;   */
justify-content: center; 
`;

export const DescRow = styled.div`
letter-spacing: 1.5px; 
display: flex; 
margin: 7px; 
font-size: 20px;
flex-wrap: wrap;  
color: white;
justify-content: center;  
`

export const InfoRowLeft = styled.div`
display: flex; 
margin: 0 15px 15px 15px;
flex-wrap: wrap; 
/* align-items: center;   */
justify-content: left; 
`;

export const LoginButton = styled.button`
    background: #003366; 
    color: #FFB800; 
    padding: 20px; 
    border: 2px solid #FFB800;
    border-radius: 35px; 
`
