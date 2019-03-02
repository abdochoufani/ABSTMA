var express = require('express');
var router = express.Router();

//Route for  => www.abstmo.com/chat
router.get('/', (req, res) => {
  res.send('Welcome to the Chat');
})




module.exports = router;