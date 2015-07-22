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
      $('#form-user').val('');
      $('#form-title').val('');
      $('#form-text').val('');
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
