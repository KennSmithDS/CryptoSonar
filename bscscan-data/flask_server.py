from bsc_crawlers.holder_crawler import HolderCrawler
from flask import Flask, request, json, abort, jsonify
import os
import numpy as np

app = Flask(__name__)

@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

@app.route('/bsc/lp', methods=['POST'])
def crawl_data():
    if request.method == 'POST':
        post_request = request
        post_data = json.loads(post_request.data)

        if post_data is None:
            abort(404, description="Request does not contain wallet or token information!")

        if 'token' not in post_data.keys():
            abort(404, description="Request is missing required parameter, 'token'")
        
        else:
            token_address = post_data['token']
            crawler = HolderCrawler()
            first_page_holders = crawler.get_token_holders(token_address)
            if not first_page_holders.empty:
                contract_addresses = first_page_holders[first_page_holders['contract']==True]['address'].values
                lp_container = {}
                lp_container['results'] = []
                if len(contract_addresses) > 0:
                    for contract in contract_addresses:
                        lp_holder_df = crawler.get_token_holders(contract)
                        lp_dict = HolderCrawler.get_holder_dict_from_df(lp_holder_df, contract, token_address)
                        lp_container['results'].append(lp_dict)
                else:
                    lp_dict = HolderCrawler.get_holder_dict_from_df(pd.DataFrame(), '', token_address)
                
                return lp_container

            return {}

if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0')
