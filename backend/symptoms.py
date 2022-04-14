from bs4 import BeautifulSoup
import requests
import pymongo





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

try:
    collection.insert_many(symptoms)
    print(f"Inserted {len(symptoms)} symptoms")
except:
    print('an error occured symptoms were not stored to db')
