const applicationController = {
    index: (req, res) => {
        res.render('app/index')
    },

    newUser: (userObj) => {
        // send command to create user using mongoose
        
        // return the new user's record
    }
}

module.exports = applicationController

