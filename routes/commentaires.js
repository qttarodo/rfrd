var express = require('express');
var router = express.Router();

var db = require('../database');


/* 
GET commentaires by document. */
router.get('/api/comsDocument/:idDocument', getComsDocument);


function getComsDocument(req, res, next) {
  db
    .select("*")
    .from("commentaire")
    .where("id_document", "=", req.params.idDocument)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Tous les commentaires du document'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



module.exports = router;