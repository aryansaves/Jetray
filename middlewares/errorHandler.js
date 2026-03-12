const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Mongoose duplicate key
    if (err.code === 11000) {
        res.status(400);
        return res.json({
            success: false,
            message: 'Duplicate field value entered',
            error: err.message
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        res.status(400);
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        return res.json({
            success: false,
            message: 'Validation Error',
            error: message
        });
    }

    // CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        res.status(400);
        return res.json({
            success: false,
            message: `Resource not found with id of ${err.value}`,
            error: err.message
        });
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;
