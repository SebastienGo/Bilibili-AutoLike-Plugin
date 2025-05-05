// 在页面加载后等待5秒，然后检查元素颜色并点击
console.log('B站自动点赞插件已启动');

// 定义图标状态常量，与background.js中保持一致
const IconState = {
  DEFAULT: 'default',    // 默认状态 - 灰色
  ACTIVE: 'active',      // 活动状态 - B站蓝色
  SUCCESS: 'success',    // 成功状态 - 绿色
  ERROR: 'error'         // 错误状态 - 红色
};

// 更新扩展图标状态的函数
function updateIconState(state) {
  chrome.runtime.sendMessage({
    action: 'updateIconState',
    state: state
  }, response => {
    if (response && response.success) {
      console.log(`图标状态已更新为: ${state}`);
    }
  });
}

// 定义全局变量，记录点赞失败状态
let likeFailureStatus = {
  failed: false,
  buttonType: "",
  reason: ""
};

// 模拟键盘按键Q的函数
function simulateKeyPress(key) {
  console.log('模拟键盘按键:', key);
  
  // 创建keydown事件
  const keyDownEvent = new KeyboardEvent('keydown', {
    key: key,
    code: 'Key' + key.toUpperCase(),
    keyCode: key.toUpperCase().charCodeAt(0),
    which: key.toUpperCase().charCodeAt(0),
    bubbles: true,
    cancelable: true
  });
  
  // 创建keyup事件
  const keyUpEvent = new KeyboardEvent('keyup', {
    key: key,
    code: 'Key' + key.toUpperCase(),
    keyCode: key.toUpperCase().charCodeAt(0),
    which: key.toUpperCase().charCodeAt(0),
    bubbles: true,
    cancelable: true
  });
  
  // 分发事件到文档
  document.dispatchEvent(keyDownEvent);
  document.dispatchEvent(keyUpEvent);
}

// 检查点赞按钮状态并进行操作的函数
function checkAndLikeButton() {
  console.log('开始检测点赞按钮');
  
  // 更新图标为活动状态
  updateIconState(IconState.ACTIVE);
  
  // 查找点赞按钮元素 - 同时支持普通视频和电视剧两种页面样式
  // 首先尝试查找普通视频页面的点赞按钮
  let likeButton = document.querySelector('div.video-like.video-toolbar-left-item');
  let buttonType = "普通视频";
  
  // 如果没找到普通视频的点赞按钮，尝试查找电视剧页面的点赞按钮
  if (!likeButton) {
    likeButton = document.querySelector('span.like#like_info');
    buttonType = "电视剧";
    console.log('尝试查找电视剧页面点赞按钮');
  }
  
  if (likeButton) {
    console.log('找到点赞按钮');
    
    // 获取元素的计算样式
    const computedStyle = window.getComputedStyle(likeButton);
    const color = computedStyle.color;
    
    console.log('点赞按钮颜色:', color);
    
    // 将RGB颜色转换为HEX格式进行比较
    // getComputedStyle通常返回rgb格式，所以需要转换
    function rgbToHex(rgb) {
      // 提取RGB值
      const rgbMatch = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!rgbMatch) return null;
      
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      
      // 转换为HEX
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }
    
    const hexColor = rgbToHex(color);
    console.log('转换后的HEX颜色:', hexColor);
    
    // 检查颜色是否为#A2A7AE或#61666D（不区分大小写）
    if (hexColor && (hexColor.toUpperCase() === '#A2A7AE' || hexColor.toUpperCase() === '#61666D')) {
      console.log('颜色匹配，执行点击');
      // 执行点击
      likeButton.click();
      console.log('已点击点赞按钮');
      
      // 3秒后再次检测点赞状态
      setTimeout(() => {
        console.log('检测点赞是否成功...');
        // 重新获取按钮样式
        const newComputedStyle = window.getComputedStyle(likeButton);
        const newColor = newComputedStyle.color;
        const newHexColor = rgbToHex(newColor);
        
        console.log('点击后按钮颜色:', newHexColor);
        
        // 如果颜色仍然是未点赞状态，尝试使用键盘方式
        if (newHexColor && (newHexColor.toUpperCase() === '#A2A7AE' || newHexColor.toUpperCase() === '#61666D')) {
          console.log('点赞失败，尝试模拟键盘按键Q');
          
          // 尝试模拟Q键
          simulateKeyPress('q');
          
          // 再等待2秒检测是否成功
          setTimeout(() => {
            const finalComputedStyle = window.getComputedStyle(likeButton);
            const finalColor = finalComputedStyle.color;
            const finalHexColor = rgbToHex(finalColor);
            
            console.log('键盘操作后按钮颜色:', finalHexColor);
            
            // 如果仍然失败
            if (finalHexColor && (finalHexColor.toUpperCase() === '#A2A7AE' || finalHexColor.toUpperCase() === '#61666D')) {
              console.log('点赞操作最终失败');
              likeFailureStatus = {
                failed: true,
                buttonType: buttonType,
                reason: "尝试点击和键盘模拟均失败"
              };
              // 设置图标为错误状态
              updateIconState(IconState.ERROR);
            } else {
              console.log('键盘操作点赞成功');
              // 设置图标为成功状态
              updateIconState(IconState.SUCCESS);
            }
          }, 2000);
        } else {
          console.log('点击操作点赞成功');
          // 设置图标为成功状态
          updateIconState(IconState.SUCCESS);
        }
      }, 3000);
    } else {
      console.log('颜色不匹配，不执行点击');
      // 如果已经是点赞状态，同样设置图标为成功
      updateIconState(IconState.SUCCESS);
    }
  } else {
    console.log('未找到点赞按钮');
    // 未找到点赞按钮时，恢复为默认图标状态
    updateIconState(IconState.DEFAULT);
  }
}

// 等待5秒后执行初始检测
setTimeout(checkAndLikeButton, 5000); // 等待5秒(5000毫秒)

// 添加消息监听器，用于响应popup的请求
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "checkLikeButton") {
      console.log('收到查询点赞按钮状态的请求');
      
      // 查找点赞按钮元素 - 同时查找两种类型
      let likeButton = document.querySelector('div.video-like.video-toolbar-left-item');
      let buttonType = "普通视频";
      
      // 如果没找到第一种，尝试查找第二种
      if (!likeButton) {
        likeButton = document.querySelector('span.like#like_info');
        buttonType = "电视剧";
      }
      
      if (likeButton) {
        // 获取元素的计算样式
        const computedStyle = window.getComputedStyle(likeButton);
        const color = computedStyle.color;
        
        // 转换RGB为HEX
        function rgbToHex(rgb) {
          // 提取RGB值
          const rgbMatch = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (!rgbMatch) return null;
          
          const r = parseInt(rgbMatch[1]);
          const g = parseInt(rgbMatch[2]);
          const b = parseInt(rgbMatch[3]);
          
          // 转换为HEX
          return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        }
        
        const hexColor = rgbToHex(color);
        
        // 检查是否为目标颜色
        const isTargetColor = hexColor && (hexColor.toUpperCase() === '#A2A7AE' || hexColor.toUpperCase() === '#61666D');
        
        sendResponse({
          found: true,
          buttonType: buttonType,
          hexColor: hexColor || '未知',
          needsLike: isTargetColor,
          likeFailure: likeFailureStatus
        });
      } else {
        sendResponse({
          found: false,
          buttonType: "未知",
          hexColor: null,
          needsLike: false,
          likeFailure: likeFailureStatus
        });
      }
      return true; // 保持消息通道开放
    }
  }
);
