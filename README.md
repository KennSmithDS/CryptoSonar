# CryptoSonar
## Team Members: 
* Joffrey Inocencio
* Kendall Smith

## Webpage:
* Front-end Application
https://crypto-sonar-ui.herokuapp.com/

* Back-end GraphQL IDE
https://crypto-sonar-api.herokuapp.com/graphql

## About:
This project was started with starter code from `react-create-app`.
Note: Browser preferance for GoogleChrome 

## Contributes made by Joffrey:
### iter 1
* Front-end Development
  * Containerizing initial page design skeleton
  * Implementing Third-Party Libaries
    * React-Bootstrap
  * Nav Panel
    * Account Settings Modal
  * Tracked Wallets Pannel
    * Modal for Add wallet form
    * Display tracked wallets
    * Rerender newly added wallet onto the walletList
* Connecting Front-end to Back-end with API calls
  * Fetch tracked wallets from graphql server
  * Add wallet form  
* Deploying Front-end to Heroku
  * Added `"serve": "^12.0.0"` dependancy necessary for deployment to Heroku
![HerokuDeployed](./images/iter1_heroku.PNG)
![addWalletModal](./images/iter1_addWallet.PNG)

### iter 2
* User features:
  * Implemented Signin page and create account modal
  * Connected Signout functionality 
  * Connected Delete wallet functionality
  * User credentials are persisted during browser refresh
* Software Development changes:
  * Passed UserId from signin down to layout and accross child components
  * Replaced fetch/query calls with gql/apollo-client
  * Debugged rerendering issues in the tracked wallets pannel
    * addWallet child component updates sibling component listWallets by trigerring an update to the Wallet pannel parent state  


## Contributes made by Kendall:
* Back-end Development
  * Deployed MongoDB database to Atlas cluster
  * Designed GraphQL Schema
    * User type
    * Wallet type
    * Query types
    * Mutation types
  * Built query definitions for API requests
    * Add and remove user mutations
    * Add and remove wallet mutations
    * Query all wallets by associated userId
  * Setup Express server to host GraphQL API
  * Created scripts for database initialization (either local or deployed)
    * Drop all documents from database collections
    * Populate mock documents/data into the database
* Data Retrieval Development
  * Bitquery.io API script for token to USD conversion
  * Bscscan.com Api script for list of tokens held by wallet
* Deploying Back-end to Heroku
  * Added `"express-graphql": "^0.12.0"` dependency for stream-lining deployment of GraphQL API
  * Added `"mongoose": "^5.13.5"` dependency for simplicity in creating GraphQL schema and models

![MongoDBAtlasDeployed](./images/iter1_mongodb_deployment.png)
![DatabaseInitialization](./images/iter1_mongodb_initialization.png)
![GraphQLApi](./images/iter1_graphql.png)