import React, {Component} from 'react';
import Head from 'next/head'
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import hookup from '../ethereum/contracts/hookup.js';
import web3 from '../ethereum/contracts/web3.js';
import config from '../config.json';



class Receive extends Component{

    state = {
        giftNumber:0,
        giftPassword:"",
        recipient:"",
        numError:"",
        passwordError:"",
        addressError:""
    }

    validate = () => {

        let error = false;

        if(this.state.giftNumber == "" || this.state.giftNumber < 0){
            this.setState({numError:"Invalid gift number"})
            error = true;
        }

        if(this.state.giftPassword.length < 8){
            this.setState({passwordError:"Valid password muist be at least 8 characters long"})
            error = true;
        }

        if(!web3.utils.isAddress(this.state.recipient)){
            this.setState({addressError:"Recipient must be a valid Ethereum Address"})
            error = true;
        }

        return error;


    }

    onSubmit = async (e) => {
        e.preventDefault();

        this.setState({numError:"",
        passwordError:"",
        addressError:""})

        if(this.validate()) return;

        this.setState({loading:true, errorMessage:''})
        const contract = hookup(config.contract_address);

        try {
            const accounts = await web3.eth.getAccounts();

            await contract.methods.withdraw(this.state.giftNumber, this.state.giftPassword, this.state.recipient).send(
                { from:accounts[0] }
            )


        }
        catch(err){
            this.setState({errorMessage:err.message});
        }

        this.setState({loading:false, value:''});

    }


    render(){

        return (
            <div>
                <div>
                 <Head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
                </Head>
                <h1>Receive Ether</h1>

                <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
                    <Form.Field error={this.state.numError}>
                        <label>Gift Number: </label>
                        <Input onChange={event => this.setState({giftNumber: event.target.value}) } value={this.state.giftNumber}/>

                    </Form.Field>
                    <Form.Field error={this.state.passwordError}>
                        <label>Gift Password: </label>
                        <Input onChange={event => this.setState({giftPassword: event.target.value}) } value={this.state.giftPassword}/>

                    </Form.Field>
                    <Form.Field error={this.state.addressError}>
                        <label>Gift Recipient Address: </label>
                        <Input onChange={event => this.setState({recipient: event.target.value}) } value={this.state.recipient}/>

                    </Form.Field>

                    <Button primary loading={this.state.loading}>
                            Receive ETH
                        </Button>
                   
                    
                </Form>
                
            </div>
            </div>
        )
    }
}

export default Receive;