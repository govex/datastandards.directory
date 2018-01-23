// source code: http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/#.WOK8RvkrJPb

var promise = require('bluebird'); // http://bluebirdjs.com/docs/getting-started.html
var pgp = require('pg-promise')(options); // https://github.com/vitaly-t/pg-promise

var options = {
  promiseLib: promise // initialization options
};

// load environmental variables to create pg connection string
var user = process.env.DD_DB_USER;
var pw = process.env.DD_DB_PASSWORD;
var host = process.env.DD_DB_HOST;
var port = process.env.DD_DB_PORT;
var db = process.env.DD_DB_NAME;
var connectionString;
if(host != undefined){
  connectionString = process.env.DATABASE_URL || `postgres:\/\/${user}:${pw}@${host}:${port}/${db}`; // Heroku postgres OR local host postgres inventory database
}
else {
  connectionString = 'postgres://postgres:qwerty@localhost:5432/vocabDB'; //local database
}
var db = pgp(connectionString); // using pg-promise, create database with connection details

function getAddForm(req, res, next){
  res.render('add');
}

function getUpdateForm(req, res, next){
  res.render('update');
}

// function gets data based on user input (e.g., all, )
function api(req, res, next){
  var user_input = req.params.id.toLowerCase(),
      query = ""; // store the user's input


  if (user_input == 'all') {
    query = "select * from standards";
  } else {
    query = "select * from standards where lower(name) || lower(category) || lower(subcategory) || lower(tags) like \'%$1#%\' AND lower(verified) = 'yes'";
  }

  db.task(t => {
    return t.each(query, user_input, row => {
      for (var column in row) {
        if (row[column] == '' || row[column] == null || row[column] == undefined) {
          row[column] = 'No information';
        }
      }
    }) //category::text, name::text like "%$1%"
      .then(function (data) {
        res.status(200)
        .json({
          data: data
        });
      })
      .catch(function (err) {
        return next(err);
      });
  });
}

// function gets all categories and standard names for the autocomplete
function keywords(req, res, next){
  var query = "select lower(name) as name, lower(category) as category, lower(subcategory) as subcategory, lower(tags) as tags, lower(publisher) as publisher from standards where lower(verified) = 'yes'",
      keywords = [];
  db.task(t => {
    return t.each(query, [], row =>{
      keywords.push(row.name, row.category);
      if(row.subcategory != null){
        var subcats = row.subcategory.split(',');
        for(sub in subcats){
          keywords.push(subcats[sub]);
        }
      }
      if(row.publisher != null){
        var pubs = row.publisher.split(',');
        for(pub in pubs){
          keywords.push(pubs[pub]);
        }
      }
      if(row.tags != null){
        var tags = row.tags.split('|');
        for(tag in tags){
          keywords.push(tags[tag]);
        }
      }
    })
      .then(function () {
        res.send({keywords: keywords});
      })
      .catch(function (err) {
        return next(err);
      });
  });
}
// object for getCategories()
function categoryItem(category, subcategory){
  this.category = category;
  this.subcategory = subcategory;
}

function getCategories(req, res, next){
  var query = "",
      user_input = '',
      allcategories = [], //tracks duplicate categories
      list = []; //object to be returned

  query = "select category, subcategory from standards where verified = 'Yes'";

  db.task(t => {
    return t.each(query, user_input, row => {
      var cat = '';
      var subCat = '';
      for (var column in row) {
        cat = row["category"];
        subCat = row["subcategory"];
        if (row[column] == '' || row[column] == null || row[column].toLowerCase() == 'unsure' || row[column] == undefined || row[column].toLowerCase() == 'null' || row[column].toLowerCase() == 'n/a') {
          row[column] = 'No information';
        }
      }
      subCat = subCat.split(',');
      if (allcategories.includes(cat) == false){
        var newCategory = new categoryItem();
        var tempArr = [];
        newCategory.subcategory = tempArr;
        newCategory.category = cat;
        for(var i=0; i<subCat.length; i++){
          newCategory.subcategory.push(subCat[i]);
        }
        allcategories.push(cat);
        list.push(newCategory);
      }
      else {
        for (j in list){
          if (list[j].category == cat){
            for(var k=0; k<subCat.length; k++){
              if (list[j].subcategory.includes(subCat[k]) == false){
                list[j].subcategory.push(subCat[k]);
                list[j].subcategory.sort();
              }
            }
          }
        }
      }
      list.sort(function(a,b){return b.subcategory.length - a.subcategory.length});
    })
      .then(function () {
        res.render('all-categories', {categories: list})
      })
      .catch(function (err) {
        return next(err);
      });
  });
}
// function gets data based on user input (e.g., all, )
function getData(req, res, next){
  var user_input = req.params.id.toLowerCase(),
      query = ""; // store the user's input

  if (user_input == 'all') {
    query = "select * from standards where verified = 'Yes'";
  } else {
    query = "select * from standards where lower(name) || lower(tags) || lower(category) || lower(subcategory) || lower(publisher) like \'%$1#%\' AND lower(verified) = 'yes'"; // ADD URL
  }

  db.task(t => {
    return t.each(query, user_input, row => {
      var subCat = '';
      for (var column in row) {
         if (row[column] == '' || row[column] == null || row[column] == undefined) {
          row[column] = 'No information';
        }
        subCat = row["subcategory"];
      }
      var temp;
      if(typeof subCat === 'string'){
        temp = subCat.split(',');
        row["subcategory"] = temp;
      }
      var tagStr = '';
      for (var column in row) {
        if (row[column] == '' || row[column] == null || row[column] == undefined) {
         row[column] = 'No information';
        }
        tagStr = row["tags"];
      }
      var tagsArr;
      if(typeof tagStr === 'string'){
        tagsArr = tagStr.split('|');
        for (tag in tagsArr){
          tagsArr[tag] = tagsArr[tag].split(':');
        }
        console.log(tagsArr);
        row["tags"] = tagsArr;
      }
    }) //category::text, name::text like "%$1%"
      .then(function (data) {
        res.render('directory', {standards: data})

      })
      .catch(function (err) {
        return next(err);
      });
  });
}

