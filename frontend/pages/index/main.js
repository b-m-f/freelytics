import ElmBuild from "./elm/Dashboard.elm";

const contentDiv = document.getElementById("content");
const urlinput = document.getElementById("urlInput");
const getDataButton = document.getElementById("getDataButton");

// The Api URL is defined in HTML and comes loaded from the template variables
getDataButton.addEventListener("click", () =>{
    const urlToGet = urlinput.value;
    fetch(`${apiUrl}/get/${urlToGet}`)
        .then(function (a) {
            return a.json(); // call the json method on the response to get JSON
        })
        .then(function (json) {
            ElmBuild.Elm.DashBoard.init({ node: contentDiv, flags: json });
        });
});
