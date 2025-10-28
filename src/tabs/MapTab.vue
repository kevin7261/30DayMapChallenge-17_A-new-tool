<script>
  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * 🗺️ MapTab.vue - MapLibre GL JS 台灣縣市 3D 地圖組件
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * @fileoverview
   * 這是一個基於 MapLibre GL JS 的台灣縣市 3D 地圖視覺化組件。
   * 本組件負責載入、處理和渲染台灣縣市邊界的 GeoJSON 數據，並支持 3D 視角。
   *
   * ─────────────────────────────────────────────────────────────────────────
   * 📋 核心功能
   * ─────────────────────────────────────────────────────────────────────────
   * 1. 縣市邊界渲染：
   *    ✓ 載入 直轄市、縣(市)界線1140318.geojson
   *    ✓ 以 3D extrusion 方式繪製所有台灣縣市邊界
   *    ✓ 每個縣市使用不同顏色
   *
   * 2. 視覺元素：
   *    ✓ 3D 立體縣市區域（22種不同顏色）
   *    ✓ 黑色縣市邊界線
   *    ✓ 純灰色背景（無底圖，簡潔設計）
   *    ✓ 核電廠位置標記（紅色圓點）
   *    ✓ 核電廠影響範圍立體半球（平滑的半圓球，球心在地面）
   *      - 使用 100 層薄圓環，層間重疊創建平滑半球
   *      - 球體半徑 30 公里
   *      - 球心位於地面的核電廠座標（高度 0）
   *      - 半球高度從地面到 30 公里
   *      - 極淡的紅色，非常平滑無階梯感
   *    ✓ 核電廠名稱標籤（紅色文字）
   *
   * 3. 交互功能：
   *    ✓ 滾輪縮放控制
   *    ✓ 拖動平移導航
   *    ✓ 右鍵拖動旋轉視角（支援 3D）
   *    ✓ 傾斜視角控制
   *    ✓ 預設從正上方往下看（俯視視角）
   *    ✓ 每個縣市隨機高度（30-80 公里）
   *    ✓ 無懸停效果（已移除所有 popup 和滑鼠交互）
   *    ✓ 無地圖控件按鈕（已移除所有導航控制器）
   *
   * ─────────────────────────────────────────────────────────────────────────
   * ⚛️ 核電廠標記
   * ─────────────────────────────────────────────────────────────────────────
   * 核一廠（已除役）：北緯25°17′50.7″，東經121°32′44.2″
   * 核二廠（已除役）：北緯25°12′0.5″，東經121°40′17.3″
   * 核三廠（運轉中）：北緯21°59′47.5″，東經120°45′39.8″
   * 核四廠（封存中）：北緯25°02′18″，東經121°55′27″
   *
   * 每座核電廠標記包含：
   * - 紅色圓點標記（半徑 8 像素，白色邊框）
   * - 立體半球影響範圍（平滑的半圓球，球心在地面的核電廠座標）
   *   ・ 球體技術：100 層薄圓環，層間重疊創建平滑過渡效果
   *   ・ 數學公式：使用球體方程 r² = R² - h²，計算每層的半徑
   *   ・ 球心位置：地面的核電廠座標（高度 0）
   *   ・ 球體半徑：30 公里（圓形多邊形，64個邊）
   *   ・ 半球高度：從地面到 30 公里（只有上半球）
   *   ・ 每層厚度：約 450 米，且有 50% 重疊
   *   ・ 顏色：極淡的紅色（底層 0.025，頂層 0.015，若隱若現）
   *   ・ 邊界線：紅色實線（寬度 2 像素，透明度 15%）
   *   ・ 球體效果：非常平滑的半圓球形，無階梯感，極淡優雅
   * - 名稱標籤（紅色文字，白色光暈）
   * - 無懸停效果（按照需求移除所有交互）
   *
   * ─────────────────────────────────────────────────────────────────────────
   * 🎨 配色主題
   * ─────────────────────────────────────────────────────────────────────────
   * 每個縣市都有獨特的顏色配置：
   * 臺北市 → #FF6B6B (紅色系)
   * 新北市 → #4ECDC4 (青綠色)
   * 基隆市 → #45B7D1 (天藍色)
   * 桃園市 → #96CEB4 (薄荷綠)
   * 新竹市 → #FFEAA7 (淡黃色)
   * 新竹縣 → #DFE6E9 (淡灰色)
   * 苗栗縣 → #74B9FF (藍色)
   * 臺中市 → #A29BFE (紫色)
   * 彰化縣 → #FD79A8 (粉紅色)
   * 南投縣 → #FDCB6E (金黃色)
   * 雲林縣 → #6C5CE7 (深紫色)
   * 嘉義市 → #00B894 (綠色)
   * 嘉義縣 → #00CEC9 (藍綠色)
   * 臺南市 → #E17055 (橘紅色)
   * 高雄市 → #0984E3 (藍色)
   * 屏東縣 → #55EFC4 (淡綠色)
   * 宜蘭縣 → #A8E6CF (淺綠色)
   * 花蓮縣 → #FFD93D (黃色)
   * 臺東縣 → #FF8B94 (粉色)
   * 澎湖縣 → #B4A7D6 (淡紫色)
   * 金門縣 → #F3A683 (桃色)
   * 連江縣 → #81ECEC (青色)
   *
   * ─────────────────────────────────────────────────────────────────────────
   * 🛠️ 技術棧
   * ─────────────────────────────────────────────────────────────────────────
   * @requires vue                 - Vue 3.2+ (Composition API)
   * @requires maplibre-gl         - MapLibre GL JS (3D 地圖庫)
   * @requires @/stores/dataStore  - Pinia 狀態管理
   *
   * ─────────────────────────────────────────────────────────────────────────
   * 📁 數據來源
   * ─────────────────────────────────────────────────────────────────────────
   * 縣市邊界數據：直轄市、縣(市)界線1140318.geojson
   * 路徑：public/data/geojson/直轄市、縣(市)界線1140318.geojson
   *
   * ─────────────────────────────────────────────────────────────────────────
   * 🔧 使用方式
   * ─────────────────────────────────────────────────────────────────────────
   * <MapTab @map-ready="handleMapReady" />
   *
   * @event map-ready - 地圖初始化完成時觸發，返回地圖實例
   *
   * ─────────────────────────────────────────────────────────────────────────
   * 📝 維護者
   * ─────────────────────────────────────────────────────────────────────────
   * @author Kevin Cheng
   * @version 14.0.0
   * @since 2025
   * @license MIT
   *
   * ═══════════════════════════════════════════════════════════════════════════
   */

  // ═══════════════════════════════════════════════════════════════════════════
  // 📦 依賴導入 (Dependencies Import)
  // ═══════════════════════════════════════════════════════════════════════════

  // 從 Vue 3 核心庫導入 Composition API 所需的功能
  import { ref, onMounted, onUnmounted, nextTick } from 'vue'; // ref: 創建響應式引用; onMounted: 組件掛載鉤子; onUnmounted: 組件卸載鉤子; nextTick: 等待 DOM 更新完成

  // 導入 MapLibre GL JS 地圖庫及其樣式
  import maplibregl from 'maplibre-gl'; // MapLibre GL JS 核心庫，用於渲染 WebGL 地圖
  import 'maplibre-gl/dist/maplibre-gl.css'; // MapLibre GL JS 的 CSS 樣式文件

  // 從 Pinia 狀態管理導入數據存儲
  import { useDataStore } from '@/stores/dataStore'; // 數據存儲 hook，用於管理全局地圖狀態

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎯 組件定義 (Component Definition)
  // ═══════════════════════════════════════════════════════════════════════════

  export default {
    // 導出 Vue 組件配置對象
    name: 'MapTab', // 組件名稱，用於調試和 Vue DevTools 中識別

    // 聲明組件會觸發的事件
    emits: [
      // emits 選項，用於聲明組件會觸發哪些事件
      'map-ready', // 'map-ready' 事件：地圖初始化完成時觸發，傳遞地圖實例給父組件
    ], // 事件列表結束

    /**
     * ───────────────────────────────────────────────────────────────────────
     * 🎬 組件設置函數 (Component Setup Function)
     * ───────────────────────────────────────────────────────────────────────
     * 使用 Vue 3 Composition API 設置組件邏輯
     *
     * @param {Object} _ - Props（本組件不使用，用 _ 表示忽略）
     * @param {Object} context - 設置上下文，包含 emit、attrs、slots、expose
     * @param {Function} context.emit - 事件觸發函數，用於向父組件發送事件
     * @returns {Object} 返回模板可用的響應式數據和方法
     */
    setup(_, { emit }) {
      // setup 函數：組件的邏輯入口點，接收 props 和 context
      // ═══════════════════════════════════════════════════════════════════════
      // 📦 狀態管理與依賴 (State Management & Dependencies)
      // ═══════════════════════════════════════════════════════════════════════

      // 初始化 Pinia 數據存儲實例
      const dataStore = useDataStore(); // 調用 useDataStore hook 獲取數據存儲實例，用於全局狀態管理

      // ═══════════════════════════════════════════════════════════════════════
      // 🗺️ 地圖相關變數 (Map-Related Variables)
      // ═══════════════════════════════════════════════════════════════════════

      /**
       * 地圖 DOM 容器引用
       * 用於綁定到模板中的 div 元素，讓 MapLibre 可以在此容器中渲染地圖
       * @type {Ref<HTMLElement|null>}
       */
      const mapContainer = ref(null); // ref(null): 創建響應式引用，初始值為 null，稍後綁定到模板的 div 元素

      /**
       * MapLibre GL 地圖實例
       * 存儲創建的地圖對象，用於操作地圖（如添加圖層、控制視角等）
       * @type {maplibregl.Map|null}
       */
      let map = null; // 初始化為 null，在 createMap() 函數中賦值為 MapLibre Map 實例

      // ═══════════════════════════════════════════════════════════════════════
      // 🎛️ 控制狀態 (Control States)
      // ═══════════════════════════════════════════════════════════════════════

      /**
       * 地圖就緒狀態標記
       * true = 地圖已初始化完成並可以使用
       * false = 尚未初始化或初始化失敗
       * @type {Ref<boolean>}
       */
      const isMapReady = ref(false); // ref(false): 創建響應式布爾值，初始為 false，地圖載入後設為 true

      /**
       * 地圖容器唯一 ID
       * 使用隨機字符串確保多實例時不會衝突
       * 例如：'maplibre-map-a7x3k9z'
       * @type {Ref<string>}
       */
      const mapContainerId = ref(`maplibre-map-${Math.random().toString(36).substr(2, 9)}`); // 生成隨機 ID：Math.random() 生成隨機數，toString(36) 轉為 36 進制字符串，substr(2, 9) 取 9 個字符

      // ═══════════════════════════════════════════════════════════════════════
      // 📊 GeoJSON 數據儲存 (GeoJSON Data Storage)
      // ═══════════════════════════════════════════════════════════════════════

      /**
       * 縣市 GeoJSON 數據
       * 存儲從 public/data/geojson/ 載入的台灣縣市邊界數據
       * 數據格式：{ type: 'FeatureCollection', features: [...] }
       * 來源：直轄市、縣(市)界線1140318.geojson
       * @type {Ref<Object|null>}
       */
      const countyData = ref(null); // ref(null): 創建響應式引用，初始為 null，載入數據後存儲 GeoJSON 對象

      /**
       * 📥 載入台灣縣市 GeoJSON 數據
       * 使用 fetch API 從 public 目錄載入 GeoJSON 檔案
       * @returns {Promise<boolean>} 成功返回 true，失敗返回 false
       */
      const loadCountyData = async () => {
        // async: 標記為異步函數，可以使用 await
        try {
          // try-catch: 捕獲異常，處理載入失敗的情況
          console.log('[MapTab] 開始載入台灣縣市 GeoJSON 數據...'); // 輸出日誌：記錄開始載入數據

          // 使用 fetch API 載入縣市 GeoJSON 檔案
          const countyResponse = await fetch(
            // await: 等待 fetch 完成，返回 Response 對象
            `${process.env.BASE_URL}data/geojson/直轄市、縣(市)界線1140318.geojson` // process.env.BASE_URL: 從環境變量獲取基礎路徑（如 '/30DayMapChallenge-17_A-new-tool/'）
          ); // fetch: 發送 HTTP GET 請求載入 GeoJSON 檔案

          // 檢查 HTTP 響應狀態是否成功（200-299）
          if (!countyResponse.ok) {
            // !countyResponse.ok: 檢查響應是否失敗（狀態碼不在 200-299 範圍）
            throw new Error(`縣市數據載入失敗: HTTP ${countyResponse.status}`); // 拋出錯誤：包含 HTTP 狀態碼的錯誤訊息
          } // if 結束：響應失敗處理

          // 解析響應的 JSON 數據並存儲到 countyData
          countyData.value = await countyResponse.json(); // await countyResponse.json(): 等待解析 JSON，返回 JavaScript 對象; .value: 訪問 ref 的實際值

          console.log('[MapTab] 台灣縣市數據載入成功'); // 輸出日誌：記錄數據載入成功
          console.log('  - 縣市數量:', countyData.value.features?.length || 0); // 輸出日誌：記錄載入的縣市數量; ?.length: 可選鍊，避免 undefined 錯誤; || 0: 如果為 undefined 則返回 0

          return true; // 返回 true 表示載入成功
        } catch (error) {
          // catch: 捕獲 try 區塊中的任何錯誤
          console.error('[MapTab] 台灣縣市數據載入失敗:', error); // 輸出錯誤日誌：記錄錯誤詳情
          return false; // 返回 false 表示載入失敗
        } // try-catch 結束
      }; // loadCountyData 函數結束

      /**
       * 🔵 創建圓形多邊形 GeoJSON
       * 根據中心點和半徑生成圓形的多邊形座標
       * @param {number} centerLon - 中心點經度
       * @param {number} centerLat - 中心點緯度
       * @param {number} radiusInMeters - 半徑（單位：米）
       * @param {number} points - 圓形的邊數（越多越圓滑）
       * @returns {Array} 圓形多邊形的座標陣列
       */
      const createCirclePolygon = (centerLon, centerLat, radiusInMeters, points = 64) => {
        // createCirclePolygon: 創建圓形多邊形函數
        const coords = []; // 初始化座標陣列
        const distanceX = radiusInMeters / (111320 * Math.cos((centerLat * Math.PI) / 180)); // 計算經度方向的距離（考慮緯度影響）
        const distanceY = radiusInMeters / 110540; // 計算緯度方向的距離（1度緯度約等於 110540 米）

        for (let i = 0; i < points; i++) {
          // 遍歷每個點
          const theta = (i / points) * (2 * Math.PI); // 計算當前點的角度（弧度）
          const x = distanceX * Math.cos(theta); // 計算 x 方向偏移（經度）
          const y = distanceY * Math.sin(theta); // 計算 y 方向偏移（緯度）
          coords.push([centerLon + x, centerLat + y]); // 添加座標點
        } // for 結束
        coords.push(coords[0]); // 閉合多邊形（最後一點等於第一點）
        return coords; // 返回座標陣列
      }; // createCirclePolygon 函數結束

      /**
       * ⚛️ 添加核電廠標記和影響範圍圓球
       * 在地圖上標記台灣4座核電廠的位置，並繪製半徑30公里的立體圓球（球體）
       */
      const addNuclearPlants = () => {
        // 核電廠基本資料（位置和資訊）
        const plants = [
          // 核電廠陣列
          {
            name: '核一廠',
            fullName: '核一廠（已除役）',
            status: '已除役',
            lon: 121.545611,
            lat: 25.297417,
          }, // 核一廠
          {
            name: '核二廠',
            fullName: '核二廠（已除役）',
            status: '已除役',
            lon: 121.671472,
            lat: 25.200139,
          }, // 核二廠
          {
            name: '核三廠',
            fullName: '核三廠',
            status: '運轉中',
            lon: 120.761056,
            lat: 21.996528,
          }, // 核三廠
          {
            name: '核四廠',
            fullName: '核四廠（封存中）',
            status: '封存中',
            lon: 121.924167,
            lat: 25.038333,
          }, // 核四廠
        ]; // plants 陣列結束

        // 創建平滑的半圓球效果：圓心在地面的核電廠座標位置
        const layers = 100; // 球體的層數（越多越圓滑，100 層讓球體非常平滑）
        const sphereRadius = 30000; // 球體半徑（米）
        const centerHeight = 0; // 球心高度（米），設為 0，因為球心在地面

        // 為每一層創建 GeoJSON 數據
        const sphereLayersData = []; // 存儲所有層的數據陣列

        for (let layer = 0; layer < layers; layer++) {
          // 遍歷每一層
          // 計算當前層相對於球心的高度偏移（從 0 到 +radius，只要上半球）
          // 使用均勻分布的高度
          const heightOffset = (layer / (layers - 1)) * sphereRadius; // heightOffset: 相對於球心的高度偏移（0 到 30km）
          const currentHeight = centerHeight + heightOffset; // currentHeight: 當前層的絕對高度（從地面往上）

          // 使用球體方程計算當前層的半徑：r² = R² - h²
          // 其中 R 是球體半徑，h 是相對於球心的高度偏移
          const radiusSquared = sphereRadius * sphereRadius - heightOffset * heightOffset; // radiusSquared: 半徑平方

          // 如果半徑平方為負數（理論上不應該發生），跳過這一層
          if (radiusSquared < 0) continue; // continue: 跳過當前層

          const currentRadius = Math.sqrt(radiusSquared); // currentRadius: 當前層的半徑（使用開方）

          // 為每個核電廠在當前層創建圓環
          const features = plants.map((plant) => ({
            // features: 將每個核電廠轉換為 Feature
            type: 'Feature', // type: 要素類型
            properties: {
              // properties: 要素屬性
              name: plant.name, // name: 核電廠名稱
              fullName: plant.fullName, // fullName: 完整名稱
              status: plant.status, // status: 運轉狀態
              layer: layer, // layer: 當前層數（用於調試）
            }, // properties 結束
            geometry: {
              // geometry: 幾何形狀
              type: 'Polygon', // type: 多邊形類型
              coordinates: [createCirclePolygon(plant.lon, plant.lat, currentRadius)], // coordinates: 創建圓形座標
            }, // geometry 結束
          })); // map 結束

          // 計算當前層的基礎高度（讓層之間有輕微重疊，創造平滑過渡）
          const layerThickness = (sphereRadius / layers) * 1.5; // layerThickness: 每層的厚度（增加 50% 讓層重疊）
          const baseHeight = Math.max(0, currentHeight - layerThickness); // baseHeight: 當前層的基礎高度（不低於地面）

          // 將當前層的數據添加到陣列
          sphereLayersData.push({
            // 層數據對象
            type: 'FeatureCollection', // type: 數據類型為 FeatureCollection
            features: features, // features: 當前層的所有要素
            height: currentHeight, // height: 當前層的高度（用於設置 fill-extrusion-height）
            base: baseHeight, // base: 當前層的基礎高度
          }); // push 結束
        } // for 結束：層遍歷結束

        // 定義核電廠點標記 GeoJSON 數據（用於中心點標記）
        const nuclearPlantsData = {
          // GeoJSON 格式：FeatureCollection 包含多個 Feature
          type: 'FeatureCollection', // type: 數據類型為 FeatureCollection
          features: [
            // Feature 陣列：每個 Feature 代表一座核電廠
            {
              // 核一廠（已除役）
              type: 'Feature', // type: 要素類型
              properties: {
                // properties: 要素屬性
                name: '核一廠', // name: 核電廠名稱
                status: '已除役', // status: 運轉狀態
                fullName: '核一廠（已除役）', // fullName: 完整名稱
                radius: 30000, // radius: 影響範圍半徑（單位：米）
              }, // properties 結束
              geometry: {
                // geometry: 幾何形狀
                type: 'Point', // type: 點類型
                coordinates: [121.545611, 25.297417], // coordinates: [經度, 緯度]，北緯25°17′50.7″，東經121°32′44.2″
              }, // geometry 結束
            }, // 核一廠結束
            {
              // 核二廠（已除役）
              type: 'Feature', // type: 要素類型
              properties: {
                // properties: 要素屬性
                name: '核二廠', // name: 核電廠名稱
                status: '已除役', // status: 運轉狀態
                fullName: '核二廠（已除役）', // fullName: 完整名稱
                radius: 30000, // radius: 影響範圍半徑（單位：米）
              }, // properties 結束
              geometry: {
                // geometry: 幾何形狀
                type: 'Point', // type: 點類型
                coordinates: [121.671472, 25.200139], // coordinates: [經度, 緯度]，北緯25°12′0.5″，東經121°40′17.3″
              }, // geometry 結束
            }, // 核二廠結束
            {
              // 核三廠（運轉中）
              type: 'Feature', // type: 要素類型
              properties: {
                // properties: 要素屬性
                name: '核三廠', // name: 核電廠名稱
                status: '運轉中', // status: 運轉狀態
                fullName: '核三廠', // fullName: 完整名稱
                radius: 30000, // radius: 影響範圍半徑（單位：米）
              }, // properties 結束
              geometry: {
                // geometry: 幾何形狀
                type: 'Point', // type: 點類型
                coordinates: [120.761056, 21.996528], // coordinates: [經度, 緯度]，北緯21°59′47.5″，東經120°45′39.8″
              }, // geometry 結束
            }, // 核三廠結束
            {
              // 核四廠（封存中）
              type: 'Feature', // type: 要素類型
              properties: {
                // properties: 要素屬性
                name: '核四廠', // name: 核電廠名稱
                status: '封存中', // status: 運轉狀態
                fullName: '核四廠（封存中）', // fullName: 完整名稱
                radius: 30000, // radius: 影響範圍半徑（單位：米）
              }, // properties 結束
              geometry: {
                // geometry: 幾何形狀
                type: 'Point', // type: 點類型
                coordinates: [121.924167, 25.038333], // coordinates: [經度, 緯度]，北緯25°02′18″，東經121°55′27″
              }, // geometry 結束
            }, // 核四廠結束
          ], // features 陣列結束
        }; // nuclearPlantsData 結束

        // 添加核電廠點數據源到地圖
        map.addSource('nuclear-plants', {
          // addSource: 添加數據源; 'nuclear-plants': 數據源 ID
          type: 'geojson', // type: 數據源類型為 GeoJSON
          data: nuclearPlantsData, // data: 指定 GeoJSON 數據對象
        }); // addSource 結束

        // 為每一層添加數據源和圖層（創建真正的球體效果）
        sphereLayersData.forEach((layerData, index) => {
          // forEach: 遍歷每一層
          const sourceId = `nuclear-sphere-layer-${index}`; // sourceId: 數據源 ID，每層唯一
          const layerId = `nuclear-sphere-3d-${index}`; // layerId: 圖層 ID，每層唯一

          // 添加當前層的數據源
          map.addSource(sourceId, {
            // addSource: 添加數據源
            type: 'geojson', // type: 數據源類型為 GeoJSON
            data: layerData, // data: 當前層的 GeoJSON 數據
          }); // addSource 結束

          // 計算當前層的透明度（非常淡的紅色，幾乎若隱若現）
          const heightRatio = index / (layers - 1); // heightRatio: 當前層高度比例（0 到 1）
          const opacity = 0.025 - heightRatio * 0.01; // opacity: 透明度，底層 0.025，頂層 0.015（極淡的紅色）

          // 添加當前層的 3D 圖層
          map.addLayer({
            // addLayer: 添加圖層
            id: layerId, // id: 圖層唯一標識符
            type: 'fill-extrusion', // type: 圖層類型為 fill-extrusion（3D 立體填充）
            source: sourceId, // source: 使用當前層的數據源 ID
            paint: {
              // paint: 繪製屬性
              'fill-extrusion-color': '#FF0000', // 'fill-extrusion-color': 立體填充顏色設為紅色（警示色）
              'fill-extrusion-height': layerData.height, // 'fill-extrusion-height': 使用當前層計算的高度
              'fill-extrusion-base': layerData.base, // 'fill-extrusion-base': 使用當前層的基礎高度（創建球體效果）
              'fill-extrusion-opacity': opacity, // 'fill-extrusion-opacity': 使用計算的透明度
            }, // paint 屬性結束
          }); // addLayer 結束
        }); // forEach 結束：所有層添加完成

        // 添加最外層的邊界線圖層（使用最後一層的數據）
        const outlineSourceId = 'nuclear-sphere-outline-source'; // outlineSourceId: 邊界線數據源 ID
        map.addSource(outlineSourceId, {
          // addSource: 添加邊界線數據源
          type: 'geojson', // type: 數據源類型為 GeoJSON
          data: sphereLayersData[sphereLayersData.length - 1], // data: 使用最外層（最大半徑）的數據
        }); // addSource 結束

        // 添加邊界線圖層（增強球體輪廓）
        map.addLayer({
          // addLayer: 添加圖層
          id: 'nuclear-spheres-outline', // id: 圖層唯一標識符
          type: 'line', // type: 圖層類型為 line（線條）
          source: outlineSourceId, // source: 使用邊界線數據源 ID
          paint: {
            // paint: 繪製屬性
            'line-color': '#FF0000', // 'line-color': 線條顏色設為紅色
            'line-width': 2, // 'line-width': 線條寬度設為 2 像素
            'line-opacity': 0.15, // 'line-opacity': 線條透明度設為 0.15（15%，非常淡）
          }, // paint 屬性結束
        }); // addLayer 結束：邊界線圖層

        // 添加核電廠標記點圖層（在圓的中心）
        map.addLayer({
          // addLayer: 添加圖層
          id: 'nuclear-plants-points', // id: 圖層唯一標識符
          type: 'circle', // type: 圖層類型為 circle（圓形）
          source: 'nuclear-plants', // source: 使用的數據源 ID
          paint: {
            // paint: 繪製屬性
            'circle-radius': 8, // 'circle-radius': 標記點半徑設為 8 像素
            'circle-color': '#FF0000', // 'circle-color': 標記點顏色設為紅色
            'circle-stroke-width': 2, // 'circle-stroke-width': 標記點邊框寬度設為 2 像素
            'circle-stroke-color': '#FFFFFF', // 'circle-stroke-color': 標記點邊框顏色設為白色
          }, // paint 屬性結束
        }); // addLayer 結束：標記點圖層

        // 添加核電廠名稱標籤圖層
        map.addLayer({
          // addLayer: 添加圖層
          id: 'nuclear-plants-labels', // id: 圖層唯一標識符
          type: 'symbol', // type: 圖層類型為 symbol（符號/文字）
          source: 'nuclear-plants', // source: 使用的數據源 ID
          layout: {
            // layout: 佈局屬性
            'text-field': ['get', 'fullName'], // 'text-field': 文字內容，從 properties.fullName 獲取
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'], // 'text-font': 字體設為 Open Sans Bold
            'text-size': 14, // 'text-size': 字體大小設為 14 像素
            'text-offset': [0, 1.5], // 'text-offset': 文字偏移量，[x, y]，向下偏移 1.5 em
            'text-anchor': 'top', // 'text-anchor': 文字錨點設為 top（文字在點的上方）
          }, // layout 屬性結束
          paint: {
            // paint: 繪製屬性
            'text-color': '#FF0000', // 'text-color': 文字顏色設為紅色
            'text-halo-color': '#FFFFFF', // 'text-halo-color': 文字光暈顏色設為白色（增加可讀性）
            'text-halo-width': 2, // 'text-halo-width': 文字光暈寬度設為 2 像素
          }, // paint 屬性結束
        }); // addLayer 結束：標籤圖層

        console.log('[MapTab] 核電廠標記和平滑立體半球添加完成'); // 輸出日誌：記錄添加完成
        console.log(
          `[MapTab] 平滑半球使用 ${layers} 層重疊創建，球心在地面的核電廠座標，半徑 30 公里，高度 0-30 公里，無階梯感`
        ); // 輸出日誌：記錄半球資訊
      }; // addNuclearPlants 函數結束

      /**
       * 🗺️ 添加 3D 縣市圖層
       * 將載入的 GeoJSON 數據添加到地圖上，包括 3D 立體圖層和邊界線圖層
       * 同時設置滑鼠懸停交互效果
       */
      const add3DCountyLayers = () => {
        // 定義添加 3D 圖層的函數
        // 檢查地圖實例和數據是否已準備好
        if (!map || !countyData.value) {
          // 檢查 map 和 countyData.value 是否存在
          console.error('[MapTab] 無法添加圖層: map=', !!map, 'countyData=', !!countyData.value); // 輸出錯誤日誌：記錄缺少的資源; !!: 轉換為布爾值
          return; // 提前返回，不執行後續代碼
        } // if 結束：資源檢查

        try {
          // try-catch: 捕獲添加圖層時的異常
          console.log('[MapTab] 開始添加 3D 台灣縣市圖層'); // 輸出日誌：記錄開始添加圖層

          // 將 GeoJSON 數據添加為地圖數據源
          map.addSource('counties', {
            // addSource: 添加數據源到地圖; 'counties': 數據源 ID
            type: 'geojson', // type: 數據源類型為 GeoJSON
            data: countyData.value, // data: 指定 GeoJSON 數據對象
          }); // addSource 結束

          // 添加 3D extrusion 圖層（立體縣市區域）
          map.addLayer({
            // addLayer: 添加圖層到地圖
            id: 'counties-3d', // id: 圖層唯一標識符，用於後續操作圖層
            type: 'fill-extrusion', // type: 圖層類型為 fill-extrusion（3D 立體填充）
            source: 'counties', // source: 使用的數據源 ID，對應上面添加的 'counties'
            paint: {
              // paint: 繪製屬性，定義圖層的視覺樣式
              'fill-extrusion-color': [
                // 'fill-extrusion-color': 3D 填充顏色屬性
                'match', // 'match': MapLibre 表達式，根據條件匹配返回不同值
                ['get', 'COUNTYNAME'], // ['get', 'COUNTYNAME']: 獲取 GeoJSON 要素的 COUNTYNAME 屬性
                '臺北市', // 條件：縣市名稱為 '臺北市'
                '#FF6B6B', // 返回值：臺北市的顏色（紅色系）
                '新北市', // 條件：縣市名稱為 '新北市'
                '#4ECDC4', // 返回值：新北市的顏色（青綠色）
                '基隆市', // 條件：縣市名稱為 '基隆市'
                '#45B7D1', // 返回值：基隆市的顏色（天藍色）
                '桃園市', // 條件：縣市名稱為 '桃園市'
                '#96CEB4', // 返回值：桃園市的顏色（薄荷綠）
                '新竹市', // 條件：縣市名稱為 '新竹市'
                '#FFEAA7', // 返回值：新竹市的顏色（淡黃色）
                '新竹縣', // 條件：縣市名稱為 '新竹縣'
                '#DFE6E9', // 返回值：新竹縣的顏色（淡灰色）
                '苗栗縣', // 條件：縣市名稱為 '苗栗縣'
                '#74B9FF', // 返回值：苗栗縣的顏色（藍色）
                '臺中市', // 條件：縣市名稱為 '臺中市'
                '#A29BFE', // 返回值：臺中市的顏色（紫色）
                '彰化縣', // 條件：縣市名稱為 '彰化縣'
                '#FD79A8', // 返回值：彰化縣的顏色（粉紅色）
                '南投縣', // 條件：縣市名稱為 '南投縣'
                '#FDCB6E', // 返回值：南投縣的顏色（金黃色）
                '雲林縣', // 條件：縣市名稱為 '雲林縣'
                '#6C5CE7', // 返回值：雲林縣的顏色（深紫色）
                '嘉義市', // 條件：縣市名稱為 '嘉義市'
                '#00B894', // 返回值：嘉義市的顏色（綠色）
                '嘉義縣', // 條件：縣市名稱為 '嘉義縣'
                '#00CEC9', // 返回值：嘉義縣的顏色（藍綠色）
                '臺南市', // 條件：縣市名稱為 '臺南市'
                '#E17055', // 返回值：臺南市的顏色（橘紅色）
                '高雄市', // 條件：縣市名稱為 '高雄市'
                '#0984E3', // 返回值：高雄市的顏色（藍色）
                '屏東縣', // 條件：縣市名稱為 '屏東縣'
                '#55EFC4', // 返回值：屏東縣的顏色（淡綠色）
                '宜蘭縣', // 條件：縣市名稱為 '宜蘭縣'
                '#A8E6CF', // 返回值：宜蘭縣的顏色（淺綠色）
                '花蓮縣', // 條件：縣市名稱為 '花蓮縣'
                '#FFD93D', // 返回值：花蓮縣的顏色（黃色）
                '臺東縣', // 條件：縣市名稱為 '臺東縣'
                '#FF8B94', // 返回值：臺東縣的顏色（粉色）
                '澎湖縣', // 條件：縣市名稱為 '澎湖縣'
                '#B4A7D6', // 返回值：澎湖縣的顏色（淡紫色）
                '金門縣', // 條件：縣市名稱為 '金門縣'
                '#F3A683', // 返回值：金門縣的顏色（桃色）
                '連江縣', // 條件：縣市名稱為 '連江縣'
                '#81ECEC', // 返回值：連江縣的顏色（青色）
                // 預設顏色：如果縣市名稱不匹配以上任何一個，使用此顏色
                '#CCCCCC', // 預設顏色：灰色（用於未知縣市或數據錯誤情況）
              ], // 'fill-extrusion-color' 屬性結束
              'fill-extrusion-height': [
                // 'fill-extrusion-height': 3D 立體高度（單位：米），每個縣市使用隨機高度
                'random', // 'random': MapLibre 隨機數表達式
                30000, // 最小高度：30000 米（30 公里）
                80000, // 最大高度：80000 米（80 公里）
              ], // 'fill-extrusion-height' 屬性結束：每個縣市高度在 30-80 公里之間隨機
              'fill-extrusion-base': 0, // 'fill-extrusion-base': 3D 立體基礎高度（單位：米），設為 0 表示從地面開始
              'fill-extrusion-opacity': 0.8, // 'fill-extrusion-opacity': 3D 立體透明度，0.8 表示 80% 不透明度
            }, // paint 屬性結束
          }); // addLayer 結束：3D 圖層

          // 添加縣市邊界線圖層（描邊效果）
          map.addLayer({
            // addLayer: 再次添加圖層，這次是邊界線
            id: 'counties-outline', // id: 圖層唯一標識符，用於邊界線圖層
            type: 'line', // type: 圖層類型為 line（線條）
            source: 'counties', // source: 使用相同的數據源 'counties'
            paint: {
              // paint: 繪製屬性，定義線條的視覺樣式
              'line-color': '#000000', // 'line-color': 線條顏色設為黑色
              'line-width': 2, // 'line-width': 線條寬度設為 2 像素
            }, // paint 屬性結束
          }); // addLayer 結束：邊界線圖層

          console.log('[MapTab] 3D 台灣縣市圖層添加完成'); // 輸出日誌：記錄圖層添加完成
        } catch (error) {
          // catch: 捕獲添加圖層時的錯誤
          console.error('[MapTab] 3D 台灣縣市圖層添加失敗:', error); // 輸出錯誤日誌：記錄錯誤詳情
        } // try-catch 結束
      }; // add3DCountyLayers 函數結束

      /**
       * 🏗️ 創建地圖實例
       * 初始化 MapLibre GL 地圖並設定基本配置（中心點、縮放級別、視角等）
       * @returns {boolean} 成功返回 true，失敗返回 false
       */
      const createMap = () => {
        // 定義創建地圖的函數
        // 檢查 DOM 容器是否已準備好
        if (!mapContainer.value) return false; // 如果 mapContainer.value 為 null（DOM 還未準備好），返回 false

        // 獲取容器的尺寸信息
        const rect = mapContainer.value.getBoundingClientRect(); // getBoundingClientRect(): 獲取元素的尺寸和位置信息
        if (rect.width === 0 || rect.height === 0) {
          // 檢查容器的寬度或高度是否為 0
          console.warn('[MapTab] 容器尺寸為零，延遲初始化'); // 輸出警告日誌：容器尺寸為零，需要延遲初始化
          return false; // 返回 false，表示創建失敗
        } // if 結束：尺寸檢查

        try {
          // try-catch: 捕獲創建地圖時的異常
          console.log('[MapTab] 開始創建 MapLibre GL 地圖'); // 輸出日誌：記錄開始創建地圖

          // 創建 MapLibre GL 地圖實例
          map = new maplibregl.Map({
            // new maplibregl.Map: 創建新的地圖實例
            container: mapContainer.value, // container: 指定地圖渲染的 DOM 容器
            style: {
              // style: 地圖樣式配置對象（簡化版：只有白色背景，不顯示底圖）
              version: 8, // version: MapLibre 樣式規範版本號
              sources: {}, // sources: 數據源配置（空對象，不需要底圖數據源）
              layers: [
                // layers: 圖層配置數組
                {
                  // 唯一圖層：白色背景圖層
                  id: 'background', // id: 圖層唯一標識符
                  type: 'background', // type: 圖層類型為 background（純色背景）
                  paint: {
                    // paint: 繪製屬性
                    'background-color': '#FFFFFF', // 'background-color': 背景顏色設為白色
                  }, // paint 結束
                }, // 背景圖層結束
              ], // layers 結束
            }, // style 結束
            center: [120.9, 23.7], // center: 地圖中心點坐標 [經度, 緯度]，120.9°E, 23.7°N（台灣中心）
            zoom: 6.8, // zoom: 初始縮放級別，6.8 表示可以看到整個台灣
            pitch: 0, // pitch: 傾斜角度（0-60 度），0 度表示從正上方往下看（2D 視角）
            bearing: 0, // bearing: 旋轉角度（0-360 度），0 度表示正北朝上
            antialias: true, // antialias: 開啟抗鋸齒，使圖形邊緣更平滑
          }); // Map 實例創建結束

          // 不添加任何控制器（按照需求移除所有地圖按鈕）
          // map.addControl(new maplibregl.NavigationControl(), 'top-right'); // 已移除導航控制器

          // 監聽地圖載入完成事件
          map.on('load', () => {
            // map.on: 監聽事件; 'load': 地圖載入完成事件
            console.log('[MapTab] MapLibre GL 地圖載入完成'); // 輸出日誌：記錄地圖載入完成
            isMapReady.value = true; // 將地圖就緒狀態設為 true

            // 添加 3D 縣市圖層
            add3DCountyLayers(); // 調用添加圖層函數，將縣市邊界數據添加到地圖

            // 添加核電廠標記和影響範圍圓
            addNuclearPlants(); // 調用添加核電廠函數，在地圖上標記核電廠位置和影響範圍

            // 保存地圖實例到 Pinia store
            dataStore.setMapInstance(map); // 調用 store 的方法，將地圖實例保存到全局狀態

            // 將地圖實例傳遞給父組件
            emit('map-ready', map); // emit: 觸發事件; 'map-ready': 事件名稱; map: 傳遞的參數（地圖實例）
          }); // 'load' 事件監聽結束

          console.log('[MapTab] MapLibre GL 地圖創建成功'); // 輸出日誌：記錄地圖創建成功
          return true; // 返回 true 表示創建成功
        } catch (error) {
          // catch: 捕獲創建地圖時的錯誤
          console.error('[MapTab] MapLibre GL 地圖創建失敗:', error); // 輸出錯誤日誌：記錄錯誤詳情
          return false; // 返回 false 表示創建失敗
        } // try-catch 結束
      }; // createMap 函數結束

      /**
       * 🚀 初始化地圖
       * 創建地圖並載入初始數據，包含重試機制
       */
      const initMap = async () => {
        // async: 標記為異步函數，可以使用 await
        let attempts = 0; // 初始化嘗試次數為 0
        const maxAttempts = 20; // 設定最大嘗試次數為 20 次

        // 載入台灣縣市數據
        const loaded = await loadCountyData(); // await: 等待數據載入完成; loaded: 存儲載入結果（true/false）
        if (!loaded) {
          // 檢查數據是否載入失敗
          console.error('[MapTab] 無法載入台灣縣市數據'); // 輸出錯誤日誌：記錄數據載入失敗
          return; // 提前返回，不繼續創建地圖
        } // if 結束：數據載入檢查

        // 定義創建地圖的嘗試函數（支持重試）
        const tryCreateMap = async () => {
          // async: 標記為異步函數
          if (attempts >= maxAttempts) {
            // 檢查嘗試次數是否已達到最大值
            console.error('[MapTab] 地圖初始化失敗，已達到最大嘗試次數'); // 輸出錯誤日誌：記錄已達到最大嘗試次數
            return; // 提前返回，停止重試
          } // if 結束：最大嘗試次數檢查

          attempts++; // 嘗試次數加 1
          console.log(`[MapTab] 嘗試創建地圖 (${attempts}/${maxAttempts})`); // 輸出日誌：記錄當前嘗試次數

          if (createMap()) {
            // 調用 createMap() 並檢查是否成功
            console.log('[MapTab] 地圖創建成功'); // 輸出日誌：記錄地圖創建成功
          } else {
            // 如果創建失敗
            console.log('[MapTab] 地圖創建失敗，100ms 後重試'); // 輸出日誌：記錄地圖創建失敗，準備重試
            setTimeout(tryCreateMap, 100); // setTimeout: 100 毫秒後再次調用 tryCreateMap，實現重試
          } // if-else 結束：創建結果檢查
        }; // tryCreateMap 函數結束

        tryCreateMap(); // 開始第一次嘗試創建地圖
      }; // initMap 函數結束

      // ═══════════════════════════════════════════════════════════════════════
      // 🧹 生命週期鉤子 (Lifecycle Hooks)
      // ═══════════════════════════════════════════════════════════════════════

      // 組件掛載時的處理
      onMounted(() => {
        // onMounted: Vue 生命週期鉤子，組件 DOM 掛載後執行
        nextTick(() => {
          // nextTick: 等待 Vue 完成 DOM 更新後執行
          initMap(); // 調用初始化地圖函數
        }); // nextTick 結束
      }); // onMounted 結束

      // 組件卸載時的清理
      onUnmounted(() => {
        // onUnmounted: Vue 生命週期鉤子，組件銷毀前執行
        if (map) {
          // 檢查 map 是否存在
          map.remove(); // 移除地圖實例，釋放 WebGL 資源
          map = null; // 將 map 引用設為 null，釋放內存
        } // if 結束：map 清理
        isMapReady.value = false; // 將地圖就緒狀態重置為 false
      }); // onUnmounted 結束

      // ═══════════════════════════════════════════════════════════════════════
      // 📤 返回組件公開的屬性和方法 (Return Exposed Properties and Methods)
      // ═══════════════════════════════════════════════════════════════════════

      // 返回需要暴露給模板使用的響應式數據
      return {
        // return: 返回對象，包含模板需要的數據和方法
        mapContainer, // mapContainer: 地圖容器 ref，用於綁定到模板的 div 元素
        mapContainerId, // mapContainerId: 地圖容器唯一 ID，用於設置 div 的 id 屬性
      }; // return 結束
    }, // setup 函數結束
  }; // export default 結束
