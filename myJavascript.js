/*
Need To have Developer Accout
To receive Calls
http://sipjs.com/demo-phone
**/


var session;
alert("In Javascript");
var endCall = document.getElementById("endCall");
endCall.addEventListener("click",function(){
	//Terminate The Call
	alert("Ending Call Method Call");
	session.bye();
	alert("Call Ended");
},false);

// FALSE = Bubbling Phase of Event Propagation
 
 var myUri;
 var myUsername;
 var myPassword;
 var userAgent ;
 var createUA = document.getElementById("createUA");
 
 
 
 
 // Create an user Agent for SIP Calling
 
 createUA.addEventListener("click",function(){
	 myUri = document.getElementById("uri").value;
	 myUsername = document.getElementById("username").value;
	 myPassword = document.getElementById("password").value;
	 userAgent = new SIP.UA({
        uri: myUri,
        authorizationUser: myUsername,
        password: myPassword,
		traceSip : true
});

	 
 },false);
 
 
 
 
 
 // Now Determine Whether the Call has Audio or Video : 
 var option={
	media:{
		constraints:{
			audio :true,
			video:true
			
		},
		stream: mediaStream,
		render:{
		remote: document.getElementById("remoteVideo"),
		local: document.getElementById("localVideo")
		}
		
	} 
 };
 
 
 // TargetUserAdd is callee user SIP URI Registered
 
 var TargetUserAdd ;
 var accept = document.getElementById("accept");
 
 // send Invite For Making Call :
 var createSession = document.getElementById("createSession");
 createSession.addEventListener("click",function(){	  
 
 },false);
 
// Making  a Blind Transfer
 var callButton = document.getElementById("callButton");
 callButton.addEventListener("click",function(){
	 TargetUserAdd = document.getElementById("target").value;
	 alert("UserAgent and TargetUserAdd  Must be Filled First True");
	 session = userAgent.invite("sip:user1@nitsurat.onsip.com",options);
// Send DTMF - Dial Tones(Dual Tone Multi Frequency)  :
document.getElementById('1').addEventListener("click", function() {session.dtmf(1);}, false);
document.getElementById('2').addEventListener("click", function() {session.dtmf(2);}, false);
document.getElementById('3').addEventListener("click", function() { session.dtmf(3);}, false);
document.getElementById('4').addEventListener("click", function() { session.dtmf(4);}, false);
document.getElementById('5').addEventListener("click", function() { session.dtmf(5);}, false);
document.getElementById('6').addEventListener("click", function() { session.dtmf(6);}, false);
document.getElementById('7').addEventListener("click", function() { session.dtmf(7);}, false);
document.getElementById('8').addEventListener("click", function() { session.dtmf(8);}, false);
document.getElementById('9').addEventListener("click", function() { session.dtmf(9);}, false);
document.getElementById('0').addEventListener("click", function() { session.dtmf(0);}, false);
session.refer(TargetUserAdd);
	 // Blind Transfer Call Handling 
	 
	//calls the onReferred function when the referred event happens
  session.on('refer', session.followRefer(onReferred));
 function onReferred(request, newSession)
  {
    //attached the received video stream to the Video Elements
    attachMediaStream(remoteVideo, newSession.mediaHandler.getRemoteStreams()[0]);
  }
	 
 },false);
 
 
 // Accept the Call
 accept.addEventListener("click",function(){
	 
	userAgent.on('invite', function (session) {
    session.accept({
        media: {
            render: {
                remote: document.getElementById('remoteVideo'),
                local: document.getElementById('localVideo')
            }
        }
    });
}); 
	 
 },false);
 
 function onConnected() {
    //here you determine whether the call has video and audio

    var options = {
        media: {
            constraints: {
                audio: true,
                video: true
            },
            render: {
                remote: {
                    video: document.getElementById('remoteVideo')
                },
                local: {
                    video: document.getElementById('localVideo')
                }
            }
        }
    };
 } 