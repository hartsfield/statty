var urls = ["hrtsfld.xyz", "bolt-marketing.org", "mysterygift.org", "tagmachine.xyz", "walboard.xyz"];
var i = urls.length-1;
var statuses = document.getElementsByClassName("status");
function everyTime() {
    console.log(urls[i], "https://" + urls[i]);
    fetch("https://" + urls[i], {})
        .then((response) => {
            console.log(response, urls[i], i);
            if (response.status != "200") {
                statuses[i].innerHTML = "";
                statuses[i].classList.add("notOK");
                statuses[i].classList.remove("OK");
            } else {
                statuses[i].innerHTML = s;
                statuses[i].classList.remove("notOK");
                statuses[i].classList.add("OK");
            }
    });
        i = i - 1
        if (i == -1) {i = urls.length-1}
}

var myInterval = setInterval(everyTime, 1000);
