function getTags(standard) {
  var url = location.origin;
  //returns JSON of all tags and their frequency
  if(standard == "all"){
    var inventory = [];
    var allTags = [];
    $.getJSON(url + "/tags", function(standards) {
      $.each(standards.tags, function(i) {
        if(standards.tags[i] != ""){
          inventory.push(standards.tags[i]);
        }
      });

      $.each(inventory, function(i) {
        var foundTag = false;
        $.each(allTags, function(j) {
          if(allTags[j][0] == inventory[i]){
            allTags[j][1] += 1;
            foundTag = true;
          }
        });
        if(foundTag == false){
          var uniqueTag = [inventory[i], 1];
          allTags.push(uniqueTag);
        }
      });
    });
    $.done(function(){
      allTags.sort(compareSecondVal);
      console.log(allTags);
      return allTags;
    })
  }
  // returns array of tags for a specific standard
  else {
    var tagArr
    $.getJSON(url + "/api/get/" + standard, function(data) {
      var tags = data.data[0].tags;
      tagArr = tags.split('|');
      console.log(tagArr);
      $.each(tagArr, function(i) {
        var splitTag = tagArr[i].split(':');
        var facetText = splitTag[0];
        var tagVal = splitTag[1];
        var newButton = "<button type='button' class='tag' value='" + tagArr[i] + "'><b>" + facetText + ": </b>" + tagVal + "</button>"
        $("#tag-display").append(newButton);
      });
    });
    return tagArr;
  }
}

