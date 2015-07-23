var ArticleItem = React.createClass({
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
            <div className="ui right floated small button">
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
      <div id="items" className="ui items">
        {items}
      </div>
    );
  }
});

var ArticleForm = React.createClass({
  render: function() {
    return(
      <form className="ui form">
        <div className="field">
          <label>Title</label>
          <input id="form-title" type="text" name="title" placeholder="title"/>
        </div>
        <div className="field">
          <label>User Name</label>
          <input id="form-user" type="text" name="user" placeholder="user"/>
        </div>
        <div className="field">
          <div className="field">
            <label>Text</label>
            <textarea id="form-text" rows="2"></textarea>
          </div>
        </div>
        <button id="form-submit" className="ui button" type="button">Submit</button>
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
      "operation": "list"
    }
    xxx = this;
    call_api(data, function(resp) {
      if (resp.errorType) {
        console.error(resp.errorMessage);
      } else {
        console.log(resp);
        xxx.setState({data: resp.Items});
      }
    });
  },
  render: function() {
    return(
      <div className="ui container">
        <div className="label">
          <h1>blog-sample-tokyo</h1>
        </div>
        <ArticleList data={this.state.data} />
        <ArticleForm />
      </div>
    );
  }
});

var show_list = function() {
  React.render(
    <ContentBox />,
    document.getElementById('content')
  );
}
