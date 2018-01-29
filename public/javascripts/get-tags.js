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

function suggestTags() {
  var inventory = [];
  var allTags = [];
  $.getJSON(location.origin + "/tags", function(standards) {
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
    var subject = [],
    providerType = [],
    dataType = [],
    language = [],
    keyword = [];
    var allTags2d = allTags;
    allTags2d.sort(compareSecondVal)
    var allTagsBr = [];
    for (arr in allTags2d){
      var textEntry = allTags2d[arr][0] + " (" + allTags2d[arr][1] + ")"
      var splitTag = textEntry.split(':')
      switch(splitTag[0].toLowerCase()){
        case "subject":
          subject.push(splitTag[1]);
          break;
        case "providertype":
          providerType.push(splitTag[1]);
          break;
        case "datatype":
          dataType.push(splitTag[1]);
          break;
        case "language":
          language.push(splitTag[1]);
          break;
        case "keyword":
          keyword.push(splitTag[1]);
          break;
      }
      allTagsBr.push(textEntry);
    }
    var facetVal = $('#facet').val();
    console.log(facetVal)
    var suggestArr;
    switch(facetVal.toLowerCase()){
      case "subject":
        suggestArr = subject;
        break;
      case "providertype":
        suggestArr = providerType
        break;
      case "datatype":
        suggestArr = dataType
        break;
      case "language":
        suggestArr = language
        break;
      case "keyword":
        suggestArr = keyword
        break;
      default:
        suggestArr = keyword
    }
    console.log(suggestArr)
    $('#tag-value').autocomplete({
      source: suggestArr,
      minlength: 0,
      select: function(event, ui) {
        var input = ui.item.label;
        $("#tag-value").val(input.slice(0, -4));
        var addTag = document.getElementById("add-tag-button");
        addTag.click()
      }
      //displays all suggestions on 'focus'
    }).focus(function() {
      $(this).autocomplete("search", " ");
    });
  });
}

function compareSecondVal(a, b) {
  if (a[1] === b[1]) {
      return 0;
  }
  else {
      return (a[1] > b[1]) ? -1 : 1;
  }
}
