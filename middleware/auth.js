
const isLogin = async (req, res, next) => {
    const id = await req.session.id;
    try {
        if (req.session.id){}
        else {
            res.redirect('/login');
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}


const isLogout = async (req, res, next) => {
    try {
        if (req.session.id) {
            res.redirect('/home');
        }
        next(); 
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    isLogin, isLogout
};