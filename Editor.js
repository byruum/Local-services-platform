const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#FFF';
ctx.fillRect(0, 0, 600, 400);

function addText() {
  const text = document.getElementById('textInput').value;
  const color = document.getElementById('colorPicker').value;
  ctx.fillStyle = color;
  ctx.font = '30px Arial';
  ctx.fillText(text, 50, 100);
}

function downloadCanvas() {
  const link = document.createElement('a');
  link.download = 'design.png';
  link.href = canvas.toDataURL();
  link.click();
}
