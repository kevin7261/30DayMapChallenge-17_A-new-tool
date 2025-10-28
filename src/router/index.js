/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🚀 Vue Router 路由配置文件
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * @fileoverview
 * 本文件負責配置整個應用程式的路由系統，使用 Vue Router 4 實現單頁應用程式
 * (SPA) 的頁面導航功能。採用 HTML5 History API 模式，提供無 hash (#) 的
 * 乾淨 URL 結構。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📋 主要功能
 * ─────────────────────────────────────────────────────────────────────────
 * 1. 路由定義：配置應用程式的所有可訪問頁面路徑
 * 2. History 模式：使用 HTML5 History API 實現無 hash URL
 * 3. 基礎路徑：支援 GitHub Pages 部署的路徑配置
 * 4. 組件映射：將 URL 路徑與 Vue 組件綁定
 * 5. 導航管理：處理頁面切換和路由跳轉
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🏗️ 路由模式說明
 * ─────────────────────────────────────────────────────────────────────────
 *
 * HTML5 History 模式 (createWebHistory):
 * - ✅ 優點：URL 更美觀，無 # 符號 (例如: /about 而非 /#/about)
 * - ✅ 優點：更符合 RESTful 設計風格
 * - ⚠️ 注意：需要服務器配置支援 (所有路徑都回傳 index.html)
 * - ⚠️ 注意：GitHub Pages 需要特殊配置 (404.html 重定向)
 *
 * Hash 模式 (createWebHashHistory):
 * - 無需服務器配置，使用 URL hash (#) 部分模擬路由
 * - 適合靜態文件服務器或無法配置服務器的環境
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🌐 部署環境配置
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 本專案部署於 GitHub Pages，基礎路徑為:
 * https://kevin7261.github.io/30DayMapChallenge-17_A-new-tool/
 *
 * 路徑配置考量：
 * - publicPath (vue.config.js): 定義靜態資源的基礎路徑
 * - base (router): 定義路由的基礎路徑
 * - 兩者必須一致以確保資源正確載入
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🛠️ 技術架構
 * ─────────────────────────────────────────────────────────────────────────
 * @requires vue-router@4    - Vue 3 官方路由管理庫
 * @requires vue@3          - Vue 3 核心框架
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📁 相關文件
 * ─────────────────────────────────────────────────────────────────────────
 * - vue.config.js          - Vue CLI 項目配置 (publicPath 設定)
 * - public/404.html        - GitHub Pages 404 重定向頁面
 * - src/views/HomeView.vue - 主頁面組件
 * - src/main.js            - 路由器註冊入口
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📝 使用範例
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 在組件中使用路由:
 *
 * // 模板中使用 router-link 導航
 * <router-link to="/">首頁</router-link>
 *
 * // 程式碼中使用 router 對象導航
 * import { useRouter } from 'vue-router';
 * const router = useRouter();
 * router.push('/about');
 *
 * // 獲取當前路由資訊
 * import { useRoute } from 'vue-router';
 * const route = useRoute();
 * console.log(route.path, route.name);
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ⚙️ 路由守衛 (Navigation Guards)
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 本專案目前未使用路由守衛，但可依需求添加：
 *
 * 全局前置守衛：
 * router.beforeEach((to, from, next) => {
 *   // 在每次路由切換前執行
 *   // 可用於權限檢查、登入驗證等
 *   next();
 * });
 *
 * 全局後置鉤子：
 * router.afterEach((to, from) => {
 *   // 在每次路由切換後執行
 *   // 可用於頁面追蹤、埋點統計等
 * });
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

// Vue Router 4 核心函數
// - createRouter: 創建路由器實例的工廠函數
// - createWebHistory: 創建 HTML5 History 模式的路由
import { createRouter, createWebHistory } from 'vue-router';

// 頁面組件導入
// 使用靜態導入 (static import) 確保首頁立即可用
// 如需代碼分割可改用動態導入: () => import('../views/HomeView.vue')
import HomeView from '../views/HomeView.vue';

// ═══════════════════════════════════════════════════════════════════════════
// 📍 路由配置陣列 (Routes Configuration Array)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 路由配置陣列
 *
 * 定義應用程式中所有可訪問的頁面路徑及其對應的 Vue 組件。
 * 每個路由對象包含以下屬性：
 *
 * @property {string} path - URL 路徑，相對於 base URL
 *   - '/' 代表根路徑 (首頁)
 *   - '/about' 代表關於頁面 (範例)
 *   - '/user/:id' 代表動態路由，:id 是參數 (範例)
 *
 * @property {string} name - 路由名稱，用於程式碼中的路由跳轉
 *   - 使用 router.push({ name: 'Home' }) 進行命名路由跳轉
 *   - 建議使用 PascalCase 命名規範
 *
 * @property {Component} component - 對應的 Vue 組件
 *   - 可以是靜態導入的組件 (編譯時載入)
 *   - 也可以是動態導入的組件 (運行時按需載入)
 *
 * @property {Object} [meta] - 路由元信息 (可選)
 *   - 可存儲自定義數據，如頁面標題、權限要求等
 *   - 範例: { title: '首頁', requiresAuth: false }
 *
 * @property {Array} [children] - 子路由配置 (可選)
 *   - 用於實現嵌套路由結構
 *   - 子路由會渲染在父組件的 <router-view> 中
 *
 * @property {Function} [beforeEnter] - 路由級守衛 (可選)
 *   - 進入該路由前執行的鉤子函數
 *   - 可用於該路由專屬的權限檢查
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🚀 路由擴展範例
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 添加新路由：
 * {
 *   path: '/about',
 *   name: 'About',
 *   component: () => import('../views/AboutView.vue'), // 懶加載
 *   meta: { title: '關於我們' }
 * }
 *
 * 動態路由參數：
 * {
 *   path: '/user/:id',
 *   name: 'User',
 *   component: UserView,
 *   props: true // 將路由參數作為 props 傳遞給組件
 * }
 *
 * 嵌套路由：
 * {
 *   path: '/dashboard',
 *   component: DashboardLayout,
 *   children: [
 *     { path: '', component: DashboardHome },
 *     { path: 'settings', component: DashboardSettings }
 *   ]
 * }
 *
 * 重定向：
 * {
 *   path: '/old-path',
 *   redirect: '/new-path'
 * }
 *
 * 命名視圖：
 * {
 *   path: '/layout',
 *   components: {
 *     default: MainContent,
 *     sidebar: Sidebar,
 *     footer: Footer
 *   }
 * }
 */
const routes = [
  {
    // 🏠 首頁路由 (Home Route)
    //
    // 路徑: '/'
    // 功能: 顯示台灣縣市 3D 地圖
    // 組件: HomeView.vue (包含 MapTab.vue 地圖組件)
    //
    // URL 範例:
    // - 開發環境: http://localhost:8080/30DayMapChallenge-17_A-new-tool/
    // - 生產環境: https://kevin7261.github.io/30DayMapChallenge-17_A-new-tool/
    path: '/',
    name: 'Home',
    component: HomeView,
  },

  // ─────────────────────────────────────────────────────────────────────
  // 💡 添加更多路由的位置
  // ─────────────────────────────────────────────────────────────────────
  //
  // 未來可以在這裡添加更多路由，例如：
  // - 關於頁面
  // - 使用說明頁面
  // - 數據來源頁面
  // - 設定頁面
  // - 404 錯誤頁面 (catch-all route)
  //
  // 404 路由範例 (應放在陣列最後):
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('../views/NotFound.vue')
  // }
];

// ═══════════════════════════════════════════════════════════════════════════
// 🛣️ 路由器實例創建 (Router Instance Creation)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 創建並配置 Vue Router 實例
 *
 * 使用 createRouter() 工廠函數創建路由器，並配置以下選項：
 *
 * ─────────────────────────────────────────────────────────────────────────
 * @param {Object} options - 路由器配置選項
 * ─────────────────────────────────────────────────────────────────────────
 *
 * @param {History} options.history - 歷史記錄模式
 *   使用 createWebHistory() 創建 HTML5 History API 模式
 *   參數 '/30DayMapChallenge-17_A-new-tool/' 是應用程式的基礎路徑
 *
 *   基礎路徑說明：
 *   - 本地開發: http://localhost:8080/30DayMapChallenge-17_A-new-tool/
 *   - GitHub Pages: https://kevin7261.github.io/30DayMapChallenge-17_A-new-tool/
 *
 *   為什麼需要基礎路徑？
 *   - GitHub Pages 將專案部署在子路徑下 (非網站根目錄)
 *   - 路由器需要知道基礎路徑才能正確解析 URL
 *   - 確保路由跳轉和瀏覽器返回功能正常運作
 *
 *   基礎路徑的影響：
 *   - 路由 '/' 實際對應 '/30DayMapChallenge-17_A-new-tool/'
 *   - 路由 '/about' 實際對應 '/30DayMapChallenge-17_A-new-tool/about'
 *   - 靜態資源也會相對此基礎路徑載入
 *
 * @param {Array<RouteRecord>} options.routes - 路由配置陣列
 *   包含所有路由定義的陣列
 *   路由器會按陣列順序進行匹配
 *   更具體的路由應該放在前面
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📊 其他可用配置選項 (未使用但可選)
 * ─────────────────────────────────────────────────────────────────────────
 *
 * @param {Function} [scrollBehavior] - 滾動行為控制
 *   控制路由切換時的頁面滾動位置
 *   範例: (to, from, savedPosition) => savedPosition || { top: 0 }
 *
 * @param {boolean} [linkActiveClass] - 活動鏈接的 CSS 類名
 *   預設為 'router-link-active'
 *   用於標記當前匹配的路由鏈接
 *
 * @param {boolean} [linkExactActiveClass] - 精確活動鏈接的 CSS 類名
 *   預設為 'router-link-exact-active'
 *   只有完全匹配時才添加此類名
 *
 * @param {boolean} [strict] - 嚴格模式
 *   是否區分路由路徑的尾部斜槓
 *   預設 false: '/users' 和 '/users/' 視為相同
 *
 * @param {boolean} [sensitive] - 大小寫敏感
 *   路由匹配是否區分大小寫
 *   預設 false: '/Users' 和 '/users' 視為相同
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🔧 進階配置範例
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 帶滾動行為的路由器：
 * const router = createRouter({
 *   history: createWebHistory('/30DayMapChallenge-17_A-new-tool/'),
 *   routes,
 *   scrollBehavior(to, from, savedPosition) {
 *     if (savedPosition) {
 *       return savedPosition; // 返回上次位置
 *     } else if (to.hash) {
 *       return { el: to.hash }; // 滾動到錨點
 *     } else {
 *       return { top: 0 }; // 滾動到頂部
 *     }
 *   }
 * });
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ⚡ 效能優化建議
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 1. 路由懶加載 (Lazy Loading):
 *    使用動態 import 進行代碼分割，減少初始加載大小
 *    component: () => import('../views/AboutView.vue')
 *
 * 2. 路由預取 (Prefetch):
 *    webpack 會自動為懶加載路由添加 prefetch hint
 *    可透過 webpack 註解控制: webpackPrefetch: true
 *
 * 3. 路由預載 (Preload):
 *    對於即將訪問的路由，可以提前載入
 *    使用 webpackPreload: true 註解
 *
 * 4. 路由分組:
 *    將相關路由放在同一個 chunk 中
 *    使用 webpackChunkName: 'group-name' 註解
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🐛 除錯技巧
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 查看當前路由信息：
 * console.log(router.currentRoute.value);
 *
 * 查看所有註冊的路由：
 * console.log(router.getRoutes());
 *
 * 檢查路由是否匹配：
 * const match = router.resolve('/about');
 * console.log(match);
 */
const router = createRouter({
  // 使用 HTML5 History API 模式
  // 基礎路徑設定為 GitHub Pages 部署路徑
  history: createWebHistory('/30DayMapChallenge-17_A-new-tool/'),

  // 路由配置陣列
  routes,
});

// ═══════════════════════════════════════════════════════════════════════════
// 📤 導出路由器實例 (Export Router Instance)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 導出路由器實例供 main.js 使用
 *
 * 在 main.js 中通過 app.use(router) 註冊路由器
 * 註冊後全應用可使用以下功能：
 * - <router-link> 組件: 宣告式導航
 * - <router-view> 組件: 路由視圖佔位符
 * - useRouter() 組合式 API: 獲取路由器實例
 * - useRoute() 組合式 API: 獲取當前路由信息
 * - this.$router (Options API): 路由器實例
 * - this.$route (Options API): 當前路由信息
 */
export default router;
