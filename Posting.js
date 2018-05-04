
$(document).ready(function(){
	var savedPosts;
	var img;

	/*---------------------------------
					Startup
	-----------------------------------*/
	$('#loginGoogle').click(function(){
	    handleClientLoad(); 	  
     });

	$("#card-post").hide(); 
	
	settingedit();


	
	$("#postbtn").click(function(){
		

			
	if ($("#file-input")[0].files &&$("#file-input")[0].files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				img = $('<img>').attr('src', e.target.result);
				console.log(img);
				imageSet(img);
				
			};
			reader.readAsDataURL($("#file-input")[0].files[0]);
			
		}else{
			
			imageSet(img);
		}


			
	});
	
});

function imageSet(img)
{
		
		saveImage = img;
		savedPosts = setPost($("#card-post"),img);		
	    savedPosts.appendTo(".innerdiv").show();
}	

function updateUsername_photo(user,pic)
{
	console.log("hi");
	$('#userPhoto').attr('src',pic);
	$('#sidebar').find(".user").html(user);
	$('#profilePhoto').attr('src', pic);


}

function settingedit()
{
	

	
	$('#fname').hide(); //Initially form will be hidden.
	$('#lname').hide();
	$('#bname').hide();
	$('#ename').hide();
	$('#pname').hide();
	$('#uname').hide();
	$('#uname').hide();
	$('#Photo').hide();

		$('#fedit').click(function() {
			$('#fname').show();
			
		});
		$('#ledit').click(function() {
			$('#lname').show();
		});
		$('#uedit').click(function() {
			$('#uname').show();
		});
		$('#bedit').click(function() {
			$('#bname').show();
		});
		$('#eedit').click(function() {
			$('#ename').show();
		});
		$('#pedit').click(function() {
			$('#pname').show();
		});
		$('#photoedit').click(function() {
			$('#Photo').show();
		});
		$('#submit').click(function() {
			
			
			update($("#add_listing_info"));

		});

}
/*-----------------------------------------------------
				download
function handles downloading json file information 
to a txt file. 
------------------------------------------------------*/

 function repopulate(object) {
	 
	 
	//goes through posts 
	for(var i = 0;i < object.textposts.length;i++)
	{
			
			create = createPost(object,i,$("#card-post"));
			create.appendTo(".innerdiv").show();

	}

}

function repopulateSettings(object)
{
	
	$("#add_listing_info").find(".firstname").html(object.firstName);
	$("#add_listing_info").find(".lastname").html(object.lastName);
	$("#add_listing_info").find(".birthday").html(object.birthday);
	$("#add_listing_info").find(".email").html(object.email);
	$("#add_listing_info").find(".phone").html(object.phone);
	$("#add_listing_info").find(".username").html(object.username);
	$('#previewHolder').attr('src', object. profilePic);

	updateUsername_photo(object.username,object. profilePic);



	
}


/*-----------------------------------------------------
				setPost
function handles creating a new post as needed when user
clicks on post button
------------------------------------------------------*/

function setPost(templateCardPost,img){
	
	var current_post = new Object();
	var the_post = $('#post')[0];
	var today = new Date();
	var date = (today.getMonth()+1)+ '/' +today.getDate()+ ' ' + today.getHours() + ":" + today.getMinutes();	
	
	templateCardPost.find(".display").html(the_post.value );
	templateCardPost.find(".time").html(date);

	current_post.datetime = date;
	current_post.content = the_post.value ; 
	
	uploadFile = document.getElementById("file-input").files[0];
	console.log(uploadFile);
	if(uploadFile)
	{
		templateCardPost.find(".upload-image-preview").html(img); 
		uploadPhotoPost(current_post);
		 
	}
	else
	{
		templateCardPost.find(".upload-image-preview").html('');  
		AddDataToJSON('myWallJSON.txt',current_post);
		
	}	
	
	return templateCardPost.clone();
}

/*-----------------------------------------------------
				createPost
function handles repopulating previous posts.
------------------------------------------------------*/

function createPost(obj,i,templateCardPost)
{
	var old_post = new Object();	
	
	img = $('<img>').attr('src', obj.textposts[i].photoLink);
	
	templateCardPost.find(".name").html(obj.name);				
	templateCardPost.find(".display").html(obj.textposts[i].content);
	templateCardPost.find(".time").html(obj.textposts[i].datetime);
	templateCardPost.find(".upload-image-preview").html(img);  
	
					
	old_post.datetime = obj.textposts[i].datetime;
	old_post.content = obj.textposts[i].content;	
	old_post.photoLink = obj.textposts[i].photoLink;
	
	
	return templateCardPost.clone();
}