</script>
<!-- script 區塊結束 -->

<template>
  <!-- template 區塊開始：定義組件的 HTML 模板 -->
  <!-- 🗺️ 地圖主容器：使用 Bootstrap 樣式類設置寬高為 100%，相對定位，背景透明，z-index 為 0 -->
  <div id="map-container" class="h-100 w-100 position-relative bg-transparent z-0">
    <!-- id="map-container": 容器 ID; class="h-100 w-100": 高度和寬度都是 100%; position-relative: 相對定位; bg-transparent: 背景透明; z-0: z-index 為 0 -->
    <!-- 🗺️ MapLibre GL 地圖容器：動態綁定 id 和 ref，寬高為 100% -->
    <div :id="mapContainerId" ref="mapContainer" class="h-100 w-100"></div>
    <!-- :id="mapContainerId": 動態綁定 id 屬性為 mapContainerId 的值; ref="mapContainer": 綁定 ref 到 mapContainer，讓 script 可以訪問此 DOM 元素; class="h-100 w-100": 高度和寬度都是 100% -->
  </div>
  <!-- 地圖主容器結束 -->
</template>
<!-- template 區塊結束 -->

<style scoped>
  /* style 區塊開始：定義組件的 CSS 樣式; scoped: 樣式僅作用於當前組件 */
  @import '../assets/css/common.css'; /* 導入通用 CSS 樣式文件 */

  #map-container {
    /* 選擇器：選擇 id 為 map-container 的元素 */
    overflow: hidden; /* 隱藏溢出內容，防止滾動條出現 */
  } /* #map-container 樣式結束 */

  /* MapLibre GL 地圖容器樣式：設置字體 */
  :deep(.maplibregl-map) {
    /* :deep(): Vue 深度選擇器，穿透 scoped 限制，選擇子組件的元素; .maplibregl-map: MapLibre 地圖容器的類名 */
    font-family:
      'Open Sans', 'Arial', sans-serif; /* 設置字體為 Open Sans，如果不可用則使用 Arial，最後使用系統 sans-serif 字體 */
  } /* .maplibregl-map 樣式結束 */

  /* MapLibre GL 控制器樣式：設置背景和邊框 */
  :deep(.maplibregl-ctrl-group) {
    /* :deep(): 深度選擇器; .maplibregl-ctrl-group: MapLibre 控制器組的類名 */
    background: rgba(0, 43, 127, 0.95); /* 背景色：深藍色，透明度 95% */
    border: 1px solid #ffc61e; /* 邊框：1 像素實線，顏色為金黃色 */
  } /* .maplibregl-ctrl-group 樣式結束 */

  /* MapLibre GL 控制器按鈕樣式：設置背景和文字顏色 */
  :deep(.maplibregl-ctrl button) {
    /* :deep(): 深度選擇器; .maplibregl-ctrl button: MapLibre 控制器內的按鈕 */
    background-color: rgba(0, 43, 127, 0.95); /* 背景色：深藍色，透明度 95% */
    color: #ffc61e; /* 文字顏色：金黃色 */
  } /* .maplibregl-ctrl button 樣式結束 */

  /* MapLibre GL 控制器按鈕懸停樣式：設置背景色 */
  :deep(.maplibregl-ctrl button:hover) {
    /* :deep(): 深度選擇器; .maplibregl-ctrl button:hover: 滑鼠懸停在按鈕上的狀態 */
    background-color: rgba(0, 43, 127, 1); /* 背景色：深藍色，完全不透明 */
  } /* .maplibregl-ctrl button:hover 樣式結束 */

  /* MapLibre GL Popup 內容樣式：設置背景、文字顏色、邊框等 */
  :deep(.maplibregl-popup-content) {
    /* :deep(): 深度選擇器; .maplibregl-popup-content: MapLibre Popup 內容區域的類名 */
    background: rgba(0, 43, 127, 0.95); /* 背景色：深藍色，透明度 95% */
    color: #ffc61e; /* 文字顏色：金黃色 */
    border: 2px solid #ffc61e; /* 邊框：2 像素實線，顏色為金黃色 */
    border-radius: 4px; /* 圓角：4 像素 */
    padding: 12px 16px; /* 內邊距：上下 12 像素，左右 16 像素 */
    font-size: 14px; /* 字體大小：14 像素 */
  } /* .maplibregl-popup-content 樣式結束 */

  /* MapLibre GL Popup 箭頭樣式：設置箭頭顏色 */
  :deep(.maplibregl-popup-tip) {
    /* :deep(): 深度選擇器; .maplibregl-popup-tip: MapLibre Popup 箭頭的類名 */
    border-top-color: rgba(
      0,
      43,
      127,
      0.95
    ); /* 箭頭顏色：深藍色，透明度 95%（箭頭是通過邊框實現的） */
  } /* .maplibregl-popup-tip 樣式結束 */

  /* MapLibre GL Popup 關閉按鈕樣式：設置文字顏色、大小和內邊距 */
  :deep(.maplibregl-popup-close-button) {
    /* :deep(): 深度選擇器; .maplibregl-popup-close-button: MapLibre Popup 關閉按鈕的類名 */
    color: #ffc61e; /* 文字顏色：金黃色 */
    font-size: 20px; /* 字體大小：20 像素 */
    padding: 0 8px; /* 內邊距：上下 0 像素，左右 8 像素 */
  } /* .maplibregl-popup-close-button 樣式結束 */

  /* MapLibre GL Popup 關閉按鈕懸停樣式：設置背景和文字顏色 */
  :deep(.maplibregl-popup-close-button:hover) {
    /* :deep(): 深度選擇器; .maplibregl-popup-close-button:hover: 滑鼠懸停在關閉按鈕上的狀態 */
    background-color: transparent; /* 背景色：透明 */
    color: #ffffff; /* 文字顏色：白色 */
  } /* .maplibregl-popup-close-button:hover 樣式結束 */
</style>
<!-- style 區塊結束 -->
