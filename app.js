// import Express and routes
import express from 'express';
import routes from './source/routes/route.js';

// for testing on GCS
const arrNodes = [ process.env.NODE_SVC_PUBLIC_SERVICE_HOST  ];       //  use this for K8S

// constant variables 
const app = express();
const PORT = process.env.PORT || 30002;
const HOST = '0.0.0.0';


app.use(express.json());
app.use(express.urlencoded(
	{
  		extended: true
	}
));


routes(app);

// Setting the server to listen at port 3000
app.listen(PORT, HOST, function () {
  console.log(`Server started and running on ${PORT}`);
});

function buildURL (strLevel) {

  let intCurrLevel = parseInt(strLevel);
  let nextLevel = intCurrLevel - 1;
  let numNodes = arrNodes.length; // to be derived from arrNodes
  let nextNode = nextLevel >= numNodes ? nextLevel % numNodes : nextLevel;
  let strURL = "http://"+ arrNodes[nextNode] + ":" + PORT + "/" + nextLevel;
    
  console.log ("returning URL " + strURL);
   return(strURL);

}
