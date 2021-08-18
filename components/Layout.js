import React from 'react';
import Header from './Header';
import { Container } from "semantic-ui-react";
import Head from 'next/head';

const footStyle ={
    height:"40px",
    backgroundColor:"black",
    backgroundImage:"linear-gradient(to bottom right, purple, black)",
    marginTop:"20px"
}

export default (props) => {
    return (

        <Container>
            <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
            </Head>
            <Header />
            {props.children}
            
            <div style={footStyle}></div>
        </Container>
    )
};