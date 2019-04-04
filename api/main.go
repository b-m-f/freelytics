package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
	db = _ConnectToDB()
	_InitDB(db)

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/save", _SaveMetricHandler).Methods("POST")
	router.HandleFunc("/save", _SaveMetricPreFlightHandler).Methods("OPTIONS")
	router.HandleFunc("/get/{site}", _GetMetricsHandler)
	router.HandleFunc("/get/{site}", _GetMetricsPreflightHandler).Methods("OPTIONS")
	router.HandleFunc("/health", _HealthHandler)
	fmt.Println("Starting api 10920")
	log.Fatal(http.ListenAndServe(":10920", router))
}

// connects to Database url that is set on the running environment
func _ConnectToDB() *sql.DB {
	pgurl := os.Getenv("POSTGRES_URL")
	db, err := sql.Open("postgres", pgurl)

	if err != nil {
		panic(err)
	}
	return db
}
func _InitDB(db *sql.DB) {
	_, err := db.Query(`CREATE SCHEMA IF NOT EXISTS analytics`)
	_, err = db.Query(`CREATE TABLE IF NOT EXISTS routes (
	    url text PRIMARY KEY,
		  root varchar(40),
			times_visited int,
			time_spent int
			);`)
	if err != nil {
		panic(err)
	}

}

type _Metric struct {
	URL          string
	TimesVisited int
	Root         string
}

func _SaveMetric(metric _Metric, db *sql.DB) error {
	_, err := db.Query(`INSERT INTO routes(url, root, times_visited) VALUES($1, $2, $3) ON CONFLICT (url) DO UPDATE SET times_visited=routes.times_visited+1;`, metric.URL, metric.Root, 1)
	return err
}

// This saves received metrics into the database
func _SaveMetricPreFlightHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Methods", "OPTIONS")
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type")
}

// This saves received metrics into the database
func _SaveMetricHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Methods", "POST")
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type")
	var metric _Metric
	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&metric)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	requestURL, err := url.Parse(metric.URL)
	metric.Root = requestURL.Host

	_SaveMetric(metric, db)

	if err != nil {
		http.Error(w, err.Error(), 400)
	}
}

func _GetMetricsForSite(site string, db *sql.DB) ([]*_Metric, error) {
	rows, err := db.Query("SELECT url, times_visited FROM routes WHERE root = $1", site)
	if err != nil {
		return nil, err
	}

	if rows == nil {
		return nil, errors.New("No data found for" + string(site))
	}

	metrics := []*_Metric{}
	for rows.Next() {
		metric := new(_Metric)
		err = rows.Scan(
			&metric.URL,
			&metric.TimesVisited)
		if err != nil {
			return nil, err
		}
		metrics = append(metrics, metric)
	}

	return metrics, nil
}

// This saves received metrics into the database
func _GetMetricsPreflightHandler(w http.ResponseWriter, r *http.Request) {
	allowedURL := os.Getenv("ALLOWED_URL")
	w.Header().Add("Access-Control-Allow-Origin", allowedURL)
	w.Header().Add("Access-Control-Allow-Methods", "OPTIONS")
}

// This saves received metrics into the database
func _GetMetricsHandler(w http.ResponseWriter, r *http.Request) {
	allowedURL := os.Getenv("ALLOWED_URL")
	w.Header().Add("Access-Control-Allow-Origin", allowedURL)
	w.Header().Add("Access-Control-Allow-Methods", "GET")
	vars := mux.Vars(r)
	site := vars["site"]

	metrics, err := _GetMetricsForSite(site, db)

	if err != nil {
		http.Error(w, err.Error(), 400)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string][]*_Metric{"data": metrics})
}

// This route tells services whether the service is alive
func _HealthHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "alive")
}
