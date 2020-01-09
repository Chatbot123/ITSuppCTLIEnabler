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
	  //speech = " Thanks for contacting us."
	//var speech;
	if(req.body.conversation.memory.intent_name.slug=="unlockaccount-personal")
	{	
		//speech = " Thanks for contacting us. checking for personal account status"
		var csrfToken;
		var url = "https://sapmobile-gwx.centurylink.com/sap/opu/odata/sap/ZUSER_MAINT_OPRS_CHATBOT_SRV/UserStatusCheckSet(Aduser='praveen.varriam@centurylink.com',PwdStatusCheckFlag='X',UserLockCheckFlag='X')/?$format=json";
		//console.log(url);
		var options = { 
				method: 'GET',
	  			
	 				//'https://sapmobile-gwx.centurylink.com/sap/opu/odata/sap/ZUSER_MAINT_OPRS_CHATBOT_SRV;o=ERP_700/ADUserDetailsSet?$filter=(Aduser%20eq%20%27praveen.varriam@centurylink.com%27)&$format=json',
				headers: 
	   				{ 
					     'Host': 'sapmobile-gwx.centurylink.com',
					     'Authorization': 'Basic Q0hBVEJPVF9URVNUOlRlc3QxMjM0',
					     'content-type':'application/json',
					     'x-csrf-token':'Fetch' 
					} ,
				dataType: 'json'
				};


		requestify.request(url,options).then(function(response)
		{
		  	var csrfToken;
			 console.log(response);
			console.log("status code"+response.code);
			
	  		if (response.code == 200) 
			{   
				csrfToken = response.headers['x-csrf-token'];
				console.log("csrf token" + csrfToken);
				var result = JSON.parse(response.body);
				var statusDetail = result.d.AccountStatus;               
	 		}
	 		console.log("statusDetail" + statusDetail);
			
	 		if (statusDetail == 'ACCOUNT_NOT_LOCKED AND PASSWORD_NOT_EXPIRED')
	 		{
	   			 var reply = 	[{	type: 'text',
							content: 'Your account is already unlocked!'
						}];
					 
	 		}
	 		else if(statusDetail == 'ACCOUNT_SUSPENDED_BY_ADMIN AND PASSWORD_NOT_EXPIRED')
	 		{
			  // builder.Prompts.choice(session, "Your account has been locked by admin. I can help you get it unlocked, do you want me to proceed ?","Yes|No",{listStyle:3});
	   			 reply = 	[{
				    			"type": "quickReplies",
				    			"content": {
				      					"title": "Your account has been locked by admin. I can help you get it unlocked, do you want me to proceed ?",
				      					"buttons": [
											{
											  "title": "YES",
											  "value": "YES"
											},
											{
											  "title": "NO",
											  "value": "NO"
											},
				     						   ]
				    				   }
				  		}];
	 		}
			//console.log("res " + JSON.stringify(res));
			//console.log(speech);
				

			res.status(200).json({
					replies: reply });
			
			
			
			
		/*}, function(error) 
		{
						var errorMessage = "GET request failed";
						if(error.code && error.body) {
							errorMessage += " - " + error.code + ": " + error.body
		}
						console.log("Something went wrong with the call");
						console.log(errorMessage);
						console.log(error.body);*/
						
								
		});
			
		//console.log(speech);
		
	}
	//----------------------------------------------
});


app.post('/unlockAccountCall', (req, res) => 
{
	  //console.log(JSON.stringify(req.body));
	  //console.log(req.body.conversation.memory.intent_name.slug);
	  //speech = " Thanks for contacting us."
	//var speech;
		
		//speech = " Thanks for contacting us. checking for personal account status"
		var v_cookie;
	var url = 'https://sapmobile-gwx.centurylink.com/sap/opu/odata/sap/ZUSER_MAINT_OPRS_CHATBOT_SRV;o=ERP_700/UserUnLockSet%28%27PXV166366%27%29';
         var options = 
         { 
          
            method: 'GET',
            
            
            
            headers: 
            { 
              'Host': 'sapmobile-gwx.centurylink.com',
              'Authorization': 'Basic Q0hBVEJPVF9URVNUOlRlc3QxMjM0',
              'content-type':'application/json',
              // jar : j,
              'x-csrf-token':'Fetch' 
            } 
          };


		requestify.request(url,options).then(function(response)
		{
		  	var csrfToken;
			 console.log(response);
			console.log("status code"+response.code);
			
	  		if (response.code == 200) 
			{   
				csrfToken = response.headers['x-csrf-token'];
				console.log("csrf token" + csrfToken);
				 v_cookie = response.headers['set-cookie'];
				var v_payload = {};
				v_payload.Username = 'PXV166366';
				var url = 'https://sapmobile-gwx.centurylink.com/sap/opu/odata/sap/ZUSER_MAINT_OPRS_CHATBOT_SRV;o=ERP_700/UserUnLockSet%28%27PXV166366%27%29';
				 var options = 
						{ 
						  method: 'PUT',
						  body : v_payload,
						  json : true,
						  headers: 
						    { 
						      "Host": 'sapmobile-gwx.centurylink.com',
						      "Authorization": 'Basic Q0hBVEJPVF9URVNUOlRlc3QxMjM0',
						      "Content-Type":'application/json',
						      "x-csrf-token": csrfToken,
						      "Cookie":v_cookie[2]
						    } 
						};
						requestify.request(url,options).then(function(response)
						{
						  if ( response.code == 204 ) 
						  {   
							  var reply = 	[{	type: 'text',
							content: 'I have successfully unlocked your account. I am sending an email to IT support for auditing'
						}];
							  //session.send("I have successfully unlocked your account. I am sending an email to IT support for auditing");
						  }
                });
				
				           
	 		}
	 		
				

			res.status(200).json({
					replies: reply });
			
			
			
			
		
						
								
		});
			
		//console.log(speech);
		
	
	//----------------------------------------------
});



