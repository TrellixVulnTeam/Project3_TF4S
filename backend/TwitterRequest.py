'''
twitter_requests.py

This file calls the API and pulls the tweets for Red Tide Webpage.

############################
IMPORTANT:
All print statements with string values MUST be encoded to utf-8 to successfully be run in Node.js

Any print statements of dictionary elements MUST be commented out  before deploying to server
These print statements will cause errors otherwise
############################

Execution:		>> python3 twitter_requests.py

@author Nisanur Genc
@date 04/07/22
'''

import requests
import urllib.parse

class TwitterRequest:
    tweets = {}

    def __init__(self):
        print("Pulling the tweets.")
        self.tweets = self.MakeTwitterData()

    def pull_tweets(self, full_query):
        # making the request here
        r = requests.get(full_query, headers={
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAGWEbAEAAAAA96jYwiBriFBlZ1AZEdGDUPasxu0%3DZ1ov10t2oDLiJ0kQ3UugxgmSBviT5hTVBJbmpu7PtrUfiZOsjn"})
        # puts the json into results list
        results = r.json()
        # results list only takes the statuses element in pull results
        results = results['statuses']
        # this loops checks every result in results
        for result in results:
            # takes the tweet id
            tweet_id = result['id']
            # checks the tweet id and retweeted tweets to avoid duplication
            if tweet_id not in self.tweets and result['text'][0:2] != "RT":
                # adds tweets with the elements of when it was created, username and text
                self.tweets[tweet_id] = {"created_at": result['created_at'], "username": result['user']['name'],
                                         "text": result['text'],
                                         "profile_image_url": result['user']['profile_image_url']}

    def MakeTwitterData(self):
        # key word for searching tweets
        query = ['redtide']
        hashtags = ["#redtide", "#RedTideFlorida", "#FloridaRedTide", "#redtidesucks"]
        accounts = ["from:MoteMarineLab", "from:noaacoastalsci", "from:NOAAResearch"]

        # the URL base for the API call
        url_base = "https://api.twitter.com/1.1/search/tweets.json?q="
        # search conditions: takes the recent 100 tweets
        search_terms = "&result_type=recent&count=100"

        # list for tweets from wanted accounts with the wanted hashtags
        self.pull_tweets(url_base + urllib.parse.quote(" OR ".join(hashtags) + " " + " OR ".join(accounts)) + search_terms)
        # list for tweets from wanted accounts with the wanted keyword
        self.pull_tweets(url_base + urllib.parse.quote(" OR ".join(query) + " " + " OR ".join(accounts)) + search_terms)
        # list for tweets with the wanted hashtags
        self.pull_tweets(url_base + urllib.parse.quote(" OR ".join(hashtags)) + search_terms)

        return self.tweets

    def giveMeTweets(self):
        return self.tweets