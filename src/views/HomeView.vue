<script>
  /**
   * 🏠 HomeView.vue - 主頁面組件 (Main Page Component)
   *
   * 這是應用程式的主頁面，顯示全屏世界地圖。
   * 主要功能：
   * - 顯示全屏世界地圖
   * - 使用麥卡托投影
   * - 響應式佈局設計
   *
   * 組件結構：
   * - MapTab: 地圖顯示組件（全屏）
   */

  import MapTab from '../tabs/MapTab.vue';
  import { useDataStore } from '@/stores/dataStore.js';

  export default {
    name: 'HomeView',
    components: { MapTab },
    setup() {
      // 📦 存儲實例
      const dataStore = useDataStore();

      /**
       * 🗺️ 設定地圖實例
       * 將 D3.js 地圖實例傳遞給 dataStore
       * @param {Object} map - D3.js 地圖實例（包含 svg, projection, path）
       */
      const setMapInstance = (map) => dataStore.setMapInstance(map);

      return {
        setMapInstance,
      };
    },
  };
</script>

<template>
  <!-- 🏠 全屏地圖容器 -->
  <div class="fullscreen-container">
    <!-- 🗺️ 地圖組件（全屏） -->
    <MapTab @map-ready="setMapInstance" />
  </div>
</template>

<style>
  @import '../assets/css/common.css';

  .fullscreen-container {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    z-index: 0 !important;
    background: transparent !important;
  }

  /* 確保沒有任何父容器限制大小 */
  body,
  html,
  #app {
    margin: 0 !important;
    padding: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    overflow: hidden !important;
  }
</style>
