import React from 'react';
import { Form } from 'semantic-ui-react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
  } from 'semantic-ui-calendar-react';

  class DateTimeForm extends React.Component {
    constructor(props) {
      super(props);
   
      this.state = {
        date: '',
        time: '',
        dateTime: '',
        datesRange: ''
      };
    }
   
    handleChange = (event, {name, value}) => {

      console.log("In handlechange event is ", event, name, value)
      if (this.state.hasOwnProperty(name)) {
        this.setState({ [name]: value });
      }

      console.log("state of date is now", this.state.date, this.state.time, this.state.dateTime, this.state.datesRange)

      console.log("calling getdate")
      let d = new Date(value);
      this.props.setState(Math.floor(d.getTime()/1000));
    }
   
    render() {
      return (
        <Form style={{margin:"10px"}}>
          <DateInput
            name="date"
            placeholder="Date"
            value={this.state.date}
            iconPosition="left"
            onChange={this.handleChange}
            dateFormat={"YYYY-MM-DD"}
          />
        
        </Form>
      );
    }
  }

  export default DateTimeForm;
