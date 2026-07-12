const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

// Set white background
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function addText() {
  const text = document.getElementById('textInput').value;
  const color = document.getElementById('colorPicker').value;
  
  ctx.fillStyle = color;
  ctx.font = 'bold 30px Arial';
  ctx.fillText(text, 50, 100);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
  const link = document.createElement('a');
  link.download = 'webtool-design.png';
  link.href = canvas.toDataURL();
  link.click();
}

// Image upload
document.getElementById('imageInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 20, 20, 200, 150);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(file);
});

function addImage() {
  document.getElementById('imageInput').click();
}
