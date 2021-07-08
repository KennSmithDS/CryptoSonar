import requests, json
payload = {'token': '0x19b60612f9a93359bca835a788a334d4157e675b'}
url = 'http://172.17.0.2:5000/bsc/lp'
# url = 'http://0.0.0.0:5000/bsc/lp'
post_response = requests.post(url, json=payload)
print(post_response.json())