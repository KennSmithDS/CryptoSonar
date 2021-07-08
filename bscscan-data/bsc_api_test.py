from bsc_api.bnb_balance import BNBBalance
from bsc_api.bep20_balance import BEP20Balance
from bsc_api.bnb_price import BNBPrice
from bsc_api.bep20_circulation import BEP20Circulation
from bsc_api.bep20_supply import BEP20Supply
from bsc_api.bsc_request import BSCRequest
from bsc_api.wallet_txns import WalletTxns
from bsc_api.bep20_events import BEP20Events
import os, time
import pandas as pd

if __name__ == "__main__":

    api_key = os.getenv("BSC_KEY")

    # Testing the BNB price API endpoint
    bnb_price = BNBPrice(api_key=api_key, module='stats', action='bnbprice')
    print(bnb_price.get_last())

    test_addy = '0x7910609cf9dc8584385708fd9308907db9644a3a'
    test_bep20 = '0x9b2411dd7002aef8e27c436ea0f0a75c640361f7'

    # Testing the BEP20 balance API endpoint
    # bep20_bal = BEP20Balance(api_key=api_key, contract_address=test_bep20, holder_address=test_addy)
    # print(bep20_bal.get_bep20_balance())
    
    # Testing the BNB balance API endpoint
    # bnb_bal = BNBBalance(api_key=api_key, holder_address=test_addy)
    # print(bnb_bal.get_bnb_balance())

    # Testing the BEP20 supply API endpoint
    # bep20_sup = BEP20Supply(api_key=api_key, contract_address=test_bep20)
    # print(bep20_sup.get_bep20_supply())

    # Testing the BEP20 circulating supply API endpoint
    # bep20_circ = BEP20Circulation(api_key=api_key, contract_address=test_bep20)
    # print(bep20_circ.get_bep20_cirulation())

    # Testing the Wallet Normal transactions API endpoint
    # wallet_txns = WalletTxns(api_key=api_key, holder_address=test_addy)
    # print(wallet_txns.get_normal_transactions())

    # Testing the BEP20 transactions API endpoint
    bep20_txns = BEP20Events(api_key=api_key, holder_address=test_addy).get_bep20_transactions()
    print(len(bep20_txns['bep20_transactions']))
    for i in range(5):
        print(bep20_txns['bep20_transactions'][i])
    pd.DataFrame(bep20_txns['bep20_transactions']).to_csv(f'./data/{test_addy}_bep20_transactions.csv', index=False)


