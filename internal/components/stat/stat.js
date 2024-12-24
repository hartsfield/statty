var urls = ["hrtsfld.xyz", "bolt-marketing.org", "mysterygift.org", "tagmachine.xyz", "walboard.xyz"];
var i = urls.length - 1;
var statuses = document.getElementsByClassName("status");

function everyTime() {
    statuses[i].classList.add("OKcheck");
    statuses[i].innerHTML = "";

    fetch("https://" + urls[i], {signal: AbortSignal.timeout(14000)})
       .then((response) => {
            // if (response.ok) {
                statuses[i].innerHTML = response.status;
                statuses[i].classList.add("OK");
                statuses[i].classList.remove("notOK");
            // } else {
                // statuses[i].innerHTML = "";
                // statuses[i].classList.add("notOK");
                // statuses[i].classList.remove("OK");
            // }
        })
        .catch((error_) => {
            statuses[i].innerHTML = "";
            statuses[i].classList.add("notOK");
            statuses[i].classList.remove("OK");
            console.log(error_);
        })
        .finally(() => {
            i = i - 1
            if (i == -1) {i = urls.length-1}
        });
        statuses[i].classList.remove("OKcheck");
}

var myInterval = setInterval(everyTime, 1000);
