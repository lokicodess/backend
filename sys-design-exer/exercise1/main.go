package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

func main() {
	connStr := "connectionString"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	query := `
BEGIN;

INSERT INTO users (username, email, password_hash)
VALUES ('john', 'john.doecom', 'hashed_passwor')
RETURNING user_id;

INSERT INTO posts (user_id, title, content)
VALUES (currval('users_user_id_seq'), 'My First Post', 'This is the content of my first post.');

COMMIT;
`
	res, err := db.Exec(query)
	if err != nil {
		panic(err)
	}
	fmt.Printf("res -> %#v", res)
}
