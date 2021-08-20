import React from 'react';
import Layout from '../components/Layout'


function toggle(elem){

    console.log("elem is?", elem);

    let next = elem.target.nextSibling;

    console.log("got next", next)
    console.log("current display is ", next.style)

    next.style.display = window.getComputedStyle(next).display === "none" ? "block" : "none";

    console.log("after function current display is ", next.style.display)
}

const FAQ = () => {


    return(
        <Layout>
       
        <dl>
            <hr/>
            <dt onClick={toggle}>What is Ethergift?</dt>
            <dd>Ethergift lets you send a Ether as a gift to anyone with an existing Ethereum address via a smart contract. Our website gives you a personalized card to print out or email to the recipient.</dd>
            <hr/>
            <dt onClick={toggle}>How to I send a gift?</dt>
            <dd>From the homepage click on the make a gift button or on the Give menu button, fill out the required form including the amount of ether you want to send. The To, From, and Message fields are optional fields to personalize your gift. After you fill out the form click send and use Metamask or similar wallet to approve the transaction.</dd>
            <hr/>
            <dt onClick={toggle}>How do I receive a gift?</dt>
            <dd>If you have been sent an Ethergift you will need the gift number, password and ability to send the transaction from the address listed as recipient on the gift. Enter these items in the Receive menu and send the transaction.</dd>
            <hr/>
            <dt onClick={toggle}>What if I want to give ethereum to someone who doesn't have an ethereum address?</dt>
            <dd>You could make an address for them using any wallet software and share the private key when you send them the gift card.</dd>
            <hr/>
            <dt onClick={toggle}>Why not just send Ethereum directly?</dt>
            <dd>Ethergift has additional features compared to sending ethereum to someone directly. First you are able to generate a personalized card to print or email the recipient. Second, as a feature of the smart contract you are optionally able to lock the funds so that the recipient cannot withdraw them until after some future date.</dd>
            <hr/>
            <dt onClick={toggle}>Where can I see the code the contract is running?</dt>
            <dd><a href="https://github.com/atkinew0/ethergift">Github</a></dd>
        </dl>
        </Layout>
    )


}

export default FAQ;