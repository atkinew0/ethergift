import React, {Component} from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import Head from 'next/head'
import hookup from '../ethereum/contracts/hookup.js';
import web3 from '../ethereum/contracts/web3.js';
import config from '../config.json';



class Give extends Component{

    state = {
        value:'',
        loading:false,
        errorMessage:'',
        password:'',
        giftMessage:'',
        giftNumber:-1,
        to:'',
        from:'',
        toError:'',
        fromError:'',
        amountError:'',
        passwordError:''

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

        if(this.state.value > .01 || this.state.value <= 0){
            this.setState({amountError:"(Beta version) amount must be between 0 and .01 Ether"})
            error = true;
        }

        if(this.state.password.length < 8){
            this.setState({passwordError:"Password must be at least 8 characters in length"})
            error = true;
        }

        return error;


    }


    onSubmit = async (e) => {
        e.preventDefault();

        this.setState({toError:'',
        fromError:'',
        amountError:'',
        passwordError:''});

        

        if(this.validate()) return;

        this.setState({loading:true, errorMessage:''})
        const contract = hookup(config.contract_address);

        try {
            const accounts = await web3.eth.getAccounts();

            await contract.methods.give( this.state.password).send(
                { from:accounts[0], value: web3.utils.toWei(this.state.value, 'ether') }
            )

            console.log("this is lnw")

            let gift;

            contract.once('Deposit', (error, event) => {
                gift = parseInt(event.returnValues.giftNumber);
                console.log("Event Deposit triggered!", event);
                console.log("number should be set to", event.returnValues.giftNumber )
                this.setState({giftNumber: event.returnValues.giftNumber});
                
            })

            console.log("Gift of type ", typeof gift);
            


        }
        catch(err){
            this.setState({errorMessage:err.message});
        }

        this.setState({loading:false, value:''});

    }


    render(){

        return (
            <div>
                 <Head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
                </Head>
                <h1>Give Ether</h1>

                <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
                    <Form.Field error={!!this.state.toError}>
                        <label>From:</label>
                        <Input onChange={event => this.setState({to:event.target.value})} value={this.state.to}/>

                    </Form.Field>
                    <Form.Field error={!!this.state.toError}>
                        <label>To:</label>
                        <Input onChange={event => this.setState({from:event.target.value})} value={this.state.from}/>

                    </Form.Field>
                    <Form.Field error={!!this.state.amountError}>
                        <label>Amount:</label>
                        < Input onChange={event => this.setState({value:event.target.value})} value={this.state.value} label="eth"/>

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
                
                <h1>Gift Number: {this.state.giftNumber}</h1>
            </div>
        )
    }
}

export default Give;