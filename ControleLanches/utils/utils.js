//fonte: https://www.sitepoint.com/delay-sleep-pause-wait/
export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


///retorna um valor randomico qualquer. Aqui foi feito baseado em horário.
export function random() {
    var date = new Date();
    return date.getMinutes() + "-" + date.getSeconds() + "-" + date.getMilliseconds();
}