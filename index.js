const express = require('express');
const bodyParser = require('body-parser');
const requestify = require('requestify');
const app = express() 

app.use(bodyParser.json()) 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
global.speech;
//code for creating servicenow incident
app.post('/CheckAccountStatus', (req, res) => 
{
	  //console.log(JSON.stringify(req.body));
	  //console.log(req.body.conversation.memory.intent_name.slug);
	  speech = " Thanks for contacting us."
	//var speech;
	
			console.log(speech);
				var reply = [{
						type: 'text',
						content: speech
						}];

					res.status(200).json({
							replies: reply });	
			
			
		
								
		
			
		//console.log(speech);
		
	
	//----------------------------------------------
});


