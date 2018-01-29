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
