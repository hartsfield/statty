package main // viewData represents the root model used to dynamically update the app

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"time"
)

var urls_ []string = []string{
	"hrtsfld.xyz",
	"tagmachine.xyz",
	"walboard.xyz",
	"bolt-marketing.org",
	"mysterygift.org",
}

var urls map[string]*stat = make(map[string]*stat)

type stat struct {
	URL         string
	Status      int
	LastChecked time.Time
}

func init() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	template.Must(templates.ParseGlob("internal/*/*/*"))
}

func main() {
	if len(logFilePath) > 1 {
		f := setupLogging()
		defer f.Close()
	}

	getStats()
	ctx, srv := bolt()

	log.Println("Waiting for connections @ http://localhost" + srv.Addr)
	fmt.Println("\nWaiting for connections @ http://localhost" + srv.Addr)

	<-ctx.Done()
}

func getStats() {
	for _, u := range urls_ {
		urls[u] = &stat{URL: u, Status: 0, LastChecked: time.Now().Local()}
		go func() {
			client := &http.Client{Timeout: 6 * time.Second}
			r, err := client.Get("http://" + u)
			if err != nil {
				log.Println(err)
				urls[u].Status = 0
				urls[u].LastChecked = time.Now().Local()
				return
			}
			urls[u].Status = r.StatusCode
			urls[u].LastChecked = time.Now().Local()
		}()
	}
}
