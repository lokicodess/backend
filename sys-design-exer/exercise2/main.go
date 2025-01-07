/*
*  IMPLEMENT A READ REPLICA FOR HORIZONTAL SCALLING
*
* further improvements
*  - use connection pooling
*  - Diff db for write , diff db for read
*  - Graceful Shutdown
*  - Concurrency
*
 */

package main

import (
	"database/sql"
	"fmt"
	"net/http"

	_ "github.com/lib/pq"
)

const connStr = "urConnectionString"

func readreq(w http.ResponseWriter, r *http.Request) {
	readConnObj, err := sql.Open("postgres", connStr)
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}
	if err = readConnObj.Ping(); err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	defer readConnObj.Close()

	fmt.Println("connected to the database for req")

	stmt := `select * from "todo"`
	_, e := readConnObj.Query(stmt)
	if e != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		fmt.Println("unable to query db")
		return
	}

	w.Write([]byte("read req"))
}

func writereq(w http.ResponseWriter, r *http.Request) {
	// write req
	writeConnObj, err := sql.Open("postgres", connStr)
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		fmt.Println("unable to connect to the db")
		return
	}

	if err = writeConnObj.Ping(); err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		fmt.Println("unable to connect to the db")
		return
	}

	fmt.Println("connected to the database for write req")

	defer writeConnObj.Close()

	stmt := `insert into "todo" ("task","is_completed") values($1,$2)`
	_, e := writeConnObj.Exec(stmt, "system design", true)
	if e != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		fmt.Println("Unable to execute write query")
		return
	}

	w.Write([]byte("write req"))
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/read", readreq)
	mux.HandleFunc("/write", writereq)

	http.ListenAndServe(":8080", mux)
	fmt.Println("server is listening to port 8080")
}
