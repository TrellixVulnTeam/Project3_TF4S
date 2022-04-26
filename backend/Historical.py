import csv

import certifi
import cv2
import gridfs
import requests
import re
import matplotlib.pyplot as plt
from matplotlib.pyplot import figure


# will be saving data in a key pair value for the graphs
from bs4 import BeautifulSoup
from pymongo import MongoClient

"""
    Here I will be scraping the florida demographics website to get a full list of all florida cities
"""

# Dictionary
stateFrequency = {}
# Getting all of the HTML
result = requests.get('https://www.florida-demographics.com/cities_by_population')
doc = BeautifulSoup(result.text, "html.parser")

# Since the Data is put in a table, I am retrieving all of the Table Rows
allTableRows = doc.find_all('tr')
# Getting rid of some of the unneeded HTML
allTableRows = allTableRows[1:935]

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
    stateFrequency[row] = 0

"""
    Here I will be accessing a data set of historical tweets about Red tide around the US
    I will be doing some text mining to restrict it to Florida as much as I can
    there will be some false positives: 
    - Anything with indian in it will receive a count 
"""
with open('Secure_Tweets_Data.txt', 'r') as csv_file:
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
        a = list(location.split(", "))  # some would have state and country so I'm splitting by comma, might cause error
        cities = stateFrequency.keys()  # accessing the list of all cities in Florida
        for city in cities:
            for item in a:
                if item in city:
                    # Bug that I don't know how to get around: Anything with Indian in it will get matched
                    stateFrequency[city] = stateFrequency.get(
                        city) + 1  # If we get a match of a city mention, we increment the counter

    """
    Test code : 
    cities = stateFrequency.keys()
    for city in cities:
        print(city + ' Total: ' + str(stateFrequency.get(city)))
    """

    """
    Here I am removing from the dictionary all of the cities with mentions below 2000 to declutter the graph 
    """
    cities = stateFrequency.keys()
    for city in list(stateFrequency.keys()):
        if stateFrequency.get(city) < 2000:
            stateFrequency.pop(city)

# x axis values
x = stateFrequency.keys()
# corresponding y axis values
y = stateFrequency.values()

plt_1 = figure(num=1, figsize=(10, 12))

# plotting the points
plt.bar(x, y)

# naming the x axis
plt.xlabel('x - axis')
plt.xticks(rotation=90)
# naming the y axis
plt.ylabel('y - axis')

# giving a title to my graph
plt.title('Mentions of Red Tide per City')

# function to show the plot
plt.show()


from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import numpy as np

fig = Figure()
canvas = FigureCanvas(fig)
ax = fig.gca()

ax.text(0.0, 0.0, "Test", fontsize=45)
ax.axis('off')

canvas.draw()  # draw the canvas, cache the renderer

image = np.frombuffer(canvas.tostring_rgb(), dtype='uint8')


def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())

    return client['jollyranchers']


db = get_database()

fs = gridfs.GridFS(db)

# read the image and convert it to RGB
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# convert ndarray to string
imageString = image.tobytes()

# store the image
imageID = fs.put(imageString, encoding='utf-8')

# create our image meta data
meta = {
    'name': 'historicalGraph',
    'images': [
        {
            'imageID': imageID,
            'shape': image.shape,
            'dtype': str(image.dtype)
        }
    ]
}

# insert the meta data
collection = db.get_collection("Graphs")
collection.insert_one(meta)

print("upload completed")



# get the image meta data
image = collection.find_one({'name': 'historicalGraph'})['images'][0]
print(image['imageID'])
# get the image from gridfs
gOut = fs.get(image['imageID'])

# convert bytes to ndarray
img = np.frombuffer(gOut.read(), dtype=np.uint8)

# reshape to match the image size
img = np.reshape(img, image['shape'])

from PIL import Image as im
reshaped = im.fromarray(img)
reshaped.save('trial.png')