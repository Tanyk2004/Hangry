import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk import pos_tag
from bs4 import BeautifulSoup
import requests

hash = {}
foods = set()
isInit = False

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

def evalFood(text):
    # remove spaces from string and convert to lowercase
    text = text.lower()
    text = text.rstrip()
    text = text.lstrip()

    # get alt options 
    alts = findAlts(text)


    print('hi')

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
        print('hi')



def singleWordFood(text):
    output = []
    
    # scrape google results
    query = "sustainable alternatives to " + text
    search = f"https://www.google.com/search?q=" + query
    results = requests.get(search)

    # get all text from site
    soup = BeautifulSoup(results.content, "html.parser")
    allText = "".join([tag.text for tag in soup.find_all()])
    # print(allText)

    links = soup.find_all('a')

    startStore = False
    store = False

    sortedLinks = []
    linkText = ""

    for link in links:
        # allTitles += link.get_text()
        # allTitles += " "
        if startStore:
            if store:
                if link.get_text().rstrip().lstrip().find(" ") != -1:
                    sortedLinks.append(link.get("href"))
                    linkText += link.get_text() + " "
                else:
                    store = False
                    linkText += link.get_text()
            else:
                linkText += link.get_text()
        else:
            if "Verbatim" in link.get_text():
                startStore = True
                store = True

    # print(allText)
    allText += " " + linkText

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
            posAlt = " ".join(word for word, posAlt in chunk.leaves())
            posAlt = posAlt[0].upper() + posAlt[1:].lower()
            posAlt = posAlt.rstrip()
            posAlt = posAlt.lstrip()
            

            if posAlt != formattedText and hash.get(posAlt) is not None:
                if (posAlt not in output):
                    output.append(posAlt)
                # print(posAlt)
    if len(output) != 0:
        return output
    else:
        # TODO: get wikipediaa scraping done
        return output






initializeHashMap()
output = singleWordFood("beef")
print(output)
# print(foods)
# print(hash.get("Oat milk"))
# findAlts("olive oil")

    