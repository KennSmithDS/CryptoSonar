from .bsc_request import BSCRequest

class BEP20Events (BSCRequest):

    def get_bep20_transactions(self):

        """
        https://api.bscscan.com/api?module=account&action=tokentx&address=0x7bb89460599dbf32ee3aa50798bbceae2a5f7f6a&startblock=0&endblock=2500000&sort=asc&apikey=YourApiKeyToken
        """

        request_dict = {
            'module': 'account',
            'action': 'tokentx',
            'startblock': 0,
            'endblock': 9999999999,
            'sort': 'desc',
            'address': self.holder_address,
            'apikey': self.api_key
        }
        
        data = BSCRequest.get_bsc_data(BSCRequest.construct_request_string(self.base_url, request_dict))

        if data:
            return {'bep20_transactions': data['result']}

        return None







