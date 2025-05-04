// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 当页面完成加载且URL包含bilibili.com时
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('bilibili.com')) {
    // 注入content脚本
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    })
    .then(() => {
      console.log('脚本注入成功');
    })
    .catch(err => {
      console.error('脚本注入错误:', err);
    });
  }
});
