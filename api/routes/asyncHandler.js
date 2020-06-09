function asyncHandler(callback) {
    return async function (req, res, next) {
        try {
            await callback(req, res, next);
        } catch (err) {
            if(["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name)) {
                const error = new Error()
                error.status = 400;
                error.message = err.errors.map(error => error.message).join(" - ");
                error.errors = err.errors.map(error => error.message)
                next(error);
            } else {
                next(err)
            }
        }
    }
};

module.exports = asyncHandler;
