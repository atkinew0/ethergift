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
      if (this.state.hasOwnProperty(name)) {
        this.setState({ [name]: value });
      }
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
          />
          <TimeInput
            name="time"
            placeholder="Time"
            value={this.state.time}
            iconPosition="left"
            onChange={this.handleChange}
          />
        
        </Form>
      );
    }
  }

  export default DateTimeForm;
