import certifi
from pymongo import MongoClient

from GraphingHistoricalData import GraphingHistoricalData
from PodcastExtractor import PodcastExtractor
from SymptomsAndGuidelines import SymptomsAndGuidelines


class Butler:

    def __init__(self):
        print("Butler is serving.")
        self.updateGraph()
        # sleep
        self.updateSpotify()
        # sleep
        self.updateSymptomsAndGuidelines()
        # sleep
        self.updateTwitter()

    def get_database(self):
        # Provide the mongodb atlas url to connect python to mongodb using pymongo
        CONNECTION_STRING = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

        # Create a connection using MongoClient
        client = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
        return client['jollyranchers']

    db = get_database()

    def pump_and_dump(self, targetCollection):
        collection = self.db.get_collection(targetCollection)
        collection.drop()
        collection = self.db.create_collection(targetCollection)
        return collection

    """                           GRAPHS                                     """

    def updateGraph(self):
        b64 = GraphingHistoricalData('Secure_Tweets_Data.txt').get64()
        collection = self.pump_and_dump("Graphs")
        collection.insert_one({'graph_b64': b64})

    """                            SPOTIFY                                   """

    def updateSpotify(self):
        # instruction

        keyWords = ['florida', 'red tide', 'fish', 'ocean', 'sea', 'algal', 'bloom', 'coast', 'karenia', 'brevis',
                    'karenia brevis', 'manatee']
        topic = "Red tide"
        cleanList = PodcastExtractor(topic, keyWords).iframeMaker()

        collection = self.pump_and_dump("podcasts")
        for link in cleanList:
            collection.insert_one(
                {'Link': 'https://open.spotify.com/embed/episode/' + str(link) + '?utm_source=generator'})

    """                             Symptoms                                    """

    def updateSymptomsAndGuidelines(self):
        # instruction
        source1 = 'https://www.epa.gov/nutrientpollution/effects-human-health'
        source2 = "https://www.cdc.gov/habs/illness-symptoms-marine.html"

        list1 = SymptomsAndGuidelines().getSymptoms(source1)
        list2 = SymptomsAndGuidelines().getGuidelines(source2)

        collection = self.pump_and_dump("symptoms")

        for item in list1:
            if item != "":
                collection.insert_one({'Symptom': item})
        for item in list2:
            if item != "":
                collection.insert_one({'guideline': item})
    def updateTwttier(self):
        #wait for nisa