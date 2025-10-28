/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📦 數據存儲模組 (Data Store Module)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * @fileoverview
 * 本文件定義應用程式的核心數據存儲 store，負責管理 MapLibre GL 地圖實例
 * 和相關的運行時數據。使用 Pinia Composition API 語法實現。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📋 主要功能
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 1. 地圖實例管理
 *    - 存儲 MapLibre GL Map 實例
 *    - 提供跨組件訪問地圖實例的能力
 *    - 確保單一地圖實例原則
 *
 * 2. 狀態持久化
 *    - 使用 Pinia persist 插件
 *    - 將狀態保存到 localStorage
 *    - 頁面重載時恢復狀態
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🏗️ 設計模式
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 單例模式 (Singleton Pattern):
 * - 地圖實例在整個應用中只存在一個
 * - 通過 store 共享給需要的組件
 * - 避免重複創建地圖實例造成的性能問題
 *
 * 集中式狀態管理:
 * - 將地圖實例從組件中提取到 store
 * - 便於多個組件訪問和操作同一地圖
 * - 簡化組件間的通信
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🔄 數據流程
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 1. 地圖創建流程：
 *    MapTab.vue 創建地圖
 *    → 觸發 'map-ready' 事件
 *    → HomeView.vue 接收事件
 *    → 調用 dataStore.setMapInstance(map)
 *    → 地圖實例存儲到 store
 *    → 其他組件可通過 store 訪問地圖
 *
 * 2. 地圖訪問流程：
 *    組件需要操作地圖
 *    → import { useDataStore } from '@/stores/dataStore'
 *    → const dataStore = useDataStore()
 *    → const map = dataStore.mapInstance
 *    → 對 map 進行操作
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ⚙️ Pinia Composition API 語法說明
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 本 store 使用 Composition API 語法而非 Options API，優勢如下：
 *
 * 1. 更靈活的組織方式
 *    - 可以使用 Vue 3 的 Composition API (ref, computed, watch 等)
 *    - 代碼更模塊化，邏輯更清晰
 *
 * 2. 更好的 TypeScript 支援
 *    - 自動推導類型
 *    - 減少類型註解需求
 *
 * 3. 更接近 Vue 3 的編碼風格
 *    - 與 <script setup> 語法一致
 *    - 學習曲線更平緩
 *
 * Composition API 語法結構：
 * ```javascript
 * export const useStore = defineStore('id', () => {
 *   // 1. 定義響應式狀態（相當於 Options API 的 state）
 *   const count = ref(0);
 *   const user = ref(null);
 *
 *   // 2. 定義計算屬性（相當於 Options API 的 getters）
 *   const doubleCount = computed(() => count.value * 2);
 *
 *   // 3. 定義方法（相當於 Options API 的 actions）
 *   function increment() {
 *     count.value++;
 *   }
 *
 *   async function fetchUser(id) {
 *     user.value = await api.getUser(id);
 *   }
 *
 *   // 4. 返回所有需要暴露的內容
 *   return {
 *     count,
 *     user,
 *     doubleCount,
 *     increment,
 *     fetchUser
 *   };
 * });
 * ```
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🔐 持久化配置
 * ─────────────────────────────────────────────────────────────────────────
 *
 * persist: true 的作用：
 * - 自動將 store 狀態保存到 localStorage
 * - 鍵名格式：'pinia-data'（'pinia-' + store id）
 * - 頁面重載時自動恢復狀態
 *
 * 注意事項：
 * - 地圖實例 (MapLibre Map) 無法被序列化
 * - localStorage 只能存儲字符串
 * - 因此地圖實例實際上不會被持久化
 * - 每次重載頁面都需要重新創建地圖實例
 *
 * 持久化配置範例（進階用法）：
 * ```javascript
 * {
 *   persist: {
 *     enabled: true,
 *     strategies: [
 *       {
 *         key: 'my-custom-key',        // 自定義存儲鍵名
 *         storage: localStorage,        // 存儲位置
 *         paths: ['user', 'settings'], // 只持久化指定路徑
 *       }
 *     ]
 *   }
 * }
 * ```
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🚀 使用範例
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 在 MapTab.vue 中設置地圖實例：
 * ```javascript
 * import { useDataStore } from '@/stores/dataStore';
 *
 * export default {
 *   setup(_, { emit }) {
 *     const dataStore = useDataStore();
 *
 *     const createMap = () => {
 *       const map = new maplibregl.Map({ ... });
 *
 *       map.on('load', () => {
 *         // 保存地圖實例到 store
 *         dataStore.setMapInstance(map);
 *
 *         // 通知父組件
 *         emit('map-ready', map);
 *       });
 *     };
 *   }
 * };
 * ```
 *
 * 在其他組件中訪問地圖：
 * ```javascript
 * import { useDataStore } from '@/stores/dataStore';
 *
 * export default {
 *   setup() {
 *     const dataStore = useDataStore();
 *
 *     // 獲取地圖實例
 *     const map = dataStore.mapInstance;
 *
 *     // 操作地圖
 *     if (map) {
 *       map.flyTo({ center: [120.9, 23.7], zoom: 10 });
 *       map.setPitch(60);
 *       map.setBearing(45);
 *     }
 *   }
 * };
 * ```
 *
 * 使用解構（需要 storeToRefs）：
 * ```javascript
 * import { storeToRefs } from 'pinia';
 * import { useDataStore } from '@/stores/dataStore';
 *
 * const dataStore = useDataStore();
 * const { mapInstance } = storeToRefs(dataStore); // 保持響應式
 * const { setMapInstance } = dataStore;           // 方法不需要 toRefs
 *
 * // 監聽地圖實例變化
 * watch(mapInstance, (newMap) => {
 *   if (newMap) {
 *     console.log('地圖已就緒');
 *   }
 * });
 * ```
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 💡 未來可能的擴展
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 1. 添加地圖狀態追蹤：
 * ```javascript
 * const mapState = ref({
 *   center: [120.9, 23.7],
 *   zoom: 6.8,
 *   pitch: 60,
 *   bearing: 0,
 *   bounds: null
 * });
 *
 * const updateMapState = () => {
 *   if (mapInstance.value) {
 *     mapState.value.center = mapInstance.value.getCenter().toArray();
 *     mapState.value.zoom = mapInstance.value.getZoom();
 *     mapState.value.pitch = mapInstance.value.getPitch();
 *     mapState.value.bearing = mapInstance.value.getBearing();
 *   }
 * };
 * ```
 *
 * 2. 添加選中的縣市數據：
 * ```javascript
 * const selectedCounty = ref(null);
 * const selectedCountyData = ref(null);
 *
 * const selectCounty = (countyName) => {
 *   selectedCounty.value = countyName;
 *   // 載入縣市詳細數據
 *   loadCountyData(countyName).then(data => {
 *     selectedCountyData.value = data;
 *   });
 * };
 *
 * const clearSelection = () => {
 *   selectedCounty.value = null;
 *   selectedCountyData.value = null;
 * };
 * ```
 *
 * 3. 添加地圖圖層管理：
 * ```javascript
 * const visibleLayers = ref({
 *   'counties-3d': true,
 *   'counties-outline': true,
 *   'osm-tiles-layer': true
 * });
 *
 * const toggleLayer = (layerId) => {
 *   visibleLayers.value[layerId] = !visibleLayers.value[layerId];
 *
 *   if (mapInstance.value) {
 *     const visibility = visibleLayers.value[layerId] ? 'visible' : 'none';
 *     mapInstance.value.setLayoutProperty(layerId, 'visibility', visibility);
 *   }
 * };
 * ```
 *
 * 4. 添加載入狀態管理：
 * ```javascript
 * const isMapLoading = ref(true);
 * const loadingProgress = ref(0);
 *
 * const setLoadingState = (loading, progress = 0) => {
 *   isMapLoading.value = loading;
 *   loadingProgress.value = progress;
 * };
 * ```
 *
 * 5. 添加錯誤處理：
 * ```javascript
 * const mapError = ref(null);
 *
 * const setMapError = (error) => {
 *   mapError.value = error;
 *   console.error('[DataStore] 地圖錯誤:', error);
 * };
 *
 * const clearMapError = () => {
 *   mapError.value = null;
 * };
 * ```
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ⚠️ 注意事項
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 1. 地圖實例的生命週期
 *    - 地圖實例在組件卸載時需要手動清理
 *    - 調用 map.remove() 釋放資源
 *    - 清理後將 store 中的實例設為 null
 *
 * 2. 響應式注意事項
 *    - 地圖實例本身不是響應式的
 *    - 只有 ref(mapInstance) 是響應式的
 *    - 對地圖的操作不會觸發 Vue 的更新
 *
 * 3. 內存洩漏風險
 *    - MapLibre GL 地圖佔用較多內存
 *    - 確保頁面離開時正確清理
 *    - 避免創建多個地圖實例
 *
 * 4. localStorage 限制
 *    - localStorage 有 5-10MB 的大小限制
 *    - 不要在 store 中存儲大量數據
 *    - 地圖實例無法序列化，不會被持久化
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📁 相關文件
 * ─────────────────────────────────────────────────────────────────────────
 * - src/stores/defineStore.js  - 配置和定義數據存儲
 * - src/tabs/MapTab.vue        - 地圖組件（創建地圖實例）
 * - src/views/HomeView.vue     - 主頁面（橋接地圖和 store）
 * - src/main.js                - Pinia 初始化
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🔗 相關文檔
 * ─────────────────────────────────────────────────────────────────────────
 * - Pinia 官網：https://pinia.vuejs.org/
 * - Pinia Composition API：https://pinia.vuejs.org/core-concepts/#setup-stores
 * - Pinia 持久化：https://prazdevs.github.io/pinia-plugin-persistedstate/
 * - MapLibre GL JS：https://maplibre.org/maplibre-gl-js/docs/
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📝 版本資訊
 * ─────────────────────────────────────────────────────────────────────────
 * @author 30 Day Map Challenge Team
 * @version 2.0.0
 * @since 2025
 * @license MIT
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// 📦 依賴導入 (Dependencies Import)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 從 Pinia 導入 defineStore 函數
 * 用於創建 store 實例
 */