// Express middleware: function that will post any update or comment requests to postgres database
function post(req, res, next) {
  var data = {client_name: req.body.client_name, email: req.body.email, standard: req.body.standard, comment: req.body.comment, timestamp: req.body.timestamp, providers: req.body.providers, examples: req.body.examples, tags: req.body.tags}
  db.none('insert into posts(client_name, email, standard, comment, timestamp, providers, examples, tags) values(${client_name}, ${email}, ${standard}, ${comment}, ${timestamp}, ${providers}, ${examples}, ${tags})', data)
    .then(function () {
      res.status(200)
        .json({
          status: 'successfully added post',
          message: 'Inserted post',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// Express middleware: function that will post a new row into the postgres database
function createStandard(req, res, next) {
  var data = {id: req.body.id, name: req.body.name, category: req.body.category, subcategory: req.body.subcategory, tags: req.body.tags, description: req.body.description, license: req.body.license, updated: req.body.updated, version: req.body.version, stage_in_development: req.body.stage_in_development, documentation: req.body.documentation, website: req.body.website, contact: req.body.contact, example: req.body.example, publisher: req.body.publisher, publisher_reputation: req.body.publisher_reputation, consumers: req.body.consumers, apps: req.body.apps, open: req.body.open, transferability: req.body.transferability, transferability_rationale: req.body.transferability_rationale, stakeholder_participation: req.body.stakeholder_participation, stakeholder_participation_rationale: req.body.stakeholder_participation_rationale, consensus_government: req.body.consensus_government, consensus_government_rationale: req.body.consensus_government_rationale, extensions: req.body.extensions, extensions_indicators: req.body.extensions_indicators, machine_readable: req.body.machine_readable, machine_readable_rationale: req.body.machine_readable_rationale, human_readable: req.body.human_readable, human_readable_rationale: req.body.human_readable_rationale, requires_realtime: req.body.requires_realtime, requires_realtime_rationale: req.body.requires_realtime_rationale, metadata: req.body.metadata, metadata_rationale: req.body.metadata_rationale, recorded: req.body.recorded, verified: req.body.verified}
  db.none('insert into standards(id, name, category, subcategory, tags, description, license, updated, version, stage_in_development, documentation, website, contact, example, publisher, publisher_reputation, consumers, apps, open, transferability, transferability_rationale, stakeholder_participation, stakeholder_participation_rationale, consensus_government, consensus_government_rationale, extensions, extensions_indicators, machine_readable, machine_readable_rationale, human_readable, human_readable_rationale, requires_realtime, requires_realtime_rationale, metadata, metadata_rationale, recorded, verified) values(${id}, ${name}, ${category}, ${subcategory}, ${tags}, ${description}, ${license}, ${updated}, ${version}, ${stage_in_development}, ${documentation}, ${website}, ${contact}, ${example}, ${publisher}, ${publisher_reputation}, ${consumers}, ${apps}, ${open}, ${transferability}, ${transferability_rationale}, ${stakeholder_participation}, ${stakeholder_participation_rationale}, ${consensus_government}, ${consensus_government_rationale}, ${extensions}, ${extensions_indicators}, ${machine_readable}, ${machine_readable_rationale}, ${human_readable}, ${human_readable_rationale}, ${requires_realtime}, ${requires_realtime_rationale}, ${metadata}, ${metadata_rationale}, ${recorded}, ${verified})', data)
    .then(function () {
      res.status(200)
        .json({
          status: 'successfully added standard',
          message: 'Inserted ONE standard'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// add query functions to app
module.exports = {
  getData: getData,
  createStandard: createStandard,
  post: post,
  getAddForm: getAddForm,
  getUpdateForm: getUpdateForm,
  getCategories: getCategories,
  keywords: keywords,
  api: api
};
