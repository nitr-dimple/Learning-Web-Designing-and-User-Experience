import './NavBar.scss';

// NavBar Component
const NavBar = (props) => {
    return (
        <nav>
            <div className="header" id="mainDiv">
                <div>
                    <h1> My To Do List</h1>
                </div>
                {/* Add Task Button */}
                <div className="clm2">
                    <button id="addTask" onClick={ () => props.onPopUp(true) }> Add Task</button>
                </div>
            </div>
        </nav> 
     );
}
 
export default NavBar
