from .bsc_request import BSCRequest

class WalletTxns (BSCRequest):

    def get_normal_transactions(self):

        """
        https://api.bscscan.com/api?module=account&action=txlist&address=0x0000000000000000000000000000000000001004&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken
        """

        request_dict = {
            'module': 'account',
            'action': 'txlist',
            'startblock': 0,
            'endblock': 9999999999,
            'sort': 'asc',
            'address': self.holder_address,
            'apikey': self.api_key
        }
        
        data = BSCRequest.get_bsc_data(BSCRequest.construct_request_string(self.base_url, request_dict))

        if data:
            return {'normal_transactions': data['result']}

        return None

    def get_internal_transactions(self):
        """
        https://api.bscscan.com/api?module=account&action=txlistinternal&address=0x0000000000000000000000000000000000001004&startblock=0&endblock=2702578&sort=asc&apikey=YourApiKeyToken
        """

        request_dict = {
            'module': 'account',
            'action': 'txlistinternal',
            'startblock': 0,
            'endblock': 9999999999,
            'sort': 'asc',
            'address': self.holder_address,
            'apikey': self.api_key
        }
        
        data = BSCRequest.get_bsc_data(BSCRequest.construct_request_string(self.base_url, request_dict))

        if data:
            return {'normal_transactions': data['result']}

        return Nonebut

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