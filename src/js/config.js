var ENDPOINT = "https://0000000000.execute-api.us-east-1.amazonaws.com/prod/microservice-http-endpoint";
var API_KEY = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
var TABLE_NAME = "blog-post";

var call_api = function(data, callback) {
  data.TableName = TABLE_NAME;
  $.ajax({
    url: ENDPOINT,
    type: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    dataType: 'json',
    data: JSON.stringify(data),
  }).done(callback);
};
