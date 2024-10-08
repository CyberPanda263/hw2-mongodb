const notFoundRoute = (req, res, next) => {
    res.status(404).json({
        massage: "Not found"
    });
    next();
};

export default notFoundRoute;