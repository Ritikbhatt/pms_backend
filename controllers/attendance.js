var connection = require("../config/config")
const expressip = require('express-ip');
let express =require('express');
var app = express();
app.use(expressip().getIpInfoMiddleware);


exports.attendanceUser = (req, res) => {
    const ipInfo = req.ipInfo;
    var message = `Hey, you are browsing from ${ipInfo.address}, ${ipInfo.country}`;
    res.send(message);
    console.log(ipInfo,"riktmgnrgnkjtrnkjngr")
}

