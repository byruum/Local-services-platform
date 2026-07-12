const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
let objects = [];
let isDragging = false;
let dragIndex = null;

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  objects.forEach((obj, i) => {
    ctx.globalAlpha = (i === dragIndex)? 0.7 : 1;
    if(obj.type === 'text') {
      ctx.fillStyle = obj.color;
      ctx.font = `${obj.size} ${obj.font}`;
      ctx.fillText(obj.text, obj.x, obj.y);
    }
    if(obj.type === 'rect') {
      ctx.fillStyle = obj.color;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    }
    if(obj.type === 'image') {
      ctx.drawImage(obj.img, obj.x, obj.y, obj.w, obj.h);
    }
    ctx.globalAlpha = 1;
  })
}

function addText() {
  objects.push({type: 'text', text: 'Tap to Edit', x: 100, y: 150, size: '48px', font: 'Arial', color: '#D81B60'});
  redraw();
}

function addBox() {
  objects.push({type: 'rect', x: 200, y: 300, w: 300, h: 100, color: '#FFA500'});
  redraw();
}

// COMPETITIVE TEMPLATES
function loadTemplate(type) {
  objects = [];
  if(type === 'salon') {
    objects.push({type:'rect',x:0,y:0,w:900,h:900,color:'#FFD6E8'});
    objects.push({type:'text',text:'RUTH STYLES SALON',x:50,y:150,size:'56px',font:'Impact',color:'#D81B60'});
    objects.push({type:'text',text:'Braids: Ksh 1500\nKnotless: Ksh 2500\nNails: Ksh 500',x:50,y:350,size:'32px',font:'Arial',color:'#000'});
    objects.push({type:'rect',x:0,y:800,w:900,h:100,color:'#D81B60'});
    objects.push({type:'text',text:'Call/WhatsApp: 0712 345 678',x:50,y:860,size:'28px',font:'Arial',color:'#fff'});
  }
  if(type === 'mtumba') {
    objects.push({type:'rect',x:0,y:0,w:900,h:900,color:'#FFF3E0'});
    objects.push({type:'text',text:'MTUMBA BALE SALE!!!',x:50,y:150,size:'50px',font:'Impact',color:'#E65100'});
    objects.push({type:'text',text:'Jeans: Ksh 500\nTshirts: Ksh 200\nShoes: Ksh 800',x:50,y:350,size:'32px',font:'Arial',color:'#000'});
    objects.push({type:'text',text:'Location: Gikomba Market Stall 12',x:50,y:800,size:'24px',font:'Arial',color:'#000'});
  }
  redraw();
}

// DRAG FUNCTION
canvas.addEventListener('mousedown', e => {
  const mx = e.offsetX, my = e.offsetY;
  dragIndex = objects.findIndex(obj => mx > obj.x && mx < obj.x + (obj.w||200) && my > obj.y-30 && my < obj.y+10);
  if(dragIndex > -1) isDragging = true;
});
canvas.addEventListener('mousemove', e => {
  if(isDragging) {
    objects[dragIndex].x = e.offsetX;
    objects[dragIndex].y = e.offsetY;
    redraw();
  }
});
canvas.addEventListener('mouseup', () => isDragging = false);

// Image Upload
document.getElementById('imgUpload').addEventListener('change', e => {
  const reader = new FileReader();
  reader.onload = event => {
    const img = new Image();
    img.onload = () => {
      objects.push({type:'image', img:img, x:100, y:100, w:250, h:250});
      redraw();
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
});

function downloadCanvas() {
  const link = document.createElement('a');
  link.download = 'ruth-styles-poster.png';
  link.href = canvas.toDataURL();
  link.click();
}

redraw();
