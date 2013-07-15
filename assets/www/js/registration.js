	        //Let us create the XML http object
	        var xmlHttp = null;
	
	        $("#registration").live(
	            "pageshow",
	            function (event) {
	                if ($("input:text#username").val() != "") {
	                    $("#status").text("Status: test");
	                } else {
	
	                    var dataRequest = "";
	
	                    if (window.XMLHttpRequest) {
	                        //for new browsers
	                        xmlHttp = new XMLHttpRequest();
	                    }
	                    else if (window.ActiveXObject) {
	                        //for old ones
	                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	                    }
	
	                    if (xmlHttp != null) {
	                        //Handle the response of this async request we just made(subscribe to callback)
	                        xmlHttp.onreadystatechange = state_Change;
	
	                        //eveyhthing so far is just fine, lets proceed                        
	                        xmlHttp.open("POST", "http://localhost:24663/registered.aspx", true);
	                        xmlHttp.withCredentials = true;
	                        xmlHttp.setRequestHeader("Content-Type", "text/xml");
	                        xmlHttp.setRequestHeader("Proxy-Connection", "Keep-Alive");
	                        xmlHttp.setRequestHeader("REG_HDD_Serial", "ff23d46ae5ff6e38c1fd12a44fc3e8272497ebbb");
	                        xmlHttp.setRequestHeader("REG_Pass", "ArmServicesIPhone2012");
	
	                        xmlHttp.send(dataRequest);
	                    }
	
	                    return false;
	                }
	            }
	
	        );
	
	        //Handle the response of this async request
	        function state_Change() {
	            if (xmlHttp.readyState == 4) {
	                // 4 = â€œloadedâ€ 
	                if (xmlHttp.status == 200) {
	                    var strValue = xmlHttp.getResponseHeader("Return-Value");
	
	                    if (strValue == "0") {
	                        $("#status").text("Status: Registered Ok");
	                    } else if (strValue == "2") {
	                        $("#status").text("Status: No Registration");
	                    } else if (strValue == "3") {
	                        $("#status").text("Status: Not Authorized");
	                    } else {
	                        $("#status").text("Status: No Registration");
	                    }
	                }
	            }
	        }
	    