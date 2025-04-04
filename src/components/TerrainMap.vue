<template>
  <div id="terrain-container" ref="container" style="height: 500px; width: 100%;"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  name: 'TerrainMap3D',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      terrain: null,
      xianMarker: null,
      animationId: null
    };
  },
  mounted() {
    this.init3DMap();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  },
  methods: {
    init3DMap() {
      // 1. 创建场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x87CEEB); // 天空蓝背景

      // 2. 创建相机
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.$refs.container.clientWidth / this.$refs.container.clientHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 10, 15);

      // 3. 创建渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(
        this.$refs.container.clientWidth,
        this.$refs.container.clientHeight
      );
      this.renderer.shadowMap.enabled = true;
      this.$refs.container.appendChild(this.renderer.domElement);

      // 4. 添加控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;

      // 5. 添加光源
      this.addLights();

      // 6. 创建地形
      this.createTerrain();

      // 7. 添加西安标记
      this.addXianMarker();

      // 8. 开始动画循环
      this.animate();
    },
    addLights() {
      // 环境光
      const ambientLight = new THREE.AmbientLight(0x404040);
      this.scene.add(ambientLight);

      // 方向光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 20, 10);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);
    },
    createTerrain() {
      // 创建地形几何体
      const geometry = new THREE.PlaneGeometry(20, 20, 100, 100);
      
      // 创建高度图（模拟西安周边地形）
      const vertices = geometry.attributes.position;
      for (let i = 0; i < vertices.count; i++) {
        const x = vertices.getX(i);
        const y = vertices.getY(i);
        
        // 模拟山脉和盆地
        let height = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 1.5;
        
        // 在西安位置（中心点）创建一个盆地
        const distanceToCenter = Math.sqrt(x * x + y * y);
        height -= Math.max(0, 2 - distanceToCenter) * 0.5;
        
        vertices.setZ(i, height);
      }
      
      // 计算法线以获得正确的光照
      geometry.computeVertexNormals();

      // 创建材质
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        color: 0x3a5f0b,
        side: THREE.DoubleSide,
        flatShading: true
      });

      // 创建网格
      this.terrain = new THREE.Mesh(geometry, material);
      this.terrain.rotation.x = -Math.PI / 2;
      this.terrain.receiveShadow = true;
      this.scene.add(this.terrain);
    },
    addXianMarker() {
      // 创建西安标记（红色柱子）
      const markerGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
      const markerMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0000,
        emissive: 0xff3333,
        emissiveIntensity: 0.5
      });
      this.xianMarker = new THREE.Mesh(markerGeometry, markerMaterial);
      this.xianMarker.position.set(0, 1, 0); // 中心点
      this.xianMarker.castShadow = true;
      this.scene.add(this.xianMarker);

      // 添加文字标签
      const loader = new THREE.FontLoader();
      loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        const textGeometry = new THREE.TextGeometry('西安', {
          font: font,
          size: 0.5,
          height: 0.1,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(0, 3, 0);
        this.scene.add(textMesh);
      });
    },
    animate() {
      this.animationId = requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
    handleResize() {
      this.camera.aspect = this.$refs.container.clientWidth / this.$refs.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        this.$refs.container.clientWidth,
        this.$refs.container.clientHeight
      );
    }
  }
};
</script>

<style scoped>
#terrain-container {
  border: 1px solid #ccc;
  margin-bottom: 20px;
}
</style>