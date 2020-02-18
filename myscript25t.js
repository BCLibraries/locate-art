/**
 * I don't _think_ we need any of this Javascript. Maybe the startRequest() function?
 * We can probably just use an HTML-only form.
 */

var xmlHttp;
var svr = "arc.bc.edu";
//var svr = "localhost";
var tn;
var te;
var dv;
function startRequest(carrier){
  // xmlHttp object is only needed if AJAX is being used
   if(window.ActiveXObject){
     xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
   }else if(window.XMLHttpRequest){
     xmlHttp = new XMLHttpRequest();
     //xmlHttp = null;
   }
    var urlac = document.smsform.ac.value;
    var urlex = document.smsform.exchange.value;
    var urltn = document.smsform.telno.value;
    
    if(urlac.length != 3 || urlex.length != 3 || urltn.length != 4){
        document.smsform.ac.focus();
        alert("Enter your full 10-digit phone number.")
        return;
    }
    var pn = urlac + urlex + urltn;
    // check for non-numerics
    if(pn.length != 10){
      alert("You must enter 10 digits.");
      return;      
    }

    var v = "0123456789";        
    for (i=0; i < pn.length; i++) {
      var x = pn.charAt(i);
      if (v.indexOf(x) == -1){
        alert("Enter numbers only -- no dashes or alphabetic characters.");
        return;
      }
    }
    
    var urlmsg = document.smsform.idtext.value;
    urlmsg = urlmsg.replace(/\n/g,"%0D%0A"); //in message, change \n to hex codes for carriage return/line feed
//AJAX url for arc server:
  var urlurl = "http://arc.bc.edu:8080/FloorMap/ToCell.do?areacode=" + urlac + "&exchange=" + urlex + "&telno=" + urltn + "&textmessage=" + urlmsg
//AJAX url for localhost:
//  var urlurl = "http://localhost:8080/FloorMap/ToCell.do?areacode=" + urlac + "&exchange=" + urlex + "&telno=" + urltn + "&textmessage=" + urlmsg
//AJAX processing for SMS service-------------------\

    xmlHttp.open("GET",urlurl, true);                 
    //xmlHttp.onreadystatechange=function(){handleStateChange();}     
    xmlHttp.onreadystatechange=handleStateChange;     
    xmlHttp.send(null);                               
//------------------------------------------------------/
    var frmvis = document.getElementById("framediv");
    var source = document.getElementById("textframe");

//   if(carrier == "Select%20provider:"){
//     alert("Please select your current cell phone service provider from the dropdown list.");
//     var wf = window.frames[0].document.getElementById("carrierList");
//     wf.style.backgroundColor="#FFCCCC";
     //wf.focus();
//   }else{
//     if (carrier == "*"){
//        frmvis.style.visibility = "visible";
//        source.src = "http://" + svr + ":8080/MailIt/Mail.do?seq=0&to=" + pn + "&content=" + urlmsg + "&carrier=*";
//      }else{
//        source.src = "http://" + svr + ":8080/MailIt/Mail.do?seq=1&to=" + pn + "&content=" + urlmsg + "&carrier=" + carrier;
//      }
//   }
}

function clearFrame(){
    document.getElementById("textframe").src="";
    document.getElementById("framediv").style.visibility="hidden";
    document.getElementById("phonepic").style.visibility="hidden";
    toggleHelp("bright");
}

function myPosition(){
    var pw;
    pw = document.getElementById('floorpic').width + 10;
    var pwleft = pw - 10;
    var fbLayer = document.getElementById('feedback');
    if (fbLayer.style.posLeft){
      fbLayer.style.posLeft = pw;
    }else{
      fbLayer.style.left = pw+'px';  
    }
    
    var cbLayer = document.getElementById('cellbutton');
    if (cbLayer.style.posLeft){
      cbLayer.style.posLeft = pw;
    }else{
      cbLayer.style.left = pw+'px';
    }
    
    var shLayer = document.getElementById('shelfnum');
    if (shLayer.style.posLeft){
      shLayer.style.posLeft = pw;
    }else{
      shLayer.style.left = pw+'px';
    }   
    
    var spLayer = document.getElementById('shelfnumpic');
    if (spLayer.style.posLeft){
      spLayer.style.posLeft = 40;
    }else{
      spLayer.style.left = 40+'px';
    }    
}

function handleStateChange(){

    if(xmlHttp.readyState==4){
        if(xmlHttp.status == 200){
            var msg = xmlHttp.responseXML.getElementsByTagName("valid")[0].childNodes[0].nodeValue;
            alert(msg);
           // te = document.createTextNode(msg);
           // dv = document.getElementById("smsresult").childNodes[0];
           // dv.appendChild(te);
        }
    else{
        //alert("Error = " + xmlHttp.status + ":" + xmlHttp.StatusText);
            msg = "Sorry - Text service is not available. Status:" + xmlHttp.status
            alert(msg); 
            //te = document.createTextNode(msg);
            //dv = document.getElementById("smsresult").childNodes[0];
            //dv.appendChild(te);
    }
  }    
}
// ===================================================================
// Author: Matt Kruse <matt@mattkruse.com>
// WWW: http://www.mattkruse.com/
// -------------------------------------------------------------------
// TabNext()
// Function to auto-tab phone field
// Arguments:
//   obj :  The input object (this)
//   event: Either 'up' or 'down' depending on the keypress event
//   len  : Max length of field - tab when input reaches this length
//   next_field: input object to get focus after this one
// -------------------------------------------------------------------
var phone_field_length=0;
function TabNext(obj,event,len,next_field) {
	if (event == "down") {
		phone_field_length=obj.value.length;
		}
	else if (event == "up") {
		if (obj.value.length != phone_field_length) {
			phone_field_length=obj.value.length;
			if (phone_field_length == len) {
				next_field.focus();
				}
			}
		}
	}

function resetSMSbox(){
   document.getElementById("smsbox").style.visibility = 'hidden';
   //dv = document.getElementById("smsresult").childNodes[0];
   //tn = dv.childNodes[1];
   //tn.parentNode.removeChild(tn);
}
function popupMail(source, version){
    var fbLink = "http://library.bc.edu/account/forms/library-feedback.cgi";
    var qs = "?action=ShowForm&source=" + source + "&version=" + version;
    var w = window.open(fbLink + qs,"win2","height=400,width=540, scrollbars,menubar,resizable");
}
function toggleHelp(dimBright){
    var phn = document.getElementById('phonepic');
    if (phn.style.visibility == "visible"){
        phn.style.visibility = "hidden";
    }
    var bkground = document.getElementById('floorpic');
    var balloon = document.getElementById('balloonpic');
    if (dimBright == "dim"){
      if (balloon.style.posLeft){
        bkground.style.filter = "alpha(opacity=40)";
        balloon.style.filter = "alpha(opacity=40)";
      }else{
        bkground.style.opacity = 0.4;
        balloon.style.opacity = 0.4;
      }
    }else{
      if (balloon.style.posLeft){
        bkground.style.filter = "alpha(opacity=100)";
        balloon.style.filter = "alpha(opacity=100)";
      }else{
        bkground.style.opacity = 1.0;
        balloon.style.opacity = 1.0;
      }
    }
}