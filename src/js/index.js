var show_list = function() {
  var data = {
    "operation": "list"
  }
  call_api(data, function(resp) {
    if (resp.errorType) {
      console.error(resp.errorMessage);
    } else {
      console.log(resp);
      var list = $('<ul>');
      resp.Items.forEach(function(item) {
        console.log(item);
        list.append($('<li>').text(item.title));
        list.append($('<li>').text(item.user));
        list.append($('<li>').text(moment(item.date)
          .format('YYYY-MM-DD HH:mm:ssZ')));
        list.append($('<li>').text(item.text));
      });
      var div = $('<div>').append(list);
      div.addClass('list');
      $('body').append(div);
    }
  });
}

var post_item = function() {
  var data = {
    "operation": "create",
    "Item": {
      "user": $('#form-user').val(),
      "title": $('#form-title').val(),
      "date": new Date().getTime(),
      "text": $('#form-text').val()
    }
  }
  call_api(data, function(resp) {
    if (resp.errorType) {
      console.error(resp.errorMessage);
    } else {
      console.log(resp);
      show_list();
    }
  });
}

$(document).ready(function(){
  show_list();
  $('#form-submit').click(post_item);
});
