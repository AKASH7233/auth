var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./post');
const passport = require('passport');
const localstrategy = require('passport-local');
passport.use(new localstrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/profile',isLoggedIn,function(req, res, next) {
  res.render('profile');
});
router.get('/feed',function(req, res, next) {
  res.render('feed');
});

// router.post('/login',function(req, res, next) {
//   res.render('login');

// });

// router.post('/register' , function(req,res){
//   const userdata = new userModel({
//     username : req.body.username,
//     email : req.body.email,
//     password : req.body.password,
//   })
//   userModel.register(userdata, req.body.password)
//    .then(function(){
//     passport.authenticate('local')(req,res,function(){
//       res.redirect('/login');
//     })
//    })

// })

// router.post('/login', passport.authenticate('local',{
//   successRedirect: '/profile',
//   failureRedirect : '/login'
// }) ,function (req,res){}
// )

// router.get('/logout', function(req,res){
//   req.logOut(function(err){
//     if (err) return next(err);
//     res.redirect('/')
//   })
// })

// function isLoggedIn(req,res,next){
//   if(req.isAuthenticated())
//   return next();
//   res.redirect('/')
// }

// router.get('/createpost', async function(req, res, next) {
//   let createdpost = await postModel.create({
//     postText : 'hello ',
//     user : '654f4962ca01cba97ab202b4'
    
//   })
//   let user = await userModel.findOne({_id : '654f4962ca01cba97ab202b4'});
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send('done');
// });

// router.get('/createuser', async function(req, res, next) {

//   let createduser = await userModel.create({
//     username: 'AKASH',
//     password: 'AKA',
//     posts: [],
//     email : 'akash@mail.com'
//   })
//   res.send(createduser);
// });



router.post('/register',function(req,res){
  let userdata = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })

  userModel.register(userdata ,req.body.password)
   .then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/login')
    })
   })
})

router.post('/login',passport.authenticate('local',{
  successRedirect: '/profile',
  failureRedirect : '/login'
})
  ,function(req,res){}
)

router.post('/logout',function(req,res,next){
  req.logOut(function(err){
    if (err) return next(err);
    res.redirect('/login')
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
  return next();
  res.redirect('/')
}



module.exports = router;
