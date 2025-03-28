let seaweeds = []; // 儲存水草的陣列
let colors = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF']; // 五種顏色

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight); // 畫布大小
  canvas.style('position', 'absolute'); // 設定畫布位置為絕對定位
  canvas.style('z-index', '1'); // 確保畫布在 iframe 上層
  canvas.style('pointer-events', 'none'); // 允許滑鼠事件穿透畫布

  noFill(); // 確保不填充形狀
  for (let i = 0; i < 40; i++) {
    let x;
    let isOverlapping;
    do {
      x = random(width); // 隨機 x 位置
      isOverlapping = seaweeds.some(seaweed => abs(seaweed.x - x) < 20); // 確保水草不過於接近
    } while (isOverlapping);

    let h = random(120, 140); // 隨機高度介於 120 到 140 之間
    let color = colors[int(random(colors.length))]; // 隨機選擇顏色
    let thickness = 35; // 固定水草粗細為 35
    let frequency = random(0.02, 0.08); // 隨機搖晃頻率
    seaweeds.push({ x: x, height: h, color: color, thickness: thickness, frequency: frequency });
  }
}

function draw() {
  clear(); // 清除畫布，保持透明背景

  // 設定背景透明效果
  noStroke();
  fill(220, 220, 220, 200); // 半透明背景顏色
  rect(0, 0, width, height * 0.8); // 只覆蓋視窗高度的 80%

  blendMode(BLEND); // 設定混合模式為 BLEND，允許顏色重疊

  for (let i = 0; i < seaweeds.length; i++) {
    let seaweed = seaweeds[i];
    let segments = 10; // 水草分段數
    let segmentHeight = seaweed.height / segments; // 每段的高度
    let baseX = seaweed.x; // 水草的底部 x 位置
    let baseY = height; // 水草的底部 y 位置

    stroke(seaweed.color + '80'); // 設定線條顏色，加入透明度
    strokeWeight(seaweed.thickness); // 設定線條粗細

    beginShape(); // 開始繪製水草形狀
    vertex(baseX, baseY); // 水草的底部點

    let prevX = baseX;
    let prevY = baseY;

    for (let j = 0; j < segments; j++) {
      let sway = sin(frameCount * seaweed.frequency * 0.3 + j * PI / 6) * (segments - j) * 0.8; // 減慢頻率，減小幅度
      let nextX = prevX + sway;
      let nextY = prevY - segmentHeight;

      vertex(nextX, nextY); // 添加頂點到形狀
      prevX = nextX;
      prevY = nextY;
    }

    endShape(); // 結束繪製水草形狀
  }
}

