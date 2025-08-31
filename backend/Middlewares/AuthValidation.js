const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Confirm password does not match password'
        }),
        role: Joi.string().valid('donor', 'recipient').required(),
        bloodGroup: Joi.string()
            .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
            .required()
            .messages({
                'any.only': 'Blood group must be a valid type (A+, A-, B+, etc.)',
                'any.required': 'Blood group is required'
            }),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'Phone number must be 10 digits'
        }),
        pincode: Joi.string().pattern(/^[0-9]{6}$/).required().messages({
            'string.pattern.base': 'Pincode must be 6 digits'
        }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ 
            message: "Bad request", 
            error: error.details.map(e => e.message) 
        });
    }

    next();
};


const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: "Bad request", 
            error: error.details.map(e => e.message) 
        });
    }

    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
