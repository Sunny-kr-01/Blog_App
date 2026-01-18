const { verifyToken } = require("../services/authentication");


function checkForAuthenticationCookie(cookieName){
    return async function(req,res,next){
        const tokenCookieValue=req.cookies[cookieName]
        
        if(!tokenCookieValue){
            return next();
        }

        try {
            const payload=await verifyToken(tokenCookieValue);
            req.user=payload;
        } catch (error) {
            
        }
        return next();
    }
}

module.exports={
    checkForAuthenticationCookie
}
