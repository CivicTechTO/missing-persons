import csv
from bs4 import BeautifulSoup
import requests

#this is the list where all the URLs from the sheet will go
person_url_list = []
#this is where all the person info will go
person_info = []
#I have this because I dont know how else to filter out stuff from an if statement that I dont want
count_working = 0
#a list for the sections later
section_list = []
#CLEANING FUNCTION
def cleaning_function(item):
    item = str(item)
    item = item.replace("<dd>" , "")
    item = item.replace("</dd>" , "")
    item = item.replace("<p>" , "")
    item = item.replace("</p>" , "")
    item = item.replace("<strong>Missing from </strong>" , "")
    item = item.replace("<strong>" , "")
    item = item.replace("</strong>" , "")
    return item

'''
page = requests.get('https://www.services.rcmp-grc.gc.ca/missing-disparus/case-dossier.jsf?case=2019019954&id=0')
soup = BeautifulSoup(page.content, 'html.parser')

#First we have to pull out the content area
content_area = soup.find('main' , {"property" : "mainContentOfPage"})

'''

#Open the CSV, start pulling info out of the links
with open('URLs.csv') as csv_file:
    person_file = csv.reader(csv_file)
    for link in person_file:
        print(count_working)
        count_working += 1
        '''
        #For testing 
        if count_working == 4:
            break
        '''
        link = str(link)
        link = link.replace("[" , "")
        link = link.replace("]" , "")
        link = link.replace("'" , "")
        #Using beautifulsoup to open links
        try:
            page = requests.get(link, timeout = 10)
        except requests.exceptions.Timeout:
            print("Timeout occurred")
        soup = BeautifulSoup(page.content, 'html.parser')

#First we have to pull out the content area
        content_area = soup.find('main' , {"property" : "mainContentOfPage"})

#LOCATION
        try:
            location_scrape = content_area.find('div')
            location_isolate = location_scrape.find_all('p')
            location_string = str(location_isolate[2])
            location_split = location_string.split(",")
            province = cleaning_function(location_split[1])
            city = cleaning_function(location_split[0])
        except:
            print('No Location')

#STATUS
        status_scrape = content_area.find_all('h2')
        status = status_scrape[:1]
        status = str(status)
        front_of_status = status.index('<h2>') + 4
        back_of_status = status.index('</h2>')
        status_cleaned = (f'{status[front_of_status : back_of_status]}')
        
#FOR THE MISSING ENTRIES
        if 'Missing' in status_cleaned:

#Now we get into pulling out individual details which will eventually be compiled in a list
#NAME(MISSING)
            name_scrape = content_area.find_all('h3')
            person_name = name_scrape[:1]
            person_name = str(person_name)
            front_of_name = person_name.index('<h3>') + 4
            back_of_name = person_name.index('</h3>')
            name_cleaned = (f'{person_name[front_of_name : back_of_name]}')
            name_split = name_cleaned.split(',')
            last_name = name_split[0]
            first_name = name_split[1]
            first_name_string = str(name_split[1:2])
            first_name_string = first_name_string.replace('[',"")
            first_name_string = first_name_string.replace(']',"")
            first_name_string = first_name_string.replace("'","")
            first_name_string = first_name_string.replace("\n","")
            first_name_string = first_name_string.strip()


#PERSON DETAILS(MISSING)
            try:
                person_details = content_area.find_all('dd')
                date_missing_discovered = person_details[0]
                year_born = person_details[1]
                age_at_disappearance = person_details[2]
                gender = person_details[3]
                bio_group = person_details[4]
            except:
                print('Data error')

#FOR THE UNIDENTIFIED ENTRIES
        else:
            try:
                first_name_string = 'Unidentified'
                last_name = 'Unidentified'
                person_details = content_area.find_all('dd')
                date_missing_discovered = person_details[0]
                age_at_disappearance = person_details[1]
                gender = person_details[2]
                bio_group = person_details[3]
                year_born = 'Unknown'
            except:
                print('Data error2')

#PUT IT ALL TOGETHER
        person_info.append([first_name_string , last_name , status_cleaned , cleaning_function(date_missing_discovered) , cleaning_function(year_born) , cleaning_function(age_at_disappearance) , cleaning_function(gender) , cleaning_function(bio_group) , city , province , link])


#TURN IT INTO A CSV VIA PANDAS
import pandas
pd = pandas.DataFrame(person_info)
pd.to_csv("output_rcmp.csv")
print('Done')
