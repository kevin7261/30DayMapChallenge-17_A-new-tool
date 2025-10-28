/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚙️ Vue CLI 項目配置文件 (Vue CLI Project Configuration)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * @fileoverview
 * 本文件是 Vue CLI 項目的主要配置文件，用於自定義 webpack 構建、開發伺服器、
 * 靜態資源處理等各項構建和開發時的行為。
 *
 * Vue CLI 基於 webpack 構建，本配置文件提供了更簡潔的 API 來配置常見選項，
 * 避免直接操作複雜的 webpack 配置。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📋 配置項說明
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 1. publicPath
 *    - 用途：設定應用部署的基礎路徑（靜態資源的公開路徑）
 *    - 影響：所有靜態資源（JS、CSS、圖片等）的載入路徑
 *    - 重要性：必須與部署環境一致，否則資源無法正確載入
 *
 * 2. transpileDependencies
 *    - 用途：指定需要 Babel 轉譯的 node_modules 依賴
 *    - 影響：控制哪些第三方庫需要被 Babel 處理以支援舊版瀏覽器
 *    - 預設行為：node_modules 中的依賴不會被轉譯（以提高構建速度）
 *
 * 3. devServer
 *    - 用途：配置開發伺服器的行為
 *    - 影響：本地開發時的訪問方式、端口、代理等
 *    - 範圍：僅在開發模式下有效（npm run serve）
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🌐 部署環境說明
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 本專案部署於 GitHub Pages，URL 結構為：
 * https://[username].github.io/[repository-name]/
 *
 * 實際部署路徑：
 * https://kevin7261.github.io/30DayMapChallenge-17_A-new-tool/
 *
 * 因此 publicPath 必須設定為專案倉庫名稱：
 * '/30DayMapChallenge-17_A-new-tool/'
 *
 * publicPath 的影響範圍：
 * - HTML 中 <script> 和 <link> 標籤的 src/href 路徑
 * - CSS 中 url() 引用的資源路徑
 * - JavaScript 中動態導入的模組路徑
 * - router 的 base 路徑（必須與 publicPath 一致）
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🔧 配置環境差異
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 開發環境 (npm run serve):
 * - URL: http://localhost:8080/30DayMapChallenge-17_A-new-tool/
 * - 熱模組替換 (HMR) 開啟
 * - Source Maps 完整
 * - 構建速度優先
 *
 * 生產環境 (npm run build):
 * - URL: https://kevin7261.github.io/30DayMapChallenge-17_A-new-tool/
 * - 代碼壓縮和優化
 * - 資源雜湊命名
 * - 構建體積最小化
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📁 相關文件
 * ─────────────────────────────────────────────────────────────────────────
 * - src/router/index.js    - 路由配置（base 路徑需與 publicPath 一致）
 * - babel.config.js        - Babel 轉譯配置
 * - public/index.html      - HTML 模板（BASE_URL 變量來自 publicPath）
 * - package.json           - 項目元數據和腳本命令
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🚀 進階配置選項
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 本項目使用基本配置，但 Vue CLI 還支援以下進階選項：
 *
 * - outputDir: 構建輸出目錄（預設 'dist'）
 * - assetsDir: 靜態資源子目錄（預設 ''）
 * - indexPath: index.html 輸出路徑（預設 'index.html'）
 * - filenameHashing: 是否為檔案名添加 hash（預設 true）
 * - lintOnSave: 是否在保存時執行 ESLint（預設 true）
 * - productionSourceMap: 是否生成生產環境的 Source Maps（預設 true）
 * - css: CSS 相關配置（預處理器、提取、Source Maps 等）
 * - devServer: 開發伺服器詳細配置（代理、CORS、壓縮等）
 * - configureWebpack: 直接修改 webpack 配置（對象或函數）
 * - chainWebpack: 使用 webpack-chain 修改配置（函數）
 * - pluginOptions: 第三方插件配置
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📝 常見問題解決
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 問題 1：資源 404 錯誤
 * - 原因：publicPath 設置錯誤或與實際部署路徑不符
 * - 解決：確保 publicPath 與部署的 URL 路徑一致
 *
 * 問題 2：開發環境無法訪問
 * - 原因：端口被佔用或 host 配置問題
 * - 解決：修改 devServer.port 或關閉佔用端口的程式
 *
 * 問題 3：第三方庫在舊瀏覽器報錯
 * - 原因：依賴未被轉譯，包含 ES6+ 語法
 * - 解決：將該依賴添加到 transpileDependencies 陣列
 *
 * 問題 4：構建後白屏
 * - 原因：路由 base 與 publicPath 不一致
 * - 解決：確保 router 的 base 路徑與 publicPath 相同
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🔗 官方文檔
 * ─────────────────────────────────────────────────────────────────────────
 * Vue CLI 配置參考：https://cli.vuejs.org/config/
 * webpack 配置：https://webpack.js.org/configuration/
 * webpack-chain：https://github.com/neutrinojs/webpack-chain
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

