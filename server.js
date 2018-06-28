const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const con = require('./userCtrl');
app.use( bodyParser.json() );

app.get('/api/users', con.getUsers);
app.get('/api/users/:userId', con.getUsersById)
app.get('/api/admins', con.getAdmins)
app.get('/api/nonadmins', con.getNonAdmins)
app.get('/api/user_type/:userType', con.getByUserType)
app.put('/api/users/:userId', con.editByUserId)
app.post('/api/users', con.postToTable)
const PORT = 3000;
app.delete('/api/users/:userId', con.deleteUserById)
app.listen(PORT, ()=> console.log(`Port: ${PORT} is running`))