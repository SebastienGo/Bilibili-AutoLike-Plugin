# 🎬 B站自动点赞插件 版本发布说明
# 🎬 Bilibili Auto-Like Plugin Release Notes
# 🎬 ビリビリ自動いいねプラグイン リリースノート
# 🎬 비리비리 자동 좋아요 플러그인 릴리스 노트

## 🔄 v1.0.2 更新说明 (2025-05-07)
## 🔄 v1.0.2 Update Notes (2025-05-07)
## 🔄 v1.0.2 アップデート情報 (2025-05-07)
## 🔄 v1.0.2 업데이트 정보 (2025-05-07)

### 新增功能
### New Features
### 新機能
### 새로운 기능

- 视频切换自动检测：无需刷新页面即可检测新视频并点赞
- Automatic detection when switching videos: detect and like new videos without refreshing the page
- 動画切り替え自動検出：ページを更新せずに新しい動画を検出していいねが可能
- 비디오 전환 자동 감지: 페이지 새로고침 없이 새 비디오 감지 및 좋아요 가능

- 历史状态监听：支持浏览器前进/后退按钮切换视频
- History state monitoring: supports video switching with browser forward/back buttons
- 履歴状態監視：ブラウザの進む/戻るボタンでの動画切り替えをサポート
- 히스토리 상태 모니터링: 브라우저 앞으로/뒤로 버튼으로 비디오 전환 지원

- 定期检测机制：每30秒自动检查当前视频状态
- Periodic detection mechanism: automatically checks current video status every 30 seconds
- 定期検出メカニズム：30秒ごとに現在の動画状態を自動チェック
- 주기적 감지 메커니즘: 30초마다 현재 비디오 상태 자동 확인

- DOM变化监听：检测页面内容动态更新
- DOM mutation observer: detects dynamic updates to page content
- DOM変更監視：ページコンテンツの動的更新を検出
- DOM 변경 감지: 페이지 콘텐츠의 동적 업데이트 감지

### 性能优化
### Performance Optimizations
### パフォーマンス最適化
### 성능 최적화

- 智能冷却机制：避免频繁重复检测
- Intelligent cooling mechanism: prevents frequent repetitive detection
- インテリジェントクーリングメカニズム：頻繁な重複検出を防止
- 지능형 쿨링 메커니즘: 빈번한 반복 감지 방지

- 页面类型判断：只在视频相关页面执行点赞检测
- Page type detection: only performs like detection on video-related pages
- ページタイプ判定：動画関連ページでのみいいね検出を実行
- 페이지 유형 감지: 비디오 관련 페이지에서만 좋아요 감지 실행

- 多格式视频页面支持：支持普通视频、番剧、稍后再看等多种页面
- Multiple video page format support: supports regular videos, anime series, watch later, and other page types
- 多様な動画ページ形式のサポート：通常動画、アニメシリーズ、後で見る等の様々なページをサポート
- 다양한 비디오 페이지 형식 지원: 일반 비디오, 애니메이션 시리즈, 나중에 보기 등 여러 페이지 유형 지원

### 代码架构
### Code Architecture
### コード構造
### 코드 아키텍처

- 重构初始化流程，提高代码可维护性
- Refactored initialization process, improved code maintainability
- 初期化プロセスのリファクタリング、コードの保守性向上
- 초기화 프로세스 리팩토링, 코드 유지보수성 향상

- 增强日志输出，方便调试和理解工作过程
- Enhanced logging output for easier debugging and understanding of operational processes
- デバッグと動作プロセスの理解を容易にするログ出力の強化
- 디버깅과 작동 프로세스 이해를 위한 향상된 로깅 출력

- 定制化时间间隔参数，方便未来调整
- Customizable time interval parameters for future adjustments
- 将来の調整のためのカスタマイズ可能な時間間隔パラメータ
- 향후 조정을 위한 사용자 정의 가능한 시간 간격 매개변수

## 🔄 v1.0.1 更新说明 (2025-05-06)
## 🔄 v1.0.1 Update Notes (2025-05-06)
## 🔄 v1.0.1 アップデート情報 (2025-05-06)
## 🔄 v1.0.1 업데이트 정보 (2025-05-06)

### 修复内容
### Bug Fixes
### バグ修正
### 버그 수정

- 解决了插件在页面加载时可能出现的"Identifier has already been declared"错误问题
- Fixed the "Identifier has already been declared" error that might occur when loading pages
- ページ読み込み時に発生する可能性のある「Identifier has already been declared」エラーを修正
- 페이지 로딩 시 발생할 수 있는 "Identifier has already been declared" 오류 수정

- 优化了插件架构，使用声明式内容脚本注入，提高插件稳定性
- Optimized plugin architecture using declarative content script injection for improved stability
- 宣言的コンテンツスクリプト注入を使用してプラグインアーキテクチャを最適化し、安定性を向上
- 선언적 콘텐츠 스크립트 주입을 사용한 플러그인 아키텍처 최적화로 안정성 향상

