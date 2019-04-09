import {sendData} from "./tracking-script/main.js";
import Prism from "prismjs";

const input = document.getElementById("customUrlInput");
const button = document.getElementById("copyButton");
const code = document.getElementById("output");


function getTrackingScriptForDomain(domain){
    return `(${sendData}("${domain}"))`;
}

code.innerHTML = getTrackingScriptForDomain(input.value);

Prism.highlightElement(code, false, () => {});

let executingInput = false;
input.addEventListener("input", (e) => {

    if (!executingInput){
        executingInput = true;
        window.setTimeout(() => {
            const domain =  e.target.value;
            executingInput = false;
            code.innerHTML = getTrackingScriptForDomain(domain);
            Prism.highlightElement(code, false, () => {});
        }, 600);
    }
});


button.addEventListener("click", () => {
    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(code);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    document.execCommand("copy");
});
