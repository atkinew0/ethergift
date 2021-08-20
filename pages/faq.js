import React from 'react';
import Layout from '../components/Layout'


const FAQ = () => {

    return(
        <Layout>
       
        <dl>
            <hr/>
            <dt>What is Ethergift?</dt>
            <dd>Ethergift lets you send a Ether as a gift to anyone with an existing Ethereum address via a smart contract. Our website gives you a personalized card to print out or email to the recipient.</dd>
            <hr/>
            <dt>How to I send a gift?</dt>
            <dd>From the homepage click on the make a gift button or on the Give menu button, fill out the required form including the amount of ether you want to send. The To, From, and Message fields are optional fields to personalize your gift. After you fill out the form click send and use Metamask or similar wallet to approve the transaction.</dd>
            <hr/>
            <dt>How do I receive a gift?</dt>
            <dd>If you have been sent an Ethergift</dd>
            <hr/>
            <dt>4 What if I want to give ethereum to someone who doesn't have an ethereum address?</dt>
            <dd>You could make an address for them using any wallet software and share the private key when you send them the gift card.</dd>
            <hr/>
            <dt>Why not just send Ethereum directly?</dt>
            <dd>Ethergift has additional features compared to sending ethereum to someone directly. First you are able to generate a personalized card to print or email the recipient. Second, as a feature of the smart contract you are optionally able to lock the funds so that the recipient cannot withdraw them until after some future date.</dd>
            <hr/>
            <dt>Where can I see the code the contract is running?</dt>
            <dd>giuthub link</dd>
        </dl>
        </Layout>
    )


}

export default FAQ;