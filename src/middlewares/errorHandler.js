const errorhandler = (err, req, res, next) => {
    res.status(500).json({
        massage: "Server error",
        error: err.message,
    });
};

export default errorhandler;