import requests, os, json, random, traceback, sys
from pandas.io.html import read_html
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait       
from selenium.webdriver.common.by import By       
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time, re, sys
import pandas as pd
import numpy as np

class HolderCrawler():

    # def __init__(self, token):
    #     self.token = token.lower()

    def get_address_from_link(self, col):
        href_tag = col.find('a')['href']
        _, address = href_tag.split('?')
        address = address.replace('a=','')
        return address

    def get_chrome_driver(self):
        options = Options()
        options.add_argument('headless')
        options.add_argument('ignore-certificate-errors')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-gpu')
        # options.binary_location = '/usr/bin/chromium-browser'
        # options.add_argument('--disable-dev-shm-usage')
        # chrome_prefs = {}
        # chrome_prefs["profile.default_content_settings"] = {"images": 2}
        # options.experimental_options["prefs"] = chrome_prefs
        driver = webdriver.Chrome(options=options)
        driver.set_page_load_timeout(120)
        driver.set_script_timeout(120)
        return driver

    def get_token_holders(self, address):
 
        try:
            # Instantiate chrome driver and fetch page
            driver = self.get_chrome_driver()
            holder_url = f'https://bscscan.com/token/{address}'
            print(f'Token/contract URL is: {holder_url}')
            driver.get(holder_url)

            # Find the Holders tab link, wait and click
            # time.sleep(random.random()+.5)
            # holder_link = driver.find_element_by_link_text('Holders')
            # print(f'Fetching holders from: {holder_link}')
            # holder_link.click()
            WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, "//*[@id='ContentPlaceHolder1_tabHolders']"))).click()

            # Find token holder iframe and search for data table
            time.sleep(random.random()+.5)
            driver.switch_to.frame(driver.find_element_by_id("tokeholdersiframe"))
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            tables = soup.find_all('table')

            if tables:
                print('Found table object to crawl')
                # Find the tbody elementS
                t_body = tables[0].find('tbody')
                holder_rows = []

                if t_body:
                    # Find all rows in the table body
                    rows = t_body.find_all('tr')

                    # Iterate over each row found in table
                    for row in rows:
                        row_cols = [] # container for all columns in a row
                        col_count = 0
                        # find all columns in the row
                        cols = row.find_all('td')

                        for col in cols:

                            # Search for Contract value in attribute for address
                            contract_flag = col.find(attrs={"data-original-title": "Contract"})
                            if col_count == 1: # check if in second column
                                if contract_flag: # if Contract attribute found
                                    row_cols.append(True)
                                    row_cols.append(self.get_address_from_link(col))
                                else:
                                    row_cols.append(False)
                                    wallet = col.text
                                    if wallet.__contains__('Hot Wallet'):
                                        row_cols.append(self.get_address_from_link(col))
                                    else:
                                        row_cols.append(wallet)

                            # append all columns but last
                            if col_count != 1 and col_count < 4:
                                row_cols.append(col.text)

                            col_count += 1
                        
                        holder_rows.append(row_cols)

                # If data from table is empty
                if len(holder_rows[0]) < 5:
                    print("Error in retrieving holder table data from Bscscan")
                    driver.close()
                    return pd.DataFrame({})

                driver.close()
                return HolderCrawler.build_df_from_rows(holder_rows)

            else:
                print("Error in retrieving holder table data from Bscscan")
                driver.close()
                return pd.DataFrame({})

        except Exception as e:
            print(f"Unexpected error in retrieving holder table data from Bscscan")
            traceback.print_exc(file=sys.stdout)
            driver.close()
            return pd.DataFrame({})

    @staticmethod
    def build_df_from_rows(rows):
        # build a dataframe object and clean up quantity and percent columns, write to CSV file
        col_names = ['rank','contract','address','quantity','percent']
        holder_df = pd.DataFrame(rows, columns=col_names)
        holder_df['quantity'] = holder_df['quantity'].apply(lambda x: float(x.replace(',','')))
        holder_df['percent'] = holder_df['percent'].apply(lambda x: float(x.replace('%',''))/100.0)
        return holder_df

    @staticmethod
    def get_holder_dict_from_df(df, contract, token):
        holder_dict = {}
        holder_dict['token'] = token
        holder_dict['contract'] = contract
        holder_dict['data'] = df.to_dict('records')
        return holder_dict

if __name__ == "__main__":

    test_token = "0xf754432466e237154a00584eb4864ef59e9bcaa9"
    crawler = HolderCrawler()

    # initial holder pool for token
    holder_df = crawler.get_token_holders(test_token)

    if not holder_df.empty:
        print(holder_df.head(10))

        contract_addresses = holder_df[holder_df['contract']==True]['address'].values

        if len(contract_addresses) > 0:

            for contract in contract_addresses:
                lp_holder_df = crawler.get_token_holders(contract)
                lp_dict = HolderCrawler.get_holder_dict_from_df(lp_holder_df, contract, test_token)

        else:
            lp_dict = HolderCrawler.get_holder_dict_from_df(pd.DataFrame(), '', test_token)

        print(lp_dict)

    else:
        sys.exit(1)