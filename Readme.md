# Boilerplate Nodejs MicroService - SmartinfoLogiks

Boilerplate to quickly start a new MicroService only project. This does not have a lots of wasted code. Just Point Blank Basic MicroService.

### Installation
+ Clone the repo
+ Install using npm install
+ Create a .env file from env_sample
+ Update the paramaters in .env
    + MS_DISOVERY_SERVER defines Micro Service Master Host Link (Blank by default), without this the MicroService will not register itself with Master Server
    + MS_DISOVERY_APPKEY defines Micro Service Master Host AppKey (Blank by default)
    + MS_DISOVERY_SECRET defines Micro Service Master Host Encryption Key (Blank by default)
    + MS_CURRENT_PORT defines which port to run the current services on
+ Done, now start using npm start. 

This should give you a basic api at 8989 (If you have not changed the port). Hit the URL printed on Console and verify if its running.

### Extending to use the system
+ Just add as many routes into the api/routes folder
+ Restart the node processs
+ Thats it, as simple as that

### MicroService Specs
1. On Bootstrap Register With Control and Discovery Server
2. Register all subapi route paths with Control and Discovery Server (optional)
3. Provide /ok route path for Control and Discovery Server to monitor the service
