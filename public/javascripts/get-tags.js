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
  else if (standard = "filter") {
    var standards = $('#standards').find('.standard-container')
    var allStandards = [];
    for (var i = 0; i < standards.length; i++){
      allStandards.push(standards[i]);
    }
    var inventory = [];
    var allTags = [];
    //fills inventory of all tags
    $.each(allStandards, function(i){
      var tagCont = $(allStandards[i]).find('.standard-tags');
      $(tagCont).find('.tag').each(function(){
        inventory.push($(this).attr('value'));
      });
    });
    $.each(inventory, function(i){
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
    allTags.sort(compareSecondVal)
    for (arr in allTags){
      var split1 = allTags[arr][0].split(':');
      split1.push(allTags[arr][1]);
      //var textEntry = allTags[arr][0] + " (" + allTags[arr][1] + ")"
      var splitTag = split1
      switch(splitTag[0].toLowerCase()){
        case "subject":
          subject.push(splitTag);
          break;
        case "providertype":
          providerType.push(splitTag);
          break;
        case "datatype":
          dataType.push(splitTag);
          break;
        case "language":
          language.push(splitTag);
          break;
        case "keyword":
          keyword.push(splitTag);
          break;
      }
    }
    return new filtersObject(subject, providerType, dataType, language, keyword);
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
    //builds suggestion lists with frequencies for each facet's tags
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
    }
    //chooses suggestion list based on selected facet
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

function filtersObject(subject, providerType, dataType, language, keyword){
  this.subject = subject;
  this.providerType = providerType;
  this.dataType = dataType;
  this.language = language;
  this.keyword = keyword;
}

function compareSecondVal(a, b) {
  if (a[1] === b[1]) {
      return 0;
  }
  else {
      return (a[1] > b[1]) ? -1 : 1;
  }
}
