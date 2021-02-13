$(document).ready(function() {
    $('#apbtn').click(function(e) {
        $('#exname').trigger('click');
	appendData();
    });
});  
var CLIENT_ID = "278334787326-bll5bb7j76upbaitsrbt9p39agh7asvv.apps.googleusercontent.com";
      var API_KEY = "AIzaSyCveBWiB6ElXTqMzP0oJ1CB8U4UqLJTREU";
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
      var sheetid='1Hh2p6hmeOK2N_SJAVpsMM3J2CfIKaEfBa8z3bucv3l0';//'1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
      
      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          //listMajors();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      function appendPre(message) {
        var pre = document.getElementById('content');
        //var textContent = document.createTextNode(message + '\n');
        pre.innerHTML=message;
      }

      function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: sheetid,
          range: "Sheet1!A1:D3"
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            //appendPre('Name, Major:');
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              // Print columns A and E, which correspond to indices 0 and 4.
              appendPre(row[0] + ', ' + row[1]+ ', ' + row[2]+ ', ' + row[3]);
            }
          } else {
            appendPre('No data found.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      }

function appendData(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	if(dd<10)
    		dd='0'+dd;
	if(mm<10) 
    		mm='0'+mm;
	today = dd+'-'+mm+'-'+yyyy;
	var exname=document.getElementById('exname').value;
	var amt=document.getElementById('amt').value;
	var typ=document.getElementById('cd').checked?'D':'C'; 
	var obj = {"spreadsheetId": sheetid,
		   "majorDimension":"ROWS",
   		   "range": "Sheet1!A:D",
   		   "valueInputOption":"RAW",
   		   "values": [[today,exname,amt,typ]]
   		   }
	var request = gapi.client.sheets.spreadsheets.values.append(obj,value_input_option='USER_ENTERED');
      request.then(function(response) {
        appendPre("Success->"+exname);
	document.getElementById('exname').value='';
	document.getElementById('amt').value='';
      }, function(reason) {
        appendPre('Error')//+ reason.result.error.message);
      });
	}
