const express = require('express');
const bodyParser = require('body-parser');
const requestify = require('requestify');
const app = express() 

app.use(bodyParser.json()) 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

//code for creating servicenow incident
app.post('/CheckAccountStatus', (req, res) => 
{
	  //console.log(JSON.stringify(req.body));
	  //console.log(req.body.conversation.memory.intent_name.slug);
	  speech = " Thanks for contacting us."
	//var speech;
	//if(req.body.conversation.memory.intent_name.slug=="unlockaccount-personal")
	//{	
		//speech = " Thanks for contacting us. checking for personal account status"
	
			speech = speech.replace(/  +/g, ' ');
			//console.log(speech);//----------------------------------------------
			//console.log(speech);
			var reply = [{
				type: 'text',
				content: speech
				}];
			
			res.status(200).json({
    					replies: reply
  				});
			//res.status(200).json({	replies: reply	});
			//console.log(res.body);
			
			
						    
		
		
		
	//}
	//----------------------------------------------
});


