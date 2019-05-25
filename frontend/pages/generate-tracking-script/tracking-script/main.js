export function sendData(url) {
    const l = document.createElement("a");
    l.href = window.location.href;

    function sendDataToApi(apiUrl, data){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", apiUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Accept", "application/json");
        xmlhttp.send(data);
    }

    function getPath() {
        return l.href;
    }

    function getHost() {
        return l.hostname;
    }

    const path = getPath();
    const host = getHost();
    const body =  JSON.stringify({ url: path, root: host });
    const apiUrl = `${url}/save`;

    if("fetch" in window){
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body
        });
    }
    else {
        sendDataToApi(apiUrl, body);
    }
}
