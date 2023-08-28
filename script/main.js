const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

size = 150; gap = 30; sze = 60;

// 五个放数的框
function PrintRational(a, x, y) {
  str = a.str();
  origin_font = ctx.font;
  font_size = 70;
  if (str.length >= 3) { font_size = 60; }
  if (str.length >= 5) { font_size = 40; }
  if (str.length >= 7) { font_size = 30; }
  if (str.length >= 9) { font_size = 25; }
  if (str.length >= 12) { font_size = 20; }
  if (str.length >= 13) { font_size = 17; }
  if (str.length)
  ctx.font = "bold " + font_size + "px 'Microsoft Yahei'";
  ctx.fillText(str, x, y);
  ctx.font = origin_font;
}

solved = -1;

function NewGame() {
  solved++;
  arr = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  nums = list[Math.floor(Math.random() * list.length)];
  for (i = 0; i < 5; ++i) {
    nums[i] = new Rational(nums[i], 1);
  }
  now = -1; now2 = -1;
  sta = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  PrintNum(nums[0], nums[1], nums[2], nums[3], nums[4]);
  PrintControl();
  PrintInfo(solved);
}

function num(k) {
  if (arr[k] == 0) { return; }
  if (nums[k].deno == 0) { return; }
  if (now2 != -1) {
    if (now == k) { return; }
    sta.push({apos: now, a: nums[now], bpos: k, b: nums[k]});
    switch (now2) {
      case 5: { nums[k] = nums[now].add(nums[k]); break; }
      case 6: { nums[k] = nums[now].sub(nums[k]); break; }
      case 7: { nums[k] = nums[now].mul(nums[k]); break; }
      case 8: { nums[k] = nums[now].div(nums[k]); break; }
    }
    arr[now] = 0;
    now = k;
    arr[now] = 2;
    arr[now2] = 1;
    now2 = -1;
  } else {
    if (now != -1) { arr[now] = 1; }
    now = k;
    arr[now] = 2;
  }
  cnt = 0;
  for (i = 0; i < 5; ++i) {
    if (arr[i] == 0) { continue; }
    if (nums[i].num == 60 && nums[i].deno == 1) { cnt++; continue; }
    cnt = -1; break;
  }
  if (cnt == 1) { NewGame(); }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  PrintNum(nums[0], nums[1], nums[2], nums[3], nums[4]);
  PrintControl();
  PrintInfo(solved);
}

function ctrl(k) {
  if (k == 9 || k == 10) {
    now2 = -1;
    end = 4;
    while (end >= 0 && arr[end] == 0) {
      end--;
    }
    for (let j = 0; j <= end; ++j) {
      if (arr[j] == 0) { continue; }
      ctrl(k == 9 ? 5 : 7);
      num(j);
    }
  }
  if (now == -1) { return; }
  if (now2 != -1) {
    arr[now2] = 1;
  }
  now2 = k;
  arr[now2] = 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  PrintNum(nums[0], nums[1], nums[2], nums[3], nums[4]);
  PrintControl();
  PrintInfo(solved);
}

function skip() {
  solved--;
  NewGame();
}

function undo() {
  for (i = 0; i < 9; ++i) {
    if (arr[i] != 0) {
      arr[i] = 1;
    }
  }
  arr[now2] = 1;
  now2 = -1;
  now = -1;
  if (sta.length != 0) {
    now = sta[sta.length - 1].apos;
    arr[now] = 2;
    nums[sta[sta.length - 1].apos] = sta[sta.length - 1].a;
    nums[sta[sta.length - 1].bpos] = sta[sta.length - 1].b;
    sta.pop();
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  PrintNum(nums[0], nums[1], nums[2], nums[3], nums[4]);
  PrintControl();
  PrintInfo(solved);
}

// 0: 不显示 1: 细体 2: 粗体
function PrintNum(a, b, c, d, e) {
  ctx.strokeStyle = "#00aa00";
  ctx.fillStyle = "#00aa00";
  ctx.font = "bold 80px 'Microsoft Yahei'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  x = gap;
  if (arr[0] != 0) {
    if (arr[0] == 1) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#00aa00";
      ctx.fillStyle = "#00aa00";
    } else {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#006600";
      ctx.fillStyle = "#006600";
    }
    ctx.strokeRect(x, gap, size, size);
    PrintRational(a, x + size / 2, gap + size / 2);
  }
  if (arr[3] != 0) {
    if (arr[3] == 1) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#00aa00";
      ctx.fillStyle = "#00aa00";
    } else {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#006600";
      ctx.fillStyle = "#006600";
    }
    ctx.strokeRect(x, gap * 2 + size, size, size);
    PrintRational(d, x + size / 2, gap * 2 + size + size / 2);
  }
  x += gap + size;
  if (arr[1] != 0) {
    if (arr[1] == 1) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#00aa00";
      ctx.fillStyle = "#00aa00";
    } else {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#006600";
      ctx.fillStyle = "#006600";
    }
    ctx.strokeRect(x, gap, size, size);
    PrintRational(b, x + size / 2, gap + size / 2);
  }
  if (arr[4] != 0) {
    if (arr[4] == 1) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#00aa00";
      ctx.fillStyle = "#00aa00";
    } else {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#006600";
      ctx.fillStyle = "#006600";
    }
    ctx.strokeRect(x, gap * 2 + size, size, size);
    PrintRational(e, x + size / 2, gap * 2 + size + size / 2);
  }
  x += gap + size;
  if (arr[2] != 0) {
    if (arr[2] == 1) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#00aa00";
      ctx.fillStyle = "#00aa00";
    } else {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#006600";
      ctx.fillStyle = "#006600";
    }
    ctx.strokeRect(x, gap, size, size);
    PrintRational(c, x + size / 2, gap + size / 2);
  }
}

