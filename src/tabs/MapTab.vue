<script>
  /* eslint-disable no-console */
  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * 🗺️ MapTab.vue - CesiumJS 台灣縣市 3D 地圖組件
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * @fileoverview
   * 這是一個基於 CesiumJS 的台灣縣市 3D 地圖視覺化組件。
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
   *    ✓ 白色縣市邊界線
   *    ✓ Bing Maps 衛星圖底圖（真實地形影像）
   *    ✓ 真實地形高度（使用 Cesium World Terrain）
   *    ✓ 核電廠位置標記（紅色圓點）
   *    ✓ 核電廠 30 公里紅色圓圈
   *    ✓ 核電廠影響範圍立體半球（平滑的半圓球）
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
   * - 紅色圓點標記
   * - 立體半球影響範圍（平滑的半圓球）
   * - 名稱標籤（紅色文字）
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
   * @requires cesium              - CesiumJS (3D 地圖庫)
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
   * @version 23.0.0
   * @since 2025
   * @license MIT
   *
   * ═══════════════════════════════════════════════════════════════════════════
   */

  // ═══════════════════════════════════════════════════════════════════════════
  // 📦 依賴導入 (Dependencies Import)
  // ═══════════════════════════════════════════════════════════════════════════

  // 從 Vue 3 核心庫導入 Composition API 所需的功能
  import { ref, onMounted, onUnmounted, nextTick } from 'vue';

  // 導入 CesiumJS 地圖庫
  import * as Cesium from 'cesium';

  // 從 Pinia 狀態管理導入數據存儲
  import { useDataStore } from '@/stores/dataStore';

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎯 組件定義 (Component Definition)
  // ═══════════════════════════════════════════════════════════════════════════

  export default {
    name: 'MapTab',

    emits: ['map-ready'],

    setup(_, { emit }) {
      // ═══════════════════════════════════════════════════════════════════════
      // 📦 狀態管理與依賴 (State Management & Dependencies)
      // ═══════════════════════════════════════════════════════════════════════

      const dataStore = useDataStore();

      // ═══════════════════════════════════════════════════════════════════════
      // 🗺️ 地圖相關變數 (Map-Related Variables)
      // ═══════════════════════════════════════════════════════════════════════

      const mapContainer = ref(null);
      let viewer = null;
      const isMapReady = ref(false);
      const mapContainerId = ref(`cesium-map-${Math.random().toString(36).substr(2, 9)}`);

      // ═══════════════════════════════════════════════════════════════════════
      // 📊 GeoJSON 數據儲存 (GeoJSON Data Storage)
      // ═══════════════════════════════════════════════════════════════════════

      const countyData = ref(null);

      // ═══════════════════════════════════════════════════════════════════════
      // 📥 載入台灣縣市 GeoJSON 數據
      // ═══════════════════════════════════════════════════════════════════════

      const loadCountyData = async () => {
        try {
          console.log('[MapTab] 開始載入台灣縣市 GeoJSON 數據...');

          const countyResponse = await fetch(
            `${process.env.BASE_URL}data/geojson/直轄市、縣(市)界線1140318.geojson`
          );

          if (!countyResponse.ok) {
            throw new Error(`縣市數據載入失敗: HTTP ${countyResponse.status}`);
          }

          countyData.value = await countyResponse.json();

          console.log('[MapTab] 台灣縣市數據載入成功');
          console.log('  - 縣市數量:', countyData.value.features?.length || 0);

          return true;
        } catch (error) {
          console.error('[MapTab] 台灣縣市數據載入失敗:', error);
          return false;
        }
      };

      // ═══════════════════════════════════════════════════════════════════════
      // ⚛️ 添加核電廠標記和影響範圍球體
      // ═══════════════════════════════════════════════════════════════════════

      const addNuclearPlants = () => {
        const buildCircleDegreesArray = (centerLon, centerLat, radiusMeters, segments = 180) => {
          const latRad = Cesium.Math.toRadians(centerLat);
          const metersPerDegreeLat = 111320; // approximate
          const metersPerDegreeLon = 111320 * Math.cos(latRad); // approximate
          const points = [];
          for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const dx = (radiusMeters * Math.cos(theta)) / metersPerDegreeLon;
            const dy = (radiusMeters * Math.sin(theta)) / metersPerDegreeLat;
            points.push(centerLon + dx, centerLat + dy);
          }
          return points;
        };
        const plants = [
          {
            name: '核一廠',
            fullName: '核一廠（已除役）',
            status: '已除役',
            lon: 121.545611,
            lat: 25.297417,
          },
          {
            name: '核二廠',
            fullName: '核二廠（已除役）',
            status: '已除役',
            lon: 121.671472,
            lat: 25.200139,
          },
          {
            name: '核三廠',
            fullName: '核三廠',
            status: '運轉中',
            lon: 120.761056,
            lat: 21.996528,
          },
          {
            name: '核四廠',
            fullName: '核四廠（封存中）',
            status: '封存中',
            lon: 121.924167,
            lat: 25.038333,
          },
        ];

        plants.forEach((plant) => {
          // 添加核電廠標記點（不顯示標籤）
          viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(plant.lon, plant.lat),
            point: {
              pixelSize: 8,
              color: Cesium.Color.RED,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 1,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
          });

          // 添加 30 公里影響範圍圓圈（紅色實線邊框，採用地貼折線更穩定）
          const circleDegrees = buildCircleDegreesArray(plant.lon, plant.lat, 30000, 256);
          viewer.entities.add({
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArray(circleDegrees),
              width: 5,
              material: Cesium.Color.RED,
              clampToGround: true,
            },
          });

          // 添加立體半球影響範圍
          const layers = 50;
          const sphereRadius = 30000;

          for (let layer = 0; layer < layers; layer++) {
            const heightOffset = (layer / (layers - 1)) * sphereRadius;
            const radiusSquared = sphereRadius * sphereRadius - heightOffset * heightOffset;

            if (radiusSquared < 0) continue;

            const currentRadius = Math.sqrt(radiusSquared);
            const opacity = 0.025 - (layer / layers) * 0.01;

            viewer.entities.add({
              position: Cesium.Cartesian3.fromDegrees(plant.lon, plant.lat, heightOffset),
              ellipse: {
                semiMajorAxis: currentRadius,
                semiMinorAxis: currentRadius,
                material: Cesium.Color.RED.withAlpha(opacity),
                height: heightOffset,
                heightReference: Cesium.HeightReference.NONE,
              },
            });
          }
        });

        console.log('[MapTab] 核電廠標記和立體半球添加完成');
      };

      // ═══════════════════════════════════════════════════════════════════════
      // 🗺️ 添加 3D 縣市圖層
      // ═══════════════════════════════════════════════════════════════════════

      const add3DCountyLayers = () => {
        if (!viewer || !countyData.value) {
          console.error(
            '[MapTab] 無法添加圖層: viewer=',
            !!viewer,
            'countyData=',
            !!countyData.value
          );
          return;
        }

        try {
          console.log('[MapTab] 開始添加 3D 台灣縣市圖層');

          countyData.value.features.forEach((feature) => {
            const geometry = feature.geometry;

            // 處理 Polygon 和 MultiPolygon 的不同情況
            const polygons =
              geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;

            polygons.forEach((polygonCoords) => {
              // fromDegreesArray 需要一個扁平的 [lon, lat, lon, lat, ...] 陣列
              const flatCoordinates = polygonCoords[0].flat();

              viewer.entities.add({
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArray(flatCoordinates),
                  width: 2,
                  material: Cesium.Color.WHITE,
                  clampToGround: true,
                },
              });
            });
          });

          console.log('[MapTab] 3D 台灣縣市圖層添加完成');
        } catch (error) {
          console.error('[MapTab] 3D 台灣縣市圖層添加失敗:', error);
        }
      };

      // ═══════════════════════════════════════════════════════════════════════
      // 🏗️ 創建 CesiumJS 地圖實例
      // ═══════════════════════════════════════════════════════════════════════

      const createMap = async () => {
        if (!mapContainer.value) return false;

        const rect = mapContainer.value.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          console.warn('[MapTab] 容器尺寸為零，延遲初始化');
          return false;
        }

        try {
          console.log('[MapTab] 開始創建 CesiumJS 地圖');

          // 設置 CesiumJS token
          Cesium.Ion.defaultAccessToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYjJiZjlhZC1mZDNkLTRiZWEtYjExNy1iZDI1OWQ5ZmJlZmEiLCJpZCI6MzU1MDgxLCJpYXQiOjE3NjE3MTc5NTl9.ivNUz20WJNOvyTB6vzB8xHNWNSzgl06vBAGOuZLNKs4';

          // 創建地形提供者
          const terrainProvider = await Cesium.createWorldTerrainAsync();

          // 創建 CesiumJS Viewer
          viewer = new Cesium.Viewer(mapContainer.value, {
            terrainProvider: terrainProvider,

            // 依照方法二：不指定 imageryProvider，讓 Cesium 透過 Ion 預設載入 Bing 衛星圖
            baseLayerPicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            vrButton: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            selectionIndicator: false,
            infoBox: false,
            navigationInstructionsInitiallyVisible: false,
          });

          // --- 深度除錯設定 ---
          // 1. 開啟 FPS 偵錯器，確認渲染循環是否正常
          viewer.scene.debugShowFramesPerSecond = true;

          // 2. 強制顯示地球
          viewer.scene.globe.show = true;

          // 3. 監聽底圖圖層的錯誤事件
          viewer.imageryLayers.layerAdded.addEventListener((layer) => {
            layer.imageryProvider.errorEvent.addEventListener((error) => {
              console.error('[MapTab] 底圖載入失敗:', error);
            });
          });

          // 設置初始視角 - 調整角度以顯示地形高度
          viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(120.9, 23.0, 250000), // 降低高度至 250km
            orientation: {
              heading: Cesium.Math.toRadians(0),
              pitch: Cesium.Math.toRadians(-60), // 傾斜視角以觀察地形
              roll: 0.0,
            },
          });

          // 設置相機控制
          viewer.scene.screenSpaceCameraController.enableRotate = true;
          viewer.scene.screenSpaceCameraController.enableTranslate = true;
          viewer.scene.screenSpaceCameraController.enableZoom = true;
          viewer.scene.screenSpaceCameraController.enableTilt = true;

          // 啟用對地形的深度測試，確保 3D 物件正確貼合地形
          viewer.scene.globe.depthTestAgainstTerrain = true;

          // 地形高度放大10倍
          viewer.scene.globe.terrainExaggeration = 10.0;

          // 強制調整 CesiumJS 畫布大小
          const container = viewer.container;
          const canvas = viewer.canvas;
          console.log('[MapTab] 容器大小:', {
            container: {
              width: container.clientWidth,
              height: container.clientHeight,
              offsetWidth: container.offsetWidth,
              offsetHeight: container.offsetHeight,
            },
            canvas: {
              width: canvas.width,
              height: canvas.height,
              clientWidth: canvas.clientWidth,
              clientHeight: canvas.clientHeight,
            },
            window: {
              innerWidth: window.innerWidth,
              innerHeight: window.innerHeight,
            },
          });

          // 強制調整畫布大小
          viewer.resize();

          console.log('[MapTab] CesiumJS 地圖創建成功');
          isMapReady.value = true;

          // 添加 3D 縣市圖層
          add3DCountyLayers();

          // 添加核電廠標記和影響範圍
          addNuclearPlants();

          // 保存地圖實例到 Pinia store
          dataStore.setMapInstance(viewer);

          // 將地圖實例傳遞給父組件
          emit('map-ready', viewer);

          return true;
        } catch (error) {
          console.error('[MapTab] CesiumJS 地圖創建失敗:', error);
          return false;
        }
      };

      // ═══════════════════════════════════════════════════════════════════════
      // 🚀 初始化地圖
      // ═══════════════════════════════════════════════════════════════════════

      const initMap = async () => {
        let attempts = 0;
        const maxAttempts = 20;

        // 載入台灣縣市數據
        const loaded = await loadCountyData();
        if (!loaded) {
          console.error('[MapTab] 無法載入台灣縣市數據');
          return;
        }

        const tryCreateMap = async () => {
          if (attempts >= maxAttempts) {
            console.error('[MapTab] 地圖初始化失敗，已達到最大嘗試次數');
            return;
          }

          attempts++;
          console.log(`[MapTab] 嘗試創建地圖 (${attempts}/${maxAttempts})`);

          try {
            const success = await createMap();
            if (success) {
              console.log('[MapTab] 地圖創建成功');
            } else {
              console.log('[MapTab] 地圖創建失敗，100ms 後重試');
              setTimeout(tryCreateMap, 100);
            }
          } catch (error) {
            console.error('[MapTab] 地圖創建過程中發生錯誤:', error);
            console.log('[MapTab] 100ms 後重試');
            setTimeout(tryCreateMap, 100);
          }
        };

        tryCreateMap();
      };

      // ═══════════════════════════════════════════════════════════════════════
      // 🧹 生命週期鉤子 (Lifecycle Hooks)
      // ═══════════════════════════════════════════════════════════════════════

      onMounted(() => {
        nextTick(() => {
          initMap();
        });

        // 監聽窗口大小改變
        const handleResize = () => {
          if (viewer) {
            console.log('[MapTab] 窗口大小改變，調整地圖大小');
            viewer.resize();
          }
        };

        window.addEventListener('resize', handleResize);

        // 清理監聽器
        onUnmounted(() => {
          window.removeEventListener('resize', handleResize);
        });
      });

      onUnmounted(() => {
        if (viewer) {
          viewer.destroy();
          viewer = null;
        }
        isMapReady.value = false;
      });

      // ═══════════════════════════════════════════════════════════════════════
      // 📤 返回組件公開的屬性和方法
      // ═══════════════════════════════════════════════════════════════════════

      return {
        mapContainer,
        mapContainerId,
      };
    },
  };
</script>

<template>
  <div id="map-container">
    <div :id="mapContainerId" ref="mapContainer"></div>
  </div>
</template>

<style>
  @import '../assets/css/common.css';

  /* 地圖容器 - 使用非 scoped 樣式確保正確應用 */
  #map-container {
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

  #map-container > div {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* CesiumJS 地圖容器樣式 */
  .cesium-viewer {
    font-family: 'Open Sans', 'Arial', sans-serif;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .cesium-viewer-cesiumWidgetContainer {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
  }

  .cesium-widget {
    width: 100vw !important;
    height: 100vh !important;
  }

  .cesium-widget canvas {
    width: 100vw !important;
    height: 100vh !important;
  }

  /* CesiumJS 控制按鈕樣式 */
  .cesium-viewer-toolbar {
    background: rgba(0, 43, 127, 0.95);
    border: 1px solid #ffc61e;
  }

  .cesium-viewer-toolbar button {
    background-color: rgba(0, 43, 127, 0.95);
    color: #ffc61e;
  }

  .cesium-viewer-toolbar button:hover {
    background-color: rgba(0, 43, 127, 1);
  }
</style>
