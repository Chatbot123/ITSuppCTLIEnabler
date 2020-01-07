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
		  console.log(req.body);
		  speech = " Thanks for contacting us."
                      
				//----------------------------------------------
			var reply = [{
				type: 'text',
				webhookresponse: speech
				}];

			res.status(200).json({
					replies: reply });
		
						
								
});
