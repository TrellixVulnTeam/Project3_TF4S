import re
import time

import certifi
from pymongo import MongoClient
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

"""
Resource:
https://stackoverflow.com/questions/16180428/can-selenium-webdriver-open-browser-windows-silently-in-the-background
"""

"""
Global Variables that we will be using throughout the program
"""
keyWords = ['florida', 'red tide', 'fish', 'ocean', 'sea', 'algal', 'bloom', 'coast', 'karenia', 'brevis',
            'karenia brevis', 'manatee']
wanted_podcasts = []

"""
Here I am using Selenium to:
    - Go into Spotify
    - Search for the words : Red Tide
    - Open up the "Episodes" Tab
    - It would then scrape a list of all available Podcast episodes in that webpage
"""

op = webdriver.ChromeOptions()
op.add_argument('headless')
driver = webdriver.Chrome(options=op, service=Service(ChromeDriverManager().install()))

# driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get('https://open.spotify.com/search/Red%20Tide/episodes')
time.sleep(5)
searching = driver.find_elements(By.CLASS_NAME, 'LunqxlFIupJw_Dkx6mNx')
links = []
for item in searching:
    link = item.find_element(By.CLASS_NAME, 'Nqa6Cw3RkDMV8QnYreTr')
    lnk = link.get_attribute('href')
    print(lnk)
    links.append(lnk)

"""
After Getting all of the Podcasts links, we need to filter out the irrelevant Podcasts
I do so by getting the description of each Podcast episode and I would scan it to match it with Red Tide related Key Words
If there is a match, I would add the url of that Podcast to a different list
"""

for link in links:
    driver.get(link)
    time.sleep(5)
    try:
        btn = driver.find_element(By.CLASS_NAME, 'AFGg70Z_GfjSDTYBWyEq')
        try:
            btn.click()
        except ElementClickInterceptedException:
            continue
    except NoSuchElementException:
        print("no more info")
    print("before sleep")
    time.sleep(3)
    try:
        text = driver.find_element(By.CLASS_NAME, 'CTqnyEX1E8bCstZSENX_')
    except:
        continue
    time.sleep(3)
    # print(text.text)
    description = text.text.lower()
    for word in keyWords:
        if word in description:
            print("Bingo! ")
            print(description)
            wanted_podcasts.append(link)

"""
2 Ways you can do this:
    - Either connect here and display directly on Angular ->
    - Have the iframe template put on Angular with the link as a variable and pull from the data base to fill up that variable

"""

readyLinks = []
for link in wanted_podcasts:
    a = re.sub('episode/', '<stop>', link)
    a = re.split('<stop>', a)
    print(a[1])
    readyLinks.append(a[1])


def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())

    return client['jollyranchers']


db = get_database()
collection = db.get_collection("podcasts")
collection.drop()
collection = db.create_collection("podcasts")


for link in readyLinks:
    collection.insert_one({'Link': 'https://open.spotify.com/embed/episode/'+str(link)+'?utm_source=generator'})

