import React from 'react';
import './App.css';
import TodoModel from './Components/TodoModel';
import AddTodoButton from './Components/AddTodoButton';
import moment from 'moment';
import TodosTable from './Components/TodosTable';
import Tabs from './Components/Tabs';
import { v4 as uuid } from 'uuid';
import DeleteModel from './Components/DeleteModel';
import TodoData from './Components/todo.json'

class App extends React.Component {
  state = {
    open: false,
    priority: 'None',
    title: '',
    description: '',
    dueDate: '',
    loading: false,
    todos: TodoData,
    tab: "All tasks",
    editData: null,
    deleteModel: false,
    searchTerm: ''
  }
  componentDidMount() {
    window.addEventListener("keypress", (e) => {
      if (e.keyCode === 6) this.searchInput.focus();
    })
  }
  componentDidUpdate() {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) this.closeModel()
    });
    window.addEventListener("keypress", (e) => {
      if (e.keyCode === 6) this.searchInput.focus();
    })
  }

  // Model implimentation
  openModel = () => {
    this.setState({ open: true })
  }
  closeModel = () => {
    this.setState({
      open: false,
      deleteModel: false,
      title: '',
      description: '',
      dueDate: '',
      priority: 'None'
    });
  }


  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  handleAddTodo = (event) => {
    event.preventDefault();
    const { title, description, dueDate, priority, editData } = this.state
    if (this.formCheck(this.state)) {
      alert("fill all the details")
      return false
    } else {
      this.setState({ loading: true });
      const todo = {
        currentState: true,
        title,
        description,
        createdAt: editData !== null ? editData.createdAt : moment(new Date()).format('YYYY-MM-DD'),
        dueDate,
        priority,
        id: editData !== null ? editData.id : uuid()
      }

      setTimeout(() => {
        if (editData !== null) {
          this.setState(prevState => {
            const allTodos = [...prevState.todos];
            const index = allTodos.findIndex(todo => todo.id === editData.id);
            allTodos.splice(index, 1, todo);
            return {
              ...prevState,
              todos: allTodos,
              open: false,
              title: '',
              dueDate: '',
              description: '',
              priority: "None",
              editData: null,
              loading: false
            }
          })
        } else {
          this.setState({
            todos: this.state.todos.concat(todo),
            loading: false,
            open: false,
            title: '',
            dueDate: '',
            description: '',
            priority: "None"
          })
        }
      }, 800);
    }
  }

  formCheck = ({ priority, title, description, dueDate }) => {
    return !priority.length || !title.length || !description.length || !dueDate.length
  }

  setTab = event => {
    this.setState({ tab: event.target.innerHTML });
  }

  // Edit start
  editTodoStart = (data) => {
    this.setState({
      open: true,
      editData: data,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority
    })
  };

  deleteModelStart = (data) => {
    this.setState({
      deleteModel: true,
      editData: data
    })
  }


  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
      deleteModel: false,
      editData: null
    });
  }

  toggleCurrentStatus = (id) => {
    this.setState(prevState => {
      const allTodos = [...prevState.todos];
      const index = allTodos.findIndex(todo => todo.id === id);
      allTodos[index].currentState = !allTodos[index].currentState;
      return {
        ...prevState,
        todos: allTodos
      }
    })
  }

  handleSearch = (data) => {
    const regex = new RegExp(this.state.searchTerm, "gi");
    return data && [...data].reduce((acc, todo) => {
      if (todo && todo.title.match(regex) || todo.description.match(regex)) {
        acc.push(todo)
      }
      return acc;
    }, []);
  }

  sortData = sortBy => {
    console.log(sortBy);
  }

  render() {

    const {
      open,
      priority,
      loading,
      title,
      description,
      dueDate,
      tab,
      todos,
      deleteModel,
      editData,
      searchTerm
    } = this.state;

    let sendTodos = [...todos]
    switch (tab) {
      case "All tasks":
        const allData = [...todos].sort((x, y) => (x.currentState === y.currentState) ? 0 : x.currentState ? -1 : 1);
        sendTodos = searchTerm.trim() === '' ? allData : this.handleSearch(allData);
        break;
      case "Completed":
        const completedData = [...todos].filter(v => v.currentState === false)
        sendTodos = searchTerm.trim() === '' ? completedData : this.handleSearch(completedData);
        break;
      case "Pending":
        const pendingData = [...todos].filter(v => v.currentState === true);
        sendTodos = searchTerm.trim() === '' ? pendingData : this.handleSearch(pendingData);
        break;
      default: sendTodos = [...todos]
    }
    return (
      <div className="conatiner">
        {/* Search Input */}
        <div className="col-lg-3 mt-5 ml-auto">
          <input
            name="searchTerm"
            type='search'
            placeholder="Search todos"
            className="form-control"
            ref={(input) => this.searchInput = input}
            onChange={this.handleChange}
          />
        </div>

        {/* Tabs */}

        <Tabs
          setTab={this.setTab}
          tab={tab}
          length={sendTodos.length}
        />

        {editData !== null && (
          <DeleteModel
            open={deleteModel}
            closeModel={this.closeModel}
            data={editData}
            deleteTodo={this.deleteTodo}
          />
        )}

        <TodosTable
          data={sendTodos}
          deleteModelStart={this.deleteModelStart}
          editTodoStart={this.editTodoStart}
          toggleCurrentStatus={this.toggleCurrentStatus}
          searchTerm={searchTerm}
          sortData={this.sortData}
        />

        <TodoModel
          open={open}
          closeModel={this.closeModel}
          title={title}
          description={description}
          dueDate={dueDate}
          handleChange={this.handleChange}
          handleAddTodo={this.handleAddTodo}
          loading={loading}
          priority={priority}
        />
        <AddTodoButton openModel={this.openModel} />
      </div>
    )
  }
}

export default App;
