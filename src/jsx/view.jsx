var ArticleItem = React.createClass({
  render: function() {
    var item = this.props.item;
    var date = moment(item.date).format('YYYY-MM-DD HH:mm:ssZ');
    return (
      <div className="item">
        <div className="content">
          <a className="header">{item.title}</a>
          <div className="meta">
            <span>{item.user}</span>
          </div>
          <div className="description">
            <p>{item.text}</p>
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
      var items = [];
      resp.Items.forEach(function(item) {
        console.log(item);
        items.push(<ArticleItem item={item} />);
      });
      React.render(
        <div id="items" class="ui items">
          {items}
        </div>,
        document.getElementById('list')
      );
    }
  });
}
