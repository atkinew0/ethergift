import { relativeTimeRounding } from 'moment';
import react from 'react';
import { Card, Image, Container } from 'semantic-ui-react';
import Layout from '../components/Layout'

const cardStyle = {
    width:"100%"
}

const imageStyle = {
    opacity:"50%",
    position:"relative",
    border:"solid black 1px",
    textAlign:"center"
}

const contentStyle = {
    position:"absolute",
    top:"100px",
    left:"400px"
}

class GiftCard extends react.Component {

    


    render(){

        console.log(this.propObj)

        return(
            <Container>
            <Image style={imageStyle} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/800px-Ethereum-icon-purple.svg.png" wrapped />
               <div style={contentStyle}>
                <h2>You have been given an Ether gift!</h2>
                <p>{this.props.propObj.message}</p>
                <h3>To: {this.props.propObj.to}</h3>
                <h3>From: {this.props.propObj.from}</h3>
                <h3>Gift available after:{ new Date(this.props.propObj.unlockDate * 1000 ).toDateString() }  </h3>
                <h3>Recipient Address: {this.props.propObj.recipientAddress}</h3>
                <h3>Gift #:{this.props.propObj.giftNumber}</h3>
                <h3>Gift amount: {this.props.propObj.value} eth</h3>
                <h3>Password: {this.props.propObj.password}</h3>
                <h3>Redeem at https://ethergift.io</h3>
                <h4>(Print this page)</h4>
                </div>
            </Container>
        )

        
        // <Card style={cardStyle} centered style={{wordWrap: "break-word"}}>
        //     <Image style={imageStyle} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/800px-Ethereum-icon-purple.svg.png" wrapped />
        //     <Card.Content  style={contentStyle}>
        //     <p>You have been given an Ether gift!</p>
        //     <p>{this.props.propObj.message}</p>
        //     <h3>To: {this.props.propObj.to}</h3>
        //     <h3>From: {this.props.propObj.from}</h3>
        //     <h3>Gift available after:{ new Date(this.props.propObj.unlockDate * 1000).toDateString() } </h3>
        //     <h3>Recipient Address: {this.props.propObj.recipientAddress}</h3>
        //     <h3>Gift #:{this.props.propObj.giftNumber}</h3>
        //     <h3>Gift amount: {this.props.propObj.value}</h3>
        //     <h3>Password: {this.props.propObj.password}</h3>
        //     <h3>Redeem at https://ethergift.io</h3>
        //     <h4>(Print this page)</h4>



        //     </Card.Content>
        // </Card>
        
        
    }



}

export default GiftCard;