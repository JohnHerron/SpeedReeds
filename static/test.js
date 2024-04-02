var loopTimer = 0;
export function frameLooper(){
    console.log("hi")
    if (selectionText.length > 0){
        document.getElementById("type_text").innerHTML += selectionText.shift();
    } else {
        clearTimeout(loopTimer);
        return false;
    }
    loopTimer = setTimeout('frameLooper()', 70);
}
frameLooper();