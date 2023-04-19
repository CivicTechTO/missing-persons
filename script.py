# ## Missing Persons DB Webscrape
#
# https://www.services.rcmp-grc.gc.ca/missing-disparus/search-recherche.jsf
#
# Search with no criteria will bring up all results.
#
# The links to the missing persons pages, can be appended to https://www.services.rcmp-grc.gc.ca/

# ### Code
# ------

# #### Import packages

import datetime
import glob
import json
import re
import time
from collections import defaultdict
from functools import cache
from itertools import product
from multiprocessing import Pool
from os.path import join
from typing import Optional
from urllib.parse import urljoin

import dateparser
import requests
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from tenacity import (before_sleep_log, retry, stop_after_attempt, wait_fixed,
                      wait_random)
from webdriver_manager.chrome import ChromeDriverManager

setattr(dateparser, "parse", cache(dateparser.parse))

MAX_WEIGHT_DIFFERENCE = 10  # kg
MAX_HEIGHT_DIFFERENCE = 15  # cm
HAIR_SCORE = 0.7
BIO_SCORE = 0.7

start_time = datetime.datetime.now()

# This function takes in a string of <dl> ... </dl> and converts it into a dictionary
def dl_to_dict(dl_str):
    soup = bs(dl_str, "html.parser")
    dl = soup.find("dl")
    if not dl:
        return {}

    data = defaultdict(list)
    k = ""
    for c in dl.contents:
        is_real = (
            bool(str(c).strip()) and len(c.contents) > 0
        )  # real element, not whitespace
        if not is_real:
            continue

        if c.name == "dt":
            k = c.contents[0].strip()
        elif c.name == "dd":
            data[k].append(c.contents[0].strip())

    return dict(data)


# #### link to search results + install selenium if it is not already installed
link = "https://www.services.rcmp-grc.gc.ca/missing-disparus/search-recherche.jsf"
# Get a chrome driver if there isn't one locally
service = Service(ChromeDriverManager().install())
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1920,1080")


# #### loop through all the search result pages and collect the URLs
browser = webdriver.Chrome(service=service, options=chrome_options)
browser.get(link)
time.sleep(2)

# find search and click it to reach data
try:
    search = browser.find_element(By.NAME, "searchForm:j_idt158")
    search.click()
except Exception:
    print("could not find Search")

time.sleep(3)

# to store all the URLs
URLs = set()

# go through each page and get all URLs
while True:
    time.sleep(2)  # wait more just in case
    page = browser.page_source
    pageSoup = bs(page, "html.parser")

    # get all the links on the page and add them to array
    pageURLs = pageSoup.find_all("a", class_="wet-newwindow")

    # take each link on the page and add if not a dupe
    for link in pageURLs:
        new_url = urljoin(
            "https://www.services.rcmp-grc.gc.ca", link.get("href"))
        if new_url not in URLs:
            URLs.add(new_url)

    time.sleep(2)  # wait a little

    # are we on the last page
    try:
        # click the next button at the bottom of the page
        next_page = browser.find_element(By.XPATH, '//a[text()="Next"]')
        print("Found next button to press.")
        next_page.click()
        time.sleep(2)  # wait for next page to load
    except Exception:
        # should not have a next button on the last page
        print("Last page or no next button found!")
        break


browser.quit()
# ## Collect all the data from all the detailed case pages

base_url = r"https://www.services.rcmp-grc.gc.ca"
# #### To Avoid Running the URL Collector Again - Run Code Below


# clean the elements
URLs = [u.strip() for u in URLs if u]


