<script>
  /**
   * 🏠 App.vue - 應用程式主組件
   *
   * 功能說明：
   * 1. 🏗️ 提供應用程式整體框架和佈局結構
   * 2. ⏳ 管理全域載入狀態和進度顯示
   * 3. 🚀 管理 Vue Router 的路由導航系統
   * 4. 📱 實現響應式滿版佈局，無邊距和空隙
   *
   * 架構說明：
   * - 內容層：路由視圖容器，動態顯示不同頁面組件
   *
   * 設計理念：
   * - 滿版無邊距佈局設計
   * - 模組化組件架構
   */

  export default {
    name: 'App',
  };
</script>

<template>
  <!-- 🏠 App.vue - 主應用程式組件 (Main Application Component) -->
  <!-- 提供應用程式整體框架，實現滿版無空隙佈局 -->
  <div id="app">
    <!-- 📱 主要內容區域 (Main Content Area) -->
    <router-view />
  </div>
</template>

<style>
  /**
 * 🎨 應用程式全域樣式 (Application Global Styles)
 *
 * 引入共用 CSS 並定義應用程式層級的樣式
 * 注意：大部分樣式已移至 common.css 中統一管理
 */

  /* 📦 引入共用樣式表 (Import Common Stylesheets) */
  @import './assets/css/common.css';

  /* 📱 應用程式特定樣式 (App-Specific Styles) */
  /* 強制全屏佈局，覆蓋所有可能的限制 */
  #app {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    z-index: 0 !important;
  }

  /* 確保所有子元素都不會限制大小 */
  #app > * {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }
</style>
