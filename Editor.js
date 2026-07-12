const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
let objects = []; // This stores all layers
let selectedObj = null;

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  objects.forEach(obj => {
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
  })
}

function addText() {
  objects.push({
    type: 'text', text: 'Your Text Here', 
    x: 100, y: 200, size: '48px', font: 'Arial', color: '#000'
  });
  redraw();
}

function addShape(type) {
  objects.push({
    type: 'rect', x: 200, y: 300, w: 300, h: 100, color: '#FFA500'
  });
  redraw();
}

// TEMPLATES FOR RUTH STYLES + MTUMBA
function loadTemplate(type) {
  objects = [];
  if(type === 'salon') {
    objects.push({type:'rect',x:0,y:0,w:1080,h:1080,color:'#FFD6E8'});
    objects.push({type:'text',text:'RUTH STYLES SALON',x:100,y:200,size:'64px',font:'Impact',color:'#D81B60'});
    objects.push({type:'text',text:'Braids Ksh 1500 | Manicure Ksh 500',x:100,y:400,size:'36px',font:'Arial',color:'#000'});
    objects.push({type:'text',text:'Call 0712 345 678',x:100,y:900,size:'40px',font:'Arial',color:'#fff'});
  }
  if(type === 'mtumba') {
    objects.push({type:'rect',x:0,y:0,w:1080,h:1080,color:'#FFF3E0'});
    objects.push({type:'text',text:'MTUMBA BALE SALE',x:150,y:200,size:'70px',font:'Impact',color:'#E65100'});
    objects.push({type:'text',text:'Jeans Ksh 500 | Tshirts Ksh 200',x:150,y:400,size:'36px',font:'Arial',color:'#000'});
    objects.push({type:'text',text:'Location: Gikomba Market',x:150,y:900,size:'32px',font:'Arial',color:'#000'});
  }
  redraw();
}

// Image Upload
document.getElementById('imgUpload').addEventListener('change', e => {
  const reader = new FileReader();
  reader.onload = event => {
    const img = new Image();
    img.onload = () => {
      objects.push({type:'image', img:img, x:50, y:50, w:300, h:300});
      redraw();
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
});

function downloadCanvas() {
  const link = document.createElement('a');
  link.download = 'ruth-styles-design.png';
  link.href = canvas.toDataURL();
  link.click();
}

redraw(); // initial draw