// 0: 不显示 1: 细体 2: 粗体
function PrintControl() {
  // 六个操作按键
  ctx.strokeStyle = "#808080";
  ctx.fillStyle = "#808080";
  ctx.lineWidth = 3;
  y = size * 2 + gap * 3;
  sze = 60;
  x = gap;
  for (i = 1; i <= 6; ++i) {
    if (i <= 4 && arr[i + 4] == 2) {
      ctx.strokeStyle = "#000000";
      ctx.fillStyle = "#000000";
    } else {
      ctx.strokeStyle = "#808080";
      ctx.fillStyle = "#808080";
    }
    ctx.strokeRect(x, y, sze, sze);
    x += sze + gap;
  }

  // 六个运算符号
  ctx.lineWidth = 7;
  padding = sze / 5;
  // 加
  if (arr[5] == 1) {
    ctx.strokeStyle = "#808080";
    ctx.fillStyle = "#808080";
  } else {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
  }
  x = gap;
  ctx.beginPath();
  ctx.moveTo(x + padding, y + sze / 2);
  ctx.lineTo(x + sze - padding, y + sze / 2);
  ctx.moveTo(x + sze / 2, y + padding);
  ctx.lineTo(x + sze / 2, y + sze - padding);
  ctx.stroke();
  // 减
  if (arr[6] == 1) {
    ctx.strokeStyle = "#808080";
    ctx.fillStyle = "#808080";
  } else {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
  }
  x += gap + sze;
  ctx.beginPath();
  ctx.moveTo(x + padding, y + sze / 2);
  ctx.lineTo(x + sze - padding, y + sze / 2);
  ctx.stroke();
  // 乘
  if (arr[7] == 1) {
    ctx.strokeStyle = "#808080";
    ctx.fillStyle = "#808080";
  } else {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
  }
  x += gap + sze;
  padding = sze / 4.3;
  ctx.beginPath();
  ctx.moveTo(x + padding, y + padding);
  ctx.lineTo(x + sze - padding, y + sze - padding);
  ctx.moveTo(x + padding, y + sze - padding);
  ctx.lineTo(x + sze - padding, y + padding);
  ctx.stroke();
  // 除
  if (arr[8] == 1) {
    ctx.strokeStyle = "#808080";
    ctx.fillStyle = "#808080";
  } else {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
  }
  x += gap + sze;
  padding = sze / 5;
  ctx.beginPath();
  ctx.moveTo(x + padding, y + sze / 2);
  ctx.lineTo(x + sze - padding, y + sze / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + sze / 2, y + sze / 3.8, sze / 11, 0, Math.PI * 2);
  ctx.arc(x + sze / 2, y + sze - sze / 3.8, sze / 11, 0, Math.PI * 2);
  ctx.fill();
  // 全加
  ctx.strokeStyle = "#808080";
  ctx.fillStyle = "#808080";
  x += gap + sze;
  padding = sze / 5;
  ctx.beginPath();
  ctx.moveTo(x + padding, y + sze / 2);
  ctx.lineTo(x + sze - padding, y + sze / 2);
  ctx.moveTo(x + sze / 2, y + padding);
  ctx.lineTo(x + sze / 2, y + sze - padding);
  ctx.stroke();
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x + sze / 2, y + sze / 2, sze / 2 - padding * 0.6, 0, Math.PI * 2);
  ctx.stroke();
  // 全乘
  x += gap + sze;
  padding = sze / 4;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(x + padding, y + padding);
  ctx.lineTo(x + sze - padding, y + sze - padding);
  ctx.moveTo(x + padding, y + sze - padding);
  ctx.lineTo(x + sze - padding, y + padding);
  ctx.stroke();
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x + sze / 2, y + sze / 2, sze / 2 - padding * 0.3, 0, Math.PI * 2);
  ctx.stroke();
  // 跳过
  x = gap * 4 + size * 3;
  y = gap * 2 + size * 2 - sze;
  ctx.fillStyle = "#0033ff";
  ctx.strokeStyle = "#0033ff";
  ctx.textBaseline = "middle";
  ctx.font = "bold 35px 'Microsoft Yahei'";
  ctx.strokeRect(x, y, sze * 3, sze);
  ctx.fillText("跳过", x + sze * 1.5, y + sze / 2);
  y += sze + gap;
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(x, y, sze * 3, sze);
  ctx.fillText("撤销", x + sze * 1.5, y + sze / 2);
}

