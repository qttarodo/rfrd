var express = require('express');
var router = express.Router();

var db = require('../database');


/* GET questions listing. */
router.get('/api/docsQuestion/:idQuestion', getDocsQuestion);
router.get('/api/allQuestions', getAllsQuestions);
router.get('/api/question/:idQuestion', getQuestionById);
router.get('/api/questionSemaine', getLastQuestion);


function getLastQuestion(req, res, next) {
var currentDate = new Date();
var date = currentDate.getDate();
var month = currentDate.getMonth(); //Be careful! January is 0 not 1
var year = currentDate.getFullYear();
var dateString = date + "-" +(month + 1) + "-" + year;
  db
    .select("*")
    .from("question")
    .where("datedebut", "<=", dateString)
    .andWhere("datefin", ">=",dateString)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'question'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getQuestionById(req, res, next) {
  db
    .select("*")
    .from("question")
    .where("id_question", "=", req.params.idQuestion)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'question'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getDocsQuestion(req, res, next) {
  db
    .select("*")
    .from("document")
    .where("id_question", "=", req.params.idQuestion)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Tous les documents de la question'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getAllsQuestions(req, res, next) {
  db
    .select("*")
    .from("question")
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Toutes les questions'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = router;