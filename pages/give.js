import React, {Component} from 'react';
import { Form, Input, TextArea, Button, Container, Checkbox} from 'semantic-ui-react';
import Head from 'next/head'
import hookup from '../ethereum/contracts/hookup.js';
import web3 from '../ethereum/contracts/web3.js';
import config from '../config.json';
import {Router} from '../routes.js';
import Giftcard from '../components/Giftcard';
import DateTimeForm from '../components/Date.js'
import Layout from '../components/Layout'



class Give extends Component {

    state = {
        value:'',
        loading:false,
        errorMessage:'',
        password:'',
        message:'',
        giftNumber:-1,
        to:'',
        from:'',
        toError:'',
        fromError:'',
        amountError:'',
        passwordError:'',
        addressError:'',
        recipientAddress:'',
        unlockDate:0,
        giftSent:false,
        dateLocked:false

    };

    validate = () => {

        let error = false;

        if(this.state.to == ""){
            this.setState({toError:"To field is required"})
            error = true;
        }

        if(this.state.from == ""){
            this.setState({fromError:"From field is required"})
            error = true;
        }

        if(this.state.value > .1 || this.state.value <= 0){
            this.setState({amountError:"(Beta version) amount must be between 0 and .1 Ether"})
            error = true;
        }

        if(this.state.password.length < 8){
            this.setState({passwordError:"Password must be at least 8 characters in length"})
            error = true;
        }

        if(!web3.utils.isAddress(this.state.recipientAddress)){
            this.setState({addressError:"Recipient must be a valid Ethereum Address"})
            error = true;
        }

        if(this.state.unlockDate == 0){
            this.setState({unlockDate: Math.floor(new Date().getTime()/1000)})
        }


        return error;


    }


    onSubmit = async (e) => {
        e.preventDefault();

        this.setState({toError:'',
        fromError:'',
        amountError:'',
        passwordError:'',
        addressError:''});


        if(this.validate()) return;


        console.log("Valid inputs, submit")


        this.setState({loading:true, errorMessage:''})
        const contract = hookup(config.contract_address);


        contract.events.Deposit((error, event) => {
                
            console.log("Event Deposit triggered!", event);
            console.log("number should be set to", event.returnValues.giftNumber )
            this.setState({giftNumber: event.returnValues.giftNumber});
            
        })

        try {
            const accounts = await web3.eth.getAccounts();

           
            await contract.methods.give( this.state.password, this.state.recipientAddress, this.state.unlockDate).send(
                { from:accounts[0], value: web3.utils.toWei(this.state.value, 'ether') }
            )


            this.setState({giftSent:true});
            


        }
        catch(err){
            this.setState({errorMessage:err.message});
        }

        this.setState({loading:false});

    }

    renderCard(){

        return(this.state.giftSent? <Giftcard propObj={this.state}/> : null);

    }

    renderDate(){

        return (this.state.dateLocked? <DateTimeForm setState={(date)=>this.setState({unlockDate:date})}/> : null);
    }


    render(){

        if(this.state.giftSent){

            return (
                <Giftcard propObj={this.state}/>
            )
        }else{
            
                return (
                    <Layout>
                        <h1 style={{marginLeft:"40%"}}>Give Ether</h1>
        
                        <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
                            <Form.Field error={!!this.state.toError}>
                                <label>From:</label>
                                <Input onChange={event => this.setState({to:event.target.value})} value={this.state.to}/>
        
                            </Form.Field>
                            <Form.Field error={!!this.state.toError}>
                                <label>Recipients Name:</label>
                                <Input onChange={event => this.setState({from:event.target.value})} value={this.state.from}/>
        
                            </Form.Field>
                            <Form.Field error={!!this.state.toError}>
                                <label>Recipients wallet address:</label>
                                <Input onChange={event => this.setState({recipientAddress:event.target.value})} value={this.state.recipientAddress}/>
        
                            </Form.Field>
                            <Form.Field error={!!this.state.amountError}>
                                <label>Amount:</label>
                                < Input onChange={event => this.setState({value:event.target.value})} value={this.state.value} label="eth"/>
        
                            </Form.Field>
                            <Form.Field>
                                <Checkbox 
                                onChange={event => this.setState({dateLocked: !this.state.dateLocked})}
                                slider label="Lock gift until future date?"/>
                                {this.renderDate()}
                            </Form.Field>
                            <Form.Field error={!!this.state.passwordError}>
                                <label>Password (for recipient to unlock):</label>
                                < Input onChange={event => this.setState({password:event.target.value})} value={this.state.password} />
        
                            </Form.Field>
                            <Form.Field>
                                <label>Message:</label>
                                <TextArea onChange={event => this.setState({message:event.target.value})} value={this.state.message} placeholder="Message to the recipient (optional)"/>
        
                            </Form.Field>
                                <Button primary loading={this.state.loading}>
                                    Send ETH
                                </Button>
                            
                        </Form>
                        
                        <h1>{this.state.errorMessage}</h1>
                    </Layout>
                )
            
        }

        
        
    }
}

export default Give;