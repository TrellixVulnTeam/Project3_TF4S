'''
twitter_requests.py

This file calls the API and pulls the tweets for Red Tide Webpage.

Execution:		>> python3 twitter_requests.py

@author Nisanur Genc
@date 04/07/22
'''

import requests
import json
import urllib.parse
from pymongo import MongoClient
import pymongo

def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)

    return client['jollyranchers']


'''
    This function creates a formatted string of the Python JSON object.
    Returns the string.
def jprint(obj):
    # creating the formatted string
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)
'''
    
'''
    This function creates a formatted string of the Python JSON object.
    Params tweets: Object dictionary of tweets, this makes it possible to add more in the list next time the function was called.
    Params full_query: The query for choosen items(hashtagss, accountss, etc)
    Returns tweets: Object dictionary of tweets.
'''
def pull_tweets(tweets, full_query):
    # making the request here
    r = requests.get(full_query, headers={"Authorization":
    "Bearer AAAAAAAAAAAAAAAAAAAAAGWEbAEAAAAA96jYwiBriFBlZ1AZEdGDUPasxu0%3DZ1ov10t2oDLiJ0kQ3UugxgmSBviT5hTVBJbmpu7PtrUfiZOsjn"})
    # puts the json into results list
    results = r.json()
    # results list only takes the statuses element in pull results
    results = results['statuses']
    # this loops checks every result in results
    for result in results:
        # takes the tweet id
        tweet_id = result['id']
        # checks the tweet id and retweeted tweets to avoid duplication
        if tweet_id not in tweets and result['text'][0:2] != "RT":
            # adds tweets with the elements of when it was created, username and text
            tweets[tweet_id] = {"created_at": result['created_at'], "username": result['user']['name'], "text": result['text']}
    return tweets

#TODO: Add a remove all method and uncomment the insert_many method so that it deletes all tweets and repopulates DB.
def tweetAPICall():

    tweets = {}

    # key word for searching tweets
    query = ['redtide']
    hashtags = ["#redtide","#RedTideFlorida","#FloridaRedTide","#redtidesucks"]
    accounts = ["from:MoteMarineLab","from:noaacoastalsci","from:NOAAResearch"]

    # the URL base for the API call
    url_base = "https://api.twitter.com/1.1/search/tweets.json?q="
    # search coniditions: takes the recent 100 tweets
    search_terms = "&result_type=recent&count=100"

    # list for tweets from wanted accounts with the wanted hashtags
    tweets = pull_tweets(tweets,url_base+urllib.parse.quote(" OR ".join(hashtags)+" "+" OR ".join(accounts))+search_terms)
    # list for tweets from wanted accounts with the wanted keyword
    tweets = pull_tweets(tweets,url_base+urllib.parse.quote(" OR ".join(query)+" "+" OR ".join(accounts))+search_terms)
    # list for tweets with the wanted hashtags
    tweets = pull_tweets(tweets,url_base+urllib.parse.quote(" OR ".join(hashtags))+search_terms)

    for tweet_id, tweet_data in tweets.items():
        print("Tweet id:",tweet_id)
        print("Tweet user:",tweet_data['username'])
        print("Tweet text:",tweet_data['text'])
        print("Tweet time:",tweet_data['created_at'])
        print("________________________________\n")

    # prints how many tweets have been printed above.
    print("Printed " + str(len(tweets)) + " tweets.\n")

    # Adding them to mongo

    # gets the database
    dbname = get_database()
    collection_name = dbname["tweets"]
    tweet_list = tweets.values()

    #collection_name.insert_many(tweet_list)

    item_details = collection_name.find()
    for item in item_details:
            print(item)