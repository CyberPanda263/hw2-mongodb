import { HttpError } from "http-errors";

const errorhandler = (err, req, res, next) => {

    if (err instanceof HttpError) {
        const statusCode = err.status || err.statusCode;

        return res.status(statusCode).json({
            status: statusCode,
            message: err.message
        });
    }

    if(err.isJoi) {
        return res.status(400).json({
            message: 'Validation error',
            error: err.message,
            details: err.details.map((error) => ({
                message: error.message,
                path: error.path
            }))

        });
    };

    res.status(500).json({
        status: 500,
		message: "Something went wrong",
		data:err.message
    });
};

export default errorhandler;
