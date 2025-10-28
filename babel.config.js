/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔄 Babel 轉譯配置文件 (Babel Transpilation Configuration)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * @fileoverview
 * 本文件配置 Babel JavaScript 編譯器，負責將現代 JavaScript (ES6+) 語法轉換為
 * 向後兼容的 ES5 代碼，確保應用程式能在目標瀏覽器中正常運行。
 *
 * Babel 是一個工具鏈，主要用於：
 * 1. 轉換 ES6+ 語法為 ES5（語法轉換）
 * 2. Polyfill 缺失的特性（API 補丁）
 * 3. 轉換 JSX 等特殊語法
 * 4. 源碼轉換和優化
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📋 Babel 核心概念
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 1. 語法轉換 (Syntax Transform)
 *    - 將新語法轉為舊語法
 *    - 例如：箭頭函數 → 普通函數
 *    - 例如：class → function + prototype
 *
 * 2. Polyfill（API 補丁）
 *    - 為舊瀏覽器提供缺失的 API 實現
 *    - 例如：Promise、Array.from、Object.assign
 *    - 通過 core-js 庫提供
 *
 * 3. Preset（預設配置集）
 *    - 一組 Babel 插件的集合
 *    - 簡化配置，無需手動添加每個插件
 *    - Vue CLI 提供專用的 preset
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🎯 本專案配置策略
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Preset: @vue/cli-plugin-babel/preset
 * - Vue CLI 官方 Babel 預設配置
 * - 針對 Vue 項目優化
 * - 包含 @babel/preset-env 和 Vue 相關插件
 *
 * useBuiltIns: 'usage'
 * - 按需引入 polyfill
 * - 分析代碼中使用的 API，只引入需要的 polyfill
 * - 減小打包體積
 *
 * corejs: 3
 * - 使用 core-js 3.x 版本
 * - 提供最新的 JavaScript API polyfill
 * - 更好的模塊化和更小的體積
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🔧 useBuiltIns 選項詳解
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 'entry'（入口引入）:
 * - 在入口文件引入全部 polyfill
 * - 根據 browserslist 決定引入哪些
 * - 體積較大，但確保完整支援
 * - 需要手動在入口添加：import 'core-js/stable'
 *
 * 'usage'（按需引入）✅ 本專案採用:
 * - 分析代碼中實際使用的 API
 * - 自動引入需要的 polyfill
 * - 體積最小，最優化
 * - 無需手動引入，Babel 自動處理
 *
 * false（不引入）:
 * - 不自動引入任何 polyfill
 * - 需要手動管理 polyfill
 * - 適合只支援現代瀏覽器的項目
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📊 轉譯範例
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 轉譯前（ES6+）:
 * ```javascript
 * const greet = (name) => {
 *   return `Hello, ${name}!`;
 * };
 * const numbers = [1, 2, 3];
 * const doubled = numbers.map(n => n * 2);
 * const promise = Promise.resolve('done');
 * ```
 *
 * 轉譯後（ES5）:
 * ```javascript
 * "use strict";
 * var greet = function greet(name) {
 *   return "Hello, ".concat(name, "!");
 * };
 * var numbers = [1, 2, 3];
 * var doubled = numbers.map(function (n) {
 *   return n * 2;
 * });
 * var promise = Promise.resolve('done'); // Promise 會自動引入 polyfill
 * ```
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🌐 瀏覽器支援配置
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Babel 根據 package.json 中的 browserslist 決定如何轉譯：
 *
 * ```json
 * "browserslist": [
 *   "> 1%",           // 全球使用率超過 1% 的瀏覽器
 *   "last 2 versions", // 每個瀏覽器的最新兩個版本
 *   "not dead",       // 仍在維護的瀏覽器
 *   "not ie 11"       // 排除 IE11
 * ]
 * ```
 *
 * 影響：
 * - 決定需要轉譯哪些語法
 * - 決定需要引入哪些 polyfill
 * - 影響最終打包體積
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🔌 @vue/cli-plugin-babel/preset 包含的插件
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 1. @babel/preset-env
 *    - 智能轉譯 ES6+ 語法
 *    - 根據 browserslist 決定轉譯程度
 *
 * 2. @babel/plugin-transform-runtime
 *    - 重用 Babel 輔助函數（減小體積）
 *    - 避免污染全局作用域
 *
 * 3. babel-plugin-jsx
 *    - 支援 Vue 3 JSX 語法
 *
 * 4. @babel/plugin-syntax-dynamic-import
 *    - 支援動態 import() 語法（代碼分割）
 *
 * 5. @babel/plugin-proposal-decorators
 *    - 支援裝飾器語法（如果使用）
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📦 Core-js 版本差異
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Core-js 2 (已過時):
 * - 不再更新
 * - 缺少較新的 API polyfill
 * - 體積較大
 *
 * Core-js 3 ✅ 本專案使用:
 * - 積極維護
 * - 支援最新 ECMAScript 提案
 * - 更好的模塊化設計
 * - 體積更小
 * - 支援 ES2015+ 所有特性
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ⚡ 效能優化建議
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 1. 使用 useBuiltIns: 'usage'（本項目已使用）
 *    - 減少不必要的 polyfill
 *    - 顯著減小打包體積
 *
 * 2. 合理設置 browserslist
 *    - 不支援過舊的瀏覽器可減小體積
 *    - 權衡用戶覆蓋率和打包大小
 *
 * 3. 使用 @babel/plugin-transform-runtime
 *    - 本項目的 preset 已包含
 *    - 避免輔助函數重複
 *
 * 4. 排除不需要轉譯的依賴
 *    - 在 vue.config.js 的 transpileDependencies 中配置
 *    - 加快構建速度
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🐛 常見問題解決
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 問題 1：第三方庫報錯「regeneratorRuntime is not defined」
 * - 原因：async/await 需要 regenerator-runtime
 * - 解決：確保 useBuiltIns 設為 'usage'，Babel 會自動引入
 *
 * 問題 2：IE11 中報錯「Promise is not defined」
 * - 原因：瀏覽器不支援 Promise，且 polyfill 未生效
 * - 解決：檢查 browserslist 是否正確，確保未排除 IE11
 *
 * 問題 3：打包體積過大
 * - 原因：引入了不必要的 polyfill
 * - 解決：使用 useBuiltIns: 'usage'，並合理配置 browserslist
 *
 * 問題 4：開發環境構建速度慢
 * - 原因：轉譯所有依賴耗時較長
 * - 解決：在 vue.config.js 中精確配置 transpileDependencies
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🔧 進階配置範例
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 自定義配置範例（本項目未使用）：
 *
 * module.exports = {
 *   presets: [
 *     [
 *       '@vue/cli-plugin-babel/preset',
 *       {
 *         useBuiltIns: 'usage',
 *         corejs: 3,
 *         targets: {
 *           // 自定義目標瀏覽器
 *           chrome: '58',
 *           ie: '11'
 *         },
 *         modules: false, // 保留 ES modules（webpack tree-shaking）
 *         debug: false,   // 輸出調試信息
 *       }
 *     ]
 *   ],
 *   plugins: [
 *     // 添加額外的 Babel 插件
 *     '@babel/plugin-proposal-optional-chaining',
 *     '@babel/plugin-proposal-nullish-coalescing-operator'
 *   ],
 *   env: {
 *     // 環境特定配置
 *     test: {
 *       presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
 *     }
 *   }
 * };
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 📁 相關文件
 * ─────────────────────────────────────────────────────────────────────────
 * - package.json          - browserslist 配置
 * - vue.config.js         - transpileDependencies 配置
 * - .browserslistrc       - 瀏覽器列表配置（可選，優先於 package.json）
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 🔗 官方文檔
 * ─────────────────────────────────────────────────────────────────────────
 * - Babel 官網：https://babeljs.io/
 * - @vue/cli-plugin-babel：https://cli.vuejs.org/core-plugins/babel.html
 * - core-js：https://github.com/zloirock/core-js
 * - browserslist：https://github.com/browserslist/browserslist
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
// ⚙️ Babel 配置對象 (Babel Configuration Object)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Babel 配置導出
 *
 * 配置對象結構：
 * - presets: 預設配置集陣列
 * - plugins: 額外插件陣列（可選）
 * - env: 環境特定配置（可選）
 */
