import re

import requests
from bs4 import BeautifulSoup

counties = []
# Getting all of the HTML
result = requests.get('https://www.florida-demographics.com/counties_by_population')
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

    print('<option value=\"'+row+'\">')

    # Saving the list of Cities in a Dictionary with the value being the frequency, initially set to 0
    counties.append(row)
