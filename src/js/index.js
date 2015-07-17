var endpoint = "https://0000000000.execute-api.us-east-1.amazonaws.com/prod/microservice-http-endpoint";
var api_key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
var table_name = "blog-post";

var call_api = function(data, callback) {
  $.ajax({
    url: endpoint,
    type: 'POST',
    headers: {
      'x-api-key': api_key,
      'Content-Type': 'application/json'
    },
    dataType: 'json',
    data: JSON.stringify(data),
  }).done(callback);
}

var show_list = function() {
  var data = {
    "operation": "list",
    "TableName": table_name
  }
  call_api(data, function(resp) {
    if (resp.errorType) {
      console.error(resp.errorMessage);
    } else {
      console.log(resp);
    }
  });
}

var post_item = function() {
  var data = {
    "operation": "create",
    "TableName": table_name,
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
