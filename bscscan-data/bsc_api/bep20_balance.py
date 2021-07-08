from .bsc_request import BSCRequest

class BEP20Balance (BSCRequest):

    def get_bep20_balance(self):

        """
        https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&address=0x89e73303049ee32919903c09e8de5629b84f59eb&tag=latest&apikey=YourApiKeyToken
        0x7910609cF9DC8584385708fD9308907DB9644A3A
        """

        request_dict = {
            'module': 'account',
            'action': 'tokenbalance',
            'tag': 'latest',
            'contractaddress': self.contract_address,
            'address': self.holder_address,
            'apikey': self.api_key
        }
        
        data = BSCRequest.get_bsc_data(BSCRequest.construct_request_string(self.base_url, request_dict))

        if data:
            return {'bep20_balance': data['result']}

        return None