# #### Looping through and scraping the data into a json file
@retry(
    reraise=True,
    wait=wait_fixed(3) + wait_random(0, 3),
    stop=stop_after_attempt(5),
)
def scrape_page(page_url):
    # page dict
    page_dict = {}
    # this is where all the person info will go
    page_sections = []

    to_print = "==============================================\n"
    to_print += f"Case URL: {page_url}\n"

    # request the html
    page = requests.get(page_url, timeout=10)

    # structure the page content for parsing
    soup = bs(page.content, "html.parser")

    # First we have to pull out the content area
    content_area = soup.find("main", {"property": "mainContentOfPage"})

    try:
        # the case reference number
        _case_ref = content_area.find("h1")
        page_dict["CaseRef"] = " ".join(_case_ref.text.split())

        # the main section
        sections = content_area.section

        # the description
        desc = sections.div.p
        page_dict["CaseDesc"] = desc.text.strip()

        # the category
        case_type = sections.h2
        page_dict["CaseType"] = " ".join(case_type.text.split())
    except:
        to_print += "page base info collection error\n"

    page_dict["CaseURL"] = page_url

    # get the first section with all the persons
    persons_section = sections.section

    # how many people are we looking through
    persons_names = persons_section.find_all("h3")
    num_persons = len(persons_names)
    # all the blocks within the section
    persons_blocks = persons_section.find_all("div", {"class": "row"})

    # loop through all the person sections to collect their data
    # assigned to their names
    for i in range(num_persons):
        to_print += f"Person(s) in Case: {i+1}\n"
        block = {}  # stores the individuals info, some pages have 1+
        block["Name"] = " ".join(persons_names[i].text.split())

        # select the current persion
        current_person = persons_blocks[i]

        # dict to save all the individual dl sections
        dl_sections = {}

        # takes all the DL sections out and saves them
        for dl in current_person.find_all("dl"):
            # call the dl formatting function
            dl_sections |= dl_to_dict(str(dl))

        # append the formatted sectins array to the block
        block["InfoSection"] = dl_sections

        # a list to store references to images for each individual
        imageLinks = []
        try:
            for image in current_person.find_all("img"):
                image_src = image["src"]
            # check if this matches the no photo image
            if not re.search("noPhoto\.png", image_src):
                imageLinks.append(
                    "https://www.services.rcmp-grc.gc.ca/missing-disparus/" + image_src
                )
            # add the images section
            # add to the main dict
            block["Images"] = imageLinks
        except Exception:
            print("no images")

        # add the block to the page sections
        page_sections.append(block)
        to_print += f"{block['Name']}\n"

    print(to_print.strip())
    # write the section to the dict
    page_dict["PersonsData"] = page_sections
    # write it all to the main DB
    return (page_dict["CaseRef"], page_dict)


def scrape_database(urls_list: list, iteration: int):
    # loop through all the URLs
    with Pool(10) as p:
        complete_db = dict(p.map(scrape_page, urls_list))

    # fine name to write to
    filename = join("data", f"RCMP_Data_Part_{iteration:03d}.json")

    # write JSON to a file
    with open(filename, "w") as outfile:
        json.dump(complete_db, outfile, indent=2)

    print(
        f"======================= Done Part {iteration} =======================")


# number of cases in each subfile
page_size = 100

# for testing

# split the list into smaller parts
paginated_list = [URLs[i: i + page_size]
                  for i in range(0, len(URLs), page_size)]

# loop through the divided list and output files
for count, list_section in enumerate(paginated_list):
    scrape_database(list_section, count)


# get all the json files in the folder
json_files = list(sorted(glob.glob(join("data", "RCMP*.json"))))

# create a dict to store data
main_cases = []

for file in json_files:
    with open(file) as f:
        data = json.load(f)
        main_cases.extend(data.values())


unique_attributes = set()

for row in main_cases:
    for person in row["PersonsData"]:
        unique_attributes.update(list(person["InfoSection"].keys()))


