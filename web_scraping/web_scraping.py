from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from course import Course
from database import add_to_db


def start_scraping(url):
    driver = webdriver.Chrome()
    driver.get(url)

    # waits for site to load, then clicks on "programplan"
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "/html/body/main/div[1]/div[2]/div[1]/ul/li[3]/a")))
    driver.find_element(By.XPATH, "/html/body/main/div[1]/div[2]/div[1]/ul/li[3]/a").click()

    scrape_semester(driver)

def scrape_semester(driver):
    course = Course()
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
        while(driver.find_element(By.XPATH, "//*[@id='62D9382599C54E64BAA62C4084A7B47F']/div/article[" + str(course.semester) + "]/main/div[" + str(counter) + "]")):
            area = driver.find_element(By.XPATH, "//*[@id='62D9382599C54E64BAA62C4084A7B47F']/div/article[" + str(course.semester) + "]/main/div[" + str(counter) + "]")
            course.set_area(area.get_attribute("data-specialization"))
            course.area_number = counter
            print("Working through area number: ", course.area_number, "Area:", course.area)
            scrape_period(driver, course)
            counter += 1
    except:
        print("Done working through areas.")

def scrape_period(driver, course):
    period_counter = 1
    try:
        while(driver.find_element(By.XPATH, "//*[@id='62D9382599C54E64BAA62C4084A7B47F']/div/article[" + str(course.semester) + "]/main/div[" + str(course.area_number) + "]/div/table/tbody[" + str(period_counter) + "]")):
            print("Working through period:", period_counter)
            course.period = period_counter
            scrape_courses(driver, course)
            period_counter += 1
    except:
        print("Done working through periods.")

def scrape_courses(driver, course):
    counter = 2
    try:
        while(driver.find_element(By.XPATH, "//*[@id='62D9382599C54E64BAA62C4084A7B47F']/div/article[" + str(course.semester) + "]/main/div[" + str(course.area_number) + "]/div/table/tbody[" + str(course.period) + "]/tr[" + str(counter) + "]")):

            # using the same course object but if we dont reset some variabes such as examination it lingers for next course
            course.reset()

            # xpath really long, save it and use as a variable instead
            xpath = "//*[@id='62D9382599C54E64BAA62C4084A7B47F']/div/article[" + str(course.semester) + "]/main/div[" + str(course.area_number) + "]/div/table/tbody[" + str(course.period) + "]/tr[" + str(counter) + "]"

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
                    course.other_information = driver.find_element(By.XPATH, "//*[@id='62D9382599C54E64BAA62C4084A7B47F']/div/article[" + str(course.semester) + "]/main/div[" + str(course.area_number) + "]/div/table/tbody[" + str(course.period) + "]/tr[" + str(counter+1) + "]/td/div").get_attribute("innerText")
            except:
                course.other_information = ''
            
            # done with course, add course to db and add 2 to counter to go to next course
            print("Period:", course.period)
            add_to_db(course)
            counter += 2
    except:
        print("Done working through courses.")

def check_examination(driver, course):
    # open new tab
    driver.execute_script('''window.open('');''')

    # switch to tab
    driver.switch_to.window(driver.window_handles[1])
    driver.get(course.url)

    # wait for elements
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "/html/body/main/div[1]/div[2]/div[1]/ul/li[4]/a")))
    driver.find_element(By.XPATH, "/html/body/main/div[1]/div[2]/div[1]/ul/li[4]/a").click()

    counter = 1
    try:
        # checks course examination on page
        while (driver.find_element(By.XPATH, "//*[@id='8A04CCF13A98464493EF36E97435E240']/div/table/tbody/tr[" + str(counter) + "]/td[1]")):
            examination_type = driver.find_element(By.XPATH, "//*[@id='8A04CCF13A98464493EF36E97435E240']/div/table/tbody/tr[" + str(counter) + "]/td[1]").text
            course.check_examination_type(examination_type)
            counter += 1
    except:
        driver.close()
        driver.switch_to.window(driver.window_handles[0])


url = "https://liu.se/studieinfo/program/6cddd/3695"
start_scraping(url)
