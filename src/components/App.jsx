import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addReminder, deleteReminder} from "../actions/index"
import reminders from "../reducers/index";
import moment from 'moment'
import '../App.css'


class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    addReminder() {
        console.log('this.state.dueDate', this.state.dueDate)
        this.props.addReminder(this.state.text, this.state.dueDate)
    }

    deleteReminder(id){
        this.props.deleteReminder(id)
    }

    renderReminders() {
        const {reminders} = this.props
        return (
            <ul className="list-group ul-margin-top">
                {
                    reminders.map(reminder => {
                        return(
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                </div>
                                <div className="list-item delete-button" onClick={() => this.deleteReminder(reminder.id)}>
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render(){
        return(
            <div className="App text-center">
                <div className="title">
                    <h1 className="lead">Reminder Pro</h1>
                </div>
                <div className="form-inline">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="I have to..."
                            onChange={event => this.setState({text: event.target.value})}
                        />
                        <input
                            type="datetime-local"
                            className="form-control"
                            onChange={event => this.setState({dueDate: event.target.value})}
                        />
                    </div>
                    <button type="button" className="btn btn-success" onClick={() => this.addReminder()}>Add Reminder</button><br/>
                </div>
                <div>
                    {this.renderReminders()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
   return {
       reminders: state
   }
}

export default connect(mapStateToProps, {addReminder, deleteReminder}) (App)