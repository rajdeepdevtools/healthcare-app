const handleError = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};

const formatResponse = (data, message = 'Success') => {
    return {
        status: 'success',
        message,
        data,
    };
};

module.exports = { handleError, formatResponse };
