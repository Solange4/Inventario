var settings = {
  "url": "http://alvaro.timoideas.com/login",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  "data": {
    "username": $(".username").val(),
    "password": $(".password").val()
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});