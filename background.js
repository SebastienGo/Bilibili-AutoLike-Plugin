// 定义图标状态
const IconState = {
  DEFAULT: 'default',    // 默认状态 - 灰色
  ACTIVE: 'active',      // 活动状态 - B站蓝色
  SUCCESS: 'success',    // 成功状态 - 绿色
  ERROR: 'error'         // 错误状态 - 红色
};

// 当前图标状态
let currentIconState = IconState.DEFAULT;

// 更新扩展图标
function updateIcon(state) {
  currentIconState = state;
  
  // 根据状态设置不同颜色的图标
  // 注意：我们使用的是SVG图标，这里需要你先用图标生成工具生成对应的PNG文件
  // 或者使用setIcon的颜色覆盖功能（需要Chrome MV3支持）
  
  // 这里的路径假设你已经生成了对应的PNG文件
  const iconPath = {
    16: `images/icon_${state}_16.png`,
    32: `images/icon_${state}_32.png`,
    48: `images/icon_${state}_48.png`,
    128: `images/icon_${state}_128.png`
  };
  
  chrome.action.setIcon({ path: iconPath });
  
  // 设置徽章文本，可以根据需要添加
  // chrome.action.setBadgeText({ text: '' });
  // chrome.action.setBadgeBackgroundColor({ color: '#00A1D6' });
}

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 当页面完成加载且URL包含bilibili.com时
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('bilibili.com')) {
    // 设置图标为活动状态（B站蓝色）
    updateIcon(IconState.ACTIVE);
    
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
      // 出错时设置图标为错误状态
      updateIcon(IconState.ERROR);
    });
  } else if (changeInfo.status === 'complete' && tab.url && !tab.url.includes('bilibili.com')) {
    // 不是B站页面时恢复默认图标
    updateIcon(IconState.DEFAULT);
  }
});

// 监听来自content脚本的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateIconState') {
    updateIcon(message.state);
    sendResponse({ success: true });
  }
  return true;  // 保持消息通道开放
});

// 初始状态设为默认
updateIcon(IconState.DEFAULT);
