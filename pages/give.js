import React, {Component} from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react';
import Head from 'next/head'



class Give extends Component{


    render(){

        return (
            <div>
                 <Head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
                </Head>
                <h1>Give Ether</h1>

                <Form>
                    <Form.Field>
                        <label>From:</label>
                        <Input/>

                    </Form.Field>
                    <Form.Field>
                        <label>To:</label>
                        <Input/>

                    </Form.Field>
                    <Form.Field>
                        <label>Amount:</label>
                        < Input label="eth"/>

                    </Form.Field>
                    <Form.Field>
                        <label>Message:</label>
                        <TextArea placeholder="Message to the recipient"/>

                    </Form.Field>
                    
                </Form>

            </div>
        )
    }
}

export default Give;