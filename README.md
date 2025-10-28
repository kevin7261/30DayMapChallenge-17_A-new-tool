# 🗺️ 30 Day Map Challenge - Day 17: A new tool

**台灣縣市 3D 地圖視覺化應用 (Taiwan Counties 3D Map Visualization)**

一個基於 **Vue 3** 和 **MapLibre GL JS**
的互動式台灣縣市 3D 地圖應用，展示台灣 22 個縣市的行政區域邊界。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.2+-green.svg)](https://vuejs.org/)
[![MapLibre GL JS](https://img.shields.io/badge/MapLibre%20GL%20JS-5.10+-blue.svg)](https://maplibre.org/)

---

## 📸 專案截圖

> 台灣縣市 3D 立體地圖，支援旋轉、傾斜、縮放等多種互動操作

---

## ✨ 功能特色

### 🗺️ 3D 地圖視覺化

- **立體呈現**：使用 MapLibre GL JS 的 3D extrusion 技術
- **真實底圖**：OpenStreetMap 地理資訊底圖
- **台灣縣市**：顯示台灣 22 個縣市的行政區域邊界
- **3D 高度**：縣市區域具有 50,000 米的立體高度
- **漸層配色**：白色到藍色的漸層色彩（根據縣市 ID）
- **邊界線條**：黑色縣市邊界線，寬度 2 像素
- **半透明效果**：80% 透明度，底圖清晰可見

### 🖱️ 互動操作

- **平移**：左鍵拖動地圖
- **旋轉**：右鍵拖動旋轉視角（3D 效果）
- **縮放**：滾輪控制縮放
- **傾斜**：Shift + 左鍵拖動調整俯仰角度
- **導航控制**：右上角縮放按鈕
- **懸停提示**：滑鼠移到縣市上顯示縣市名稱

### 🎨 視覺設計

- **灰色背景**：地圖背景色 #808080
- **漸層填充**：縣市 3D 區塊使用白到藍漸層
- **黑色邊框**：清晰的行政區域邊界
- **諾魯主題**：Popup 使用諾魯深藍 + 金黃色配色

---

## 🛠️ 技術架構

### 核心技術

| 技術               | 版本  | 用途                       |
| ------------------ | ----- | -------------------------- |
| **Vue 3**          | 3.2+  | 前端框架 (Composition API) |
| **MapLibre GL JS** | 5.10+ | 3D 地圖渲染引擎 (WebGL)    |
| **Pinia**          | 2.1+  | 狀態管理                   |
| **Vue Router**     | 4.5+  | 路由管理                   |
| **Bootstrap 5**    | 5.3+  | UI 樣式框架                |
| **Font Awesome**   | 6.7+  | 圖標庫                     |

### 專案架構

```
30DayMapChallenge-17_A-new-tool/
├── public/
│   ├── data/
│   │   └── geojson/
│   │       └── 直轄市、縣(市)界線1140318.geojson  # 台灣縣市邊界數據
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   └── css/
│   │       ├── common.css          # 共用樣式
│   │       └── variables.css       # CSS 變數
│   ├── stores/
│   │   ├── dataStore.js           # 地圖實例管理 (Pinia Composition API)
│   │   └── defineStore.js         # 配置存儲 (保留)
│   ├── tabs/
│   │   └── MapTab.vue             # MapLibre GL 地圖組件 (主要組件)
│   ├── views/
│   │   └── HomeView.vue           # 主頁面
│   ├── router/
│   │   └── index.js               # 路由配置
│   ├── utils/
│   │   └── utils.js               # 工具函數 (保留)
│   ├── App.vue                    # 根組件
│   └── main.js                    # 應用入口
├── babel.config.js                # Babel 配置
├── vue.config.js                  # Vue CLI 配置
├── package.json                   # 依賴管理
├── MAPLIBRE_3D_GUIDE.md          # MapLibre 3D 使用指南
└── README.md                      # 本文件
```

### 地圖實現原理

#### 1. MapLibre GL JS 初始化

```javascript
const map = new maplibregl.Map({
  container: mapContainer.value,
  style: {
    version: 8,
    sources: {
      /* OpenStreetMap 瓦片 */
    },
    layers: [
      /* 背景 + OSM 圖層 */
    ],
  },
  center: [120.9, 23.7], // 台灣中心
  zoom: 6.8,
  pitch: 60, // 3D 傾斜角度
  bearing: 0,
  antialias: true,
});
```

#### 2. 載入台灣縣市 GeoJSON

```javascript
const countyResponse = await fetch(
  `${process.env.BASE_URL}data/geojson/直轄市、縣(市)界線1140318.geojson`
);
const countyData = await countyResponse.json();
```

#### 3. 添加 3D 縣市圖層

```javascript
// 添加數據源
map.addSource('counties', {
  type: 'geojson',
  data: countyData,
});

// 添加 3D extrusion 圖層
map.addLayer({
  id: 'counties-3d',
  type: 'fill-extrusion',
  source: 'counties',
  paint: {
    'fill-extrusion-color': [
      'interpolate',
      ['linear'],
      ['get', 'COUNTYID'],
      0,
      '#ffffff',
      10000,
      '#4a90e2',
    ],
    'fill-extrusion-height': 50000,
    'fill-extrusion-opacity': 0.8,
  },
});

// 添加邊界線圖層
map.addLayer({
  id: 'counties-outline',
  type: 'line',
  source: 'counties',
  paint: {
    'line-color': '#000000',
    'line-width': 2,
  },
});
```

#### 4. 懸停提示效果

```javascript
const popup = new maplibregl.Popup({
  closeButton: false,
  closeOnClick: false,
});

map.on('mousemove', 'counties-3d', (e) => {
  const countyName = e.features[0].properties.COUNTYNAME;
  popup
    .setLngLat(e.lngLat)
    .setHTML(`<strong>${countyName}</strong>`)
    .addTo(map);
});
```

---

## 🚀 快速開始

### 環境要求

- **Node.js**: 16.0 以上
- **npm**: 7.0 以上 或 **yarn**: 1.22 以上
- **瀏覽器**: Chrome 49+, Firefox 31+, Safari 9.1+, Edge 15+ (支援 WebGL)

### 安裝步驟

#### 1. 克隆專案

```bash
git clone https://github.com/kevin7261/30DayMapChallenge-17_A-new-tool.git
cd 30DayMapChallenge-17_A-new-tool/website/30DayMapChallenge-17_A-new-tool
```

#### 2. 安裝依賴

```bash
npm install
```

或使用 yarn：

```bash
yarn install
```

#### 3. 啟動開發服務器

```bash
npm run serve
```

瀏覽器訪問：`http://localhost:8080/30DayMapChallenge-17_A-new-tool/`

#### 4. 構建生產版本

```bash
npm run build
```

構建結果位於 `dist/` 目錄

#### 5. 部署到 GitHub Pages

```bash
npm run deploy
```

---

## 📚 開發指南

### 修改地圖配置

#### 調整地圖中心點和縮放

編輯 `src/tabs/MapTab.vue` 的 `createMap()` 函數：

```javascript
const map = new maplibregl.Map({
  center: [120.9, 23.7], // [經度, 緯度]
  zoom: 6.8, // 縮放層級 (0-22)
  pitch: 60, // 傾斜角度 (0-85)
  bearing: 0, // 旋轉角度 (0-360)
});
```

#### 調整 3D 高度

修改 `add3DCountyLayers()` 函數：

```javascript
'fill-extrusion-height': 50000,  // 單位：米
```

#### 修改縣市顏色

修改漸層配色：

```javascript
'fill-extrusion-color': [
  'interpolate',
  ['linear'],
  ['get', 'COUNTYID'],
  0,
  '#ffffff',     // 起始顏色（修改此處）
  10000,
  '#4a90e2'      // 結束顏色（修改此處）
]
```

使用單一顏色：

```javascript
'fill-extrusion-color': '#4a90e2'
```

#### 調整透明度

```javascript
'fill-extrusion-opacity': 0.8  // 0.0 (完全透明) - 1.0 (完全不透明)
```

### 更換底圖

編輯 `src/tabs/MapTab.vue` 的 `createMap()` 函數：

#### OpenStreetMap (默認)

```javascript
tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'];
```

#### Carto 深色底圖

```javascript
tiles: [
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
];
```

#### ESRI 衛星影像

```javascript
tiles: [
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
];
```

#### ESRI 地形圖

```javascript
tiles: [
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
];
```

#### 無底圖（純色背景）

刪除 `osm-tiles` 相關的 source 和 layer 設定。

### 修改樣式主題

#### Popup 樣式

編輯 `src/tabs/MapTab.vue` 的 `<style>` 區塊：

```css
:deep(.maplibregl-popup-content) {
  background: rgba(0, 43, 127, 0.95); /* 諾魯深藍 */
  color: #ffc61e; /* 金黃色 */
  border: 2px solid #ffc61e;
}
```

#### 導航控制器樣式

```css
:deep(.maplibregl-ctrl button) {
  background-color: rgba(0, 43, 127, 0.95);
  color: #ffc61e;
}
```

---

## 📊 數據來源

### 台灣縣市邊界數據

- **名稱**：直轄市、縣(市)界線1140318.geojson
- **來源**：政府開放資料平台
- **格式**：GeoJSON
- **座標系統**：WGS84 (EPSG:4326)
- **更新日期**：2024-03-18
- **授權**：政府資料開放授權條款

### 底圖資料

- **名稱**：OpenStreetMap
- **網址**：https://www.openstreetmap.org/
- **授權**：Open Database License (ODbL)
- **使用**：瓦片服務（非商業用途）

---

## 🔧 開發指令

```bash
# 啟動開發服務器（支援熱重載）
npm run serve

# 構建生產版本
npm run build

# 程式碼檢查
npm run lint

# 程式碼檢查並修復
npm run lint:fix

# 程式碼格式化 (Prettier)
npm run prettier

# 程式碼格式化檢查
npm run prettier:check

# 程式碼格式化 + ESLint 修復
npm run format

# 部署到 GitHub Pages
npm run deploy
```

---

## 🌐 線上展示

- **GitHub Pages**: https://kevin7261.github.io/30DayMapChallenge-17_A-new-tool/
- **專案倉庫**: https://github.com/kevin7261/30DayMapChallenge-17_A-new-tool

---

## 📖 詳細文檔

- [MAPLIBRE_3D_GUIDE.md](./MAPLIBRE_3D_GUIDE.md) - MapLibre GL JS
  3D 地圖使用指南
- [Vue 3 官方文檔](https://vuejs.org/)
- [MapLibre GL JS 官方文檔](https://maplibre.org/maplibre-gl-js/docs/)
- [Pinia 官方文檔](https://pinia.vuejs.org/)

---

## 🐛 常見問題

### 地圖無法顯示

1. **確認 GeoJSON 檔案存在**

   ```
   public/data/geojson/直轄市、縣(市)界線1140318.geojson
   ```

2. **檢查瀏覽器控制台**

   - 按 F12 打開開發者工具
   - 查看 Console 標籤中的錯誤訊息

3. **確認瀏覽器支援 WebGL**
   - 訪問：https://get.webgl.org/
   - 如果看到旋轉的立方體，表示支援 WebGL

### 3D 效果不明顯

- **增加高度**：調大 `fill-extrusion-height` 的值
- **調整角度**：增加 `pitch` 值 (建議 45-70)
- **旋轉視角**：使用右鍵拖動地圖

### 效能問題

- **降低高度**：減小 `fill-extrusion-height` 的值
- **關閉抗鋸齒**：設定 `antialias: false`
- **使用更快的瀏覽器**：推薦使用 Chrome 或 Edge

### Popup 不顯示

- **檢查 GeoJSON 屬性**：確認有 `COUNTYNAME` 欄位
- **查看控制台錯誤**：檢查是否有 JavaScript 錯誤
- **重新載入頁面**：按 Ctrl+F5 強制重新載入

---

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request！

### 貢獻流程

1. Fork 本專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 程式碼規範

- 使用 **ESLint** 進行程式碼檢查
- 使用 **Prettier** 進行格式化
- 遵循 **Vue 3 Composition API** 風格
- 添加詳細的註解說明

---

## 📄 授權

本專案採用 [MIT 授權條款](LICENSE)。

---

## 🙏 致謝

### 開源項目

- [Vue.js](https://vuejs.org/) - 漸進式 JavaScript 框架
- [MapLibre GL JS](https://maplibre.org/) - 開源地圖渲染引擎
- [Pinia](https://pinia.vuejs.org/) - Vue 狀態管理
- [Bootstrap](https://getbootstrap.com/) - CSS 框架
- [Font Awesome](https://fontawesome.com/) - 圖標庫
- [OpenStreetMap](https://www.openstreetmap.org/) - 開放街圖底圖

### 數據來源

- [政府資料開放平臺](https://data.gov.tw/) - 台灣縣市邊界數據

### 靈感來源

- [#30DayMapChallenge](https://30daymapchallenge.com/) - 2025 地圖挑戰活動

---

## 📬 聯繫方式

- **GitHub**: [@kevin7261](https://github.com/kevin7261)
- **專案 Issues**:
  [提交問題](https://github.com/kevin7261/30DayMapChallenge-17_A-new-tool/issues)

---

**#30DayMapChallenge** 🗺️ **Day 17: A new tool** | **Made with ❤️ using Vue 3 +
MapLibre GL JS**
