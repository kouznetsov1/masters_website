import sqlite3
import psycopg2
from psycopg2 import sql


def add_to_db(course):
    #connect to the database
    connection = psycopg2.connect (
        host = "localhost",
        database = "postgres",
        user = "postgres",
        password = "postgres"
    )

    # cursor
    cursor = connection.cursor()


    # had to add ' 
    course_name = "'" + course.name + "'"
    course_area = "'" + course.area + "'"
    course_code = "'" + course.code + "'"
    course_url = "'" + course.url + "'"
    course_vof = "'" + course.vof + "'"
    course_level = "'" + course.level + "'"
    course_other_info = "'" + course.other_information + "'"
    course_url = "'" + course.url + "'"
    course_block = "'" + course.block + "'"

    record_to_insert = (course_name, course_code, course.semester, course.period, course_area,
    course.points, course_level, course_block, course_url, course_other_info, course_vof,
    course.lab, course.exam, course.project, course.upg, course.ktr, course.hem, course.bas, course.more_periods)

    postgres_insert_query = """INSERT INTO courses(name, code, semester, period, area, points, level, block, \
        url, other_information, vof, lab, ten, pra, upg, ktr, hem, bas, more_periods) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

    cursor.execute(postgres_insert_query % record_to_insert)


    connection.commit()
    print("commit called")

    cursor.close()

    connection.close()
