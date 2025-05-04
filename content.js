// 在页面加载后等待8秒，然后检查元素颜色并点击
console.log('B站自动点赞插件已启动');

// 等待8秒后执行
setTimeout(() => {
  console.log('开始检测点赞按钮');
  
  // 查找点赞按钮元素
  // 这里使用视频页面中点赞按钮的选择器，可能需要根据实际情况调整
  const likeButton = document.querySelector('div.video-like.video-toolbar-left-item');
  
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
    
    // 检查颜色是否为#A2A7AE（不区分大小写）
    if (hexColor && hexColor.toUpperCase() === '#A2A7AE') {
      console.log('颜色匹配，执行点击');
      // 执行点击
      likeButton.click();
      console.log('已点击点赞按钮');
    } else {
      console.log('颜色不匹配，不执行点击');
    }
  } else {
    console.log('未找到点赞按钮');
  }
}, 8000); // 等待8秒(8000毫秒)
