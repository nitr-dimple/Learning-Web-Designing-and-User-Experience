import React, { Component } from 'react';
import './TodoList.scss';
import Todo from './Todo/Todo';

//  TodoList Component
class TodoList extends Component {
    
    render() { 
        const { todoList } = this.props;
        return (
           <React.Fragment>
               <div className='main'>
                    <div className = "container">
                                {/* Adding todo component */}
                                { todoList.map((todo, i) => <Todo key={i} todo={todo} id={i}   onDelete = {this.props.onDelete}  onUpdate= {this.props.onUpdate} trigger= {this.props.trigger} onPopUp = { this.props.onPopUp}> </Todo>)}
                    </div>
               </div>
           </React.Fragment> 
        );
    }
}

export default TodoList;