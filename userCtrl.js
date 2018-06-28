const userData = require('./userData.json');

module.exports = {
    getUsers: (req, res, next) => {
        let queried = req.query.favorites;
        let query2 = Number(req.query.age);
        let query3 = req.query.lastname;
        let emailquery = req.query.email;
        console.log(emailquery)
        // console.log(typeof req.query.favorites === 'string')
        // console.log(typeof emailquery === 'string');
        if (typeof req.query.lastname === 'undefined') {
            console.log('passed lastname')
            if (typeof req.query.age === 'undefined') {
                console.log('passed age')
                if (typeof req.query.favorites === 'undefined') {
                    console.log('passed favorites')


                    if(typeof req.query.email === 'undefined'){
                        console.log('passed undefined')
                    res.status(200).send(userData)
                    }else{
                        let byEmail = userData.filter(elem => elem.email === emailquery)
                        // console.log(byEmail[0])
                        res.status(200).send(byEmail);
                    }
                }
            }
        }
        if (typeof req.query.lastname === 'string'){
            console.log('in lastname')
            let lastnames = userData.filter( el => el.last_name === query3)
            console.log(lastnames);
            res.status(200).send(lastnames);
        }

        if (typeof req.query.favorites === 'string') {
            console.log('in favorites')
            
            let userFilt = [];
            for (let j = 0; j < userData.length; j++) {
                for (let i = 0; i < userData[j].favorites.length; i++) {
                    if (userData[j].favorites[i] === queried) {
                        userFilt.push(userData[j])
                    }
                }
            }
            res.status(200).send(userFilt);
        }

        if (typeof query2 === 'number') {
            let filt = userData.filter(el => el.age < query2)
            res.status(200).send(filt)
        }
        if(typeof req.query.email === 'string'){
            console.log(req.query.email)
            let byEmail = userData.filter(elem => elem.email === emailquery)
            // console.log(byEmail[0])
            res.status(200).send(byEmail);
        }



        
        // req.
    },
    getUsersById: (req, res, next) => {
        // console.log(userData)
        const id = Number(req.params.userId);
        if (id > 100) {
            console.log(id > 100)
            console.log(null)
            res.status(404).send('null');
        }

        let userById = userData.filter(el => el.id === id)
        console.log(userData[86])
        console.log(userById)
        res.status(200).send(userById[0]);
    },

    getAdmins: (req, res, next) => {
        let admins = userData.filter( el => el.type === 'admin')

        res.status(200).send(admins)
    },
    getNonAdmins: (req, res) => {
        let nonadmins = userData.filter( el => el.type !== 'admin')
        res.status(200).send(nonadmins)
    },
    getByUserType: (req, res) => {
        let type = req.params.userType;

        let specifUsers = userData.filter(el => el.type == type)

        res.status(200).send(specifUsers);

    },

    editByUserId: (req, res) => {
        let id = Number(req.params.userId)
        // console.log(req.body);
        let findId = userData.findIndex((el)=> el.id === id )
        // console.log(findId)
        userData.splice(findId, 1, req.body);

        res.status(200).send(userData);


    },
    postToTable: (req, res) => {
        console.log(req.body)
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;
        let newUser = { id: userData.length + 1,
        first_name,
    last_name,
email, gender, language, age, city, state, type, favorites}

        console.log(userData.length)
        console.log(newUser)
        userData.push(newUser);

        res.status(200).send(userData);

    },
    deleteUserById: (req, res) => {
        const deletingId = Number(req.params.userId);

        let findId = userData.findIndex((el)=> el.id === deletingId )
        userData.splice(findId, 1);
        res.status(200).send(userData);   
    }
}