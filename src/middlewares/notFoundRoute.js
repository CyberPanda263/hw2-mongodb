const notFoundRoute = (req, res, next) => {
    res.status(404).json({
        massage: "Route not found"
    });
    next();
};

export default notFoundRoute;