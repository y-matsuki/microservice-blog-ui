var ArticleItem = React.createClass({
  handleDelete: function(e) {
    var data = {
      "operation": "delete",
      "Key": {
        "user": this.props.item.user,
        "date": this.props.item.date
      },
      "TableName": TABLE_NAME
    }
    $.ajax({
      url: ENDPOINT,
      type: 'POST',
      headers: HEADERS,
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var item = this.props.item;
    var rawMarkup = marked(item.text, {sanitize: true});
    var date = moment(item.date).format('YYYY-MM-DD HH:mm:ssZ');
    return (
      <div className="item">
        <div className="content">
          <a className="header">{item.title}</a>
          <div className="meta">
            <span>{item.user}</span>
          </div>
          <div className="description">
            <p dangerouslySetInnerHTML={{__html: rawMarkup}} />
          </div>
          <div className="extra">{date}</div>
          <div className="extra">
            <div className="ui right floated small button" onClick={this.handleDelete}>
              Delete
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ArticleList = React.createClass({
  render: function() {
    var items = this.props.data.map(function (item) {
      return (<ArticleItem key={item.date} item={item} />);
    });
    return(
      <div className="ui items">
        {items}
      </div>
    );
  }
});

var ArticleForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var user = React.findDOMNode(this.refs.user).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!title || !user || !text) {
      return;
    }
    this.props.onSubmit({title: title, user: user, text: text});
    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.user).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function() {
    return(
      <form className="ui form">
        <div className="field">
          <label>Title</label>
          <input type="text" ref="title" placeholder="title"/>
        </div>
        <div className="field">
          <label>User Name</label>
          <input type="text" ref="user" placeholder="user"/>
        </div>
        <div className="field">
          <div className="field">
            <label>Text</label>
            <textarea ref="text" rows="2"></textarea>
          </div>
        </div>
        <button className="ui button" type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
});

var ContentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var data = {
      "operation": "list",
      "TableName": TABLE_NAME
    }
    $.ajax({
      url: ENDPOINT,
      type: 'POST',
      headers: HEADERS,
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log(data);
        this.setState({data: data.Items});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  onSubmit: function(item) {
    item.date = new Date().getTime();
    var data = {
      "operation": "create",
      "Item": item,
      "TableName": TABLE_NAME
    }

    var xxx = this.state.data;
    xxx.push(item);
    this.setState({data: xxx});

    $.ajax({
      url: ENDPOINT,
      type: 'POST',
      headers: HEADERS,
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return(
      <div className="ui container">
        <div className="label">
          <h1>blog-sample-tokyo</h1>
        </div>
        <ArticleList data={this.state.data} />
        <ArticleForm onSubmit={this.onSubmit} />
      </div>
    );
  }
});

React.render(
  <ContentBox />,
  document.getElementById('content')
);
