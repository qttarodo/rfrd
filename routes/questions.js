var express = require('express');
var router = express.Router();

var db = require('../database');

var votePour;
var voteContre;


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

nombreVotePour(req.params.idQuestion);
nombreVoteContre(req.params.idQuestion);

  db
    .select("*")
    .from("question")
    .where("id_question", "=", req.params.idQuestion)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          votePour: votePour,
          voteContre: voteContre 
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function nombreVotePour(idQuestion){
  db
    .count("*")
    .from("vote")
    .where("id_question", "=", idQuestion)
    .where("resultat", "=", true)
    .then(function (data) {
      votePour = data[0].count;
    })
    .catch(function (err) {
      votePour = "fail recup vote"
    });
}

function nombreVoteContre(idQuestion){
  db
    .count("*")
    .from("vote")
    .where("id_question", "=", idQuestion)
    .where("resultat", "=", false)
    .then(function (data) {
      voteContre = data[0].count;
    })
    .catch(function (err) {
      voteContre = "fail recup vote"
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