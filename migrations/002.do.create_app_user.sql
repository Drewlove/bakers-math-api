CREATE TABLE app_user(
    app_user_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, 
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    date_created TIMESTAMP NOT NULL DEFAULT now()
);
