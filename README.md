# fetchBackendExercise

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
        Transactions:

        Spend:
                From what I know of industry standard/testing with the experience I have I decided to go with Postman for the POST method when it came to spend. It's easy, quick, and gives a developer more testing tools and insight into what really is going on. 

                After starting and running the web service, open up Postman and create a new workspace

                In the input line marked 'Enter request URL' enter 'localhost:3000/spend'

                Go to 'Body' and select 'raw' and change to 'JSON'

                For testing purposes I went with {"points": 5000} as the input text

                Click send and the response will be recorded in the Body at the bottom. 

        Balances:
                To check the balances of the payers, simply type 'localhost:3000/balances' and enter

                This should show the total balance of each payer that has been added through the transaction path