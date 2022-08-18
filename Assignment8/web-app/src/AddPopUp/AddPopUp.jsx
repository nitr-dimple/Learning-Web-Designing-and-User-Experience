import React, { Component } from "react";
import "./AddPopUp.scss";
import close from "../assets/images/close.png";

// AddPopUp component for add task
class AddPopUp extends Component {
  state = {
    title: "",
    description: "",
    date: "",
    time: "",
    status: "Open",
  };

  //  only for updating tood task
  componentDidMount() {
    const { todo } = this.props;

    let date = todo ? todo.due_date : null;
    let dt = null;
    let time = null;
    if (date) {
      const d = new Date(date);
      const dd = ("0" + d.getDate()).slice(-2);
      const mm = ("0" + (d.getMonth() + 1)).slice(-2); //January is 0!
      const yyyy = d.getFullYear();

      dt = yyyy + "-" + mm + "-" + dd;
      time = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    }
    if (todo) {
      this.setState({
        title: todo.title,
        description: todo.description,
        date: dt,
        time: time,
      });
    }
  }

  // getting value from input and saving it state
  getValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  // calling post api on submit
  handleSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.title === "" ||
      this.state.date === "" ||
      this.state.time === ""
    )
      return false;

    let newDate = new Date(this.state.date + " " + this.state.time);
    let currentDate = new Date();
    if(newDate < currentDate) {
      alert(`Please enter correct date and time. It should not be less than current date and time`);
      return;
    }

    let data = {
      title: this.state.title,
      description: this.state.description,
      due_date: new Date(this.state.date + " " + this.state.time),
      status: this.state.status,
    };
    this.props.onPost(data);
  };

  // Reset the form fields
  handleReset = () => {
    this.setState({
      title: "",
      description: "",
      date: "",
      time: "",
      status: "Open",
    });

    const { todo } = this.props;
    if (todo) {
      this.setState({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        time: new Date().getTime(),
      });
    }
  };

// call PUT API for update
  handleUpdate = (event) => {
    event.preventDefault();
    if (
      this.state.title === "" ||
      this.state.date === "" ||
      this.state.time === ""
    )
      return false;

      let newDate = new Date(this.state.date + " " + this.state.time);
      let currentDate = new Date();
      if(newDate < currentDate) {
        alert(`Please enter correct date and time. It should not be less than current date and time`);
        return;
      }

    let data = {
        id: this.props.todo.id,
      title: this.state.title,
      description: this.state.description,
      due_date: new Date(this.state.date + " " + this.state.time),
      status: this.state.status,
    };
    this.props.onUpdate(data);
    if(data.status === 'Open')
        this.props.onTodoStatus(true);
    else this.props.onTodoStatus(false);
    this.props.onPopUp(false);
  };



  render() {
// for popup class
    let popup = this.props.trigger ? "popup popup-show" : "popup";
    let popupOverLay = this.props.trigger
      ? "popup-overlay popup-overlay-show"
      : "popup-overlay";
    const { todo } = this.props;

    //  formating the date and time
    let date = todo ? todo.due_date : null;
    if (date) {
      const d = new Date(date);
      const dd = ("0" + d.getDate()).slice(-2);
      const mm = ("0" + (d.getMonth() + 1)).slice(-2); //January is 0!
      const yyyy = d.getFullYear();

      var dt = yyyy + "-" + mm + "-" + dd;
      var time = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    }
    return (
      <React.Fragment>
        {/*  Add section  */}
        <div className={popupOverLay}>
          <div className={popup}>
            <div
              className="popup-close"
              id="closeAdd"
              onClick={() => this.props.onPopUp(false)}
            >
              <img className="closeImg" src={close}></img>
            </div>
            <div className="form">
              <div className="head"> { todo ? 'Update Task' : 'Add New Task'}</div>
              <form action="">
                {/*  title   */}
                <div className="element">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    onChange={this.getValue}
                    name="title"
                    defaultValue={todo ? todo.title : ""}
                    required
                  />
                </div>
                {this.state.title === "" && (
                  <div className="validation">Please Enter Title!</div>
                )}
                {/*  description  */}
                <div className="element">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    onChange={this.getValue}
                    name="description"
                    defaultValue={todo ? todo.description : ""}
                  />
                </div>
                {/*  due date  */}
                <div className="element">
                  <label htmlFor="date">Due Date</label>
                  <input
                    type="date"
                    id="date"
                    onChange={this.getValue}
                    name="date"
                    defaultValue={todo ? dt : ""}
                    required
                  />
                </div>
                {this.state.date === "" && (
                  <div className="validation">Please Enter Date!</div>
                )}
                {/*  time  */}
                <div className="element">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    onChange={this.getValue}
                    name="time"
                    defaultValue={todo ? time : ""}
                    required
                  />
                </div>
                {this.state.time === "" && (
                  <div className="validation">Please Enter Time!</div>
                )}
                {/*  status of the task  */}
                <div className="element">
                  <label htmlFor="status">Status</label>
                  <select id="status" onChange={this.getValue} name="status">
                    <option value="Open">Open</option>
                    <option value="Close">Close</option>
                  </select>
                </div>
                <div className="buttonAR">
                  {todo ? (
                    // Update button
                    <div className="element AddButton">
                      <button
                        id="AddButton"
                        type="submit"
                        onClick={this.handleUpdate}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    // Add button 
                    <div className="element AddButton">
                      <button
                        id="AddButton"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Add
                      </button>
                    </div>
                  )}
                  {/* Reset button  */}
                  <div className="element resetButton">
                    <button
                      id="resetButton"
                      type="reset"
                      onClick={this.handleReset}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddPopUp;
