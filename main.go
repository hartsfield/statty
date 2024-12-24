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

	go getStats()
	ctx, srv := bolt()

	log.Println("Waiting for connections @ http://localhost" + srv.Addr)
	fmt.Println("\nWaiting for connections @ http://localhost" + srv.Addr)

	<-ctx.Done()
}

func getStats() {
	for {
		for _, u := range urls_ {
			urls[u] = &stat{URL: u}
			go func() {
				r, err := http.Get("http://" + u)
				if err != nil {
					log.Println(err)
				}
				urls[u].Status = r.StatusCode
				urls[u].LastChecked = time.Now().Local()
			}()
			time.Sleep(500 * time.Millisecond)
		}
		time.Sleep(3 * time.Second)
		fmt.Println()
	}
}
