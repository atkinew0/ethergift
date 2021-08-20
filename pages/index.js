import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Container, Button, Menu, Image } from 'semantic-ui-react';
import { Link}  from '../routes'
import 'semantic-ui-css/semantic.min.css'

export default function Home() {


  const gradStyle = {
    height:"500px",
    backgroundColor:"black",
    backgroundImage:"linear-gradient(to bottom right, purple, black)",
   
  }

  const menuStyle = {
    background:"transparent",
    
    borderColor:"transparent",
    boxShadow:"none",
    zIndex:"100"
  }

  const menuItem = {
    color:"white",
    fontSize:"1.2em",
    
  }

  const imgStyle = {
    width:"400px",
    position:"absolute",
    left:"160px",
    top:"40px",
    
    

  }

  const logoStyle = {
    color:"white",
    fontSize:"100px",
    letterSpacing:"15px",
    fontFamily:"roboto",
    position:"relative",
    top:"-250px",
    marginLeft:"30%"
  }

  const containerStyle = {
    textAlign: "center",
    margin:"50px"
  }


  return (
   <div>
     <Head>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
     </Head>
     
    
     <Menu borderless inverted floated style={menuStyle}>
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
     <div style={gradStyle}><Image style={imgStyle} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/800px-Ethereum-icon-purple.svg.png" wrapped /></div>
     
     <span style={logoStyle}>Ethergift</span>
     <Container style={containerStyle}>
     

        <h3 style={{margin:"20px"}}>Send anyone a personalized gift of Ether and they can unlock it any time</h3>
        <Link route="/give"><a><Button>Make a Gift</Button></a></Link>
        <Link route="/receive"><a><Button>Receive a Gift</Button></a></Link>
        </Container>
        
     
   </div>
  )
}
<Container></Container>