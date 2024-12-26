var urls = ["hrtsfld.xyz", "bolt-marketing.org", "mysterygift.org", "tagmachine.xyz", "walboard.xyz"];
var i = urls.length - 1;
var statuses = document.getElementsByClassName("stat-inner");

function everyTime() {
    statuses[i].classList.remove("OK");
    statuses[i].classList.remove("notOK");
    statuses[i].classList.add("OKcheck");
    fetch("https://" + urls[i], {signal: AbortSignal.timeout(2500)})
        .then((response) => {
            console.log(urls[i], response)
            if (response.ok) {
                statuses[i].classList.remove("OKcheck");
                statuses[i].classList.remove("notOK");
                statuses[i].classList.add("OK");
            } else {
                statuses[i].classList.remove("OKcheck");
                statuses[i].classList.remove("OK");
                statuses[i].classList.add("notOK");
            }
        })
        .catch((error_) => {
            statuses[i].classList.remove("OK");
            statuses[i].classList.remove("OKcheck");
            statuses[i].classList.add("notOK");
            console.log(error_);
        })
        .finally(() => {
            i = i - 1
            if (i == -1) {
                i = urls.length-1
            }
            statuses[i].classList.remove("OK");
            statuses[i].classList.remove("notOK");
            statuses[i].classList.add("OKcheck");
        });
}
everyTime();
var myInterval = setInterval(everyTime, 3000);
