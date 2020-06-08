var express = require('express');
var router = express.Router();

var db = require('../database');


/* 
GET document by id. */
router.get('/api/document/:idDocument', getDocumentById);


function getDocumentById(req, res, next) {
  db
    .select("*")
    .from("document")
    .where("id_document", "=", req.params.idDocument)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'document'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



module.exports = router;