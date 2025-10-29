# CesiumJS 3D 地圖使用指南

## 🎉 更新內容

已將地圖庫從 MapLibre GL JS 更換為 **CesiumJS**，並實現了 **3D 立體地圖** 功能！

## 🗺️ 新功能特點

### 1. 3D 視覺效果

- ✅ **Cesium Ion 底圖**：高品質的衛星影像底圖
- ✅ 台灣縣市邊界以 **3D 立體方式** 呈現
- ✅ 縣市區域具有高度（30-80 公里隨機高度）
- ✅ 根據縣市名稱自動產生不同色彩（22種獨特顏色）
- ✅ **Cesium World Terrain**：真實地形高度數據

### 2. 互動控制

- 🖱️ **左鍵拖動**：平移地圖
- 🖱️ **右鍵拖動**：旋轉視角（3D 旋轉）
- ⚙️ **滾輪**：縮放地圖
- 🎚️ **中鍵拖動**：傾斜視角
- 🔘 **無導航控制器**：簡潔的界面設計
- 💬 **無懸停效果**：專注於地圖視覺效果

### 3. 地圖設定

- **中心點**：120.9°E, 23.7°N（台灣中心）
- **初始高度**：1,000,000 米
- **傾斜角度**：-90° (俯視視角)
- **背景**：Cesium Ion 衛星影像底圖

## 🎨 視覺樣式

### 縣市 3D 區塊

- **顏色**：22種獨特顏色（根據縣市名稱）
- **高度**：30-80 公里（隨機）
- **透明度**：80%

### 縣市邊界線

- **顏色**：白色 (#FFFFFF)
- **寬度**：2 像素

### 核電廠標記

- **標記點**：紅色圓點，白色邊框
- **影響範圍**：30 公里半徑圓圈
- **立體半球**：50 層重疊創建平滑球體效果
- **標籤**：紅色文字，白色光暈

## 🛠️ 技術細節

### 安裝的套件

```bash
npm install cesium
npm install --save-dev copy-webpack-plugin
```

### 主要使用的 CesiumJS 功能

1. **Viewer**：主要的 3D 地球視圖器
2. **IonImageryProvider**：Cesium Ion 高品質衛星影像
3. **createWorldTerrainAsync**：世界地形數據
4. **Entity**：3D 實體對象（縣市、核電廠等）
5. **Polygon**：3D 多邊形（縣市邊界）
6. **Point**：3D 點標記（核電廠位置）
7. **Ellipse**：橢圓形（影響範圍）
8. **Label**：3D 文字標籤

### 地圖配置

```javascript
{
  destination: Cesium.Cartesian3.fromDegrees(120.9, 23.7, 1000000),
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-90),
    roll: 0.0,
  }
}
```

## 📂 修改的檔案

- `src/tabs/MapTab.vue` - 完全重寫，使用 CesiumJS
- `package.json` - 新增 cesium 依賴，移除 maplibre-gl
- `vue.config.js` - 新增 CesiumJS webpack 配置

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
http://localhost:8080/30DayMapChallenge-17_A-new-tool/
```

## 🎮 使用技巧

1. **查看 3D 效果**：

   - 使用右鍵拖動來旋轉地球
   - 使用滾輪來縮放地圖
   - 使用中鍵拖動來調整傾斜角度

2. **縣市資訊**：

   - 每個縣市都有獨特的顏色
   - 縣市高度是隨機的（30-80 公里）

3. **核電廠標記**：
   - 紅色圓點標記核電廠位置
   - 紅色圓圈顯示 30 公里影響範圍
   - 立體半球顯示影響範圍的 3D 效果

## 📝 自訂設定

如果您想調整 3D 效果，可以修改 `MapTab.vue` 中的以下參數：

### 調整縣市高度

```javascript
const height = Math.random() * 50000 + 30000; // 改變此數值範圍
```

### 調整視角

```javascript
pitch: Cesium.Math.toRadians(-90), // 範圍：-90 到 90 度
```

### 調整縣市顏色

```javascript
const countyColors = {
  臺北市: '#FF6B6B',
  新北市: '#4ECDC4',
  // ... 其他縣市顏色
};
```

### 更換底圖來源

目前使用 OpenStreetMap，您也可以改用其他底圖：

**選項 1: 使用 ESRI 衛星影像**

```javascript
imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
});
```

**選項 2: 使用 ESRI 地形圖**

```javascript
imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
});
```

**選項 3: 使用 CartoDB 底圖**

```javascript
imageryProvider: new Cesium.UrlTemplateImageryProvider({
  url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  subdomains: ['a', 'b', 'c', 'd'],
});
```

## 🔄 更新歷程

### v23.0.0 - 2025-01-27

**重大更新**

- ✅ 完全替換為 CesiumJS 3D 地球引擎
- ✅ 實現真實的 3D 地球視圖
- ✅ 添加 Cesium World Terrain 地形數據
- ✅ 使用 OpenStreetMap 作為底圖
- ✅ 實現核電廠立體半球影響範圍

**技術改進**

- 使用 CesiumJS Entity 系統管理 3D 對象
- 實現平滑的 3D 球體效果（50 層重疊）
- 添加 webpack 配置支援 CesiumJS 資源
- 移除所有 MapLibre 相關代碼

## 🔄 與舊版本的差異

| 功能     | MapLibre GL JS (舊) | CesiumJS (新)        |
| -------- | ------------------- | -------------------- |
| 地圖類型 | 2D/3D WebGL         | 3D 地球引擎          |
| 底圖     | Google 衛星圖       | Cesium Ion 衛星影像  |
| 地形     | Terrarium DEM       | Cesium World Terrain |
| 視角控制 | 平面旋轉            | 3D 地球旋轉          |
| 效能     | 較快                | 更強大               |
| 視覺效果 | 2D 投影             | 真實 3D 地球         |
| 互動性   | 基本                | 豐富的 3D 互動       |

## 🐛 疑難排解

### 地圖沒有顯示

1. 確認 GeoJSON 檔案存在：`public/data/geojson/直轄市、縣(市)界線1140318.geojson`
2. 檢查瀏覽器控制台是否有錯誤訊息
3. 確認瀏覽器支援 WebGL
4. 檢查 CesiumJS 資源是否正確載入

### 3D 效果不明顯

- 嘗試調整相機高度（降低高度值）
- 調整 pitch 角度（接近 0 度）

### 效能問題

- 減少縣市高度範圍
- 降低核電廠半球層數
- 關閉抗鋸齒設定

### CesiumJS 資源載入失敗

- 確認 webpack 配置正確
- 檢查 copy-webpack-plugin 是否正確安裝
- 確認 CesiumJS 靜態資源已複製到 dist 目錄

### 底圖無法載入

- 確認網路連線正常
- 檢查瀏覽器是否阻擋第三方資源
- 可嘗試更換其他底圖來源（見上方「更換底圖來源」）

## 🌟 CesiumJS 優勢

1. **真實 3D 地球**：提供真實的地球視圖，而非平面投影
2. **強大地形支援**：內建世界地形數據，無需額外配置
3. **豐富的 3D 功能**：支援複雜的 3D 幾何體和動畫
4. **高性能渲染**：基於 WebGL 的高性能 3D 渲染
5. **豐富的數據源**：支援多種地理數據格式
6. **專業級功能**：適合專業的地理資訊系統應用

---

**版本**: 23.0.0 **作者**: Kevin Cheng **更新日期**: 2025-01-27
