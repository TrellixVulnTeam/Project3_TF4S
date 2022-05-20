"""
This is yet another web scraper that goes to websites such as: EPA, Florida Health, cdc and extracts Symptoms caused by red tide
and also gives a list of guidelines




@author: Fehmi Neffati


"""

import re
import requests
from bs4 import BeautifulSoup


class SymptomsAndGuidelines:
    symptoms = []
    guidelines = []

    def __init__(self):
        print("Initiating Symptoms and Guidelines extraction")

    def getDoc(self, url):
        result = requests.get(url)
        doc = BeautifulSoup(result.text, "html.parser")
        return doc

    def getSymptoms(self, source):
        tags = self.getDoc(source).find_all(["div"], text="Rashes")
        for item in tags[0].parent.parent:
            self.symptoms.append(item.text.strip())
        while "" in self.symptoms:
            self.symptoms.remove("")
        return self.symptoms

    def getGuidelines(self, source):
        if "floridahealth" in source:
            print("this is from florida health")
            tags = self.getDoc(source).find_all(["block"])
            flh_Data = tags[0].text
            a = re.split("to lessen the effects of red tide?", flh_Data)
            flh_Data = re.split("Can red tide affect pets?", a[1])
            flh_Data = flh_Data[0]
            self.guidelines.append(flh_Data)

        if "cdc" in source:
            # "https://www.cdc.gov/habs/illness-symptoms-marine.html"
            print("this is from cdc")
            tags = self.getDoc(source).find_all(["h4"], class_='mb-2')
            whatWeNeed = tags[2]
            whatWeNeed = whatWeNeed.parent
            for item in whatWeNeed:
                item = str(item.text.strip("\n"))
                item = item.strip("Top of Page")
                self.guidelines.append(str(item))
        return self.guidelines
