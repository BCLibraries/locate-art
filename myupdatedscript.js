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

    var smsfullnumber = document.smsform.fullnumber.value;

    if(smsfullnumber.length != 10){
      document.smsform.fullnumber.focus();
      alert("Enter your full 10-digit phone number!")
      return;
  }

    var pn = smsfullnumber;
    // check for non-numerics
    if(pn.length != 10){
      alert("You must enter 10 digits.");
      return;      
    }

    var v = "0123456789-";        
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
