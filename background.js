var urlRegex = /^https?:\/\/(?:[^\.]+\.)?vk\.com/;
var userRegex = /^https?:\/\/(?:[^\.]+\.)?vk\.com\/(.*)/;

chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		if (urlRegex.test(tab.url)) {
			
			var userId = userRegex.exec(tab.url)[1];

			chrome.storage.local.get('vkColorChanger', function(result){
				var values = JSON.parse(result['vkColorChanger']);
				
				if(userId=='vk_color_changer' || userId == 'albums-58586731'){
					values['background-image'] = 'http://cs622222.vk.me/v622222869/147ed/oKrkok3LA58.jpg';
				}
				
				chrome.tabs.sendMessage(tab.id, { text: "current_url", userId:userId, values:values });
			});
		}
	}
);