from .bsc_request import BSCRequest

class BNBPrice (BSCRequest):

    def get_last(self):

        request_dict = {
            'module': 'stats', # 'stats
            'action': 'bnbprice', # 'bnbprice'
            'apikey': self.api_key
        }
        
        data = BSCRequest.get_bsc_data(BSCRequest.construct_request_string(self.base_url, request_dict))

        if data:

            if 'ethusd' in data['result'].keys():
                bnb_usd = float(data['result']['ethusd'])
            else:
                bnb_usd = float(0)

            if 'ethbtc' in data['result'].keys():
                bnb_btc = float(data['result']['ethbtc'])
            else:
                bnb_btc = float(0)

            price_dict = {
                'bnbusd': bnb_usd,
                'bnbbtc': bnb_btc
            }

            return price_dict

        return None