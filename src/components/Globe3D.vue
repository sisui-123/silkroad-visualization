<template>
  <div class="globe-container" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const props = defineProps({
  mapData: {
    type: Object,
    default: () => null
  }
})

const emits = defineEmits(['locationSelect', 'cityHover', 'cityLeave', 'emptySpaceClick'])

const container = ref(null)
let scene, camera, renderer, controls, globe, routeLine, cityMarkers = []
let hoveredMarker = null
const selectedCity = ref(null)

// 添加星星变量
let stars
const STAR_COUNT = 2000

// 初始化3D场景
function init() {
  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  
  // 创建相机，减小视场角使地球显示更大
  camera = new THREE.PerspectiveCamera(
    35,  // 从50降低到35，使视场角更小，地球显示更大
    container.value.clientWidth / container.value.clientHeight,
    0.01,
    2000
  )

  // 计算敦煌位置的3D坐标
  const dunhuangPosition = latLngToVector3(40.1, 94.6, 2)
  
  // 设置相机位置，减小距离使地球显示更大
  const cameraDistance = 3  
  const cameraPosition = latLngToVector3(40.1, 94.6, 2 + cameraDistance)
  camera.position.copy(cameraPosition)
  
  // 让相机朝向敦煌位置
  camera.lookAt(dunhuangPosition)
  
  // 创建渲染器并开启优化
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    logarithmicDepthBuffer: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)  // 使用设备的实际像素比以提高清晰度
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)
  
  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = false
  controls.minDistance = 2.5  // 从2.2增加到2.5，防止太近
  controls.maxDistance = 10   // 从20减小到10，限制最远距离
  controls.maxPolarAngle = Math.PI
  controls.enableZoom = true
  controls.zoomSpeed = 1.0
  controls.rotateSpeed = 0.4
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.5
  
  // 添加缩放事件监听
  controls.addEventListener('change', updateMarkersScale)
  
  // 创建地球
  createGlobe()
  
  // 优化光照
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
  directionalLight.position.set(5, 3, 5)
  scene.add(directionalLight)
  
  // 添加半球光以增强细节
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6)
  scene.add(hemisphereLight)
  
  // 添加星星背景
  createStars()
  
  animate()
  window.addEventListener('resize', debounce(onWindowResize, 250))
}

// 创建地球
function createGlobe() {
  // 增加球体分段数以提高精度
  const geometry = new THREE.SphereGeometry(2, 64, 64)
  
  // 加载高清地球纹理
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load('/textures/earth.jpg', () => {
    renderer.render(scene, camera)
  })
  
  // 优化纹理
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipMapLinearFilter
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
  
  // 创建材质
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 15,
    specular: 0x333333,
    bumpScale: 0.05,    // 添加凹凸效果
  })
  
  // 创建地球网格
  globe = new THREE.Mesh(geometry, material)
  scene.add(globe)
  
  if (props.mapData) {
    addRouteAndCities(props.mapData)
  }
}

// 添加经纬度转换函数
function latLngToVector3(lat, lng, radius) {
  // 将经纬度转换为弧度
  const phi = (90 - lat) * Math.PI / 180
  const theta = (lng + 180) * Math.PI / 180
  
  // 球面坐标转换为笛卡尔坐标
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = (radius * Math.cos(phi))
  const z = (radius * Math.sin(phi) * Math.sin(theta))
  
  return new THREE.Vector3(x, y, z)
}

// 更新标记大小的函数
function updateMarkersScale() {
  if (!camera || !cityMarkers.length) return
  
  cityMarkers.forEach(marker => {
    // 计算标记到相机的距离
    const distance = camera.position.distanceTo(marker.position)
    
    // 标记大小随距离线性缩放，保持视觉大小一致
    const markerScale = distance * 0.4  // 保持当前大小
    marker.scale.set(markerScale, markerScale, markerScale)
    
    // 更新标签大小，保持视觉大小一致
    const label = marker.children.find(child => child.geometry instanceof THREE.PlaneGeometry)
    if (label) {
      const labelScale = 0.7
      label.scale.set(labelScale, labelScale, labelScale)
      
      // 调整标签位置，使其紧贴标记点
      const labelHeight = 0.05
      label.position.set(0, labelHeight, 0)
      
      // 确保标签始终面向相机

    }
  })
}

// 添加路线和城市标记
function addRouteAndCities(data) {
  // 清除现有的路线和标记
  if (routeLine) {
    scene.remove(routeLine)
  }
  cityMarkers.forEach(marker => scene.remove(marker))
  cityMarkers = []
  
  if (data.routes && data.routes.length) {
    data.routes.forEach(route => {
      const points = route.coordinates.map(coord => {
        return latLngToVector3(coord[0], coord[1], 2.01)
      })
      
      // 创建更粗的线条
      const lineGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        64,  // 分段数
        0.005, 
        8,    // 管道截面分段数
        false  // 是否闭合
      )
      
      const material = new THREE.MeshPhongMaterial({ 
        color:'#FF4500',
        shininess: 10,
        transparent: true,
        opacity: 0.8
      })
      
      routeLine = new THREE.Mesh(lineGeometry, material)
      // 设置renderOrder确保管道始终在地球表面上方显示
      routeLine.renderOrder = 0.1
      scene.add(routeLine)
    })
  }
  
  // 添加城市标记
  if (data.cities && data.cities.length) {
    data.cities.forEach(city => {
      const position = latLngToVector3(city.lat, city.lng, 2.02)
      
      // 创建标记组
      const markerGroup = new THREE.Group()
      
      // 创建红色标记点
      const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16)
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
      const marker = new THREE.Mesh(markerGeometry, markerMaterial)
      
      // 创建发光效果
      const glowGeometry = new THREE.SphereGeometry(0.024, 16, 16)  // 从0.026减小到0.024
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.4
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      
      // 添加城市名称标签
      if (city.name) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = 512
        canvas.height = 128
        
        // 设置文字样式
        context.font = '50px Arial'
        context.fillStyle = 'white'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        
        // 绘制文字
        context.fillText(city.name, 256, 64)
        
        const texture = new THREE.CanvasTexture(canvas)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        
        const labelGeometry = new THREE.PlaneGeometry(0.3, 0.08)  // 从0.4, 0.1减小到0.3, 0.08
        const labelMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
          opacity: 1
        })
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial)
        label.position.set(0, 0.12, 0)  // 从0.15减小到0.12
        markerGroup.add(label)
      }
      
      // 将城市数据存储在标记组中
      markerGroup.userData = city
      
      // 添加标记和发光效果到组中
      markerGroup.add(marker)
      markerGroup.add(glow)
      markerGroup.position.copy(position)
      
      scene.add(markerGroup)
      cityMarkers.push(markerGroup)
    })
    
    // 初始化标记大小
    updateMarkersScale()
  }
}