# The data comes in as a list of cases with multiple people per case
# This method will convert the cases to a list of people with a unique key for each person as the index
# Use a list of people to do logic with, and then convert back to cases for the front end
def flatten_cases_to_people(cases):
    people = {}

    for case in cases:
        case_without_persons = case.copy()
        case_without_persons.pop("PersonsData")

        for person in case["PersonsData"]:
            key = case["CaseRef"] + "%%" + person["Name"]

            people[key] = (
                person["InfoSection"]
                | {"Images": person["Images"]}
                | case_without_persons
            )
            people[key]["Name"] = person["Name"]

    return people


persons_data = flatten_cases_to_people(main_cases)

missing_persons = [
    persons_data[p] | {"PersonID": p}
    for p in persons_data
    if persons_data[p]["CaseType"] == "Missing"
]
unidentified_remains = [
    persons_data[p]
    for p in persons_data
    if persons_data[p]["CaseType"] == "Unidentified"
]


def format_age_range(raw_age_range_string):
    result = re.search(r"(\d+)[^\d]+?(\d+)", raw_age_range_string, re.M)

    if result is None or len(result.groups()) != 2:
        return None

    g = list(result.groups())
    return [int(g[0]), int(g[1])]


def format_weight(raw_weight_string):
    result = re.search(r"(\d+)kg", raw_weight_string, re.M)

    if result is None or len(result.groups()) != 1:
        return None

    return int(result.groups()[0])


# Missing people have a percise height, unidentified remains have a range or a percise height
def format_height(raw_height_string):
    result = re.search(r"(\d+)cm", raw_height_string, re.M)

    if result is None or len(result.groups()) != 1:
        return None

    return int(result.groups()[0])


def format_height_range(raw_height_string):
    result = re.search(r"(\d+)cm.* (\d+)cm", raw_height_string, re.M)

    if result is None or len(result.groups()) != 2:
        return None

    g = list(result.groups())
    return [int(g[0]), int(g[1])]


def was_found_after_reported(unidentified, missing) -> bool:
    unidentified_found = dateparser.parse(unidentified["Discovered on"][0])
    missing_missing = dateparser.parse(missing["Missing since"][0])

    return unidentified_found > missing_missing


def potential_gender_match(unidentified, missing) -> bool:
    try:
        unidentified_gender = unidentified["Gender"][0]
        missing_gender = missing["Gender"][0]

        if unidentified_gender == missing_gender:
            return True
        elif unidentified_gender.lower() not in [
            "male",
            "female",
        ] or missing_gender.lower() not in ["male", "female"]:
            return True
    except Exception:
        return True

    return False


def age_approximately_as_expected(u, m) -> bool:
    unidentified_age_est = format_age_range(u["Est. age"][0])

    if unidentified_age_est is None:
        return False

    # tweak the range to be a bit more generous
    unidentified_age_est = [
        unidentified_age_est[0] * 0.8,
        unidentified_age_est[1] * 1.2,
    ]

    # this range goes from the youngest possible age, the age at disappearance,
    # to the oldest, which is how old they'd be when the unidentified remains
    # were found
    missing_age_range = (
        int(m["Age at disappearance"][0]),
        (
            dateparser.parse(u["Discovered on"][0])
            - dateparser.parse(m["Year of birth"][0])
        ).days
        / 365,
    )

    # return if there's overlap between the two ranges
    return (
        unidentified_age_est[1] > missing_age_range[0]
        and unidentified_age_est[0] < missing_age_range[1]
    )


def weight_approximately_as_expected(u, m) -> Optional[float]:

    # ignore if no weight value
    if not ("Weight" in u and "Weight" in m):
        return 0.0

    u_weight = format_weight(u["Weight"])
    m_weight = format_weight(m["Weight"])

    # ignore if somehow improperly formatted
    if u_weight is None or m_weight is None:
        return 0.0

    weight_closeness = abs(u_weight - m_weight)

    if weight_closeness > MAX_WEIGHT_DIFFERENCE:
        return None

    return 1 - (weight_closeness / MAX_WEIGHT_DIFFERENCE)


