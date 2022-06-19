from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from course import Course
from database import add_to_db
import time


def start_scraping(program, url):
    driver = webdriver.Chrome()
    driver.get(url)

    # waits for site to load, then clicks on "programplan"
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "/html/body/main/div[1]/div[2]/div[1]/ul/li[3]/button")))
    driver.find_element(By.XPATH, "/html/body/main/div[1]/div[2]/div[1]/ul/li[3]/button").click()

    scrape_semester(program, driver)

def scrape_semester(program, driver):
    course = Course()
    course.program = program
    semester = 7
    while semester <= 10:
        course.semester = semester
        print("Starting work on semester:", semester)
        scrape_area(driver, course)

        print("Done: Semester", semester)
        semester += 1

def scrape_area(driver, course):
    counter = 1
    try:
        # xpath = area list item
        while(driver.find_element(By.XPATH, "//*[@id='curriculum']/div/section[" + str(course.semester) + "]/div/div[" + str(counter) + "]")):
            try:
                # xpath = area list item text
                area = driver.find_element(By.XPATH, "//*[@id='curriculum']/div/article[" + str(course.semester) + "]/div/div[" + str(counter) + "]/div/table/caption/span").text
                area = area.replace("Inriktning: ", "")
            except:
                area = ""
            #course.set_area(area.get_attribute("data-specialization"))
            course.area = area
            course.area_number = counter
            print("Working through area number: ", course.area_number, "Area:", course.area)
            scrape_period(driver, course)
            counter += 1
    except:
        print("Done working through areas.")

def parse_area_name(area):
    area.replace("Inriktning: ", "")
    return area

def scrape_period(driver, course):
    period_counter = 1
    try:
        # xpath = period item
        while(driver.find_element(By.XPATH, "//*[@id='curriculum']/div/section[" + str(course.semester) + "]/div/div[" + str(course.area_number) + "]/div/table/tbody[" + str(period_counter) + "]")):
            print("Working through period:", period_counter)
            course.period = period_counter
            scrape_courses(driver, course)
            period_counter += 1
    except:
        print("Done working through periods.")

def scrape_courses(driver, course):
    counter = 2
    try:
        while(driver.find_element(By.XPATH, "//*[@id='curriculum']/div/section[" + str(course.semester) + "]/div/div[" + str(course.area_number) + "]/div/table/tbody[" + str(course.period) + "]/tr[" + str(counter) + "]")):

            # using the same course object but if we dont reset some variables such as examination it lingers for next course
            course.reset()

            # xpath really long, save it and use as a variable instead
            xpath = "//*[@id='curriculum']/div/section[" + str(course.semester) + "]/div/div[" + str(course.area_number) + "]/div/table/tbody[" + str(course.period) + "]/tr[" + str(counter) + "]"


            # set values to curr course
            course.code = driver.find_element(By.XPATH, xpath + "/td[1]").text
            course.name = driver.find_element(By.XPATH, xpath + "/td[2]/a").text
            course.url = driver.find_element(By.XPATH, xpath + "/td[2]/a").get_attribute('href')
            course.set_points(driver.find_element(By.XPATH, xpath + "/td[3]").text)
            course.level = driver.find_element(By.XPATH, xpath + "/td[4]").text
            course.block = driver.find_element(By.XPATH, xpath + "/td[5]").text
            course.set_vof(driver.find_element(By.XPATH, xpath + "/td[6]/span").get_attribute("title"))

            # check what kind of examination for course
            check_examination(driver, course)

            try:
                # checks if there is additional information
                if (driver.find_element(By.XPATH, xpath + "/td[7]/div/button/span")):
                    course.other_information = driver.find_element(By.XPATH, "//*[@id='curriculum']/div/section[" + str(course.semester) + "]/div/div[" + str(course.area_number) + "]/div/table/tbody[" + str(course.period) + "]/tr[" + str(counter+1) + "]/td/div").get_attribute("innerText")
            except:
                course.other_information = ''

            # done with course, add course to db and add 2 to counter to go to next course
            print("Period:", course.period)
            print("Course name:", course.name)
            #add_to_db(course)
            counter += 2 # add with 2 is not a typo
    except:
        print("Done working through courses.")

def check_examination(driver, course):
    # open new tab
    driver.execute_script('''window.open('');''')

    # switch to tab
    driver.switch_to.window(driver.window_handles[1])
    driver.get(course.url)

    # wait for elements
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "/html/body/main/div/div[2]/div[1]/ul/li[3]/button")))
    driver.find_element(By.XPATH, "/html/body/main/div/div[2]/div[1]/ul/li[3]/button").click()

    counter = 2
    try:
        # checks course examination on page
        while (driver.find_element(By.XPATH, "//*[@id='examination']/div/table/tbody/tr[" + str(counter) + "]/td[1]")):
            examination_type = driver.find_element(By.XPATH, "//*[@id='examination']/div/table/tbody/tr[" + str(counter) + "]/td[1]").text
            course.check_examination_type(examination_type)
            counter += 1
    except:
        driver.close()
        driver.switch_to.window(driver.window_handles[0])

def main():
    urls = {
        "D": "https://liu.se/studieinfo/program/6cddd/4181",
        "DPU": "https://liu.se/studieinfo/program/6cdpu/3704",
        "ED": "https://liu.se/studieinfo/program/6cien/3706",
        "EMM": "https://liu.se/studieinfo/program/6cemm/3708",
        "I": "https://liu.se/studieinfo/program/6ciii/3710",
        "IT": "https://liu.se/studieinfo/program/6cite/3712",
        "KB": "https://liu.se/studieinfo/program/6ckeb/3713",
        "KTS": "https://liu.se/studieinfo/program/6ckts/3716",
        "M": "https://liu.se/studieinfo/program/6cmmm/3724",
        "MED": "https://liu.se/studieinfo/program/6cmed/3718",
        "MT": "https://liu.se/studieinfo/program/6cmen/3720",
        "U": "https://liu.se/studieinfo/program/6cmju/3722",
        "TBI": "https://liu.se/studieinfo/program/6ctbi/3726",
        "Y": "https://liu.se/studieinfo/program/6cyyy/3728"
    }

    for program in urls:
        #print(program, '-', urls[program])
        #start_scraping(program, urls[program])
        if program == "D":
            print("scraping: ", program)
            start_scraping(program, urls[program])

#start_scraping(url)
main()
