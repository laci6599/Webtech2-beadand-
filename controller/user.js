const User = require('../models/user');

exports.get_user =  function (name) {
   
    return User.findOne({name: name}, function (err, user) {
        if (err) return err;
        return user
    })

};

exports.add_user = function (req, res, next) {
    
    exports.get_user(req.body.name)
        
    .exec(function (err, existingUser) {
            
        if (existingUser && existingUser.name === req.body.name){
                
                res.json(false)
                return next();
                
            } else {

                let user = new User(
                    {
                        name: req.body.name,
                        password: req.body.password,
                    }
                );

                user.save(function (err, object) {
                    if (err) {
                        return next(err);
                    }
                    res.json({object})
                })
            }
        })

};