module.exports = {
  // ───────────────────────────────────────────────────────────────────────
  // 🎯 預設配置集 (Presets)
  // ───────────────────────────────────────────────────────────────────────

  /**
   * presets - Babel 預設配置集
   *
   * Preset 是一組 Babel 插件的集合，簡化配置過程。
   * 陣列中的 preset 按順序執行（從後往前）。
   *
   * 格式：
   * - 字符串：'@babel/preset-env'
   * - 陣列：['preset-name', options]
   */
  presets: [
    [
      // ─────────────────────────────────────────────────────────────────
      // Vue CLI Babel Preset
      // ─────────────────────────────────────────────────────────────────

      /**
       * @vue/cli-plugin-babel/preset
       *
       * Vue CLI 官方提供的 Babel preset，專為 Vue 項目優化。
       *
       * 包含的功能：
       * - @babel/preset-env（智能語法轉譯）
       * - babel-plugin-jsx（Vue 3 JSX 支援）
       * - @babel/plugin-transform-runtime（運行時輔助）
       * - 動態 import 支援（代碼分割）
       * - 其他 Vue 相關優化
       *
       * 官方文檔：
       * https://cli.vuejs.org/core-plugins/babel.html
       */
      '@vue/cli-plugin-babel/preset',

      // ─────────────────────────────────────────────────────────────────
      // Preset 配置選項
      // ─────────────────────────────────────────────────────────────────

      {
        /**
         * useBuiltIns - Polyfill 引入策略
         *
         * 決定如何引入 polyfill 來支援舊瀏覽器缺失的 API。
         *
         * 可選值：
         * - 'entry'：在入口引入全部 polyfill
         * - 'usage'：按需引入，分析代碼實際使用的 API ✅ 推薦
         * - false：不自動引入 polyfill
         *
         * 本專案設定：'usage'
         *
         * 優點：
         * - ✅ 打包體積最小（只引入使用的 polyfill）
         * - ✅ 無需手動引入 core-js
         * - ✅ 自動分析代碼依賴
         * - ✅ 維護成本低
         *
         * 運作方式：
         * 1. Babel 分析代碼中使用的 JavaScript API
         * 2. 檢查 browserslist 目標瀏覽器支援情況
         * 3. 僅引入目標瀏覽器不支援的 API 的 polyfill
         *
         * 範例：
         * 代碼中使用 Promise.resolve()
         * → Babel 檢測到使用 Promise
         * → 檢查目標瀏覽器是否支援 Promise
         * → 如果不支援，自動引入 Promise polyfill
         * → import "core-js/modules/es.promise.js";
         *
         * 與 'entry' 的對比：
         * - 'entry'：全部引入，體積約 80-100KB（gzip 後）
         * - 'usage'：按需引入，體積約 10-30KB（gzip 後）
         */
        useBuiltIns: 'usage',

        /**
         * corejs - Core-js 版本
         *
         * 指定使用的 core-js 版本號，core-js 提供 JavaScript
         * 標準庫的 polyfill 實現。
         *
         * 可選值：
         * - 2：core-js@2（已過時，不推薦）
         * - 3：core-js@3（推薦，支援最新特性）✅
         * - { version: 3, proposals: true }：包含提案階段的特性
         *
         * 本專案設定：3
         *
         * Core-js 3 的優勢：
         * - ✅ 積極維護，持續更新
         * - ✅ 支援 ES2015-ES2024 所有特性
         * - ✅ 更好的模塊化設計
         * - ✅ 體積更小，性能更好
         * - ✅ 支援 Stage 3 提案
         *
         * Core-js 3 提供的 polyfill 範例：
         * - Promise、Promise.allSettled、Promise.any
         * - Array.from、Array.of、Array.prototype.includes
         * - Object.assign、Object.entries、Object.values
         * - String.prototype.includes、padStart、padEnd
         * - Symbol、Map、Set、WeakMap、WeakSet
         * - Proxy、Reflect
         * - async/await（regenerator-runtime）
         * - 等等...
         *
         * 版本差異：
         * - Core-js 2：
         *   - 停止維護
         *   - 缺少較新的 API
         *   - 約 50KB（gzip）
         *
         * - Core-js 3：
         *   - 持續更新
         *   - 完整的 ES2024 支援
         *   - 按需載入後約 10-30KB（gzip）
         *
         * 依賴安裝：
         * 確保 package.json 中已安裝 core-js：
         * "dependencies": {
         *   "core-js": "^3.8.3"
         * }
         *
         * 注意事項：
         * - 必須與 useBuiltIns 配合使用
         * - 版本號必須與安裝的 core-js 版本匹配
         * - 升級 core-js 需同步更新此設定
         */
        corejs: 3,

        // ───────────────────────────────────────────────────────────────
        // 💡 其他可用選項（本專案未使用）
        // ───────────────────────────────────────────────────────────────
        //
        // targets: {
        //   // 自定義目標瀏覽器（會覆蓋 browserslist）
        //   chrome: '58',
        //   edge: '14',
        //   firefox: '52',
        //   safari: '10',
        //   ie: '11'
        // },
        //
        // modules: false,
        //   // 保留 ES modules 語法（用於 webpack tree-shaking）
        //   // 預設會轉為 CommonJS
        //   // 設為 false 可優化打包體積
        //
        // debug: false,
        //   // 輸出 Babel 轉譯的詳細調試信息
        //   // 包括引入的 polyfill 列表、轉譯的插件等
        //   // 開發時可設為 true 進行調試
        //
        // spec: false,
        //   // 更嚴格地遵循 ECMAScript 規範
        //   // 可能增加轉譯後的代碼量
        //
        // loose: false,
        //   // 寬鬆模式（生成更簡潔但不完全合規的代碼）
        //   // 可減小體積但可能有兼容性問題
        //
        // include: [],
        //   // 強制包含的插件或 polyfill
        //   // 範例：['es.promise', 'es.array.iterator']
        //
        // exclude: [],
        //   // 排除的插件或 polyfill
        //   // 範例：['es.promise']（如果確定不需要）
        //
        // shippedProposals: false,
        //   // 包含已在瀏覽器中實現的提案特性
        //
        // forceAllTransforms: false,
        //   // 強制轉譯所有代碼（忽略 browserslist）
        //   // 用於某些特殊環境（如 UglifyJS）
      },
    ],
  ],

  // ─────────────────────────────────────────────────────────────────────
  // 💡 額外插件配置區域（本專案未使用）
  // ─────────────────────────────────────────────────────────────────────
  //
  // 如果需要添加 @vue/cli-plugin-babel/preset 未包含的插件，
  // 可以在這裡配置：
  //
  // plugins: [
  //   // 可選鏈運算符 (Optional Chaining)
  //   // 語法：obj?.property
  //   '@babel/plugin-proposal-optional-chaining',
  //
  //   // 空值合併運算符 (Nullish Coalescing)
  //   // 語法：value ?? defaultValue
  //   '@babel/plugin-proposal-nullish-coalescing-operator',
  //
  //   // 裝飾器 (Decorators)
  //   // 用於 class 裝飾
  //   ['@babel/plugin-proposal-decorators', { legacy: true }],
  //
  //   // Class 屬性 (Class Properties)
  //   // 語法：class A { property = 1; }
  //   ['@babel/plugin-proposal-class-properties', { loose: true }],
  //
  //   // Pipeline 運算符
  //   // 語法：value |> transform
  //   ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
  //
  //   // 動態 import (Dynamic Import)
  //   // 已包含在 preset 中，通常無需單獨添加
  //   '@babel/plugin-syntax-dynamic-import',
  //
  //   // 自定義插件
  //   './my-custom-babel-plugin.js'
  // ],

  // ─────────────────────────────────────────────────────────────────────
  // 💡 環境特定配置（本專案未使用）
  // ─────────────────────────────────────────────────────────────────────
  //
  // 可以根據不同的環境（NODE_ENV）使用不同的配置：
  //
  // env: {
  //   // 測試環境配置
  //   test: {
  //     presets: [
  //       [
  //         '@babel/preset-env',
  //         {
  //           targets: { node: 'current' }, // 使用當前 Node.js 版本
  //         },
  //       ],
  //     ],
  //     plugins: [
  //       // 測試環境專用插件
  //       'babel-plugin-istanbul' // 代碼覆蓋率
  //     ]
  //   },
  //
  //   // 開發環境配置
  //   development: {
  //     plugins: [
  //       // 開發環境專用插件
  //       'babel-plugin-component' // 組件按需引入
  //     ]
  //   },
  //
  //   // 生產環境配置
  //   production: {
  //     plugins: [
  //       // 生產環境專用插件
  //       'babel-plugin-transform-remove-console' // 移除 console
  //     ]
  //   }
  // }
};
