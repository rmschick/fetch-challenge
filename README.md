# fetchBackendExercise

Ryan Schick
03 November 2021

Fetch Rewards, Backend Apprenticeship. 

Language: Javascript 
Utilize:  Node.js v14.16.1   
          Express.js
          Postman v9.1.3 (https://www.postman.com/downloads/)
   

How to start the web service:
        
        Download the project from the public repository : https://github.com/rmschick99/fetchBackendExercise.git

        Open favorite IDE and open a terminal to the root directory

        run: 'npm install' to install modules and dependencies 

        run : node app.js to start the web service
        
Navigating the web service:
        
        Transaction:         
                From what I know of industry standard/testing with the experience I have I decided to go with Postman for the POST method when it came to transaction. It's easy,                 quick, and gives a developer more testing tools and insight into what really is going on. I believe its more true to what backend development would be in a                       company than to retrieve information from the URL or user without a frontend. 

                To add transactions to the web server, start and run the web service, open up Postman, and create a new workspace

                In the input line marked 'Enter request URL' enter 'localhost:3000/transaction'

                Go to 'Body' and select 'raw' and change to 'JSON'

                The template to add a transaction is as follows:
                {
                        "payer" : "USERINPUT",
                        "points": NUMBER,
                        "timestamp": "YYYY-MM-DDTHH:MM:SSZ"
                }

                Click 'Send'
                This will allow the user to use the other commands to spend points and check the balances.

        Spend:
                Again, I went with Postman for the POST method when it came to spend. It's easy, quick, and gives a developer more testing tools and insight into what really is                        going on. 

                After starting and running the web service, open up Postman and create a new workspace

                In the input line marked 'Enter request URL' enter 'localhost:3000/spend'

                Go to 'Body' and select 'raw' and change to 'JSON'

                For testing purposes I went with {"points": 5000} as the input text

                Click send and the response will be recorded in the Body at the bottom. 

        Balance: localhost:3000/balance
                This route is made to simply check the balances of the payers. This should show the total balance of each payer that has been added through the transaction path

Tested using values:
        
        Postman
        localhost:3000/transaction
        These are all seperate POSTS, please utilize a test POST one at a time. Or create your own!
                {
                        "payer" : "DANNON",
                        "points": 1000,
                        "timestamp": "2020-11-02T14:00:00Z"
                }
                { 
                        "payer": "UNILEVER", 
                        "points": 200, 
                        "timestamp": "2020-10-31T11:00:00Z" 
                }
                {       
                        "payer": "DANNON", 
                        "points": -200, 
                        "timestamp": "2020-10-31T15:00:00Z" 
                }
                {
                        "payer": "MILLER COORS",
                        "points": 10000,
                        "timestamp": "2020-11-01T14:00:00Z"
                }
                {       
                        "payer": "DANNON", 
                        "points": 300, 
                        "timestamp": "2020-10-31T10:00:00Z" 
                }
       

        Postman 
        localhost:3000/spend
                {"points": 5000}
                {"points": 1000}