/*-----------------------------------------
                 Settings functions 
-----------------------------------------*/
 function update()
{
	var update_firstname = $('#first')[0];
	
	var update_lastname = $('#last')[0];
	
	var update_birthday = $('#birth')[0];
	
	var update_email = $('#em')[0];
	
	var update_phone = $('#ph')[0];
	
	var update_username = $('#user')[0];
	
	var img;
	
	var updatedSettings = new Object();
	
	updatedSettings.username = update_username.value;
	updatedSettings.firstName = update_firstname.value;
	updatedSettings.lastName = update_lastname.value;
	updatedSettings.birthday = update_birthday.value;
	updatedSettings.email = update_email.value;
	updatedSettings.phone = update_phone.value;
	
	AddDataToJSON('mySettingsJSON.txt', updatedSettings);
	
	if($('#first')[0].value != '')
	{
		
		$("#add_listing_info").find(".firstname").html(update_firstname.value);
		
	}
	
	if($('#last')[0].value != '')
	{
		$("#add_listing_info").find(".lastname").html(update_lastname.value);
	}
	
	if($('#birth')[0].value != '')
	{
		$("#add_listing_info").find(".birthday").html(update_birthday.value);
	}
	if($('#em')[0].value != '')
	{
		$("#add_listing_info").find(".email").html(update_email.value);
	}
	if($('#ph')[0].value != '')
	{
		$("#add_listing_info").find(".phone").html(update_phone.value);
	}
	if($('#user')[0].value != '')
	{
		$("#add_listing_info").find(".username").html(update_username.value);
		
	}


	//handles user photo 
	 if ($("#filePhoto")[0].files && $("#filePhoto")[0].files[0]) {
		var reader = new FileReader();
			reader.onload = function(e) {
				
			
			$('#previewHolder').attr('src', e.target.result);
				
		}

		reader.readAsDataURL($("#filePhoto")[0].files[0]);
	
	}
	
		//Read in file to be uploaded from upload button
		var uploadFile = document.getElementById("filePhoto").files[0];
		var fileContent; 
		if (uploadFile) 
		{
			var name = uploadFile.name;
			var fileSize = uploadFile.size;
			var mimeType = uploadFile.type;
			var reader = new FileReader();
			reader.readAsBinaryString(uploadFile);
			reader.onload = function (evt) 
			{
				var dirName = "name= " + "'POSN_Photos'";
				var isTrashed = "trashed = false"
				var dirQuery = dirName + 'and' + isTrashed;
				
				gapi.client.drive.files.list(
				{
					'q' : dirQuery
				}).then(function(response)
				{
					PhotoFolderID = response.result.files[0].id;
				
					document.getElementById("filePhoto").innerHTML = evt.target.result;
						
					//evt.target.result is actual text/data in file
					//Encoded in base64
					fileContent = btoa(evt.target.result);	
						
					//Rest of function below handles uploading to Google Drive
					var auth_token = gapi.client.getToken().access_token;
					const boundary = '-------314159265358979323846';
					const delimiter = "\r\n--" + boundary + "\r\n";
					const close_delim = "\r\n--" + boundary + "--";
					var metadata = 
					{ 
						 "name" : name,
						 "mimeType": mimeType,
						 "parents" : [PhotoFolderID]
					};  

					var multipartRequestBody =
					delimiter +  'Content-Type: application/json\r\n\r\n' +
					JSON.stringify(metadata) +
					delimiter +
					'Content-Type: application/json' + '\n' +
					'Content-Transfer-Encoding: base64\r\n\r\n' +
					fileContent +
					close_delim;
					gapi.client.request(
					{ 
						'path': '/upload/drive/v3/files/',
						'method': 'POST',
						'params': {'uploadType': 'multipart'},
						'headers': { 'Content-Type': 'multipart/form-data; boundary="' + boundary + '"', 'Authorization': 'Bearer ' + auth_token, },
						'body': multipartRequestBody 
					}).execute(function(file) 
					{ 
						
						
						photoID = file.id;
						gapi.client.drive.files.get(
						{
							'fileId': photoID,
							fields: 'webContentLink'
						}).then(function(response)
						{
							
						parseResponse = JSON.parse(response.body);
						webLink = parseResponse.webContentLink;
						updatedSettings.profilePic = webLink;
						AddDataToJSON('mySettingsJSON.txt', updatedSettings);
						
						}), function(reason)
						{
							
						};					
				
					}, function(error){

					});
				}), function(reason)
				{
						
				}  
			}
			reader.onerror = function (evt) {
				document.getElementById("filePhoto").innerHTML = "error reading file";
			}
		}
		var $el = $('#filePhoto');
		$el.wrap('<form>').closest('form').get(0).reset();
		$el.unwrap();
		uploadFileAfter = document.getElementById("filePhoto").files[0];

	
	$('#fname').hide(); //Initially form will be hidden.
	$('#lname').hide();
	$('#bname').hide();
	$('#ename').hide();
	$('#pname').hide();
	$('#uname').hide();
	$('#Photo').hide();

	
}
/*------------------------------------------------
				Google API
--------------------------------------------------*/ 

      function handleClientLoad() 
      {
        // Loads required libraries for functionality
        gapi.load('client:auth2', initClient);
      }

      function initClient() 
	  {
			// Initialize the client with API key and Client ID. Scope is set to full access
			// to Google Drive
			gapi.client.init(
			{
				apiKey: 'AIzaSyBFL7e4jh939anq2JsOUeFCTTP41Jz1GoY',
				discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
				clientId: '834692356537-5fn43u118ogta150l995623a7auu52fg.apps.googleusercontent.com',
				scope: 'https://www.googleapis.com/auth/drive'
			}).then(function () 
			{
				// Listen for sign-in state changes
				gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

				// Handle the initial sign-in state
				updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
			});
      }

	  // Function called when sign in changes
      function updateSigninStatus(isSignedIn) 
	  {
			// If status changes to signed in, makes call to Google API
			if (isSignedIn) 
			{
				//If POSN is not setup then setup
				if( isPOSNSetup() == true)
				{
					
					//addFriend('TonyMalone', 'slayer441139@gmail.com');
					getAppJSON('myWallJSON.txt');
					getAppJSON('mySettingsJSON.txt');
					//removeFriend('Tony Malone');
					//getSharedWall('TonyMalone');
				
				}
				
			}
      }

      function handleSignInClick(event) 
	  {
			gapi.auth2.getAuthInstance().signIn();
      }

      function handleSignOutClick(event) 
	  {
			gapi.auth2.getAuthInstance().signOut();
      }
	
	
	//Function will essentially search for the folder that contains
	//application data to see if POSN is setup
	 function isPOSNSetup()
	 {
		var folderName = "name= 'POSN_Directory'";
		var isTrashed = "trashed = false"
		var query = folderName + 'and' + isTrashed;
		

        gapi.client.drive.files.list(
		{    
			 'q' : query
		}).then(function(response) 
		{
			if( response.result.files.length == 0 )
			{
				//If folder is not found (POSN not initialized),
				//then initialize setup 
				setupPOSN();
				
				
			}
			console.log("POSN is setup");
        }, function(reason) 
		{
			
        });
		return true;			
	}
	
	//Makes folders needed to run the POSN application
	function setupPOSN()
	{
		//Default values for Wall JSON
		var user_posts = new Object();
		var wallJsonName = 'myWallJSON.txt';
		user_posts.name = "wholmes";
		user_posts.picture = "./Personal Profile Template_files/user.jpg";
		user_posts.textposts = [];
		jsonUser = JSON.stringify(user_posts);
		
		//Default values for friend JSON
		var friend = new Object();
		var friendFileName = 'myFriendsJSON.txt'
		friend.friendsList = [];
		jsonFriends = JSON.stringify(friend);
		
	
		
		var userSettings = new Object();
		var settingsName = 'mySettingsJSON.txt';
		userSettings.username = '';
		userSettings.firstName = '';
		userSettings.lastName = '';
		userSettings.birthday = '';
		userSettings.email ='';
		userSettings.phone = '';
		userSettings.profilePic = '';
		jsonSettings = JSON.stringify(userSettings);
		
		subFolderNames = ['POSN_Photos','POSN_Comments','POSN_Music','POSN_Videos','POSN_Other_Files']
		mimeType = 'application/vnd.google-apps.folder'
		bodyMetadata = 
		{
			'name' : 'POSN_Directory',
			'mimeType' : mimeType
		}
		
		gapi.client.drive.files.create(
		{    
			resource : bodyMetadata
		}).then(function(response) 
		{
			
			makeSubFolders(response.result.id, subFolderNames);
			postJSON(wallJsonName, response.result.id, jsonUser);
			postJSON(friendFileName, response.result.id, jsonFriends);
			postJSON(settingsName, response.result.id, jsonSettings);
			
        }, function(reason) 
		{
			
        });
	}
	 
	//Makes each individual subfolder as specificed
	function makeSubFolders( directoryID, subFolderNames )
	{
		var i = 0;
		var mimeType = 'application/vnd.google-apps.folder';
		var callList = [];
		var httpBatch = gapi.client.newBatch();
		var numOfSubFolders = 5;
		var directory = [directoryID];

		for( i = 0; i < numOfSubFolders; i++ )
		{
			bodyMetadata = 
			{
				'name' : subFolderNames[i],
				'mimeType' : mimeType,
				'parents' : directory
			}
			
			callList.push(gapi.client.drive.files.create(
			{    
				resource : bodyMetadata
			}));
			httpBatch.add(callList[i])
		}
		console.log(httpBatch);
		httpBatch.then(function(onFulfilled)
		{
			i = 0;
			myResult = onFulfilled.result;
			parseRes = JSON.stringify(onFulfilled.result);
			fail = parseRes.search('403');
			if(fail == -1)
			{
				for( i = 0; i < numOfSubFolders; i++ )
				{
					callList[i].then(function(response)
					{
						console.log(response.result);

					}, function(reason)
					{
						console.log('Error: ' + reason.result.error.message);
					});
				}
			}
			else
			{
				console.log(filesList);
				apiBackoff( makeSubFolders, directoryID, subFolderNames)
			}
		})
	}
	
	function addFriend(name, emailAddress)
	{
		console.log('Add friend');
		
		//Params for adding permissiom
		friendRole = "reader";
		permType = 'user';
		requestBody = {
			"type": permType,
			"emailAddress": emailAddress,
			"role": friendRole,
		}
		newFriend = new Object();
		newFriend.name = name;
		newFriend.email = emailAddress;
		
		//Params for other API calls 
		var jsonName = "name= 'myWallJSON.txt'";
		var photoFolder = "name = 'POSN_Photos'"
		var isTrashed = "trashed = false"
		var sharedParam = "'me' in owners";
		var query = jsonName + 'and' + isTrashed + 'and' + sharedParam;
		var query2 = photoFolder + 'and' + isTrashed + 'and' + sharedParam;
		var sendNotif = false;
		var dirID;
		var photoID;
		
		gapi.client.drive.files.list(
		{    
			 'q' : query
		}).then(function(response) 
		{
			dirID = response.result.files[0].id;
			gapi.client.drive.permissions.create(
			{
				'fileId' : dirID,
				'sendNotificationEmail' : sendNotif, 
				resource : requestBody
			}).then(function(response)
			{
				newFriend.wallID = response.result.id
				gapi.client.drive.files.list(
				{    
				 'q' : query2
				}).then(function(response) 
				{
					photoID = response.result.files[0].id;
					gapi.client.drive.permissions.create(
					{
						'fileId' : photoID,
						'sendNotificationEmail' : sendNotif, 
						resource : requestBody
					}).then(function(response)
					{
						newFriend.photoID = response.result.id;
						console.log('Swag');
						AddDataToJSON('myFriendsJSON.txt', newFriend);
					}, function(reason)
					{
						console.log('Error: ' + reason.result.error.message);
					});
				}, function(reason) 
				{
					console.log('Error: ' + reason.result.error.message);
				});
			}, function(reason)
			{
				console.log('Error: ' + reason.result.error.message);
			});
		}, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
		});
	}
	
	function getSharedWall(friendName)
	{
		var fileName = "name= 'myWallJSON.txt'";
		var isTrashed = "trashed = false"
		var sharedParam = "sharedWithMe = true";
		var query = fileName + 'and' + isTrashed + 'and' + sharedParam;
		gapi.client.drive.files.list(
		{    
			 'q' : query
		}).then(function(response) 
		{
			console.log(response);
			fileID = response.result.files[0].id
			gapi.client.drive.files.get(
			{    
				'fileId' : fileID,
				alt : 'media'
			}).then(function(response) 
			{
				console.log(response.body);
				
			}, function(reason) 
			{
				console.log('Error: ' + reason.result.error.message);
			});
			
		}, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
		});
	}
	
	//Shows information about a file's permissions
	function showPermissions( fileID )
	{
		gapi.client.drive.permissions.list(
		{
			'fileId' : fileID
		}).then(function(response)
		{
			console.log(response.result)
		}, function(reason)
		{
			console.log('Error: ' + reason.result.error.message);
		});
	}
	
	//Adds a permission to a file using email address
	function addPermissions( fileID, emailAddress )
	{
		friendRole = "reader";
		permType = 'user';
		requestBody = {
			"type": permType,
			"emailAddress": emailAddress,
			"role": friendRole,
		}
		gapi.client.drive.permissions.create(
		{
			'fileId' : fileID,
			resource : requestBody
		}).then(function(response)
		{
			console.log(response.result)
		}, function(reason)
		{
			console.log('Error: ' + reason.result.error.message);
		});
	}

	
	function removePermissions( permissionId )
	{
		//Variables for finding Wall JSON
		var fileName = "name= 'myWallJSON.txt'";
		var isTrashed = "trashed = false"
		var query = fileName + 'and' + isTrashed;
		var jsonID;
		
		//Variables for finding Photos folder
		var photosName = "name= " + "'POSN_Photos'";
		var queryList = photosName + 'and' + isTrashed;
		var photosID;

		console.log(query);
		console.log(queryList);
		
		gapi.client.drive.files.list(
		{    
			 'q' : query
		}).then(function(response) 
		{
			console.log(response);
			jsonID = response.result.files[0].id;
			gapi.client.drive.files.list(
			{    
				 'q' : queryList
			}).then(function(response) 
			{	
				console.log(response);
				photosID = response.result.files[0].id;
				gapi.client.drive.permissions.delete(
				{    
						'fileId' : jsonID,
						'permissionId' : permissionId
				}).then(function(response) 
				{
						
				}, function(reason) 
				{
					console.log('Error: ' + reason.result.error.message);
				});	
				
				gapi.client.drive.permissions.delete(
				{    
						'fileId' : photosID,
						'permissionId' : permissionId
				}).then(function(response) 
				{
						
				}, function(reason) 
				{
					console.log('Error: ' + reason.result.error.message);
				});	

			}, function(reason) 
			{
				console.log('Error: ' + reason.result.error.message);
			});
			
		}, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
		});
	}
	
	function removeFriend( friendName )
	{
		console.log('Remove friend');
		
		//Variables for finding POSN_Directory
		var dirName = "name= " + "'POSN_Directory'";
		var isTrashed = "trashed = false"
		var dirQuery = dirName + 'and' + isTrashed;
		var mainDir;
	
		//Variables for finding friend JSON
		var jsonName = "name= " + "'myFriendsJSON.txt'";
		var queryList = jsonName + 'and' + isTrashed;
		var jsonID;
		
		gapi.client.drive.files.list(
		{    
			 'q' : dirQuery
		}).then(function(response) 
		{
			mainDir = response.result.files[0].id;
			//Find friend JSON ID
			gapi.client.drive.files.list(
			{    
				'q' : queryList
			}).then(function(response) 
			{	
				//ID of friend JSON
				jsonID = response.result.files[0].id;
					
				//Get contents of friend JSON
				gapi.client.drive.files.get({
					'fileId' : jsonID,
					alt : 'media'
				}).then(function(response)
				{
					parseFriends = JSON.parse(response.body);
					listLength = parseFriends.friendsList.length;
					for(i = 0; i < listLength; i++)
					{
						if(parseFriends.friendsList[i].name == friendName )
						{
							console.log('Friend found');
							removePermissions( parseFriends.friendsList[i].wallID );
							parseFriends.friendsList.splice(i);
							updateJSON = JSON.stringify(parseFriends);
							postJSON('myFriendsJSON.txt', mainDir, updateJSON);
							break;
						}
						
					}
					//Step 5: Delete old friend JSON	
					gapi.client.drive.files.delete({
						'fileId' : jsonID
					}).then(function(response)
					{
						
					}), function(reason)
					{
						console.log(reason);
					}
					
				}, function(reason)
				{
					console.log('Error: ' + reason.result.error.message);
				});
			}, function(reason) 
			{
				console.log('Error: ' + reason.result.error.message);
			});
		
        }, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
        });	
	}

	
	//Can upload a text file to Google Drive root
	function uploadFileFromButton() 
	{
		//Read in file to be uploaded from upload button
		var uploadFile = document.getElementById("myFile").files[0];
		var fileContent; 
		if (uploadFile) 
		{
			var name = uploadFile.name;
			var fileSize = uploadFile.size;
			var mimeType = uploadFile.type;
			var reader = new FileReader();
			reader.readAsBinaryString(uploadFile);
			reader.onload = function (evt) 
			{
				document.getElementById("file-input").innerHTML = evt.target.result;
					
				//evt.target.result is actual text/data in file
				//Encoded in base64
				fileContent = btoa(evt.target.result);	
					
				//Rest of function below handles uploading to Google Drive
				var auth_token = gapi.client.getToken().access_token;
				const boundary = '-------314159265358979323846';
				const delimiter = "\r\n--" + boundary + "\r\n";
				const close_delim = "\r\n--" + boundary + "--";
				var metadata = 
				{ 
					 "name" : name,
					 "mimeType": mimeType
				};  

				var multipartRequestBody =
				delimiter +  'Content-Type: application/json\r\n\r\n' +
				JSON.stringify(metadata) +
				delimiter +
				'Content-Type: application/json' + '\n' +
				'Content-Transfer-Encoding: base64\r\n\r\n' +
				fileContent +
				close_delim;

				gapi.client.request({ 
					'path': '/upload/drive/v3/files/',
					'method': 'POST',
					'params': {'uploadType': 'multipart'},
					'headers': { 'Content-Type': 'multipart/form-data; boundary="' + boundary + '"', 'Authorization': 'Bearer ' + auth_token, },
					'body': multipartRequestBody 
				}).execute(function(file) { 
					console.log("Wrote to file " + file.name + " id: " + file.id); 
				}, function(error){
						console.log(error);
				});  
			}
			reader.onerror = function (evt) {
				document.getElementById("myFile").innerHTML = "error reading file";
			}
		}
	 }
	 
	// Function posts updated Wall JSON to Google Drive
	function postJSON( fileName, directoryID, fileContent )
	{
		var directory = [directoryID];
		var mimeType = 'text/plain';
		var baseFileContent = btoa(fileContent);
		var auth_token = gapi.client.getToken().access_token;
		const boundary = '-------314159265358979323846';
		const delimiter = "\r\n--" + boundary + "\r\n";
		const close_delim = "\r\n--" + boundary + "--";
		var metadata = 
		{ 
			"name" : fileName,
			"mimeType": mimeType,
			"parents" : directory
		};  
		var multipartRequestBody =
		delimiter +  'Content-Type: application/json\r\n\r\n' +
		JSON.stringify(metadata) +
		delimiter +
		'Content-Type: application/json' + '\n' +
		'Content-Transfer-Encoding: base64\r\n\r\n' +
		baseFileContent +
		close_delim;

		gapi.client.request(
		{ 
			'path': '/upload/drive/v3/files/',
			'method': 'POST',
			'params': {'uploadType': 'multipart'},
			'headers': { 'Content-Type': 'multipart/form-data; boundary="' + boundary + '"', 'Authorization': 'Bearer ' + auth_token, },
			'body': multipartRequestBody 
		}).execute(function(file) { 
			console.log("Wrote to file " + file.name + " id: " + file.id); 
		}, function(error){
				console.log(error);
		});  
	}
	
	
	//Function meant to handle adding a new post new data to
	//files used for the application i.e. settings, wall, friends
	
	//1. Find POSN_Directory
	//2. Find and download current JSON
	//3. Append new post to JSON
	//4. Post updated JSON
	//5. Delete old JSON

	function AddDataToJSON(jsonName, user_posts)
	{
		//Variables for finding POSN_Directory
		var dirName = "name= " + "'POSN_Directory'";
		var isTrashed = "trashed = false"
		var dirQuery = dirName + 'and' + isTrashed;
		var dirID;
		
		//Variables for finding JSON file
		var fileName = jsonName;
		var queryName = `name= '${jsonName}'`;
		var sharedParam = "'me' in owners";
		var queryList = queryName + 'and' + isTrashed + 'and' + sharedParam;
		var jsonID;
		console.log(queryList);
		//Step 1: Find POSN_Directory ID
		gapi.client.drive.files.list(
		{    
			 'q' : dirQuery
		}).then(function(response) 
		{
			//ID of POSN_Directory
			mainDir = response.result.files[0].id;
			
			//Step 2: Get JSON file
			//Find JSON ID
			gapi.client.drive.files.list(
			{    
				 'q' : queryList
			}).then(function(response) 
			{				
				//ID of JSON
				console.log(response);
				jsonID = response.result.files[0].id;
				
				//Get contents of JSON
				gapi.client.drive.files.get({
					'fileId' : jsonID,
					alt : 'media'
				}).then(function(response)
				{
				
					parseString = JSON.parse(response.body);
					
					//Choose what type of file is being updated
					if(jsonName == 'myWallJSON.txt')
					{
						parseString.textposts.push(user_posts);
					}
					else if(jsonName == 'myFriendsJSON.txt')
					{
						parseString.friendsList.push(user_posts);
					}
					else
					{
						parseString = user_posts;
					}

					
					//Step 3: Create new one with new post in it
					//Response.body has is current JSON content
					
					updateJSON = JSON.stringify(parseString);
					
					//Step 4: Post updated JSON
					//Pass this function the updated JSON with new post appended 
					//instead of response.body.
					
					//MainDir is id of POSN main directory
					postJSON(fileName, mainDir, updateJSON);
					
					//Step 5: Delete old JSON	
					gapi.client.drive.files.delete({
						'fileId' : jsonID
					}).then(function(response)
					{
						
					}), function(reason)
					{
						console.log(reason);
					}
					
				}, function(reason)
				{
					console.log('Error: ' + reason.result.error.message);
				});
			}, function(reason) 
			{
				console.log('Error: ' + reason.result.error.message);
			});
		}, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
		});
	}

	function getAppJSON(jsonName)
	{
		//Variables for finding JSON file
		var jsonQuery = `name= '${jsonName}'`;
		var isTrashed = "trashed = false"
		var sharedParam = "'me' in owners";
		var queryList = jsonQuery + 'and' + isTrashed + 'and' + sharedParam;
		var jsonID;
		var obj;
		
		//Find Wall JSON ID
		gapi.client.drive.files.list(
		{    
			'q' : queryList
		}).then(function(response) 
		{				
			//ID of Wall JSON
			jsonID = response.result.files[0].id;
				
			//Get contents of Wall JSON
			gapi.client.drive.files.get({
				'fileId' : jsonID,
				alt : 'media'
			}).then(function(response)
			{
				obj = JSON.parse(response.body);
				if( jsonName == 'myWallJSON.txt')
				{
					repopulate(obj);
				}
				else
				{
					repopulateSettings(obj);
				}

			}, function(reason)
			{
				console.log('Error: ' + reason.result.error.message);
			});
		}, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
		});
		
	}
	
	
	//Can upload a post with Photo to Google Drive
	function uploadPhotoPost(current_post) 
	{
		//Read in file to be uploaded from upload button
		var uploadFile = document.getElementById("file-input").files[0];
		console.log(uploadFile);
		var fileContent; 
		if (uploadFile) 
		{
			var name = uploadFile.name;
			var fileSize = uploadFile.size;
			var mimeType = uploadFile.type;
			var reader = new FileReader();
			reader.readAsBinaryString(uploadFile);
			reader.onload = function (evt) 
			{
				var dirName = "name= " + "'POSN_Photos'";
				var isTrashed = "trashed = false"
				var dirQuery = dirName + 'and' + isTrashed;
				
				gapi.client.drive.files.list(
				{
					'q' : dirQuery
				}).then(function(response)
				{
					console.log(response);
					PhotoFolderID = response.result.files[0].id;
				
					document.getElementById("file-input").innerHTML = evt.target.result;
						
					//evt.target.result is actual text/data in file
					//Encoded in base64
					fileContent = btoa(evt.target.result);	
						
					//Rest of function below handles uploading to Google Drive
					var auth_token = gapi.client.getToken().access_token;
					const boundary = '-------314159265358979323846';
					const delimiter = "\r\n--" + boundary + "\r\n";
					const close_delim = "\r\n--" + boundary + "--";
					var metadata = 
					{ 
						 "name" : name,
						 "mimeType": mimeType,
						 "parents" : [PhotoFolderID]
					};  

					var multipartRequestBody =
					delimiter +  'Content-Type: application/json\r\n\r\n' +
					JSON.stringify(metadata) +
					delimiter +
					'Content-Type: application/json' + '\n' +
					'Content-Transfer-Encoding: base64\r\n\r\n' +
					fileContent +
					close_delim;
					gapi.client.request(
					{ 
						'path': '/upload/drive/v3/files/',
						'method': 'POST',
						'params': {'uploadType': 'multipart'},
						'headers': { 'Content-Type': 'multipart/form-data; boundary="' + boundary + '"', 'Authorization': 'Bearer ' + auth_token, },
						'body': multipartRequestBody 
					}).execute(function(file) 
					{ 
						console.log("Wrote to file " + file.name + " id: " + file.id); 
						
						photoID = file.id;
						gapi.client.drive.files.get(
						{
							'fileId': photoID,
							fields: 'webContentLink'
						}).then(function(response)
						{
							
						parseResponse = JSON.parse(response.body);
						webLink = parseResponse.webContentLink;
						current_post.photoLink = webLink;
						AddDataToJSON('myWallJSON.txt', current_post);
						
						}), function(reason)
						{
							console.log(reason);
						};					
				
					}, function(error){
							console.log(error);
					});
				}), function(reason)
				{
						console.log(reason);
				}  
			}
			reader.onerror = function (evt) {
				document.getElementById("myFile").innerHTML = "error reading file";
			}
		}
		var $el = $('#file-input');
		$el.wrap('<form>').closest('form').get(0).reset();
		$el.unwrap();
		uploadFileAfter = document.getElementById("file-input").files[0];
		console.log(uploadFileAfter);
	 }
	
	  //gives a list of web links for images in the Photos folder
	  function getPhotoLinks()
	  {
		var order = 'folder'
		
		//Line below is hard coded
		var photoDirectory = "'1VsFK73KutpZziLFYIihvXlhPIHpH8zbd' in parents"
		
		
		var isTrashed = "trashed = false"
		//Function returns a list of files in google drive
        var listPromise = Promise.resolve(gapi.client.drive.files.list(
		{    
			'orderBy': order,
			'q' : photoDirectory
		}).then(function(response) 
		{
			console.log(response.result.files);
			var filesList = response.result.files;
			var webLinkList = [];
			getWebLinks( filesList, webLinkList );
			return webLinkList;
		}, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
			apiBackoff(getPhotoLinks());
		}));
			
		listPromise.then(function(value)
		{
			//Do whatever you need with list of Weblinks
			//value is webLinkList
			console.log(value);
			return value;
		}).then(function(value)
		{
			//Do whatever you need with list of Weblinks
			//value is webLinkList
		});
	  }
	 
	  	//Placeholder for the one second delay that will occur when too many API calls
		//are made in a second. (defined as 10 per sec by Google)		
		//Not used
		async function apiBackoff(apiFunction, apiVar1, apiVar2) 
		{
			var delay = 1000;
			console.log('timeout');
			if(filesList)
			{
				console.log('Requests from batch failed');
				setTimeout(function() 
				{  
					apiFunction(apiVar1, apiVar2);
				}, delay);
			}
			else
			{
				setTimeout(function() 
				{  
					console.log('Not weblink, regular call');
					apiFunction();
				}, delay);
			}
		}
		
	//Successfully implemented batching of requests to allow for 10+
	//gets a list of web content links
	function getWebLinks( filesList, webLinkList )
	{
		//Gets web content links for all the photos in the folder
		var i = 0
		var callList = [];
		var httpBatch = gapi.client.newBatch()
		var webLink;
		
		//Adds all requests for webContentLinks in a batch
		while( i < filesList.length )
		{
			currentID = filesList[i].id;
			callList.push(gapi.client.drive.files.get(
			{
				'fileId': currentID,
				fields: 'webContentLink'
			}));
			httpBatch.add(callList[i])
			i++;
		}		
		//Sends batch to Google
		httpBatch.then(function(onFulfilled)
		{
			i = 0;
			myResult = onFulfilled.result;
			parseRes = JSON.stringify(onFulfilled.result);
			fail = parseRes.search('403');
			if(fail == -1)
			{
				while( i < filesList.length )
				{
					callList[i].then(function(response)
					{
						webLink = JSON.parse(response.body);
						webLinkList.push(webLink.webContentLink);
					}, function(reason)
					{
						console.log('Error: ' + reason.result.error.message);
					});
					i++;
				}
			}
			else
			{
				console.log(filesList);
				apiBackoff( getWebLinks, filesList, webLinkList)
			}
		})
	}
	  	
		
	//Old, unfinished, or unused functions
	//listed below:
		
	//Unused
	function sleep(ms) 
	{
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function demo() 
	{
		console.log('Taking a break...');
		await sleep(1000);
		console.log('Two second later');
	}

	//Works but cannot return
	function getFileId( fileName )
	{
		//Pass like "'Name'" to function
		var fileName = "name= " + fileName;
		console.log(fileName);
		var isTrashed = "trashed = false"
		var query = fileName + 'and' + isTrashed;
		var fileID;
		gapi.client.drive.files.list(
		{    
			 'q' : query
		}).then(function(response) 
		{
			console.log(response.result);
			fileID = response.result.files[0].id;
			console.log(fileID)
		}, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
		});
	}
	  
	  //Old Version of function before batching was implemented
	  function getWebLinksOld( filesList, webLinkList, i )
	  {
			//Gets web content links for all the photos in the folder
			while( i < filesList.length )
			{
				currentID = filesList[i].id;
				gapi.client.drive.files.get(
				{
					'fileId': currentID,
					fields: 'webContentLink'
				}).then( function(response) 
				{
					webLink = JSON.parse(response.body);
					webLinkList.push(webLink.webContentLink);
				}, function(reason)
				{
					console.log('Error: ' + reason.result.error.message);
				});
				i++;
			}
			console.log(webLinkList)
	  }
	  
	
	
function onSignIn(googleUser){
// Useful data for your client-side scripts:
	var profile = googleUser.getBasicProfile();
	//console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
 
    });
  }
