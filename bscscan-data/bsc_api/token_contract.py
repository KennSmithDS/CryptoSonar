from .bsc_request import BSCRequest

class TokenContract(BSCRequest):

    """
    https://api.bscscan.com/api?module=contract&action=getsourcecode&address=0x0000000000000000000000000000000000001004&apikey=YourApiKeyToken 
    """

    def get_contract_code(self):

        request_dict = {
            'module': 'contract',
            'action': 'getsourcecode',
            'address': self.contract_address,
            'apikey': self.api_key
        }
        
        data = BSCRequest.get_bsc_data(BSCRequest.construct_request_string(self.base_url, request_dict))

        if data:
            return {'bnb_balance': data['result']}

        return None


