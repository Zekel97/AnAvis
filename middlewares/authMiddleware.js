const jwt = require('jsonwebtoken');

exports.allowOnlyRole = function (role) { 
    
    return (req, res, next) => {
        console.log(role);
        const token = req.headers['x-access-token'];
        if (!token)  res.status(401).send({ auth: false, message: 'No token provided.' });
        
         jwt.verify(token, process.env.JWY_SECRET_KEY, function(err, decoded) {
        if (err) res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        const userCanView = decoded.role.includes(role);
        if(!userCanView) res.status(401).send({message:"You are not allowed to see this data"})
        else {next();}
      });

        //next();
    }
}