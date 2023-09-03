const jwt = require('jsonwebtoken');
const JWT_SCERET='mynameischiragjindal'
const auth = async(req,res,next)=>{
    try {
      const token = req.header('auth-token');
      const data = await jwt.verify(token,JWT_SCERET);
      req.user=data.user;
      next();
    } catch (error) {
      res.status(404).json(`error in middleware${error}`)
    }
  }
  
  module.exports = auth;