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
	  console.log(JSON.stringify(req.body));
	  //console.log(req.body.conversation.memory.intent_name.slug);
	  //speech = " Thanks for contacting us."
	if(req.body.conversation.memory.intent_name.slug=="unlockaccount-personal")
	{	
		//speech = " Thanks for contacting us. checking for personal account status"
		var csrfToken;
		var url = "https://sapmobile-gwx.centurylink.com/sap/opu/odata/sap/ZUSER_MAINT_OPRS_CHATBOT_SRV/UserStatusCheckSet(Aduser='praveen.varriam@centurylink.com',PwdStatusCheckFlag='X',UserLockCheckFlag='X')/?$format=json";
		console.log(url);
		var options = { 
				method: 'GET',
	  			
	 				//'https://sapmobile-gwx.centurylink.com/sap/opu/odata/sap/ZUSER_MAINT_OPRS_CHATBOT_SRV;o=ERP_700/ADUserDetailsSet?$filter=(Aduser%20eq%20%27praveen.varriam@centurylink.com%27)&$format=json',
				headers: 
	   				{ 
					     'Host': 'sapmobile-gwx.centurylink.com',
					     'Authorization': 'Basic Q0hBVEJPVF9URVNUOlRlc3QxMjM0',
					     'content-type':'application/json',
					     'x-csrf-token':'Fetch' 
					} 
				};


		requestify.request(url,options).then(function(response,error)
		{
		  	var csrfToken;
			console.log("status code"+response.statusCode);
	  		if (!error && response.statusCode == 200) 
			{   
				csrfToken = response.headers['x-csrf-token'];
				var res = JSON.parse(body);
				statusDetail = res.d.AccountStatus;               
	 		}
	 		console.log("statusDetail" + statusDetail);
	 		if (statusDetail == "ACCOUNT_NOT_LOCKED AND PASSWORD_NOT_EXPIRED")
	 		{
	   			speech = "Your account is already unlocked!";
	 		}
	 		else if(statusDetail == "ACCOUNT_SUSPENDED_BY_ADMIN AND PASSWORD_NOT_EXPIRED")
	 		{
			  // builder.Prompts.choice(session, "Your account has been locked by admin. I can help you get it unlocked, do you want me to proceed ?","Yes|No",{listStyle:3});
	   			speech = "Your account has been locked by admin. I can help you get it unlocked, do you want me to proceed ?";
	 		}
				//----------------------------------------------
			var reply = [{
				type: 'text',
				content: speech
				}];
			res.status(200).json({
					replies: reply });
		});
	}	//----------------------------------------------
});
