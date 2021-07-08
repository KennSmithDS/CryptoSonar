import requests, os, json
from pandas.io.html import read_html
from selenium import webdriver
from bs4 import BeautifulSoup
import time, re, sys
import pandas as pd
import numpy as np

class WalletCrawler():

    def __init__(self, wallet):
        self.wallet = wallet.lower()

    def get_token_from_link(self, col):
        href_tag = col.find('a')['href']
        token, wallet = href_tag.split('?')
        # address = address.replace('a=','')
        return token

    def get_bep20_transactions(self):
 
        try:
            driver = webdriver.Firefox()
            wallet_url = f'https://bscscan.com/address/{self.wallet}#tokentxns'
            print(f'Wallet URL is: {wallet_url}')
            driver.get(wallet_url)

            # holder_link = driver.find_element_by_link_text('Holders')
            # print(f'Fetching holders from: {holder_link}')
            time.sleep(1)
            # holder_link.click()

            # driver.switch_to.frame(driver.find_element_by_id("tokeholdersiframe"))
            # time.sleep(.5)
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            tables = soup.find_all('table')
            print(type(tables))
            print(len(tables))

            txn_rows = []

            if tables:
                t_body = tables[0].find('tbody')

                if t_body:
                    # find all rows in the table body
                    rows = t_body.find_all('tr')

            #         # iterate over each row found in table
                    for row in rows:
                        row_cols = [] # container for all columns in a row
                        col_count = 0
                        # find all columns in the row
                        cols = row.find_all('td')

                        for col in cols:

                            # skip the first column which has no information
                            if col_count == 0:
                                col_count += 1
                                continue

                            elif col_count == 7:
                                

                            row_cols.append(col.text)


            #                 # search for Contract value in attribute for address
            #                 contract_flag = col.find(attrs={"data-original-title": "Contract"})
            #                 if col_count == 1: # check if in second column
            #                     if contract_flag: # if Contract attribute found
            #                         row_cols.append(True)
            #                         row_cols.append(self.get_address_from_link(col))
            #                     else:
            #                         row_cols.append(False)
            #                         wallet = col.text
            #                         if wallet.__contains__('Hot Wallet'):
            #                             row_cols.append(self.get_address_from_link(col))
            #                         else:
            #                             row_cols.append(wallet)

            #                 # append all columns but last
            #                 if col_count != 1 and col_count < 4:
            #                     row_cols.append(col.text)

            #                 col_count += 1
                        
                        txn_rows.append(row_cols)

            #     if len(txn_rows[0]) < 5:
            #         print("Error in retrieving transaction table data from Bscscan")
            #         driver.close()
            #         return pd.DataFrame({})

                driver.close()

                # return self.build_df_from_rows(txn_rows)
                return txn_rows

            # else:
            #     print("Error in retrieving transaction table data from Bscscan")
            #     driver.close()
            #     return pd.DataFrame({})

        except Exception as e:
            print(f"Unexpected error in retrieving transaction table data from Bscscan, \n{e}")
            driver.close()
            return pd.DataFrame({})

    def build_df_from_rows(self, rows):
        # build a dataframe object and clean up quantity and percent columns, write to CSV file
        col_names = ['hash', 'block', 'date', 'age', 'from', 'direction', 'to', 'quantity', 'token']
        holder_df = pd.DataFrame(rows, columns=col_names)
        holder_df['quantity'] = holder_df['quantity'].apply(lambda x: float(x.replace(',','')))
        holder_df['percent'] = holder_df['percent'].apply(lambda x: float(x.replace('%',''))/100.0)
        # holder_df.to_csv(f'/data/{self.token}_holders.csv', index=False)
        return holder_df

def get_dict_from_df(df, token):
    holder_dict = {}
    holder_dict['token'] = token
    holder_dict['data'] = df.to_dict('records')
    return holder_dict

if __name__ == "__main__":

    test_addy = "0x7910609cf9dc8584385708fd9308907db9644a3a"
    crawler = WalletCrawler(test_addy)

    # initial holder pool for token
    txn_df = crawler.get_bep20_transactions()
    print(txn_df)

    # if not txn_df.empty:
    #     print(txn_df.head(10))
    # else:
    #     sys.exit(1)


