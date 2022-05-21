"""
This code will deal with extracting, filtering, and storing the list of podcasts that relate to the Topic at hand.
Disclaimer: There will be some false positives that get through the filtering.



Author: Fehmi Neffati
"""

import re
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException

"""
Resource: 
https://stackoverflow.com/questions/16180428/can-selenium-webdriver-open-browser-windows-silently-in-the-background
"""


class PodcastExtractor:
    """
    Global Variables that we will be using throughout the program
    """
    keyWords = []
    topic_words = ""
    op = webdriver.ChromeOptions()
    op.add_argument('headless')  # so that a browser window does not open up
    driver = webdriver.Chrome(options=op, service=Service(ChromeDriverManager().install()))

    def __init__(self, topic, keywords):
        print("Initiating Spotify podcast extraction operation")
        self.keyWords = keywords
        for word in topic.split():
            self.topic_words += word
            self.topic_words += "%20"

    """
    Here I am using Selenium to:
        - Go into Spotify
        - Search for the words : Red Tide
        - Open up the "Episodes" Tab
        - It would then scrape a list of all available Podcast episodes in that webpage
    """

    def getLinks(self):
        self.driver.get('https://open.spotify.com/search/' + self.topic_words + '/episodes')
        time.sleep(5)
        searching = self.driver.find_elements(By.CLASS_NAME, 'LunqxlFIupJw_Dkx6mNx')
        raw_links = []
        for item in searching:
            link = item.find_element(By.CLASS_NAME, 'Nqa6Cw3RkDMV8QnYreTr')
            lnk = link.get_attribute('href')
            # print(lnk)
            raw_links.append(lnk)
        return raw_links

    """
    After Getting all of the Podcasts links, we need to filter out the irrelevant Podcasts
    I do so by getting the description of each Podcast episode and I would scan it to match it with Red Tide related Key Words
    If there is a match, I would add the url of that Podcast to a different list
    """

    def filterLinks(self, rawLinks):
        wanted_podcasts = []
        for link in rawLinks:
            self.driver.get(link)
            time.sleep(5)
            try:
                btn = self.driver.find_element(By.CLASS_NAME, 'AFGg70Z_GfjSDTYBWyEq')
                try:
                    btn.click()
                except ElementClickInterceptedException:
                    continue
            except NoSuchElementException:
                print("no more info")
            time.sleep(3)
            try:
                text = self.driver.find_element(By.CLASS_NAME, 'CTqnyEX1E8bCstZSENX_')
            except:
                continue
            time.sleep(3)
            # print(text.text)
            description = text.text.lower()
            for word in self.keyWords:
                # This is probably where we are getting the duplicates because one description might have multiple
                # keywords in it I have a script that would remove the duplicates but there must be a way to fix it
                # from here
                if word in description:
                    # print("Bingo! ")
                    # print(description)
                    wanted_podcasts.append(link)
                    # Trying the continue clause as a potential solution to the duplicate probelm
                    continue
        return wanted_podcasts

    """
    2 Ways you can do this:
        - Either connect here and display directly on Angular  
        - Have the iframe template put on Angular with the link as a variable and pull from the data base to fill up that variable
        
    We chose to only leave the unique identifier of each episode and then concatenate it with a predefined iframe in Angular
    Here, after I have filtered all of my episodes, we get that unique identified and add it to a list.
    
    """

    def iframeMaker(self):
        rawLinks = self.getLinks()
        filtered = self.filterLinks(rawLinks)

        readyLinks = []
        for link in filtered:
            a = re.sub('episode/', '<stop>', link)
            a = re.split('<stop>', a)
            print(a[1])
            readyLinks.append(str(a[1]))

        """This chunk is supposed to make sure there is no duplicates"""
        cleanList = []
        for link in readyLinks:
            if link not in cleanList:
                cleanList.append(link)
        return cleanList

