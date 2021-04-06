import styled from 'styled-components'; 

export const TitleRow = styled.div`
    display: flex; 
    flex-wrap: nowrap; 
    justify-content: center; 
    font-size: 40px; 
    letter-spacing: 1.4px; 
    margin-bottom: 5px; 
    color: #FFB800; 
`; 

export const Title = styled.h2`
    color: #FFB800; 
    padding: 20px; 
    border: 2px solid #FFB800; 
`; 


export const InfoRow = styled.div`
display: flex; 
margin: 0 25px 25px 25px;
flex-wrap: wrap; 
/* align-items: center;   */
justify-content: center; 
`;

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
