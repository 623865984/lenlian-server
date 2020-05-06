  //封装goeasy请求
  let gopush = function( channel, content ) {
	  var http = require('http');
	  var appkey = 'BC-152aa327cc7f4ecbb248dde31af82509';
	  var queryParams = 'appkey='+appkey+'&channel='+channel+'&content='+content;
	  console.log(content)
	  console.log(channel)
	  var options = {
	    hostname: 'rest-hangzhou.goeasy.io',
	    path: '/publish',
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded'
	    }
	  };
	  var req = http.request(options, (res) => {
	    res.setEncoding('utf8');
	    res.on('data', (result) => {
	      console.log(`响应结果: ${result}`);
	    });
	  });
	  req.on('error', (e) => {
	    console.error(e);
	  });
	  req.write(queryParams);
	  req.end();
  }
  
  module.exports = { gopush }


  

  

  

  