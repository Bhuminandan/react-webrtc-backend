// For express server

const app = require("./server").app;
const jwt = require('jsonwebtoken');
const linkSecret = 'lsjdfkasjhdfklhaslkdfjhalskjh';


app.get('/user-link', (req, res) => {
    
    const apptData = {
        proffessionalsFullName: 'John Doe',
        apptDate: Date.now()
    }

    const token = jwt.sign(apptData, linkSecret);

    res.send(`https://localhost:3000/join-video?token=${token}`);

});

app.post('/validate-link', async (req, res) => {
    const token = req.body.token;
    console.log(token);
    if(!token) {
        return res.send({
            status: 'error',
            message: 'No token provided'
        });
    }
    const apptData = await jwt.verify(token, linkSecret);
    return res.send({
        status: 'success',
        apptData
    });
})