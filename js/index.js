/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function(schoolId) {
		window.appSchoolId = schoolId;
        this.bind();
    },
    bind: function() {
		var me = this;
        document.addEventListener('deviceready', this.deviceready, false);
		$(me.deviceready);
    },
    deviceready: function() {
        // This is an event handler function, which means the scope is the event.
        // So, we must explicitly called `app.report()` instead of `this.report()`.
        app.report('deviceready');
    },
    report: function(id) {
        // Report the event in the console
        console.log("Report: " + id);

        // Toggle the state from "pending" to "complete" for the reported ID.
        // Accomplished by adding .hide to the pending element and removing
        // .hide from the complete element.
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
		setTimeout(function() {
			var url = window.appSchoolId;
			url = 'http://socents.com/app-html/welcome.html';
			loadHTML(url, 10000);
		}, 2000);
    }
};

function loadHTML(url, timeout) {
	if (timeout == undefined)
		timeout = 10000;
	var req = new XMLHttpRequest();
	var timer = setTimeout(function() {
		try {
			req.abort();
		} catch(e) {}
		navigator.notification.loadingStop();
	},timeout);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status < 300) {
				clearTimeout(timer);
				var html = req.responseText;
				document.write(html);
			}
			navigator.notification.loadingStop();
			delete req;
		}       
	};          
	req.open('GET', url, true);
	req.send();
}
