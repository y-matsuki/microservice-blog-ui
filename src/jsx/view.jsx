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

var show_list = function() {
  var data = {
    "operation": "list"
  }
  call_api(data, function(resp) {
    if (resp.errorType) {
      console.error(resp.errorMessage);
    } else {
      console.log(resp);
      $('.items').children().remove();
      React.render(
        <ArticleList data={resp.Items} />,
        document.getElementById('list')
      );
    }
  });
}
