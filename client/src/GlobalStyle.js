import styled, {createGlobalStyle} from 'styled-components'; 

const GlobalStyle = createGlobalStyle`
*{    
box-sizing: border-box; 
margin: 0; 
padding: 0; 
font-family: 'Source Sans Pro', sans-serif; 
}`;

export const CenterContainer = styled.div`
    z-index: 1; 
    width: 100%; 
    background-color: #003366; 
    max-width: 1000px; 
    margin-right: auto; 
    margin-left: auto; 
    padding-right: 10%; 
    padding-left: 5%;
    padding-top: 5%; 
    padding-bottom: 5%; 

    @media screen and (max-width: 991px){
        padding-right: 30px; 
        padding-left: 30px;    
    }
`;

export const Container = styled.div`
    z-index: 1; 
    width: 100%; 
    max-width: 1300px; 
    margin-right: auto; 
    margin-left: auto; 
    padding-right: 50px; 
    padding-left: 50px;

    @media screen and (max-width: 991px){
        padding-right: 30px; 
        padding-left: 30px;    
    }
`;

export const Button = styled.button`

background: ${({primary}) => (primary ? '#FFB800' : '#FFB800')}; 
white-space: nowrap; 
padding: ${({big}) => (big ? '24px 34px' : '14px 24px')}; 
color: #003366; 
font-size: ${({fontBig}) => (fontBig ? '20px' : '20px')}; 
outline: None; 
border: none; 
cursor: PointerEvent; 

&:hover {
    transition: all 0.3s ease-outerHeight; 
    background: #fff; 
    background: ${({primary}) => (primary ? '#FFB800' : '#003366' )};
    border: 2px solid #FFB800; 
    color: #FFB800; 
    @media screen and (max-width: 960px) {
        width: 100%; 
    }
}
`;

export default GlobalStyle; 