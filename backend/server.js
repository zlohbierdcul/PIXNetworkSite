const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const fs = require('fs')
const path = require('path')
const fetchAllApps = require("./appUpdater")



// Server Setup
const PORT = 3001
const app = express()

app.use(express.json())

const corsOptions = {
    origin: "*", credentials: true, optionsSuccessStatus: 200, methods: ["POST", "GET", "PUT", "DELETE"]
}

app.use(cors(corsOptions))


app.get("/api/getAppData", async (req, res) => {
    await fetchAllApps()
    const appdata = require("./data/newappdata.json")
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(appdata));
})

app.post("/api/updateAppData", async (req, res) => {
    const appData = req.body.appData;

    fs.writeFileSync("./data/appdata.json", JSON.stringify(appData))
})

/**
 * Logs the port on which the server is currently listening.
 */
app.listen(PORT, () => {
    console.log("server running on " + PORT)
});