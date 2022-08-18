import React, { Component } from 'react';
import './Todo.scss';
import mark from '../../assets/images/mark.png';
import edit from '../../assets/images/edit.png';
import remove from '../../assets/images/delete1.png';
import AddPopUp from '../../AddPopUp/AddPopUp';

// todo task component
class Todo extends Component {
    state = { 
        showDescription: false,
        todoStatus: true,
        triggerPopUp: false
    } 

    // for updating the status
    componentDidMount() {
        this.setState( { todoStatus :  this.props.todo.status === 'Open' ? true : false } );
    }

    // for showing description
    handleOnClick = (todo) => {
        let { showDescription } = this.state;
        showDescription = showDescription ? false : true;
        this.setState({ showDescription })
    }

    // for todo task status
    handleTodoStatus = (val) => {
        this.setState( { todoStatus: val  } )
    }

    // calling update api for updatinf status
    handleOnUpdate = (todo) => {
        todo.status = todo.status === 'Open' ? 'Close' : 'Open';
        fetch('http://localhost:5000/todos/' + todo.id, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(todo)
        })
        .then(response => {
            if(response.status === 200) {
                let val = this.state.todoStatus
                this.handleTodoStatus(!val);
            } 
        }
        );
    }

    // for updating the task
    handleOnEdit = (todo) => {
        this.setState( {
            triggerPopUp: true
        })
    }

    // for showing popup
    handleOnPopUp = () => {
        this.setState( {
            triggerPopUp: false
        })
    }

    render() { 
        const { todo } = this.props;
        // for showing description 
        let paraClass = 'para ';
        paraClass = this.state.showDescription ? paraClass + 'paraActiveColor' : paraClass + 'paraColor';

        // formating date
        const d = new Date(todo.due_date);
        const dd = ("0" + d.getDate()).slice(-2);
        const mm = ("0" + (d.getMonth() + 1)).slice(-2); //January is 0!
        const yyyy = d.getFullYear();

        let dt = yyyy + "-" + mm + "-" + dd;
        let time = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");

        return (
            <React.Fragment>
                {/* Creating todo item */}
                <div className='toDoList'>
                    <div className='divList'>
                        <div className='divTitle'>
                            <div className={ this.state.todoStatus ? paraClass +  ' paraTextDecoration' : paraClass + ' paraCloseTextDecoration' } onClick={ () => this.handleOnClick(todo) } >
                                { this.props.id + 1 + ".   " }
                                { todo.title }
                            </div>
                            {/* Adding mark image */}
                            <div className='markDiv' onClick={ () => this.handleOnUpdate(todo)} >
                                <img  className='markImg' src={mark} alt='Mark'></img>
                            </div>
                            {/* Adding update image */}
                            <div className='updateDiv' onClick = { () => this.handleOnEdit(todo) }>
                                <img  className='updateImg' src={edit}></img>
                            </div>
                            {/* Adding delete image */}
                            <div className='deleteDiv' onClick={ () => this.props.onDelete(todo.id) }>
                                <img  className='deleteImg' src={ remove } alt = 'Delete'></img>
                            </div>
                        </div>
                        {/* Adding description part */}
                        { this.state.showDescription ? 
                            <div className='todoDescription'>
                            <div className='todoItemHeading'>
                                Description
                            </div>
                            <div className='todoItemHeading'>
                                Due Date
                            </div>
                            <div className='todoItemHeading'>
                                Status
                            </div>
                            <div className='todoItemDetails'>
                                { todo.description }
                            </div>
                            <div className='todoItemDetails'>
                                { dt } at { time }
                            </div>
                            <div className='todoItemDetails'>
                                { todo.status }
                            </div>
                        </div> : null
                        }
                        
                    </div>
                </div>
                {/* Popup on update */}
                <AddPopUp onTodoStatus={this.handleTodoStatus} trigger= {this.state.triggerPopUp} onPopUp = { this.handleOnPopUp}  onPost= { this.handleOnPost } todo = {todo} onUpdate= {this.props.onUpdate}></AddPopUp>
            </React.Fragment>
        );
    }
}
 
export default Todo;