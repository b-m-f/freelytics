export function sendData(url){
    const l = document.createElement("a");
    l.href = window.location.href;

    function getPath() {
        return l.href;
    }

    function getHost() {
        return l.hostname;
    }
    return function(){
        const path = getPath();
        const host = getHost();
        fetch(`${url}/save`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({url: path, root: host})
        });

    };
}
