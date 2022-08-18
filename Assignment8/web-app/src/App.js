import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import TodoList from './TodoList/TodoList';
import AddPopUp from './AddPopUp/AddPopUp';

// App component
class App extends Component {
  state = { 
    triggerPopUp: false,
    todoList: []
   } 

// GET API call
  componentDidMount() {
      fetch('http://localhost:5000/todos', {
          "method": "GET",
          "headers": {
              "content-type": "application/json",
              "accept": "application/json"
          }
      })
      .then(response => response.json())
      .then(json => this.setState( {
          todoList: json
      }))
      .catch((error) => {
          console.log(error);
      });
  }

  // DELETE API call
  handleOnDelete = (id) => {
      console.log(id);
      fetch('http://localhost:5000/todos/' + id, {
          method: "DELETE"
      })
      .then(response => {
          if(response.status === 200)
              this.setState( { todoList: this.state.todoList.filter(todo => todo.id !== id) });
          alert(`Deleted task successfully`);
      }
      );
  }


// Trigger pop up for add task
  handleTriggerPopUp = (val) => {
    this.setState( { triggerPopUp: val })
  }


 // POST API call 
   handleOnPost = (data) => {
    fetch('http://localhost:5000/todos', {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
      if(response.status === 200) return response.json()      
     })
    .then(data => {
      this.setState( prevState => (
        {
          todoList : [...prevState.todoList, data]
        }
      )) 
      alert(`Successfully Added!`);
      this.setState({ triggerPopUp: false });

    })
    .catch((error) => {
        console.log(error);
    });
}

// PUT API call
handleOnUpdate = (data) => {
  fetch('http://localhost:5000/todos/' + data.id, {
      method: "PUT",
      headers: {
          "content-type": "application/json",
          "accept": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then(response => {
    if(response.status === 200) return response.json()
   })
  .then(dataJson => {
    let todoList = [...this.state.todoList];
    let i = todoList.findIndex(todo => todo.id === dataJson.id);      
    todoList[i] = dataJson;
    // Modifying state
    this.setState( 
      {
        todoList 
      }); 
    alert(`Successfully Updated!`);
    this.setState({ triggerPopUp: false });


  })
  .catch((error) => {
      console.log(error);
  });
}


  render() { 
    return (
      // Adding Components
      <React.Fragment>
        <NavBar onPopUp = { this.handleTriggerPopUp }> </NavBar>
        <TodoList todoList = { this.state.todoList } onDelete = { this.handleOnDelete } onUpdate= {this.handleOnUpdate}  trigger= {this.state.triggerPopUp} onPopUp = { this.handleTriggerPopUp }>
        </TodoList>
        <AddPopUp trigger= {this.state.triggerPopUp} onPopUp = { this.handleTriggerPopUp } onPost= { this.handleOnPost }  todo = {null}></AddPopUp>
      </React.Fragment>
    );
  }
}
 
export default App;
