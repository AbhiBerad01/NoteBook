const express = require('express');
const res = require('express/lib/response');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
const jwt = require('jsonwebtoken');
const Jwt_Sign = "Abhi@bhai"
let success = false;
// creating end for new user with '/api/auth/createuser'
router.post('/createuser', [
  //asign values of name,amail and password as we wnat by pustting some condition with error message
  body('name', "Please Enter a valid Name").isLength({ min: 3 }),
  body('email', "Please Enter Unique Email").isEmail(),
  body('password', "Please Enter Password greater than 5 letters").isLength({ min: 5 }),],
  //validation of user begins
  async (req, res) => {
    //first the request get validate as the condition as error occured it get stored in error
    const errors = validationResult(req);
    //if error occured it get display as an array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //email get checked is it present in database or not if yes then user get define as request if not then it is null
      let user = await User.findOne({ email: req.body.email });
      //if user is present in database already then error occured
      if (user) {
        return res.status(400).json({ error: "Sorry User with same email is alredy exist" })
      }
      //generating salt and hash using bcrypt which are the asyncronus process
      var salt = await bcrypt.genSaltSync(10);
      var hash = await bcrypt.hashSync(req.body.password, salt);
      //if user is not present then user = bull and if statement get discard and new user get create
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
      //we passed responce to the user as id of database for varifictaion
      const data = {
        user:{
            id : user.id
        }
      }
      var Auth_token = jwt.sign(data, Jwt_Sign);
      success = true;
      res.json({success,Auth_token})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error Occured")
    }
  })


//Route 2 : User login end for User with '/api/auth/login'
router.post('/login', [
  body('email', "Please Enter Unique Email").isEmail(),
  body('password', "password is not empty").exists(),],
  //validation of user begins
  async (req, res) => {
    
    //first the request get validate as the condition as error occured it get stored in error
    const errors = validationResult(req);
    //if error occured it get display as an array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let {email,password} = req.body;
      
      let user = await User.findOne({email});
      
      if (!user) {
        
        return res.status(400).json({success, error: "Please try to login with correct credentials" })
      }
      const passCompare = await bcrypt.compare(password,user.password)
      //we passed responce to the user as id of database for varifictaion
      if(!passCompare){
        return res.status(400).json({success, error: "Please try to login with correct credentials" })
      }
      const data = {
        user:{
            id : user.id
        }
      }
      var Auth_token = jwt.sign(data, Jwt_Sign);
      success = true
      res.json({success,Auth_token})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error Occured")
    }
  })


//Route 3 : Get the User with '/api/auth/getuser'
router.post('/getuser',fetchuser,async (req, res) => {
   
    try {
      const userId = await req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error Occured")
    }
  })
module.exports = router;