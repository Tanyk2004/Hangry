import pandas as pd
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
import time 
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# set up website driver
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
# options.add_argument('--headless')
driver = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver", chrome_options=options)

# get website
driver.get("https://myemissions.green/food-carbon-footprint-calculator/")

# type in 100 g constant
elementEnter = driver.find_element(By.ID, 'unit_quantity0')
elementEnter.send_keys('100')

# time.sleep(10)

try:
    banner = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'cmplz-cookiebanner')))
    driver.execute_script("arguments[0].style.display='none'", banner)
except:
    pass

drop=Select(driver.find_element(By.ID, 'ingredients-list0'))
button = driver.find_element(By.ID, 'submit-button')

df = pd.read_excel('~/Documents/GitHub/Hangry/backend/venv/food_option_names.xlsx')
# print(df)
output = []
df = df.reset_index()

for index, row in df.iterrows():
    try:
        drop.select_by_visible_text(row['Food'])
        button.click()
        time.sleep(1)
        elem = driver.find_element(By.XPATH, '/html/body/div[3]/main/div/div/div/section[2]/div/div/div/div/div/div/div/div[1]/div/div[4]/div[1]/div/div[2]/div/div[2]/div[1]/h1')
        output.append(elem.text)
    except:
        output.append(" ")
        pass
ndf = pd.DataFrame(output).T
ndf.to_excel(excel_writer = "~/Documents/Github/Hangry/backend/venv/carbon_footprints.xlsx")