# TODO: change weight range as a function of time. e.g. if they have been
# missing for 2 days, use tight range if missing for years have a more generous
# range
def height_approximately_as_expected(u, m) -> Optional[float]:
    # ignore if no weight value
    if not ("Height" in u and "Height" in m):
        return 0.0

    m_height = format_height(m["Weight"])
    u_height = format_height_range(u["Weight"])

    if u_height is None:
        u_height = format_height(u["Weight"])
    else:
        # make sure height is not a range
        u_height = (u_height[0] + u_height[1]) / 2

    # ignore if can't parse
    if m_height is None or u_height is None:
        return 0.0

    # number of cm difference
    height_closeness = abs(u_height - m_height)

    if height_closeness > MAX_HEIGHT_DIFFERENCE:
        return None

    return 1 - (height_closeness / MAX_HEIGHT_DIFFERENCE)


# naive check to see if either both or neither have a "Tattoo" key
def tattoo_matching(u, m) -> bool:
    return ("Tattoo" in u) == ("Tattoo" in m)


def potential_hair_match(unidentified, missing) -> Optional[float]:
    try:
        unidentified_hair = unidentified["Hair"][0].lower()
        missing_hair = missing["Hair"][0].lower()

        if unidentified_hair == missing_hair:
            return HAIR_SCORE
    except Exception:
        # if we can't pull any hair data from either it stays a potential match
        return 0.0

    return None


def potential_bio_group_match(unidentified, missing) -> Optional[float]:
    try:
        unidentified_bio_group = unidentified["Bio group"][0].lower()
        missing_bio_group = missing["Bio group"][0].lower()

        if unidentified_bio_group == missing_bio_group:
            return BIO_SCORE
    except Exception:
        return BIO_SCORE

    return None


potential_matches_complete_objects: list = []

comparison_functions = [
    was_found_after_reported,
    potential_gender_match,
    age_approximately_as_expected,
    potential_hair_match,
    tattoo_matching,
    potential_bio_group_match,
    weight_approximately_as_expected,
    height_approximately_as_expected,
]


def get_match_score(unidentified, missing) -> Optional[float]:
    match_score = 0.0
    for f in comparison_functions:
        try:
            comparison_score = f(unidentified, missing)
            if comparison_score is None or comparison_score is False:
                return None
            else:
                match_score += comparison_score
        except Exception:
            return None

    return match_score


potential_matches = 0
export_unidentified = {
    u["CaseRef"]: u | {"MatchedRemains": []} for u in unidentified_remains
}
export_missing = {
    mp["PersonID"]: mp | {"MatchedUnidentified": []} for mp in missing_persons
}

for unidentified, missing in product(unidentified_remains, missing_persons):
    # do comparisons of missing and unidentified using all known comparison functions
    # If it's a possible match, append to the list of potential matches
    match_score = get_match_score(unidentified, missing)
    if match_score is not None:
        potential_matches += 1
        export_unidentified[unidentified["CaseRef"]]["MatchedRemains"].append(
            missing["PersonID"]
        )
        export_missing[missing["PersonID"]]["MatchedUnidentified"].append(
            unidentified["CaseRef"]
        )

possible_total_matches = len(unidentified_remains) * len(missing_persons)
print(
    f"Reduced to {potential_matches} out of a possible {possible_total_matches} matches ({int(100*potential_matches/possible_total_matches)}%)"
)

meta = {
    "updated_at": datetime.datetime.now().isoformat(),
    "time_running": str(datetime.datetime.now() - start_time)
}

with open("missing-persons-viewer-vite/src/shared/data/meta.json", "w") as f:
    json.dump(meta, f, indent=4)

with open("missing-persons-viewer-vite/src/shared/data/missing_persons.json", "w") as f:
    json.dump(export_missing, f, indent=4)

with open("missing-persons-viewer-vite/src/shared/data/unidentified_persons.json", "w") as f:
    json.dump(export_unidentified, f, indent=4)
