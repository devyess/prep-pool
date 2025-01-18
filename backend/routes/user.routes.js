const router = require('express').Router();
const {userRegister, userLogin,userLogout,postQuestion,getWantedQues,getSelfQues,editQues,getAllQues}=require('../controllers/user.controllers');
const authUser=require('../middlewares/userAuth');
router.post('/register',userRegister);
router.post('/login',userLogin);
router.post('/logout',authUser,userLogout);
router.post('/post-question',authUser,postQuestion);
router.get('/get-question/:id',authUser,getWantedQues);
router.get('/get-self-questions',authUser,getSelfQues);
router.get('/get-all-questions',authUser,getAllQues);
router.put('/edit-question/:id',authUser,editQues);

module.exports=router;