import { defineStore } from 'pinia';

/**
 * 從 Vue 導入 ref 函數
 * 用於創建響應式引用
 *
 * ref 創建的響應式數據：
 * - 可以在 store 中使用
 * - 可以在組件中使用 storeToRefs 解構保持響應性
 * - 通過 .value 訪問和修改值
 */
import { ref } from 'vue';

// ═══════════════════════════════════════════════════════════════════════════
// 🏪 數據存儲商店定義 (Data Store Definition)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 數據存儲 (Data Store)
 *
 * 使用 Pinia Composition API 語法定義數據存儲 store。
 * 負責管理應用程式的核心運行時數據，特別是 MapLibre GL 地圖實例。
 *
 * Store ID: 'data'
 * - 此 ID 必須在整個應用程式中唯一
 * - 用於 Vue DevTools 中識別此 store
 * - 在持久化時作為 localStorage 鍵名的一部分
 *
 * 語法說明：
 * defineStore(id, setup, options)
 * - id: store 唯一標識符
 * - setup: 設置函數（Composition API 語法）
 * - options: 配置選項（如持久化設置）
 *
 * @returns {Object} 包含所有狀態和方法的 store 實例
 */
export const useDataStore = defineStore(
  // ───────────────────────────────────────────────────────────────────────
  // 🏷️ Store ID
  // ───────────────────────────────────────────────────────────────────────

  /**
   * Store 唯一標識符
   *
   * 命名規範：
   * - 使用小寫字母
   * - 使用描述性名稱
   * - 避免與其他 store 衝突
   *
   * 本 store 使用 'data' 作為 ID，表示存儲應用程式的核心數據。
   */
  'data',

  // ───────────────────────────────────────────────────────────────────────
  // ⚙️ Setup 函數（Composition API）
  // ───────────────────────────────────────────────────────────────────────

  /**
   * Store 設置函數
   *
   * 這是 Pinia Composition API 的核心部分，類似於 Vue 組件的 setup()。
   * 在這裡定義所有的響應式狀態、計算屬性和方法。
   *
   * 執行時機：
   * - 在首次調用 useDataStore() 時執行
   * - 只執行一次（單例模式）
   * - 返回的對象會被 Pinia 管理
   *
   * @returns {Object} 包含所有暴露的狀態和方法
   */
  () => {
    // ═══════════════════════════════════════════════════════════════════════
    // 📊 響應式狀態定義 (Reactive State Definitions)
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * 地圖實例 (Map Instance)
     *
     * 存儲 MapLibre GL Map 對象的響應式引用。
     *
     * 類型：Ref<maplibregl.Map | null>
     * 初始值：null（地圖未初始化時）
     *
     * 生命週期：
     * 1. 初始狀態：null
     * 2. MapTab 創建地圖後：maplibregl.Map 實例
     * 3. 組件卸載時：應重置為 null
     *
     * 用途：
     * - 提供全局訪問地圖實例的能力
     * - 允許多個組件操作同一個地圖
     * - 避免通過 props/events 傳遞地圖實例
     *
     * 訪問方式：
     * - 在 setup 函數內：mapInstance.value
     * - 在組件中：dataStore.mapInstance
     *
     * 注意事項：
     * - 地圖實例本身不是響應式的
     * - 只有 ref 包裹的引用是響應式的
     * - 對地圖的操作（如 flyTo）不會觸發 Vue 更新
     * - 無法被序列化，不會被持久化到 localStorage
     *
     * 相關方法：
     * - setMapInstance(map) - 設置地圖實例
     *
     * @type {Ref<maplibregl.Map|null>}
     */
    const mapInstance = ref(null);

    // ═══════════════════════════════════════════════════════════════════════
    // 🔧 方法定義 (Method Definitions / Actions)
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * 設置地圖實例 (Set Map Instance)
     *
     * 將 MapLibre GL Map 實例保存到 store 中，供全局訪問。
     *
     * 調用時機：
     * - MapTab.vue 中地圖創建完成後（map.on('load') 事件中）
     * - 通常在地圖初始化流程的最後一步調用
     *
     * 調用者：
     * - MapTab.vue: 創建地圖實例
     * - HomeView.vue: 接收 'map-ready' 事件後調用此方法
     *
     * 使用範例：
     * ```javascript
     * // 在 MapTab.vue 中
     * map.on('load', () => {
     *   dataStore.setMapInstance(map);
     *   emit('map-ready', map);
     * });
     *
     * // 或在 HomeView.vue 中
     * const setMapInstance = (map) => {
     *   dataStore.setMapInstance(map);
     * };
     * ```
     *
     * 副作用：
     * - 更新 mapInstance 的值
     * - 觸發訂閱了 mapInstance 的響應式更新
     * - 可能觸發 watch/watchEffect 監聽器
     *
     * 最佳實踐：
     * - 只在地圖完全初始化後調用
     * - 避免多次調用（地圖應該只創建一次）
     * - 組件卸載時考慮重置為 null
     *
     * 清理示例：
     * ```javascript
     * onUnmounted(() => {
     *   if (map) {
     *     map.remove();
     *   }
     *   dataStore.setMapInstance(null);
     * });
     * ```
     *
     * @param {maplibregl.Map|null} map - MapLibre GL Map 實例或 null
     * @returns {void}
     *
     * @example
     * // 設置地圖實例
     * const map = new maplibregl.Map({ ... });
     * dataStore.setMapInstance(map);
     *
     * @example
     * // 清理地圖實例
     * dataStore.setMapInstance(null);
     */
    const setMapInstance = (map) => {
      mapInstance.value = map;

      // 開發環境調試信息
      if (process.env.NODE_ENV === 'development') {
        if (map) {
          console.log('[DataStore] 地圖實例已設置');
        } else {
          console.log('[DataStore] 地圖實例已清除');
        }
      }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // 📤 返回暴露的內容 (Return Exposed Content)
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * 返回對象
     *
     * 將需要暴露給外部使用的狀態和方法打包成對象返回。
     * 這些內容會成為 store 實例的屬性和方法。
     *
     * 暴露的內容：
     * - mapInstance: 響應式地圖實例引用
     * - setMapInstance: 設置地圖實例的方法
     *
     * 訪問方式：
     * ```javascript
     * const dataStore = useDataStore();
     *
     * // 訪問狀態
     * const map = dataStore.mapInstance;
     *
     * // 調用方法
     * dataStore.setMapInstance(newMap);
     * ```
     *
     * 解構使用（保持響應性）：
     * ```javascript
     * import { storeToRefs } from 'pinia';
     * const dataStore = useDataStore();
     * const { mapInstance } = storeToRefs(dataStore); // 響應式
     * const { setMapInstance } = dataStore;           // 方法
     * ```
     *
     * 注意：
     * - 狀態需要使用 storeToRefs 解構才能保持響應性
     * - 方法可以直接解構，不需要 toRefs
     * - 不要直接解構狀態，會失去響應性
     */
    return {
      // 響應式狀態
      mapInstance,

      // 方法（Actions）
      setMapInstance,
    };
  },

  // ───────────────────────────────────────────────────────────────────────
  // ⚙️ Store 配置選項 (Store Configuration Options)
  // ───────────────────────────────────────────────────────────────────────

  /**
   * Store 配置對象
   *
   * 提供額外的配置選項來增強 store 的功能。
   */
  {
    // ═══════════════════════════════════════════════════════════════════════
    // 💾 持久化配置 (Persistence Configuration)
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * 啟用狀態持久化 (Enable State Persistence)
     *
     * 使用 pinia-plugin-persistedstate 插件將 store 狀態保存到
     * localStorage，實現頁面重載後狀態恢復。
     *
     * 值：true
     * - 啟用自動持久化
     * - 使用默認配置
     *
     * 默認配置：
     * - 存儲位置：localStorage
     * - 鍵名：'pinia-data'（'pinia-' + store id）
     * - 持久化內容：整個 store 的狀態
     * - 序列化方式：JSON.stringify/parse
     *
     * 工作流程：
     * 1. 狀態變化時自動保存到 localStorage
     * 2. 頁面重載時自動從 localStorage 恢復
     * 3. 無法序列化的值會被忽略（如 Map 實例）
     *
     * 特殊情況：
     * - mapInstance 是 MapLibre GL Map 對象
     * - Map 對象無法被 JSON 序列化
     * - 因此 mapInstance 實際不會被持久化
     * - 每次重載頁面都需要重新創建地圖
     *
     * 如果需要自定義持久化配置：
     * ```javascript
     * {
     *   persist: {
     *     key: 'my-data-store',
     *     storage: sessionStorage,    // 使用 sessionStorage
     *     paths: ['someOtherState'],  // 只持久化指定狀態
     *   }
     * }
     * ```
     *
     * 插件安裝：
     * 需要在 main.js 中註冊 pinia-plugin-persistedstate：
     * ```javascript
     * import { createPinia } from 'pinia';
     * import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
     *
     * const pinia = createPinia();
     * pinia.use(piniaPluginPersistedstate);
     * ```
     *
     * 清除持久化數據：
     * ```javascript
     * localStorage.removeItem('pinia-data');
     * ```
     *
     * @type {boolean}
     */
    persist: true,
  }
);