// 创建星星背景
function createStars() {
  const starsGeometry = new THREE.BufferGeometry()
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  })
  
  const starsVertices = []
  for (let i = 0; i < STAR_COUNT; i++) {
    const x = Math.random() * 200 - 100
    const y = Math.random() * 200 - 100
    const z = Math.random() * 200 - 100
    
    // 确保星星在地球外部的较远距离
    const distance = Math.sqrt(x * x + y * y + z * z)
    if (distance < 15) {
      // 如果太近，重新计算位置
      i--
      continue
    }
    
    starsVertices.push(x, y, z)
  }
  
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
  stars = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(stars)
}

// 优化动画循环
function animate(currentTime = 0) {
  requestAnimationFrame(animate)
  
  // 动态调整旋转速度
  if (controls) {
    const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
    controls.rotateSpeed = 0.3 * (distance / 5) // 根据距离调整旋转速度
  }
  
  // 更新城市标记的标签朝向
  cityMarkers.forEach(markerGroup => {
    const label = markerGroup.children.find(child => child.geometry instanceof THREE.PlaneGeometry)
    if (label) {
      label.lookAt(camera.position)
    }
  })
  
  // 让星星随镜头旋转
  if (stars) {
    stars.rotation.x += 0.0001
    stars.rotation.y += 0.0001
  }
  
  controls.update()
  renderer.render(scene, camera)
}

// 优化窗口大小变化处理
function onWindowResize() {
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  
  renderer.setSize(width, height)
}

// 优化射线检测
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

function onMouseClick(event) {
  if (!container.value) return
  
  const rect = container.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(cityMarkers, true)

  if (intersects.length > 0) {
    // 找到标记组（父对象）
    let markerGroup = intersects[0].object
    while (markerGroup.parent && !(markerGroup instanceof THREE.Group)) {
      markerGroup = markerGroup.parent
    }
    selectedCity.value = markerGroup.userData
    emits('locationSelect', markerGroup.userData)
  } else {
    // 如果点击的是空白处，触发空点击事件
    selectedCity.value = null
    emits('emptySpaceClick')
  }
}

// 添加双击事件处理
function onDoubleClick(event) {
  const rect = container.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  
  raycaster.setFromCamera(mouse, camera)
  
  const intersects = raycaster.intersectObjects(cityMarkers)
  if (intersects.length > 0) {
    const city = intersects[0].object
    const position = city.position.clone()
    
    // 计算新的相机位置
    const distance = 2.5  // 距离城市的距离
    const direction = position.clone().normalize()
    const newPosition = position.clone().add(direction.multiplyScalar(distance))
    
    // 使用GSAP或自定义动画来平滑移动相机
    const duration = 1000  // 1秒
    const startPosition = camera.position.clone()
    const startTime = Date.now()
    
    function updateCamera() {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easeProgress = progress * (2 - progress)  // easeOut
      
      camera.position.lerpVectors(startPosition, newPosition, easeProgress)
      camera.lookAt(position)
      
      if (progress < 1) {
        requestAnimationFrame(updateCamera)
      }
    }
    
    updateCamera()
  }
}

// 修改 onMouseMove 函数
function onMouseMove(event) {
  if (!container.value) return
  
  const rect = container.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(cityMarkers, true)

  if (intersects.length > 0) {
    // 找到标记组（父对象）
    let markerGroup = intersects[0].object
    while (markerGroup.parent && !(markerGroup instanceof THREE.Group)) {
      markerGroup = markerGroup.parent
    }
    const city = markerGroup.userData
    if (city !== selectedCity.value) {
      selectedCity.value = city
      emits('cityHover', city)
    }
  } else {
    // 只在没有选中城市时触发 cityLeave 事件
    if (!selectedCity.value) {
      selectedCity.value = null
      emits('cityLeave')
    }
  }
}

// 监听数据变化
watch(() => props.mapData, (newData) => {
  if (newData && scene) {
    addRouteAndCities(newData)
  }
}, { deep: true })

// 组件挂载
onMounted(() => {
  init()
  window.addEventListener('click', onMouseClick)
  window.addEventListener('dblclick', onDoubleClick)
  window.addEventListener('mousemove', onMouseMove)  // 添加鼠标移动事件监听
  
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      controls.autoRotate = !controls.autoRotate
    }
  })
})

// 组件卸载
onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('click', onMouseClick)
  window.removeEventListener('dblclick', onDoubleClick)
  window.removeEventListener('mousemove', onMouseMove)  // 移除鼠标移动事件监听
  window.removeEventListener('keydown', onKeyDown)
  if (container.value) {
    container.value.removeChild(renderer.domElement)
  }
})

// 添加防抖函数
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
</script>

<style scoped>
.globe-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style> 