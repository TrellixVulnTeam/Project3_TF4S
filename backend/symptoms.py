from bs4 import BeautifulSoup
import requests
import json
import urllib.parse
import pymongo
from pymongo import MongoClient


# Author: Nisanur Genc


def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)

    return client['jollyranchers']


url = "https://www.epa.gov/nutrientpollution/effects-human-health"

result = requests.get(url)
doc = BeautifulSoup(result.text, "html.parser")

tags = doc.find_all(["div"], text="Rashes")

symptoms = []

for item in tags[0].parent.parent:
    symptoms.append(item.text.strip())

while "" in symptoms:
    symptoms.remove("")

print(symptoms)

db = get_database()
collection = db["symptoms"]

big_dict = {'sympt': symptoms}

print(big_dict)

try:
    print("Potato")
    collection.insert_one(big_dict)
    print("here")
    print(f"Inserted {len(symptoms)} symptoms")
except:
    print('an error occurred symptoms were not stored to db')
