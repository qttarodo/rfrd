var express = require('express');
var router = express.Router();
md5 = require('js-md5');
var db = require('../database');


/* GET users listing. */
router.get('/api/allUsers', getAllUsers);
router.get('/api/user/:idUser', getUserById);
router.post('/api/vote', postVote);
router.post('/api/updateVote', updateVote);
router.post('/api/noterDoc', noteDocument);
router.post('/api/noterCom', noteCommentaire);
router.post('/api/updateNoteCom', updateNoteCom);
router.post('/api/updateNoteDoc', updateNoteDoc);
router.post('/api/commenterDoc', commenterDocument);
router.post('/api/registerUser', registerUser);
router.post('/api/loginUser', loginUser);




function registerUser(req, res, next){
  db("utilisateur")
      .insert({
        id_utilisateur: req.body.id_utilisateur,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: md5.hex(req.body.password),
        email: req.body.email,
        birthday: req.body.birthday,
      })
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'utilisateur enregistré'
        });
    })
    .catch(function (err) {
      message = "error 400";
      res.status(400).json(message);
    });
}

function loginUser(req, res, next){
  db
  .select("id_utilisateur")
  .from("utilisateur")
  .where("email", "=", req.body.emailUser).andWhere("password", "=", md5.hex(req.body.mdpUser))
  .then(data => {
    if (data.length >= 1) {
      res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'user connecté'
      });
    }
    else {
    res.status(400).json({
      status: 'bad request',
      data: data,
      message: 'fail'
    });
    }
  })
  .catch(function (err) {
    return next(err);
  });
  
}

function getUserById(req, res, next) {
  db
    .select("*")
    .from("utilisateur")
    .where("id_utilisateur", "=", req.params.idUser)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getAllUsers(req, res, next) {
  db
    .select("*")
    .from("utilisateur")
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'All users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function postVote(req, res, next) {

  db
  .select()
  .from('vote')
  .where("id_question", "=", req.body.id_question)
  .andWhere("id_utilisateur", "=", req.body.id_utilisateur)
  .then(data => {
    if (data.length <= 0) {
      db("vote")
      .insert({
        id_question: req.body.id_question,
        id_utilisateur: req.body.id_utilisateur,
        resultat: req.body.resultat,
      })
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'vote enregistré'
        });
    })
    .catch(function (err) {
      return next(err);
    });
    }
    else {
      updateVote(req,res)
    }
  })
  .catch(err => {
    res.status(400).json("Bad request");
  }); 
}

function updateVote(req, res, next) {
  db
  .select()
  .from('vote')
  .where("id_question", "=", req.body.id_question)
  .andWhere("id_utilisateur", "=", req.body.id_utilisateur)
  .update({
    resultat: req.body.resultat
  })
  .then(data => {
    if (data.length <= 0) {
      res.status(400)
        .json({
          status: 'fail',
          message: ''
        });
    }
    else {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'vote update'
        });
    }
  })
  .catch(err => {
    res.status(400).json("Bad request");
  });
}


function noteDocument(req, res, next) {

  db
  .select()
  .from('notedocument')
  .where("id_document", "=", req.body.id_document)
  .andWhere("id_utilisateur", "=", req.body.id_utilisateur)
  .then(data => {
    if (data.length <= 0) {
      db("notedocument")
      .insert({
        id_document: req.body.id_document,
        id_utilisateur: req.body.id_utilisateur,
        note: req.body.note,
      })
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'vote enregistré'
        });
    })
    .catch(function (err) {
      return next(err);
    });
    }
    else {
      updateNoteDoc(req,res)
    }
  })
  .catch(err => {
    res.status(400).json("Bad request");
  });

}

function noteCommentaire(req, res, next) {
  db
  .select()
  .from('notecommentaire')
  .where("id_commentaire", "=", req.body.id_commentaire)
  .andWhere("id_utilisateur", "=", req.body.id_utilisateur)
  .then(data => {
    if (data.length <= 0) {
      db("notecommentaire")
      .insert({
        id_commentaire: req.body.id_commentaire,
        id_utilisateur: req.body.id_utilisateur,
        note: req.body.note,
      })
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'note enregistré'
        });
    })
    .catch(function (err) {
      return next(err);
    });
    }
    else {
      updateNoteCom(req,res)
    }
  })
  .catch(err => {
    res.status(400).json("Bad request");
  });
}


function updateNoteCom(req, res, next) {
  db
  .select()
  .from('notecommentaire')
  .where("id_commentaire", "=", req.body.id_commentaire)
  .andWhere("id_utilisateur", "=", req.body.id_utilisateur)
  .update({
    note: req.body.note
  })
  .then(data => {
    if (data.length <= 0) {
      res.status(400)
        .json({
          status: 'fail',
          message: ''
        });
    }
    else {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'note update'
        });
    }
  })
  .catch(err => {
    res.status(400).json("Bad request");
  });
}


function updateNoteDoc(req, res, next) {
  db
  .select()
  .from('notedocument')
  .where("id_document", "=", req.body.id_document)
  .andWhere("id_utilisateur", "=", req.body.id_utilisateur)
  .update({
    note: req.body.note
  })
  .then(data => {
    if (data.length <= 0) {
      res.status(400)
        .json({
          status: 'fail',
          message: ''
        });
    }
    else {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'note update'
        });
    }
  })
  .catch(err => {
    res.status(400).json("Bad request");
  });
}


function commenterDocument(req, res, next) {
  db("commentaire")
      .insert({
        id_document: req.body.id_document,
        id_utilisateur: req.body.id_utilisateur,
        commentaire: req.body.commentaire,
      })
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'commentaire enregistré'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = router;