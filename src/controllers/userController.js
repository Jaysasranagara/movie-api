const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { user } = require('../../models')
const userController = {}

userController.register = (async (req,res) => {
        const { email, password, name, user_img } = await req.body;
    
        const existingUser= await user.findOne({where : {email:email}})
        
        if (existingUser) {
            res.status(400).send({
                status: 400,
                message: 'email already registered'
            })
        } else {
            const newUser = await user.create({email, password:bcrypt.hashSync(password,10), name, user_img, role:"user"})
            const token = jwt.sign({email:newUser.email, role:newUser.role}, 'secret_key')
            
            res.status(200).send({
                status: 200,
                message: "register success",
                data: token
            });
            
        }        
});

userController.login = async (req, res) => {
    let dtuser = await user.findOne({
        where: { email: req.body.email },

    });
    if (dtuser === null) {
        res.status(400).send({
            status: 400,
            message: "username does not exist",
            data: null,
        });
    }

    dtuser = dtuser.dataValues;
    delete dtuser.passsword;
    delete dtuser.updatedAt;

    const token = jwt.sign(dtuser, "secret_key");

    res.status(200).send({
        status: 200,
        message: "ok",
        data: {
            token,
        },

    });
};

module.exports = userController;