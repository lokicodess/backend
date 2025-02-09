package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/go-redis/redis"
	_ "github.com/lib/pq"
)

var (
	db    *sql.DB
	cache *redis.Client
)

type T struct {
	Key string `json:"key"`
}

func home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.Error(w, "404 Not Found", http.StatusNotFound)
		return
	}

	// Read request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close() // Ensure the body is closed

	// Parse JSON
	var t T
	err = json.Unmarshal(body, &t)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	start := time.Now()
	// first time cache miss, second time cache hit
	val, _ := cache.Get(t.Key).Result()
	if val == "" {
		data := get(t.Key)
		err := cache.Set(data, data, 0).Err()
		if err != nil {
			panic(err)
		}
	}
	elapsed := time.Since(start)
	w.Write([]byte(fmt.Sprintf("Time taken: %s", elapsed)))
}

func connectDb() {
	var err error
	connStr := "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable"
	db, err = sql.Open("postgres", connStr) // Assign to global db
	if err != nil {
		log.Fatal("Failed to connect to DB:", err)
	}

	// Check connection
	if err = db.Ping(); err != nil {
		log.Fatal("Database ping failed:", err)
	}

	fmt.Println("Database is connected")
}

func connectRedis() {
	cache = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	_, err := cache.Ping().Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("Redis is connected")
}

//	func insert(key string) {
//			insertStmt := `INSERT INTO test(key) VALUES($1)`
//		_, e := db.Exec(insertStmt, key)
//		if e != nil {
//			fmt.Println("Insert Error:", e)
//			return
//		}
//		fmt.Println("Inserted successfully:", key)
//		//	}
func get(key string) string {
	getStmt := `SELECT key FROM test WHERE key = $1`
	var v T
	err := db.QueryRow(getStmt, key).Scan(&v.Key) // Fix: Scan into v.Key
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No rows found for:", key)
		} else {
			log.Fatal("Query Error:", err)
		}
	} else {
		fmt.Println("Found value:", v.Key)
		return v.Key
	}
	return ""
}

func main() {
	mux := http.NewServeMux()

	connectDb()
	connectRedis()

	defer db.Close() // Ensure DB is closed when program exits

	fmt.Println("Server is listening on port 8080")

	mux.HandleFunc("/", home)

	err := http.ListenAndServe(":8080", mux)
	if err != nil {
		log.Fatal("Server error:", err)
	}
}
