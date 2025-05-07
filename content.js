// 在页面加载后等待5秒，然后检查元素颜色并点击
(function() {
  'use strict';

  console.log('B站自动点赞插件已启动');

  // 定义图标状态常量，与background.js中保持一致
  const IconStates = {
    DEFAULT: 'default',    // 默认状态 - 灰色
    ACTIVE: 'active',      // 活动状态 - B站蓝色
    SUCCESS: 'success',    // 成功状态 - 绿色
    ERROR: 'error'         // 错误状态 - 红色
  };

  // 记录当前URL，用于检测URL变化
  let currentUrl = window.location.href;
  
  // 定义检测冷却时间，避免短时间内多次重复检测
  let lastCheckTime = 0;
  const CHECK_COOLDOWN = 2000; // 2秒冷却时间

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
    // 首先检查是否应该执行检测
    if (!shouldCheckLikeButton()) {
      return;
    }
    
    console.log('开始检测点赞按钮');
    
    // 更新图标为活动状态
    updateIconState(IconStates.ACTIVE);
    
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
                updateIconState(IconStates.ERROR);
              } else {
                console.log('键盘操作点赞成功');
                // 设置图标为成功状态
                updateIconState(IconStates.SUCCESS);
              }
            }, 2000);
          } else {
            console.log('点击操作点赞成功');
            // 设置图标为成功状态
            updateIconState(IconStates.SUCCESS);
          }
        }, 3000);
      } else {
        console.log('颜色不匹配，不执行点击');
        // 如果已经是点赞状态，同样设置图标为成功
        updateIconState(IconStates.SUCCESS);
      }
    } else {
      console.log('未找到点赞按钮');
      // 未找到点赞按钮时，恢复为默认图标状态
      updateIconState(IconStates.DEFAULT);
    }
  }

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

  // 判断当前页面是否为视频或番剧页面
  function isVideoPage() {
    const url = window.location.href;
    return url.includes('/video/') || 
           url.includes('/bangumi/play') || 
           url.includes('/list/watchlater') ||
           url.includes('/medialist/play/');
  }

  // 检测是否应进行点赞检查（考虑冷却时间和页面类型）
  function shouldCheckLikeButton() {
    // 检查冷却时间
    const now = Date.now();
    if (now - lastCheckTime < CHECK_COOLDOWN) {
      console.log('冷却时间内，跳过检测');
      return false;
    }
    
    // 检查页面类型
    if (!isVideoPage()) {
      console.log('非视频页面，跳过检测');
      return false;
    }
    
    // 更新最后检测时间
    lastCheckTime = now;
    return true;
  }

  // 改进1: 添加URL变更检测函数
  function checkUrlChange() {
    if (currentUrl !== window.location.href) {
      console.log('检测到URL变更:', window.location.href);
      currentUrl = window.location.href;
      
      // URL变更后延迟5秒执行检测，确保页面完全加载
      setTimeout(checkAndLikeButton, 5000);
    }
  }

  // 改进2: 添加页面历史状态监听
  window.addEventListener('popstate', function() {
    console.log('检测到历史状态变化');
    // 延时重新检测，避免页面元素未加载完成
    setTimeout(checkAndLikeButton, 3000);
  });

  // 改进3: 创建定期检测函数
  function setupIntervalCheck() {
    // 每30秒检查一次当前页面状态，适应长时间浏览场景
    setInterval(function() {
      checkUrlChange(); // 检查URL是否变更
      
      // 如果是视频页面，则尝试检测点赞状态
      if (isVideoPage()) {
        console.log('定时检测点赞状态');
        checkAndLikeButton();
      }
    }, 30000); // 30秒间隔
  }

  // 改进4: 添加DOM变化监听
  function setupMutationObserver() {
    // 创建监听器
    const observer = new MutationObserver(function(mutations) {
      // 当播放器区域变化时，可能表示切换了视频
      const playerChanged = mutations.some(m => {
        const targetId = m.target.id || '';
        const targetClass = m.target.className || '';
        
        return targetId.includes('player') || 
               targetClass.includes('player') || 
               targetId === 'app' || 
               targetId === 'bofqi';
      });
      
      if (playerChanged && isVideoPage()) {
        console.log('检测到播放器区域变化');
        setTimeout(checkAndLikeButton, 3000);
      }
    });
    
    // 开始观察文档变化
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['id', 'class']
    });
    
    console.log('DOM变化监听器已设置');
  }

  // 初始化各种监听和检测机制
  function initialize() {
    // 等待5秒后执行初始检测
    setTimeout(checkAndLikeButton, 5000);
    
    // 设置定期检测
    setupIntervalCheck();
    
    // 设置DOM变化监听
    setupMutationObserver();
    
    console.log('B站自动点赞插件增强功能已初始化');
  }

  // 执行初始化
  initialize();

})();
