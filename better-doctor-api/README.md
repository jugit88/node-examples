### Better Doctor Proxy API

#### Running
Start the server by typing `npm start` in the terminal
The easiest way to run the proxy is by opening your browser and following the search criteria. Valid
searchs would follow `localhost:3000/api/v1/doctors/search?name=<name>` . You can also use `curl -XGET <URL>`.

#### Testing
1. `./test/testSetup.sh` NOTE: if you open a fresh, local, empty node in elasticsearch you can skip this step. This only ensures consistency, say if you want to rerun tests.
2. `npm test`
#### Or: 
Just start the server per the instructions above and search away. This is the quickest and easiest way to test and 
interact with the proxy. 

#### Dependencies
-This assumes you have a local installation of ElasticSearch confiugured to run on port: 9200

-Mocha
