const express= require('express');
const { getBookDetails } = require('../controllers/bookDetailsController');

const router =express.Router();

router.get('/:id',getBookDetails);

module.exports=router;
