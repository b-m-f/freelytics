package main

import (
	"bytes"
	"errors"
	"os"
	"os/exec"
	"strings"
	"testing"
)

var pgurl = os.Getenv("POSTGRES_URL")

func _ExecutePGCommand(command string) (string, error) {
	cmd := exec.Command("psql", `-c`, command)
	var outb, errb bytes.Buffer
	cmd.Stdout = &outb
	cmd.Stderr = &errb
	err := cmd.Run()
	stdErr := errb.String()
	stdOut := outb.String()
	if err != nil {
		return "", err
	}
	if outb.String() == "" {
		return "", errors.New(stdErr)
	}
	return stdOut, nil
}

func TestConnectToDB(t *testing.T) {
	db := _ConnectToDB()
	if db == nil {
		t.Errorf("Could not connect to Database")
	}
}

func TestInitDB(t *testing.T) {
	db := _ConnectToDB()
	_InitDB(db)
	output, err := _ExecutePGCommand("SELECT EXISTS(SELECT 1 FROM pg_namespace WHERE nspname = 'analytics');")

	if err != nil {
		t.Errorf(err.Error())
	}

	if !strings.Contains(output, "exists") {
		t.Errorf("Schemas were not initialized correctly. Command Error: %v", output)
	}

	output, err = _ExecutePGCommand(`SELECT EXISTS (SELECT relname FROM pg_class WHERE relname='routes')`)

	if err != nil {
		t.Errorf(err.Error())
	}

	if !strings.Contains(output, "exists") {
		t.Errorf("Schemas were not initialized correctly. Command Error: %v", output)
	}
}

func TestSaveMetric(t *testing.T) {
	// clean table
	_, _ = _ExecutePGCommand(`DELETE FROM routes`)

	db := _ConnectToDB()
	metric := _Metric{"http://localhost.com/bla", 1, "localhost.com"}

	// save metric the first time
	_SaveMetric(metric, db)

	output, err := _ExecutePGCommand(`SELECT url, times_visited, root FROM routes WHERE root = 'localhost.com'`)

	if err != nil {
		t.Errorf(err.Error())
	}
	if !strings.Contains(output, "1") || !strings.Contains(output, "http://localhost.com/bla") {
		t.Errorf("Metric was not saved to Database correctly. Command Result:\n %v", output)
	}

	// save the metric again, the row should now only update times_visited
	_SaveMetric(metric, db)

	output, err = _ExecutePGCommand(`SELECT url, times_visited, root FROM routes WHERE root = 'localhost.com'`)
	if err != nil {
		t.Errorf(err.Error())
	}
	if !strings.Contains(output, "2") || !strings.Contains(output, "http://localhost.com/bla") {
		t.Errorf("Times visited was updated on second save. Command Result:\n %v", output)
	}

}

func TestGetMetrics(t *testing.T) {
	// clean table
	_, _ = _ExecutePGCommand(`DELETE FROM routes`)
	// insert test data
	_, _ = _ExecutePGCommand(`INSERT INTO routes(url, times_visited, root) VALUES ('http://localhost.com/test', 1, 'localhost.com')`)

	db := _ConnectToDB()

	metrics, err := _GetMetricsForSite("localhost.com", db)

	if err != nil {
		t.Errorf(err.Error())
	}
	if metrics == nil {
		t.Errorf("Metrics could not be received from the DB.")
	}
	if metrics[0].URL != "http://localhost.com/test" {
		t.Errorf("Wrong metrics were received from DB.\n Exptected: &{http://localhost.com/test 1 }, got: %v", metrics[0])
	}

}
