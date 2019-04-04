const process = require("process");

module.exports = {
    test: "test",
    apiUrl: process.env.API_URL || "http://localhost:8080"
    //  apiUrl: "https://analyticsapi.maximilianehlers.com"
};
