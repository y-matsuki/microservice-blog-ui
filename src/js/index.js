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
      var content = $('<div>');
      content.addClass('content');
      resp.Items.forEach(function(item) {
        console.log(item);
        content.append($('<a>').addClass('header').text(item.title));
        content.append($('<div>').addClass('meta')
               .append($('<span>').text(item.user)));
        content.append($('<div>').addClass('description')
               .append($('<p>').text(item.text)));
        content.append($('<div>').addClass('extra')
              .text(moment(item.date).format('YYYY-MM-DD HH:mm:ssZ')));
        content.append($('<div>').addClass('extra')
               .append($('<div>').addClass('ui right floated small button')
               .click(delete_item(item.user, item.date)).text('Delete')));
      });
      var div = $('<div>').append(content);
      div.addClass('item');
      $('.items').append(div);
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

var delete_item = function(user, date) {
  console.log('delete!: ' + user + ' ' + date);
  var data = {
    "operation": "delete",
    "Key": {
      "user": user,
      "date": date
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
