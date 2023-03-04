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

hash = {}
foods = set()
isInit = False
latlat = " "
longlong = " "

def initializeHashMap():
    
    # reading database + converting to hashmap
    df = pd.read_excel('~/Documents/GitHub/Hangry/backend/food_option_names.xlsx')
    global hash
    for index, row in df.iterrows():
        # print(row['Food'])
        hash[(row['Food'].rstrip())] = row['gCO2e']
    
    # setting initialized variable to true for isHashInit()
    global isInit 
    isInit = True

    # creating set of foods for easier scraping later
    global foods
    foods = set(hash.keys())
    
    # TODO: implement wikipedia webscraping for future webscraping use

# done
def isHashInit():
    return isInit

def getOptions():
    print('hi')

def evalFood(text, strlatitude, strlongitude):
    global latlat
    global longlong
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

    for i in alts:
        if hash.get(i) < lowFoot:
            food = i
            lowFoot = hash.get(i)
    
    if lowFoot == curFoot:
        return output
    
    output.append(food) 
    output.append(curFoot - lowFoot)

    # latitude = int(strlatitude)
    # longitude = int(strlongitude)

    zip = getZIP(strlatitude, strlongitude)
    # query = "buy " + food + " near " + zip

    # instaData = instacartData(zip, food)

    # return output
    return output + ["instacart.com", "$3.00"]

def instacartData(zipCode, food):
    query = "buy " + food + " near " + zipCode + " instacart"

    options = webdriver.ChromeOptions()
    # options.add_argument('--headless')
    browser = webdriver.Chrome(options=options)

    browser.get('https://www.google.com/shopping')
    search_box = browser.find_element(By.NAME, 'q')
    search_box.send_keys(query)
    search_box.submit()

    time.sleep(3)

    opts = browser.find_elements(By.XPATH, "//div[@class='sFzvde gVNoLb']")
    print(opts)
    print(len(opts))
    # print(len(opts))
    for option in opts:
        name = option.find_element(By.XPATH, ".//h3").text
        price = option.find_element(By.XPATH, ".//div[@class='W9yFB']/g-price").text
        link = option.find_element(By.XPATH, ".//a").get_attribute("href")
        print(name)
        print(price)
        print(link)
        print("\n")


    time.sleep(2)

instacartData('75012', 'arugula')



def getZIP(latitude, longitude):
    latitude = str(latitude)
    longitude = str(longitude)
    # query = "" + latitude + " N, " + longitude + " E"

    api = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={latitude}&lon={longitude}"
    
    data = requests.get(api)
    data = data.json()
    zip = data["address"].get("postcode", "")
    return zip



# getZIP(str(30.2849), str(97.7341))
    


def findAlts(text):
    output = []
    if text.find(" ") == -1:
        output = singleWordFood(text)
        print(output)
        return output
    else:
        output = multiWordFood(text)
        print(output)
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

    # links = soup.find_all('a')

    # startStore = False
    # store = False

    # sortedLinks = []
    # linkText = ""

    # for link in links:
    #     if startStore:
    #         if store:
    #             if link.get_text().rstrip().lstrip().find(" ") != -1:
    #                 sortedLinks.append(link.get("href"))
    #                 linkText += link.get_text() + " "
    #             else:
    #                 store = False
    #                 linkText += link.get_text()
    #         else:
    #             linkText += link.get_text()
    #     else:
    #         if "Verbatim" in link.get_text():
    #             startStore = True
    #             store = True

    # allText += " " + linkText

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
            # posAlt = posAlt.lstrip()
            # if "Tofu" in posAlt:
            #     break
            # print(posAlt)
            if posAlt != formattedText and hash.get(posAlt) is not None:
                
                if (posAlt not in output):
                    output.append(posAlt)
    return output
    if len(output) != 0:
        return output
    else:
        # TODO: get wikipedia scraping done
        return output






# initializeHashMap()
# output = singleWordFood("beef")
# print(output)
# print(foods)
# print(hash.get("Oat milk"))
# findAlts("olive oil")

def initializeHashMap():
    
    # reading database + converting to hashmap
    df = pd.read_excel('~/Documents/GitHub/Hangry/backend/food_option_names.xlsx')
    global hash
    for index, row in df.iterrows():
        # print(row['Food'])
        hash[(row['Food'].rstrip())] = row['gCO2e']
    
    # setting initialized variable to true for isHashInit()
    global isInit 
    isInit = True

    # creating set of foods for easier scraping later
    global foods
    foods = set(hash.keys())
    
    # TODO: implement wikipedia webscraping for future webscraping use

# done
def isHashInit():
    return isInit

def getOptions():
    print('hi')

def evalFood(text, strlatitude, strlongitude):
    output = []

    # remove spaces from string and convert to lowercase
    text = text.lower()
    text = text.rstrip()
    text = text.lstrip()

    # get alt options 
    alts = findAlts(text)
    print(alts)
    textFormatted = text[0].upper() + text[1:].lower()
    zip = getZIP(strlatitude, strlongitude)
    curFoot = hash.get(textFormatted)

    lowFoot = curFoot

    food = ""

    for i in alts:
        if hash.get(i) < lowFoot:
            food = i
            lowFoot = hash.get(i)
        
    
    if lowFoot == curFoot:
        return output
    
    output.append(food) 
    output.append(curFoot - lowFoot)

    # latitude = int(strlatitude)
    # longitude = int(strlongitude)

    
    # query = "buy " + food + " near " + zip

    print(zip)
    print(food)
    # instaData = instacartData(zip, food)
    instaData = ["instacart.com", "$3.00"]

    output = output + instaData

    return output
    # return ["Arugula", "14", "$10", "google.com"]

def instacartData(zipCode, food):
    query = "buy " + food + " near " + zipCode + " instacart"
    print(query)
    # browser.quit()
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    browser = webdriver.Chrome(options=options)

    browser.get('https://www.google.com/shopping')
    search_box = browser.find_element(By.NAME, 'q')
    search_box.send_keys(query)
    search_box.submit()

    opts = browser.find_elements(By.XPATH, "//a[@href]")
    # print(opts)
    # print(len(opts))
    # print(len(opts))
    ourLink = ""
    for option in opts:
        #name = option.find_element(By.XPATH, "").text
        #price = option.find_element(By.XPATH, "").text
        link = option.get_attribute("href")
        if "instacart" in link and "url?url" in link:
            print(link)
            ourLink = link
            break 
        #print(name)
        #print(price)
    print(ourLink)
    options1 = webdriver.ChromeOptions()
    options1.add_argument('--headless')
    browser1 = webdriver.Chrome(options=options)

    browser1.get(ourLink)
    price = browser1.find_element(By.ID, "regular_price").text
    # search_box = browser.find_element(By.NAME, 'q')
    # search_box.send_keys(query)
    # search_box.submit()

    # time.sleep(3)
    output = [ourLink, price]
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

initializeHashMap()
print(evalFood("beef", str(30.2849), str(-97.7341)))
# print(instacartData("78712", "Lentils"))
# print(getZIP(str(30.2849), str(-97.7341)))
# print(findAlts("beef"))
# print(findAlts("olive oil"))
# print(singleWordFood("beef"))
# print(hash.get('Tempah'))
    


