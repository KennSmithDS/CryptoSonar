from .bsc_request import BSCRequest

class BEP20Supply (BSCRequest):

    def get_bep20_supply(self):

        """
        https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&apikey=YourApiKeyToken
        """

        request_dict = {
            'module': 'stats',
            'action': 'tokensupply',
            'contractaddress': self.contract_address,
            'apikey': self.api_key
        }
        
        data = BSCRequest.get_bsc_data(BSCRequest.construct_request_string(self.base_url, request_dict))

        if data:
            return {'bep20_supply': data['result']}

        return None