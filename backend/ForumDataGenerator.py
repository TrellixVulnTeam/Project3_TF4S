import certifi
from pymongo import MongoClient
from CountyExtractor import CountyExtractor


class ForumDataGenerator:

    def __init__(self, dataSet_path):
        print("Initiating Data Cleaning operation.")

    def getData(self, collection):
        a = CountyExtractor()
        # all counties is a dictionary where all of the values of each county is 0
        allCounties = a.getCountiesAsDict()
        locations = []  # create an empty list for IDs
        # iterate pymongo documents with a for loop
        for doc in collection.find():
            print(doc["location"])
            allCounties[doc["location"]] = allCounties[doc["location"]] + 1
            print(allCounties[doc["location"]])

        finalDict = {k: v for k, v in sorted(allCounties.items(), key=lambda v: v[1], reverse=True)}
        return finalDict
