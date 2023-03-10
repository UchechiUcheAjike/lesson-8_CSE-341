const validator = require('../helpers/validate');

const saveJob = (req, res, next) => {
    const validationRule = {
        status: 'required|string',
        company: 'required|string',
        title: 'required|string',
        position: 'required|string',
        level: 'required|string',
        YearsOfExperience: 'required|string',
        createdAt: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveJob
};