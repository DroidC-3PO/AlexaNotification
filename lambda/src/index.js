/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/


/**
 * App ID for the skill
 */
var APP_ID = ""; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * NoteFunction is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var NoteFunction = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
NoteFunction.prototype = Object.create(AlexaSkill.prototype);
NoteFunction.prototype.constructor = NoteFunction;

NoteFunction.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("NoteFunction onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

NoteFunction.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("NoteFunction onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

NoteFunction.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("NoteFunction onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

NoteFunction.prototype.intentHandlers = {
    // register custom intent handlers
    NotificationIntent: function (intent, session, response) {
		var text = intent.slots.text.value;
		response.tell(text);
    },
    HelpIntent: function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the NoteFunction skill.
    var skill  = new NoteFunction();
    skill.execute(event, context);
};

