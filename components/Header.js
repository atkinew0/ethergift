import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from '../routes';

const gradStyle = {
    height:"70px",
    backgroundColor:"black",
    backgroundImage:"linear-gradient(to bottom right, purple, black)",
   
    width:"100%"
  
}

const menuStyle = {
    background:"transparent",
    
    borderColor:"transparent",
    boxShadow:"none",
    zIndex:"100",
    float:"right",
    position:"relative",
    top:"-5px"

  }

  const menuItem = {
    color:"white",
    fontSize:"1.2em",
    
  }

const imgStyle = {
    height:"65px",
    float:"left"
    
}

export default () => {
    return (
       <div style={gradStyle}>


       <a href="/"><Image  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/800px-Ethereum-icon-purple.svg.png" style={imgStyle} /></a>
      
       

        <Menu borderless inverted style={menuStyle}>
        <Menu.Item style={menuItem}> 
     
        <Link route="/give"> Give</Link>
        </Menu.Item >
        <Menu.Item style={menuItem}>
        <Link route="/receive"> Receive</Link>
        </Menu.Item>
        <Menu.Item style={menuItem}>
        <Link route="/faq"> FAQ</Link>
        </Menu.Item>
        </Menu>
        </div>

    );
}