// 從 @vue/cli-service 導入 defineConfig 工具函數
// 此函數提供 TypeScript 類型提示，即使在 JavaScript 項目中也能獲得更好的
// IDE 支援和自動補全
const { defineConfig } = require('@vue/cli-service');

// ═══════════════════════════════════════════════════════════════════════════
// ⚙️ Vue CLI 配置對象 (Vue CLI Configuration Object)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Vue CLI 項目配置
 *
 * 使用 defineConfig() 包裹配置對象，提供更好的 IDE 支援和類型檢查。
 * 配置對象中的各項設定會影響 webpack 的最終配置。
 */
module.exports = defineConfig({
  // ───────────────────────────────────────────────────────────────────────
  // 🌐 公開路徑配置 (Public Path Configuration)
  // ───────────────────────────────────────────────────────────────────────

  /**
   * publicPath - 應用部署的基礎路徑
   *
   * 用途：
   * - 定義應用在服務器上的部署路徑
   * - 影響所有靜態資源的載入路徑（JS、CSS、圖片、字體等）
   * - 在 HTML 模板中可通過 BASE_URL 變數使用
   *
   * 設定原則：
   * - 部署在網站根目錄：設為 '/'
   * - 部署在子目錄：設為 '/子目錄名稱/'（必須以 / 開始和結束）
   * - GitHub Pages 倉庫：設為 '/倉庫名稱/'
   *
   * 本專案配置：
   * - 值：'/30DayMapChallenge-17_A-new-tool/'
   * - 原因：GitHub Pages 部署在 username.github.io/repository-name/
   * - 完整 URL：https://kevin7261.github.io/30DayMapChallenge-17_A-new-tool/
   *
   * 特殊值：
   * - '.'：使用相對路徑（適合部署路徑不固定的情況）
   * - ''：等同於 '/'（根目錄）
   *
   * 影響範例：
   * - JS 文件：/30DayMapChallenge-17_A-new-tool/js/app.js
   * - CSS 文件：/30DayMapChallenge-17_A-new-tool/css/app.css
   * - 圖片：/30DayMapChallenge-17_A-new-tool/img/logo.png
   *
   * ⚠️ 重要提醒：
   * - 此值必須與 router 的 base 路徑一致
   * - 修改此值後需要重新構建（npm run build）
   * - 本地開發時也會使用此路徑（訪問 localhost:8080/30DayMapChallenge-17_A-new-tool/）
   */
  publicPath: '/30DayMapChallenge-17_A-new-tool/',

  // ───────────────────────────────────────────────────────────────────────
  // 🔄 依賴轉譯配置 (Dependency Transpilation Configuration)
  // ───────────────────────────────────────────────────────────────────────

  /**
   * transpileDependencies - 需要 Babel 轉譯的依賴
   *
   * 用途：
   * - 指定 node_modules 中哪些依賴需要經過 Babel 轉譯
   * - 解決第三方庫在舊版瀏覽器的相容性問題
   *
   * 預設行為：
   * - node_modules 中的依賴不會被 Babel 處理（以提高構建速度）
   * - 假設所有依賴已經是 ES5 兼容的代碼
   *
   * 何時需要設置：
   * - 第三方庫使用 ES6+ 語法（如箭頭函數、class、async/await）
   * - 目標瀏覽器不支援該庫使用的 JavaScript 特性
   * - 在舊版瀏覽器（如 IE11）中出現語法錯誤
   *
   * 設置方式：
   * - true：轉譯所有 node_modules 依賴（不推薦，構建速度慢）
   * - false：不轉譯任何依賴（預設）
   * - 陣列：指定需要轉譯的包名
   *
   * 本專案配置：
   * - 值：true
   * - 原因：確保所有依賴都能在目標瀏覽器中正常運行
   * - 使用的依賴：
   *   - vue: Vue 3 核心
   *   - vue-router: 路由管理
   *   - pinia: 狀態管理
   *   - d3: 數據視覺化
   *   - maplibre-gl: 3D 地圖庫
   *   - bootstrap: UI 框架
   *   - 等等...
   *
   * 指定特定包的範例：
   * transpileDependencies: [
   *   'vue',
   *   'vue-router',
   *   'pinia',
   *   'd3',
   *   'maplibre-gl',
   *   /some-esm-package/ // 也可使用正則表達式
   * ]
   *
   * 效能考量：
   * - true：構建時間較長，但相容性最好
   * - 陣列：僅轉譯必要的包，平衡速度和相容性
   * - false：構建最快，但可能有相容性問題
   *
   * 瀏覽器支援（來自 package.json browserslist）：
   * - "> 1%"：全球使用率超過 1% 的瀏覽器
   * - "last 2 versions"：每個瀏覽器的最新兩個版本
   * - "not dead"：仍在維護的瀏覽器
   * - "not ie 11"：排除 IE11
   */
  transpileDependencies: true,

  // ───────────────────────────────────────────────────────────────────────
  // 🖥️ 開發伺服器配置 (Development Server Configuration)
  // ───────────────────────────────────────────────────────────────────────

  /**
   * devServer - 開發伺服器配置
   *
   * 用途：
   * - 配置 webpack-dev-server 的行為
   * - 控制本地開發時的伺服器設定
   * - 僅在開發模式（npm run serve）下生效
   *
   * 配置選項說明：
   */
  devServer: {
    /**
     * port - 開發伺服器端口號
     *
     * 用途：指定開發伺服器監聽的 TCP 端口
     * 預設：8080
     * 範圍：1-65535（建議使用 1024 以上的端口）
     *
     * 本專案配置：
     * - 值：8080
     * - 訪問地址：http://localhost:8080/30DayMapChallenge-17_A-new-tool/
     *
     * 端口被佔用時的處理：
     * - Vue CLI 會自動嘗試使用下一個可用端口（8081、8082...）
     * - 也可手動指定其他端口
     *
     * 其他端口選項：
     * - 3000：常用於 React 開發
     * - 5173：Vite 預設端口
     * - 8000：Django 預設端口
     */
    port: 8080,

    /**
     * host - 開發伺服器主機地址
     *
     * 用途：指定開發伺服器綁定的主機地址
     * 預設：'localhost'（僅本機可訪問）
     *
     * 本專案配置：
     * - 值：'localhost'
     * - 效果：只能從本機訪問開發伺服器
     *
     * 其他常用設定：
     * - 'localhost'：僅本機訪問（最安全）
     * - '0.0.0.0'：允許局域網內其他設備訪問（用於手機調試）
     * - '127.0.0.1'：僅本機訪問（與 localhost 類似）
     *
     * 局域網訪問範例：
     * - 設為 '0.0.0.0'
     * - 通過本機 IP 訪問：http://192.168.1.100:8080/
     * - 適用於手機、平板等設備測試響應式設計
     *
     * 安全性考量：
     * - 'localhost'：僅本機，最安全
     * - '0.0.0.0'：網絡可訪問，需注意防火牆設定
     */
    host: 'localhost',

    // ─────────────────────────────────────────────────────────────────────
    // 💡 更多可用的 devServer 配置選項
    // ─────────────────────────────────────────────────────────────────────
    //
    // 本專案未使用以下選項，但可根據需要添加：
    //
    // open: true,
    //   // 自動在瀏覽器中打開應用
    //
    // hot: true,
    //   // 開啟熱模組替換（HMR）（預設已開啟）
    //
    // https: true,
    //   // 使用 HTTPS 協議（需要時）
    //
    // proxy: {
    //   '/api': {
    //     target: 'http://backend.example.com',
    //     changeOrigin: true,
    //     pathRewrite: { '^/api': '' }
    //   }
    // },
    //   // API 代理設定，解決跨域問題
    //   // 將 /api/* 請求代理到後端伺服器
    //
    // compress: true,
    //   // 開啟 gzip 壓縮
    //
    // allowedHosts: 'all',
    //   // 允許訪問的主機名列表
    //
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // },
    //   // 自定義響應頭（用於 CORS 等）
    //
    // historyApiFallback: true,
    //   // 支援 HTML5 History 路由（預設已開啟）
    //
    // static: {
    //   watch: true,
    //   directory: path.join(__dirname, 'public')
    // },
    //   // 靜態文件配置
  },

  // ─────────────────────────────────────────────────────────────────────
  // 💡 更多可用的 Vue CLI 配置選項
  // ─────────────────────────────────────────────────────────────────────
  //
  // 本專案未使用以下選項，但可根據需要添加：
  //
  // outputDir: 'dist',
  //   // 構建輸出目錄（預設 'dist'）
  //
  // assetsDir: 'static',
  //   // 靜態資源子目錄（預設 ''）
  //
  // indexPath: 'index.html',
  //   // index.html 的輸出路徑（相對於 outputDir）
  //
  // filenameHashing: true,
  //   // 生成的靜態資源文件名是否包含 hash（預設 true）
  //
  // lintOnSave: true,
  //   // 是否在開發環境下每次保存時執行 ESLint（預設 true）
  //
  // productionSourceMap: false,
  //   // 生產環境是否生成 Source Maps（預設 true）
  //   // 設為 false 可減小打包體積並保護源代碼
  //
  // css: {
  //   extract: true,
  //   sourceMap: false,
  //   loaderOptions: {
  //     sass: {
  //       additionalData: `@import "@/styles/variables.scss";`
  //     }
  //   }
  // },
  //   // CSS 相關配置
  //
  // configureWebpack: {
  //   // 直接修改 webpack 配置
  //   plugins: [
  //     // 自定義 webpack 插件
  //   ],
  //   optimization: {
  //     // 優化配置
  //   }
  // },
  //
  // chainWebpack: config => {
  //   // 使用 webpack-chain 修改配置
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //     .tap(options => {
  //       // 修改 vue-loader 選項
  //       return options;
  //     });
  // },
  //
  // pluginOptions: {
  //   // 第三方插件的配置
  //   // 例如 @vue/cli-plugin-electron-builder 的配置
  // }
});
