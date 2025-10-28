# MapLibre GL JS 3D 地圖使用指南

## 🎉 更新內容

已將地圖庫從 D3.js 更換為 **MapLibre GL JS**，並實現了 **3D 立體地圖** 功能！

## 🗺️ 新功能特點

### 1. 3D 視覺效果

- ✅ **OpenStreetMap 底圖**：真實的地理資訊底圖
- ✅ 台灣縣市邊界以 **3D 立體方式** 呈現
- ✅ 縣市區域具有高度（50,000 米）
- ✅ 根據縣市 ID 自動產生白色到藍色的漸層色彩

### 2. 互動控制

- 🖱️ **左鍵拖動**：平移地圖
- 🖱️ **右鍵拖動**：旋轉視角（3D 旋轉）
- ⚙️ **滾輪**：縮放地圖
- 🎚️ **Shift + 左鍵拖動**：傾斜視角
- 🔘 **導航控制器**：右上角的縮放按鈕
- 💬 **懸停顯示縣市名稱**：滑鼠移到縣市上方即時顯示名稱 popup

### 3. 地圖設定

- **中心點**：120.9°E, 23.7°N（台灣中心）
- **初始縮放**：6.8 倍
- **傾斜角度**：60° (3D 視角)
- **背景色**：#808080（灰色）

## 🎨 視覺樣式

### 縣市 3D 區塊

- **顏色**：白色 → 藍色漸層（根據 COUNTYID）
- **高度**：50,000 米
- **透明度**：80%

### 縣市邊界線

- **顏色**：黑色 (#000000)
- **寬度**：2 像素

### Popup 樣式

- **背景**：諾魯深藍色半透明 (rgba(0, 43, 127, 0.95))
- **文字**：金黃色 (#ffc61e)
- **邊框**：2px 金黃色實線

## 🛠️ 技術細節

### 安裝的套件

```bash
npm install maplibre-gl
```

### 主要使用的 MapLibre GL JS 功能

1. **raster** 圖層：顯示 OpenStreetMap 底圖瓦片
2. **fill-extrusion** 圖層：實現 3D 立體效果
3. **line** 圖層：繪製邊界線
4. **NavigationControl**：導航控制器
5. **Popup**：懸停提示框（持久實例，即時更新）

### 地圖配置

```javascript
{
  center: [120.9, 23.7],
  zoom: 6.8,
  pitch: 60,        // 3D 傾斜角度
  bearing: 0,       // 旋轉角度
  antialias: true   // 抗鋸齒
}
```

## 📂 修改的檔案

- `src/tabs/MapTab.vue` - 完全重寫，使用 MapLibre GL JS
- `package.json` - 新增 maplibre-gl 依賴

## 🚀 如何執行

1. 安裝依賴（如果尚未安裝）：

```bash
npm install
```

2. 啟動開發伺服器：

```bash
npm run serve
```

3. 開啟瀏覽器訪問：

```
http://localhost:8080
```

## 🎮 使用技巧

1. **查看 3D 效果**：

   - 使用右鍵拖動來旋轉地圖
   - 使用 Shift + 左鍵拖動來調整傾斜角度

2. **縣市資訊**：

   - 將滑鼠懸停在縣市上方，會顯示縣市名稱

3. **調整視角**：
   - 可以通過右上角的導航控制器重置視角

## 📝 自訂設定

如果您想調整 3D 效果，可以修改 `MapTab.vue` 中的以下參數：

### 調整 3D 高度

```javascript
'fill-extrusion-height': 50000, // 改變此數值
```

### 調整傾斜角度

```javascript
pitch: 60, // 範圍：0-85 度
```

### 調整縣市顏色

```javascript
'fill-extrusion-color': [
  'interpolate',
  ['linear'],
  ['get', 'COUNTYID'],
  0, '#ffffff',     // 起始顏色
  10000, '#4a90e2', // 結束顏色
]
```

### 更換底圖來源

目前使用 OpenStreetMap，您也可以改用其他免費底圖：

**選項 1: 使用深色底圖 (Carto Dark)**

```javascript
tiles: [
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
];
```

**選項 2: 使用衛星圖 (ESRI 衛星影像)**

```javascript
tiles: [
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
];
```

**選項 3: 使用地形圖 (ESRI Topographic)**

```javascript
tiles: [
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
];
```

**選項 4: 無底圖（純灰色背景）** 刪除 `osm-tiles`
相關的 source 和 layer 設定即可。

## 🔄 更新歷程

### v4.0.0 - 2025-10-28

**新增功能**

- ✅ 添加 OpenStreetMap 底圖
- ✅ 修復 hover popup 顯示問題（改用持久 popup 實例）
- ✅ 改善 popup 效能（避免重複創建實例）

**技術改進**

- 使用單一 Popup 實例，即時更新內容和位置
- 正確處理 mouseleave 事件，移除 popup
- 添加底圖圖層控制

## 🔄 與舊版本的差異

| 功能     | D3.js (舊) | MapLibre GL JS (新)    |
| -------- | ---------- | ---------------------- |
| 地圖類型 | 2D SVG     | 3D WebGL               |
| 底圖     | 無         | OpenStreetMap          |
| 視角控制 | 平移、縮放 | 平移、縮放、旋轉、傾斜 |
| 效能     | 較慢       | 更快                   |
| 視覺效果 | 平面       | 3D 立體                |
| 互動性   | 基本       | 豐富                   |

## 🐛 疑難排解

### 地圖沒有顯示

1. 確認 GeoJSON 檔案存在：`public/data/geojson/直轄市、縣(市)界線1140318.geojson`
2. 檢查瀏覽器控制台是否有錯誤訊息
3. 確認瀏覽器支援 WebGL

### 3D 效果不明顯

- 嘗試增加 `fill-extrusion-height` 的值
- 調整 `pitch` 角度（建議 45-70 度）

### 效能問題

- 減少 `fill-extrusion-height` 的值
- 降低抗鋸齒設定（將 `antialias: false`）

### Popup 無法顯示或閃爍

- ✅ 已修復：現在使用持久 popup 實例，不會重複創建
- 確認 GeoJSON 中有 `COUNTYNAME` 屬性
- 檢查瀏覽器控制台是否有錯誤

### 底圖無法載入

- 確認網路連線正常
- 檢查瀏覽器是否阻擋第三方資源
- 可嘗試更換其他底圖來源（見上方「更換底圖來源」）

---

**版本**: 4.0.0 **作者**: Kevin Cheng **更新日期**: 2025-10-28
