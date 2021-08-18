import react from 'react';
import { Card, Image } from 'semantic-ui-react';



class GiftCard extends react.Component {

    


    render(){

        console.log(this.propObj)

        return(
        <Card centered style={{wordWrap: "break-word"}}>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/800px-Ethereum-icon-purple.svg.png" wrapped />
            <Card.Content  >
            <p>You have been given an Ether gift!</p>
            <p>Message {this.props.propObj.message}</p>
            <h3>To: {this.props.propObj.to}</h3>
            <h3>From: {this.props.propObj.from}</h3>
            <h3>Address: {this.props.propObj.recipientAddress}</h3>
            <h3>Gift #:{this.props.propObj.giftNumber}</h3>
            <h3>Gift amount: {this.props.propObj.value}</h3>
            <h3>Password: {this.props.propObj.password}</h3>
            <h3>Redeem at https://ethergift.io</h3>
            <h4>(Print this page)</h4>



            </Card.Content>
        </Card>
        )
    }



}

export default GiftCard;