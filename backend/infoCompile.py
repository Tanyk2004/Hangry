import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk import pos_tag
from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import time
from selenium.webdriver.common.by import By
import os

hash = {}
foods = set()
isInit = False
latlat = " "
longlong = " "

def initializeHashMap():
    # reading database + converting to hashmap
    df = pd.read_excel(str(os.path.dirname(__file__)) + '/food_option_names.xlsx')
    global hash
    for index, row in df.iterrows():
        hash[(row['Food'].rstrip())] = row['gCO2e']
    
    # setting initialized variable to true for isHashInit()
    global isInit 
    isInit = True

    # creating set of foods for easier scraping later
    global foods
    foods = set(hash.keys())
    
    # TODO: implement wikipedia webscraping for future webscraping use

def isHashInit():
    return isInit

def evalFood(text, strlatitude, strlongitude):
    global latlat
    global longlong

    # check if coordinates of user are already stored
    if latlat == " ":
        latlat = strlatitude
        longlong = strlongitude
    else:
        strlatitude = latlat
        strlongitude = longlong
    output = []

    # remove spaces from string and convert to lowercase
    text = text.lower()
    text = text.rstrip()
    text = text.lstrip()

    # get alt options 
    alts = findAlts(text)

    textFormatted = text[0].upper() + text[1:].lower()

    curFoot = hash.get(textFormatted)

    lowFoot = curFoot

    food = ""

    # find alt with lowest carbon footprint
    for i in alts:
        if hash.get(i) < lowFoot:
            food = i
            lowFoot = hash.get(i)
    
    if lowFoot == curFoot:
        return output
    
    output.append(food) 
    output.append(str(curFoot - lowFoot) + "g CO2e reduction")

    zip = getZIP(strlatitude, strlongitude)

    # get shopping data for alt
    return output + instacartData(zip, food)


def findAlts(text):
    output = []
    if text.find(" ") == -1:
        output = singleWordFood(text)
        return output
    else:
        output = multiWordFood(text)
        return output



def multiWordFood(text):
    # subdivide by spacing
    index = text.find(" ")
    foodPost = text[index:]
    foodPre = text[:index]

    postResults = []
    preResults = []


    for elem in foods:
        if foodPre in elem:
            preResults.append(elem)
        if foodPost in elem:
            postResults.append(elem)
    
    if len(postResults) > 1:
        return postResults
    elif len(postResults + preResults) > 0:
        return (postResults + preResults)
    else:
        #TODO IMPLEMENT WEBSCRAPING!
        return (postResults + preResults)



def singleWordFood(text):
    output = []
    
    # scrape google results
    query = "sustainable alternatives to " + text
    search = f"https://www.google.com/search?q=" + query
    results = requests.get(search)

    # get all text from site
    soup = BeautifulSoup(results.content, "html.parser")
    allText = "".join([tag.text for tag in soup.find_all()])

  
    # filter through text to find possible matches (nouns, etc)
    tokens = nltk.word_tokenize(allText)
    tagged = nltk.pos_tag(tokens)

    grammar = r"""
    NP: {<DT|PRP\$>?<JJ>*<NN>}   # chunk noun phrases
        {<NNP>+}                # chunk named entities
    """

    chunk_parser = nltk.RegexpParser(grammar)
    chunks = chunk_parser.parse(tagged)

    formattedText = text[0].upper() + text[1:]

    for chunk in chunks.subtrees():
        if chunk.label() == "NP":
            posAlt = " ".join(word for word, pos in chunk.leaves())
            posAlt = posAlt[0].upper() + posAlt[1:]
            posAlt = posAlt.rstrip()
            if posAlt != formattedText and hash.get(posAlt) is not None:
                
                if (posAlt not in output):
                    output.append(posAlt)
    return output

def instacartData(zipCode, food):
    query = "buy " + str(food) + " near " + str(zipCode) + " instacart"
    
    # find options for food
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    browser = webdriver.Chrome(options=options)

    browser.get('https://www.google.com/shopping')
    search_box = browser.find_element(By.NAME, 'q')
    search_box.send_keys(query)
    search_box.submit()

    # find all text w/ $ signs 
    soup = BeautifulSoup(requests.get(browser.current_url).text, 'html.parser')

    dollar_symbols = soup.find_all(text=lambda text: '$' in text)

    index = len(dollar_symbols) - 1

    endIndex = len(dollar_symbols) - 1

    # comput 'average'
    while index != 0 and 'Up to' not in dollar_symbols[index]:
        index = index - 1
        if 'Over' in dollar_symbols[index]:
            endIndex = index + 1
    dollar_symbols = dollar_symbols[index:endIndex]

    output = ['shopping.google.com', str(dollar_symbols[int((len(dollar_symbols) + 1) / 2) - 1])]
    return output



def getZIP(latitude, longitude):
    latitude = str(latitude)
    longitude = str(longitude)
    # query = "" + latitude + " N, " + longitude + " E"

    api = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={latitude}&lon={longitude}"
    
    data = requests.get(api)
    data = data.json()
    zip = data["address"].get("postcode", "")
    return zip