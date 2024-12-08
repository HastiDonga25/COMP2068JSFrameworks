// Middleware function to dtermine if a user is authenticated
// if they are not, then redirect ti the login page
// if they are, then continue to the next middleware function

function AuthenticationMiddleware(req, res, next){
    if(req.isAuthenticated()){
        return next(); // jumps to the next middleware function in the pipeline
    }else{
        res.redirect("/login");
    }
}
//export it to make it available to other files
module.exports = AuthenticationMiddleware;