function PrintInfo(num) {
  ctx.fillStyle = "#000000";
  ctx.font = "bold 20px 'Microsoft Yahei'";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText("已解：" + num, size * 3 + gap * 4, gap);
}

NewGame();

// 看怎么去掉这里的 return，不应该啊
canvas.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  if (gap <= x && x <= gap + size && gap <= y && y <= gap + size) {
    num(0); return;
  }
  if (gap * 2 + size <= x && x <= gap * 2 + size * 2 && gap <= y && y <= gap + size) {
    num(1); return;
  }
  if (gap * 3 + size * 2 <= x && x <= gap * 3 + size * 3 && gap <= y && y <= gap + size) {
    num(2); return;
  }
  if (gap <= x && x <= gap + size && gap * 2 + size <= y && y <= gap * 2 + size * 2) {
    num(3); return;
  }
  if (gap * 2 + size <= x && x <= gap * 2 + size * 2 && gap * 2 + size <= y && y <= gap * 2 + size * 2) {
    num(4); return;
  }
  if (gap * 3 + size * 2 <= y && y <= gap * 3 + size * 2 + sze) {
    if (gap <= x && x <= gap + sze) {
      ctrl(5); return;
    }
    if (gap * 2 + sze <= x && x <= gap * 2 + sze * 2) {
      ctrl(6); return;
    }
    if (gap * 3 + sze * 2 <= x && x <= gap * 3 + sze * 3) {
      ctrl(7); return;
    }
    if (gap * 4 + sze * 3 <= x && x <= gap * 4 + sze * 4) {
      ctrl(8); return;
    }
    if (gap * 5 + sze * 4 <= x && x <= gap * 5 + sze * 5) {
      ctrl(9); return;
    }
    if (gap * 6 + sze * 5 <= x && x <= gap * 6 + sze * 6) {
      ctrl(10); return;
    }
  }
  if (gap * 4 + size * 3 <= x && x <= gap * 4 + size * 3 + sze * 3) {
    if (gap * 2 + size * 2 - sze <= y && y <= gap * 2 + size * 2) {
      skip(); return;
    }
    if (gap * 3 + size * 2 <= y && y <= gap * 3 + size * 2 + sze) {
      undo(); return;
    }
  }
}, false);

document.onkeydown = (e) => {
  if (e.code == "Numpad4" || e.code == "KeyK") {
    num(0);
  }
  if (e.code == "Numpad5" || e.code == "KeyL") {
    num(1);
  }
  if (e.code == "Numpad6" || e.code == "Semicolon") {
    num(2);
  }
  if (e.code == "Numpad1" || e.code == "Comma") {
    num(3);
  }
  if (e.code == "Numpad2" || e.code == "Period") {
    num(4);
  }
  if (e.code == "KeyQ") {
    ctrl(5);
  }
  if (e.code == "KeyW") {
    ctrl(6);
  }
  if (e.code == "KeyE") {
    ctrl(7);
  }
  if (e.code == "KeyR") {
    ctrl(8);
  }
  if (e.code == "KeyA") {
    ctrl(9);
  }
  if (e.code == "KeyS") {
    ctrl(10);
  }
  if (e.code == "Escape") {
    undo();
  }
}
