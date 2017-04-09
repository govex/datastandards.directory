function getURL(){   
      var url = window.location.href // stores the url the client has entered
      console.log(url)
      if (url !== 'http://localhost:3000/' && url !== 'https://odstandards-directory.herokuapp.com/') {
            var id  = getId(url) // get the id of the url
            // if there is an id, then output the standard to the directory
            if (id !== 0){
                  buildDirectory(id);
            }
      }
      // obtain the id number of the url
      function getId(str) {
            if (str.indexOf("http://localhost:3000/") >= 0){
                  return str.split('http://localhost:3000/')[1];
            } else if (str.indexOf("https://odstandards-directory.herokuapp.com/") >= 0) {
                  return str.split('https://odstandards-directory.herokuapp.com/')[1];
            } else {
                  return 0;
            }
      }
}