const express = require('express');
const router = express.Router();


const homecontroller = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homecontroller.home);

router.use('/user',require('./user')); 
router.use('/posts',require('./posts'));
router.use('/comments',require('./comment'));


// for any further routes excess from here
// router.use ('/routerName',require('./routerfile'));

module.exports = router;