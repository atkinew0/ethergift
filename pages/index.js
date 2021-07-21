import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Container, Button } from 'semantic-ui-react';
import { Link}  from '../routes'
import 'semantic-ui-css/semantic.min.css'

export default function Home() {
  return (
   <div>
     <Head>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
     </Head>
     
        <h1>Ether Gift</h1>

        <p>Send anyone a personalized gift of Ether and they can unlock it any time</p>
        <Link route="/give"><a><Button>Make a Gift</Button></a></Link>
        <Link route="/receive"><a><Button>Receive a Gift</Button></a></Link>
        
     
   </div>
  )
}
