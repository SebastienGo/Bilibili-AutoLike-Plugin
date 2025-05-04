// 弹出窗口的脚本
document.addEventListener('DOMContentLoaded', function() {
  // 获取当前标签页信息
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    
    // 检查当前页面是否是bilibili网站
    if (currentTab.url && currentTab.url.includes('bilibili.com')) {
      document.querySelector('.status').innerHTML = '插件已启用<br>当前页面: bilibili';
      document.querySelector('.status').style.backgroundColor = '#e8f5e9';
      document.querySelector('.status').style.color = '#2e7d32';
    } else {
      document.querySelector('.status').innerHTML = '当前页面不是bilibili<br>插件仅在bilibili.com生效';
      document.querySelector('.status').style.backgroundColor = '#ffebee';
      document.querySelector('.status').style.color = '#c62828';
    }
  });
});
