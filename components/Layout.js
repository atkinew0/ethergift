import React from 'react';
import Header from './Header';
import { Container } from "semantic-ui-react";
import Head from 'next/head';

const footStyle ={
    position:"fixed",
    padding:"10px 10px 0px 10px",
    bottom:"0",
    height:"40px",
    backgroundColor:"black",
    backgroundImage:"linear-gradient(to bottom right, purple, black)",
    marginTop:"20px",
    width:"100%"
}

const Layout = (props) => {
    return (

        <div>
            <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
            </Head>
            <Header />
            <Container >
            {props.children}
            </Container>
            
            <div style={footStyle}></div>
        </div>
        
    )
};

export default Layout;