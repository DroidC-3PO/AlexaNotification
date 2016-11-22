require('dotenv').load();

var http       = require('http')
  , AlexaSkill = require('./AlexaSkill')
  , APP_ID     = process.env.APP_ID
  , MTA_KEY    = process.env.MTA_KEY;


var Notification = function(){
  AlexaSkill.call(this, APP_ID);
};

Notification.prototype = Object.create(AlexaSkill.prototype);
Notification.prototype.constructor = Notification;

Notification.prototype.eventHandlers.onSessionStarted = function(sessionStartedRequest, session){
  // What happens when the session starts? Optional
  console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
      + ", sessionId: " + session.sessionId);
};

Notification.prototype.eventHandlers.onLaunch = function(launchRequest, session, response){
  // This is when they launch the skill but don't specify what they want. Prompt
  // them for their bus stop
  var output = 'Welcome to Notifications. ' +
    'Say the number of a bus stop to get how far the next bus is away.';

  var reprompt = 'Which bus stop do you want to find more about?';

  response.ask(output, reprompt);

  console.log("onLaunch requestId: " + launchRequest.requestId
      + ", sessionId: " + session.sessionId);
};

Notification.prototype.intentHandlers = {
  NotificationIntent: function(intent, session, response){
	var NotificationMSG = intent.slots.notification.value;
    response.tell(NotificationMSG);
  },

};

// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
    var skill = new Notification();
    skill.execute(event, context);
};

