from .bsc_request import BSCRequest

class BNBBalance (BSCRequest):

    def get_bnb_balance(self):

        request_dict = {
            'module': 'account',
            'action': 'balance',
            'tag': 'latest',    
            'address': self.holder_address,
            'apikey': self.api_key
        }
        
        data = BSCRequest.get_bsc_data(BSCRequest.construct_request_string(self.base_url, request_dict))

        if data:
            return {'bnb_balance': data['result']}

        return None