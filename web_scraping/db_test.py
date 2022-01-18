import sqlite3
import psycopg2
from psycopg2 import sql


#connect to the database
connection = psycopg2.connect (
    host = "localhost",
    database = "postgres",
    user = "postgres",
    password = "postgres"
)

# cursor
cursor = connection.cursor()


i = 1
if i == 1:
    tja = "'tjenamannne'"
    first = "INSERT INTO courses (name) VALUES (%s)"
    cursor.execute(first % tja)
    #cursor.execute("INSERT INTO courses (name) VALUES (%s)" % tja) <- FUNKAR
    #cursor.execute("INSERT INTO courses (name) VALUES ('hej')", tja) <----- FUNKAR 
    i += 1


connection.commit()

cursor.close()

connection.close()
