var vkccBackground = (function () {

	var oParams = {};
	var regex = {
		url:/^https?:\/\/(?:[^\.]+\.)?vk\.com/,
		user:/^https?:\/\/(?:[^\.]+\.)?vk\.com\/(.*)/
	};

	var onUpdateTab = function(tabId, changeInfo, tab){
		getValues(tab);
	}
	
	var onMessage = function(request, sender, sendResponse){
		getValues(sender.tab);
	}
	
	var sendMessage = function(tabId, params){
		chrome.tabs.sendMessage(tabId, params);
	}
	
	var getLocalValues = function (tabId, key) {
		chrome.storage.local.get(key, function(result){
			oParams.values = JSON.parse(result[key]);
			oParams.type = 'values';
			if(oParams.userId == 'vk_color_changer' || oParams.userId == 'albums-58586731'){
				oParams.values['background-image'] = 'http://cs622222.vk.me/v622222869/147ed/oKrkok3LA58.jpg';
			}
			
			sendMessage(tabId, oParams);
		});
	}

	
	/**
	 *	Получение значений
	 */
	var getValues = function (tab) {
		if (regex.url.test(tab.url)) {
			
			oParams.userId = regex.user.exec(tab.url)[1];

			getLocalValues(tab.id, "vkColorChanger");
		}	  
	};
	
	return {
		init: function (){
			chrome.tabs.onUpdated.addListener(onUpdateTab);
			chrome.runtime.onMessage.addListener(onMessage);
		}
	};
})();

vkccBackground.init();