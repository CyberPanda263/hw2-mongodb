import { HttpError } from "http-errors";

const errorhandler = (err, req, res, next) => {

    if(err instanceof HttpError) {
        res.status(404).json({
            data:err.message
        });
    }
    
    res.status(500).json({
        status: 500,
		message: "Something went wrong",
		data:err.message
    });
};

export default errorhandler;