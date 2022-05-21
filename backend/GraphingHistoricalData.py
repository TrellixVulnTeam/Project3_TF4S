"""
In this file we will be plotting a graph of data about Tweets in different Florida Cities.
The Data Set source: https://github.com/tbep-tech/red-tide-twitter/blob/master/Secure_Tweets_Data.csv
Special thanks to Dr. Tania Roy for recommending the data set from Prof. Skripnikov's research.

The graph here will be a representation of how many times was a red tide mentioned in any of florida's 400+ cities
We do that by extracting a list of cities and comparing them to the locations of the tweets provided in the data set


"""

import re
import csv
import base64
import certifi
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
from pymongo import MongoClient
from matplotlib.pyplot import figure

"""
    Here I will be scraping the florida demographics website to get a full list of all florida cities
"""


class GraphingHistoricalData:
    b64_string = ""
    dataSet_path = ""

    def __init__(self, dataSet_path):
        print("Initiating Graph creation operation.")
        self.dataSet_path = dataSet_path
        self.b64_string = self.make64()

    def getFloridaCities(self):
        # Getting all of the HTML
        result = requests.get('https://www.florida-demographics.com/cities_by_population')
        doc = BeautifulSoup(result.text, "html.parser")

        # Since the Data is put in a table, I am retrieving all of the Table Rows
        allTableRows = doc.find_all('tr')
        # Getting rid of some of the unneeded HTML
        allTableRows = allTableRows[1:935]

        frequency = {}
        # Iterating through every Row to remove everything but the city names using Regular Expressions
        for row in allTableRows:
            row = str(row)
            # removal of Opening and Closing Tags
            row = re.sub('<tr>', ' ', row)
            row = re.sub('</tr>', ' ', row)
            row = re.sub('<td>', ' ', row)
            row = re.sub('</td>', ' ', row)
            row = re.sub('<span>', ' ', row)
            # Removal of Population numbers
            row = re.sub(r'[~^0-9]', '', row)
            # Removal of extra spaces and line breaks
            row = re.sub(' ', '', row)
            row = re.sub('\n', '', row)
            # Removal of remaining HTML
            row = re.sub('<spanclass="badgebadge-tie">TIE</span>', '', row)
            row = re.sub('<ahref([^>]*>)', '', row)
            row = re.sub('</a>', '', row)
            row = re.sub(',', '', row)
            row = re.sub(',', '', row)
            row = re.sub(r"(\w)([A-Z])", r"\1 \2", row)

            # Saving the list of Cities in a Dictionary with the value being the frequency, initially set to 0
            frequency[row] = 0
        return frequency

    """
        Here I will be accessing a data set of historical tweets about Red tide around the US
        I will be doing some text mining to restrict it to Florida as much as I can
        there will be some false positives:
        - Anything with indian in it will receive a count
    """

    """
    howFrequent will update the dictionary of how frequently red tide was mentioned in each city in Florida
    """

    def howFrequent(self, data):
        ## Try this one in case your set does not work : 'Secure_Tweets_Data.txt'
        with open(self.dataSet_path, 'r') as csv_file:
            csv_reader = csv.reader(csv_file)
            """
            counter = 0
            for line in csv_reader:
                counter = counter + 1
            print("Total is: " + str(counter))
            """
            # Total amount of lines of this data set is: 57654

            """
            The Data set is formatted in the following way:

             ID, date, some other number, City, some boolean, citizen or not?, NA, NA, NA, Some other ID number, date,
             some small number maybe zip code?, NA, NA , County location, city and state, altitude, longitude,
             actual content, bunch of booleans

            """

            for line in csv_reader:

                location = line[15]  # accessing the location index
                a = list(location.split(
                    ", "))  # some would have state and country so I'm splitting by comma, might cause error
                cities = data.keys()  # accessing the list of all cities in Florida
                for city in cities:
                    for item in a:
                        if item in city:
                            # Bug that I don't know how to get around: Anything with Indian in it will get matched
                            data[city] = data.get(
                                city) + 1  # If we get a match of a city mention, we increment the counter
            """
            Here I am removing from the dictionary all of the cities with mentions below 2000 to declutter the graph
            """
            for city in list(data.keys()):
                if data.get(city) < 2000:
                    data.pop(city)
        return data

    """
    builds my graph
    """

    def saveGraph(self, dataset):
        # x axis values
        x = dataset.keys()
        # corresponding y axis values
        y = dataset.values()

        plt_1 = figure(num=1, figsize=(10, 12))

        # plotting the points
        plt.bar(x, y)

        # naming the x axis
        plt.xlabel('City Names')
        plt.xticks(rotation=90)
        # naming the y axis
        plt.ylabel('How many times was it mentioned')

        # giving a title to my graph
        plt.title('Mentions of Red Tide per City')
        plt.tight_layout()

        fig1 = plt.gcf()
        plt.show()
        plt.draw()
        fig1.savefig('foo.png', dpi=100)

    def make64(self):
        """
        Here I will be converting the graph to base64 which would facilitate putting it on the data base
        """
        stateFrequency = self.getFloridaCities()
        dataset = self.howFrequent(stateFrequency)
        self.saveGraph(dataset)

        with open("foo.png", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        """
        Here I convert the binary to a String which should conserve it's value but it will be stored in a different fashion
        """
        encoded_string = encoded_string.decode("ascii")
        encoded_string = re.sub("b'", '', encoded_string)
        encoded_string = re.sub("'", '', encoded_string)

        return encoded_string

    def get64(self):
        print(self.b64_string)
        return self.b64_string
