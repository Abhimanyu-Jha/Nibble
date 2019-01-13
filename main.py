import sys
import json

import requests
from contextlib import closing

from selenium.webdriver import Chrome
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup

def get_zomato_menu(restaurant, location):
 restaurant = "+".join(restaurant.split()) + "+"
 location = "+".join(location.split()) + "+"
 urlLink = "https://www.google.com/search?q=" + restaurant + location + "zomato order"
 google = requests.get(urlLink).text
 gSoup = BeautifulSoup(google, 'lxml')
 data = gSoup.find("h3", class_="r").a["href"]
 start = data.find("https")
 end = data.find("&",start)

 imgUrl = data[start:end]

 with closing(Chrome()) as browser:
  browser.get(imgUrl)
  # wait for the page to load
  WebDriverWait(browser, timeout=100).until(
      lambda x: x.find_elements_by_xpath("//*[contains(text(), 'Write a Review')]"))
  # store it to string variable
  page_source = browser.page_source
 soup=BeautifulSoup(str(page_source.encode('utf-8')),features="html.parser")
 imgLink = str(soup.find('div',id ='progressive_image')['data-url'])

 url = imgUrl + "/order"
 menu={}
 # use chrome to get page with javascript generated content
 with closing(Chrome()) as browser:
  browser.get(url)
  # wait for the page to load
  WebDriverWait(browser, timeout=100).until(
   lambda x: x.find_elements_by_xpath("//*[contains(text(), 'Bestsellers')]"))
  # store it to string variable
  page_source = browser.page_source
 soup=BeautifulSoup(str(page_source.encode('utf-8')),features="html.parser")
 for menu_tag in soup.find_all('div',class_='header'):
  item=menu_tag.text;
  parent_tag=menu_tag.parent

  parent_tag_str=str(parent_tag)

  dis_price=parent_tag_str.find('react-text')
  menu[item]=['']
  if dis_price!=-1:
   dis_price_text_si=parent_tag_str.find('-->',dis_price)

   text=parent_tag_str[dis_price_text_si+3:parent_tag_str.find('<!--',dis_price_text_si)]

   menu[item].append(float(text[text.rfind('\\')+4:]))
  else:
   text=parent_tag.find('span').text
   menu[item].append(float(text[text.rfind('\\')+4:]))

 return menu,url,imgLink

def searchSwiggy(restaurant, location):
    restaurant = "+".join(restaurant.split()) + "+"
    location = "+".join(location.split()) + "+"
    url = "https://www.google.com/search?q=" + restaurant + location + "swiggy"
    google = requests.get(url).text
    gSoup = BeautifulSoup(google, 'lxml')
    data = gSoup.find("h3", class_="r").a["href"]
    start = data.find("https")
    end = data.find("&",start)

    restaurantLink = data[start:end]

    restaurant = requests.get(restaurantLink).text

    soup = BeautifulSoup(restaurant,'lxml')
    items = soup.find_all("div", class_="_19GqV")

    menu={}
    for x in items:
        item = x.find("div",class_="jTy8b").text

        try:
            description = x.find("div",class_="_2aOqz _1xb2E").text

        except:
            description = ''

        temp = str(x.find("div",class_="_12lpv MwITc"))
        try:
            price = temp[temp.index(">",temp.index('"bQEAj"'))+1:temp.index("<",temp.index('"bQEAj"'))]
        except:
            price = temp[temp.index(">",temp.index("_22I-3 bQEAj grcH5"))+1:temp.index("<",temp.index("_22I-3 bQEAj grcH5"))]

        menu[item] = [description,price]

    return menu,restaurantLink


def funcMerger(restaurant,location):
 swiggyData,swiggyLink = searchSwiggy(restaurant,location)
 zomatoData,zomatoLink,imgLink = get_zomato_menu(restaurant,location)
 menu={}
 for item in swiggyData:
  try:
   menu[item] = [swiggyData[item][0].replace("'","\'"),[float(swiggyData[item][-1]),zomatoData[item][-1]]]
  except:
   menu[item] = [swiggyData[item][0].replace("'","\'"),[float(swiggyData[item][-1]),"NA"]]


 return json.dumps({'restaurant_name':restaurant.replace("'","\'"),'location':location.replace("'","\'"),'menu':menu,'links':[swiggyLink.replace("'","\'"),zomatoLink.replace("'","\'")],'img':imgLink.replace("'","\'")})

# f=open("temp.json",'w')
# f.write(funcMerger(sys.argv[1],sys.argv[2]))
# f.close()
print(funcMerger(sys.argv[1],sys.argv[2]))