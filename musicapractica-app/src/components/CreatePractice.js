import React from 'react';

class CreatePractice extends React.Component {

    state={
        logs: [],
        date: "",
        duration: "",
        instrument: "",
        subject: "",
        goal: "",
        reflection: "",
        user_id: 60
    }


    submitHandler = (e) => {
        e.preventDefault()
        // this.props.submitHandler(this.state)
        fetch('http://localhost:3001/logs', {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
            date: this.state.date,
            duration: this.state.duration,
            instrument: this.state.instrument,
            subject: this.state.subject,
            goal: this.state.goal,
            reflection: this.state.reflection,
            user_id: this.state.user_id
        })
    })
        .then(resp => resp.json())
        .then(newLog => {
            let newArray = [...this.state.logs, newLog]
            this.setState({ 
            logs: newArray,
            date: "",
            duration: "",
            instrument: "",
            subject: "",
            goal: "",
            reflection: "",
            user_id: [this.state.user_id + 1]
            })
        })
        .catch(console.log)
    }

        changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
    // console.log(this.state.logs)
    return (
        <>
        <form className="new-practice-log-form" onSubmit={this.submitHandler}>
        <h3>Log a Practice Session</h3><input placeholder="Date" type="text" name="date" value={this.state.date} onChange={this.changeHandler} />
        <input placeholder="Duration" type="integer" name="duration" value={this.state.duration} onChange={this.changeHandler} />
        <input placeholder="Instrument" type="text" name="instrument" value={this.state.instrument} onChange={this.changeHandler} />
        <input placeholder="Piece, Etude, or Scales practiced" type="text" name="subject" value={this.state.subject} onChange={this.changeHandler} />
        <input placeholder="Goals" type="text" name="goal" value={this.state.goal} onChange={this.changeHandler} />
        <textarea placeholder="Reflection" rows={10} type="text" name="reflection" value={this.state.reflection} onChange={this.changeHandler} />
        <input type="submit" value="Submit" />
        </form>
        </>
    );
    }

}

export default CreatePractice;