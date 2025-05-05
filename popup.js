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
      
      // 向content脚本发送消息，请求检查点赞按钮
      chrome.tabs.sendMessage(currentTab.id, {action: "checkLikeButton"}, function(response) {
        // 创建按钮状态显示区域（如果尚不存在）
        let buttonStatus = document.querySelector('.button-status');
        if (!buttonStatus) {
          buttonStatus = document.createElement('div');
          buttonStatus.className = 'button-status';
          buttonStatus.style.margin = '10px 0';
          buttonStatus.style.padding = '8px';
          buttonStatus.style.borderRadius = '4px';
          buttonStatus.style.backgroundColor = '#e3f2fd';
          buttonStatus.style.color = '#1565c0';
          document.querySelector('.container').insertBefore(buttonStatus, document.querySelector('.footer'));
        }
        
        // 根据响应显示点赞按钮状态
        if (response && response.found) {
          // 检查是否有点赞失败的情况
          if (response.likeFailure && response.likeFailure.failed) {
            buttonStatus.innerHTML = '发现点赞按钮 [' + response.buttonType + ']<br>颜色: ' + response.hexColor + 
                                   '<br>状态: <span style="color:#e53935;font-weight:bold;">点赞操作失败</span>' +
                                   '<br>原因: ' + response.likeFailure.reason +
                                   '<br>建议: 请尝试手动点赞';
            buttonStatus.style.backgroundColor = '#ffebee';
            buttonStatus.style.color = '#c62828';
          } else if (response.needsLike) {
            buttonStatus.innerHTML = '发现点赞按钮 [' + response.buttonType + ']<br>颜色: ' + response.hexColor + '<br>状态: 未点赞，插件将自动点赞';
            buttonStatus.style.backgroundColor = '#fff8e1';
            buttonStatus.style.color = '#ff8f00';
          } else {
            buttonStatus.innerHTML = '发现点赞按钮 [' + response.buttonType + ']<br>颜色: ' + response.hexColor + '<br>状态: 已点赞或无需点赞';
            buttonStatus.style.backgroundColor = '#e8f5e9';
            buttonStatus.style.color = '#2e7d32';
          }
        } else {
          buttonStatus.innerHTML = '未发现点赞按钮<br>可能原因: 页面尚未完全加载或非视频页面';
          buttonStatus.style.backgroundColor = '#ffebee';
          buttonStatus.style.color = '#c62828';
        }
      });
    } else {
      document.querySelector('.status').innerHTML = '当前页面不是bilibili<br>插件仅在bilibili.com生效';
      document.querySelector('.status').style.backgroundColor = '#ffebee';
      document.querySelector('.status').style.color = '#c62828';
    }
  });
});
