var promise = require('bluebird');

var options = {
  // initialization options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:january2017*@localhost:5432/inventory'; // Heroku postgres OR local host postgres inventory database
var db = pgp(connectionString);

console.log(process.env.DATABASE_URL);
console.log(connectionString);
console.log(db)

// Express middleware: create a function that will post any update or comment requests to postgres database
function post(req, res, next) {
  var data = {client_name: req.body.client_name, email: req.body.email, standard: req.body.email, comment: req.body.email, timestamp: req.body.timestamp}
  db.none('insert into posts(client_name, email, standard, comment, timestamp) values(${client_name}, ${email}, ${standard}, ${comment}, ${timestamp})', data)
    .then(function () {
      res.status(200)
        .json({
          status: 'successfully added post',
          message: 'Inserted post'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// Express middleware: create a function that will return all the rows in the postgres database
function getAllStandards(req, res, next) {
  db.any('select * from standards')
    .then(function (data) {
      res.status(200)
        .json({
          data: data,
          status: 'success',
          message: 'Retrieved ALL standards'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// Express query function that will post a new row into the postgres database
function createStandard(req, res, next) {
  var data = {name: req.body.name, category: req.body.category, description: req.body.description, license: req.body.license, updated: req.body.update, version: req.body.version, stage_in_development: req.body.stage_in_development, documentation: req.body.documentation, website: req.body.website, contact: req.body.contact, example: req.body.example, publisher: req.body.publisher, publisher_reputation: req.body.publisher_reputation, number_of_consumers: req.body.number_of_consumers, consumers: req.body.consumers, number_of_apps: req.body.number_of_apps, apps: req.body.apps, open: req.body.open, transferability: req.body.transferability, transferability_rationale: req.body.transferability_rationale, stakeholder_participation: req.body.stakeholder_participation, stakeholder_participation_rationale: req.body.stakeholder_participation_rationale, consensus_government: req.body.consensus_government, consensus_government_rationale: req.body.consensus_government_rationale, extensions: req.body.extensions, extensions_indicators: req.body.extensions_indicators, machine_readable: req.body.machine_readable, machine_readable_rationale: req.body.machine_readable_rationale, human_readable: req.body.human_readable, human_readable_rationale: req.body.human_readable_rationale, requires_realtime: req.body.requires_realtime, requires_realtime_rationale: req.body.requires_realtime_rationale, metadata: req.body.metadata, metadata_rationale: req.body.metadata_rationale, recorded: req.body.recorded, verified: req.body.verified}
  db.none('insert into standards(name, category, description, license, updated, version, stage_in_development, documentation, website, contact, example, publisher, publisher_reputation, number_of_consumers, consumers, number_of_apps, apps, open, transferability, transferability_rationale, stakeholder_participation, stakeholder_participation_rationale, consensus_government, consensus_government_rationale, extensions, extensions_indicators, machine_readable, machine_readable_rationale, human_readable, human_readable_rationale, requires_realtime, requires_realtime_rationale, metadata, metadata_rationale, recorded, verified) values(${name}, ${category}, ${description}, ${license}, ${updated}, ${version}, ${stage_in_development}, ${documentation}, ${website}, ${contact}, ${example}, ${publisher}, ${publisher_reputation}, ${number_of_consumers}, ${consumers}, ${number_of_apps}, ${apps}, ${open}, ${transferability}, ${transferability_rationale}, ${stakeholder_participation}, ${stakeholder_participation_rationale}, ${consensus_government}, ${consensus_government_rationale}, ${extensions}, ${extensions_indicators}, ${machine_readable}, ${machine_readable_rationale}, ${human_readable}, ${human_readable_rationale}, ${requires_realtime}, ${requires_realtime_rationale}, ${metadata}, ${metadata_rationale}, ${recorded}, ${verified})', data)
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

// Express query function that will only get the category and names columns from the postgres database
function inventorySearch(req, res, next) {
  db.any('select category, name from standards')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL categories and ALL names'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// Express query function that will get a row based on whether the request is a category, name, or id
function getRequest(req, res, next) {
  var standard = req.params.id; // stores the id parameter (value) into var standard

  db.many('select * from standards where category = $1', standard)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE category'
        });
    })
    .catch(function (err) {
      return next(err);
    });

  db.many('select * from standards where name = $1', standard)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE standard'
        });
    })
    .catch(function (err) {
      return next(err);
    });

  db.many('select * from standards where id = $1', standard)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE id'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// Express query function that will upload the directory based on whether the request is a category, name, or id
function renderRequest(req, res, next){
  var standard = req.params.id;
  db.many('select * from standards where id=$1', standard)
    .then(function (data) {
      res.render('directory');
    })
    .catch(function (err) {
      return next(err);
    });
  db.many('select * from standards where category=$1', standard)
    .then(function (data) {
      res.render('directory')
    })
    .catch(function (err) {
      return next(err);
    });
}

// add query functions to app 
module.exports = {
  inventorySearch: inventorySearch,
  getAllStandards: getAllStandards,
  createStandard: createStandard,
  getRequest: getRequest,
  renderRequest: renderRequest,
  post: post
};