- 改进了代码结构，避免变量重复声明问题
- Improved code structure to avoid variable redeclaration issues
- 変数の再宣言問題を回避するためにコード構造を改善
- 변수 재선언 문제를 방지하기 위한 코드 구조 개선

### 技术改进
### Technical Improvements
### 技術的改善
### 기술적 개선

- 使用IIFE（立即执行函数表达式）封装content.js代码，避免全局变量污染
- Used IIFE (Immediately Invoked Function Expression) to encapsulate content.js code, preventing global variable pollution
- IIFE（即時実行関数式）を使用してcontent.jsコードをカプセル化し、グローバル変数の汚染を防止
- IIFE(즉시 실행 함수 표현식)를 사용하여 content.js 코드를 캡슐화하고 전역 변수 오염 방지

- 修改manifest.json配置，改用声明式内容脚本注入方式
- Modified manifest.json configuration to use declarative content script injection
- manifest.json設定を変更し、宣言的コンテンツスクリプト注入方式を採用
- manifest.json 구성을 수정하여 선언적 콘텐츠 스크립트 주입 방식 사용

- 优化background.js代码，移除可能导致重复执行的逻辑
- Optimized background.js code by removing logic that might cause duplicate execution
- 重複実行を引き起こす可能性のあるロジックを削除し、background.jsコードを最適化
- 중복 실행을 유발할 수 있는 로직을 제거하여 background.js 코드 최적화

---

## ✨ v1.0 初始发布 (2025-05-05)
## ✨ v1.0 Initial Release (2025-05-05)
## ✨ v1.0 初回リリース (2025-05-05)
## ✨ v1.0 최초 출시 (2025-05-05)

### 功能特点
### Features
### 機能特徴
### 기능 특징

- 自动检测bilibili.com网站上视频的点赞状态
- Automatically detects the like status of videos on bilibili.com
- bilibili.comウェブサイト上の動画のいいね状態を自動検出
- bilibili.com 웹사이트에서 비디오의 좋아요 상태 자동 감지

- 针对符合条件的视频自动点赞
- Automatically likes videos that meet conditions
- 条件を満たす動画に自動的にいいねを付ける
- 조건을 충족하는 비디오에 자동으로 좋아요 표시

- 智能识别已手动点赞的视频，避免重复操作
- Intelligently recognizes videos that have already been manually liked to avoid duplicate actions
- 既に手動でいいねした動画を智能的に認識し、重複操作を回避
- 이미 수동으로 좋아요 표시된 비디오를 지능적으로 인식하여 중복 작업 방지

- 仅在bilibili.com域名下生效，保障浏览安全
- Only works on the bilibili.com domain, ensuring browsing safety
- bilibili.comドメインでのみ動作し、ブラウジングの安全を確保
- bilibili.com 도메인에서만 작동하여 브라우징 안전 보장

- 等待页面完全加载后执行，确保稳定性
- Executes after the page is fully loaded, ensuring stability
- ページが完全に読み込まれた後に実行され、安定性を確保
- 페이지가 완전히 로드된 후 실행되어 안정성 보장

### 安装包内容
### Package Contents
### パッケージ内容
### 패키지 내용

本发布包含：
This release includes:
このリリースには以下が含まれています：
이 릴리스에 포함된 항목:

- 完整的Chrome扩展源代码
- Complete Chrome extension source code
- 完全なChrome拡張機能のソースコード
- 완전한 Chrome 확장 프로그램 소스 코드

- 中文、英文、日文和韩文版本的使用说明
- Usage instructions in Chinese, English, Japanese, and Korean
- 中国語、英語、日本語、韓国語での使用説明
- 중국어, 영어, 일본어, 한국어로 된 사용 설명서

- 示例图标生成工具
- Sample icon generation tool
- サンプルアイコン生成ツール
- 샘플 아이콘 생성 도구

### 安装方法
### Installation Method
### インストール方法
### 설치 방법

1. 解压下载的zip文件
1. Extract the downloaded zip file
1. ダウンロードしたzipファイルを解凍します
1. 다운로드한 zip 파일 압축 해제

2. 在Chrome浏览器中打开扩展管理页面：`chrome://extensions/`
2. Open the extension management page in Chrome browser: `chrome://extensions/`
2. Chromeブラウザで拡張機能管理ページを開きます：`chrome://extensions/`
2. Chrome 브라우저에서 확장 프로그램 관리 페이지 열기: `chrome://extensions/`

3. 开启右上角的"开发者模式"
3. Enable "Developer mode" in the top-right corner
3. 右上の「デベロッパーモード」をオンにします
3. 오른쪽 상단의 "개발자 모드" 활성화

4. 点击"加载已解压的扩展程序"按钮
4. Click the "Load unpacked extension" button
4. 「パッケージ化されていない拡張機能を読み込む」ボタンをクリックします
4. "압축 해제된 확장 프로그램 로드" 버튼 클릭

5. 选择解压后的文件夹
5. Select the extracted folder
5. 解凍したフォルダを選択します
5. 압축 해제된 폴더 선택
