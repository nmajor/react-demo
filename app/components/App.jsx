import React, { Component, PropTypes } from 'react';


class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }
  handleRemoveClick() {
    this.props.remove(this.props.index);
  }
  render() {
    return (<li className="list-group-item">
      <span className="btn btn-danger btn-xs" onClick={this.handleRemoveClick}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></span> {this.props.item.description}
    </li>);
  }
}

TodoItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  remove: PropTypes.func,
};

class TodoItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItems: [],
    };

    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  handleCreateClick() {
    this.addItem();
    this.refs.newDescription.value = '';
  }
  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.addItem();
      this.refs.newDescription.value = '';
    }
  }
  addItem() {
    const todoItems = [...this.state.todoItems, { description: this.refs.newDescription.value }];
    this.setState({ todoItems });
  }
  removeItem(index) {
    const todoItems = [
      ...this.state.todoItems.slice(0, index),
      ...this.state.todoItems.slice(index + 1),
    ];
    this.setState({ todoItems });
  }
  renderListItems() {
    return this.state.todoItems.map((item, index) => {
      return <TodoItem key={index} item={item} index={index} remove={this.removeItem} />;
    });
  }
  renderNewLink() {
    return (<div className="input-group">
      <input type="text" ref="newDescription" className="form-control" placeholder="New Todo Description" onKeyPress={this.handleKeyPress} />
      <span className="input-group-btn">
        <button className="btn btn-default" type="button" onClick={this.handleCreateClick}>Add</button>
      </span>
    </div>);
  }
  render() {
    return (<div>
      <ul className="list-group">
        {this.renderListItems()}
      </ul>

      {this.renderNewLink()}
    </div>);
  }
}

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  //
  render() {
    return (<div>
      <div className="container">
        <h1>Todo List</h1>
        <TodoItemList />
      </div>
    </div>);
  }
}

export default App;
