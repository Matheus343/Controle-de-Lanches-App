export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


export function random() {
    var date = new Date();
    return date.getMinutes() + "-" + date.getSeconds() + "-" + date.getMilliseconds();
}