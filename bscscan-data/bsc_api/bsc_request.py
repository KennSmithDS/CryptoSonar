import requests, os, json, sys, traceback
from typing import List, Dict

class BSCRequest:
    def __init__(self, api_key: str, module: str=None, action: str=None, tag: str=None, \
        holder_address: str=None, contract_address: str=None, transaction_address: str=None):

        if api_key and len(api_key) > 0:
            self.api_key = api_key
            self.base_url = 'https://api.bscscan.com/api?'
            self.module = module
            self.action = action
            self.tag = tag
            self.holder_address = holder_address
            self.contract_address = contract_address
            self.transaction_address = transaction_address
        else:
            print('Invalid API key provided, please try another address')

    @staticmethod
    def get_bsc_data(request_string: str) -> dict:
        try:
            # print(request_string)
            bsc_response = requests.get(request_string)
            if bsc_response.status_code == 200:
                return json.loads(bsc_response.text)
            else:
                print(f'Received error status code {bsc_response.status_code} from Bscscan API service')
        except Exception:
            print("Exception in user code:")
            print("-"*60)
            traceback.print_exc(file=sys.stdout)
            print("-"*60)

    @staticmethod
    def construct_request_string(base_url: str, param_list: Dict[str, str]) -> str:
        try:
            param_count = 0
            request_string = base_url
            for key, value in param_list.items():
                if param_count == 0:
                    request_string += key + '=' + str(value)
                else:
                    request_string += '&' + key + '=' + str(value)
                param_count += 1
            assert len(request_string) != 0
            return request_string
        except Exception:
            print("Exception in user code:")
            print("-"*60)
            traceback.print_exc(file=sys.stdout)
            print("-"*60)