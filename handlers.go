package main

import (
	"net/http"
)

func root(w http.ResponseWriter, r *http.Request) {
	exeTmpl(w, r, &viewData{AppName: appConf.App.Name, Stats: urls}, "main.html")
}
