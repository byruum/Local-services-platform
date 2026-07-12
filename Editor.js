const canvas = new fabric.Canvas('c');
let history = [];

// SAVE STATE FOR UNDO
function saveState() { history.push(JSON.stringify(canvas)); }

// AI GENERATE - "Fake AI" for now, later we connect OpenAI
function aiGenerate() {
  const prompt = document.getElementById('aiPrompt').value.toLowerCase();
  canvas.clear();
  
  if(prompt.includes('salon')) {
    loadAI('salon');
  } else if(prompt.includes('mtumba') || prompt.includes('sale')) {
    loadAI('mtumba');
  } else {
    loadAI('offer');
  }
  alert("AI Generated layout based on: " + prompt);
}

// AI SUGGEST TEXT
function aiSuggestText() {
  const captions = [
    "New Braids, New You! Book Today 💅",
    "Mtumba Bale Just Landed! Prices From Ksh 200",
    "Weekend Special: 20% Off All Services",
    "Glow Up Season at Ruth Styles Salon"
  ];
  const random = captions[Math.floor(Math.random() * captions.length)];
  addText(random);
}

// SMART TEMPLATES WITH AI LAYOUT
function loadAI(type) {
  canvas.clear();
  if(type === 'salon') {
    canvas.backgroundColor = '#FFD6E8';
    canvas.add(new fabric.Textbox('RUTH STYLES', {left:540, top:100, fontSize:80, fontFamily:'Montserrat', fill:'#AD1457', textAlign:'center', originX:'center'}));
    canvas.add(new fabric.Textbox('Luxury Braids & Nails', {left:540, top:200, fontSize:32, fill:'#000', textAlign:'center', originX:'center'}));
    canvas.add(new fabric.Rect({left:100, top:300, width:880, height:400, fill:'#fff', rx:20}));
    canvas.add(new fabric.Textbox('Knotless 2500\nBox Braids 2000\nNails 800', {left:540, top:350, fontSize:40, textAlign:'center', originX:'center'}));
  }
  if(type === 'mtumba') {
    canvas.backgroundColor = '#FFF3E0';
    canvas.add(new fabric.Circle({left:900, top:100, radius:100, fill:'#D32F2F'}));
    canvas.add(new fabric.Text('SALE', {left:900, top:150, fontSize:40, fill:'#fff', originX:'center', originY:'center'}));
    canvas.add(new fabric.Textbox('MTUMBA\nBALE SALE', {left:540, top:250, fontSize:90, fontWeight:'900', fill:'#E65100', textAlign:'center', originX:'center'}));
  }
  updateLayers();
  canvas.renderAll();
}

// MAGIC RESIZE
function magicResize() {
  const size = document.getElementById('resize').value;
  if(size === 'WhatsApp Status') canvas.setDimensions({width:1080, height:1920});
  if(size === 'Instagram Post') canvas.setDimensions({width:1080, height:1080});
  if(size === 'Facebook Cover') canvas.setDimensions({width:1200, height:630});
  canvas.renderAll();
}

// APPLY AI STYLE
function applyAIStyle() {
  const style = document.getElementById('aiStyle').value;
  const obj = canvas.getActiveObject();
  if(!obj) return;
  
  if(style === 'Luxury') obj.set({fontFamily:'Playfair Display', fill:'#AD1457'});
  if(style === 'Bold Sale') obj.set({fontFamily:'Montserrat', fill:'#D32F2F', fontWeight:'900'});
  if(style === 'African') obj.set({fill:'#FF6F00'});
  canvas.renderAll();
}

// LAYER CONTROL
function updateLayers() {
  const list = document.getElementById('layerList');
  list.innerHTML = '';
  canvas.getObjects().forEach((obj, i) => {
    list.innerHTML += `<div onclick="selectLayer(${i})">Layer ${i+1}: ${obj.type}</div>`;
  })
}
function selectLayer(i) { canvas.setActiveObject(canvas.item(i)); }

// BASIC TOOLS
function addText(t='Click to edit') {
  canvas.add(new fabric.Textbox(t, {left:200, top:200, fontSize:60, width:600}));
  updateLayers();
}
document.getElementById('imgInput').addEventListener('change', e => {
  const reader = new FileReader();
  reader.onload = event => {
    fabric.Image.fromURL(event.target.result, img => {
      img.set({left:200, top:200, scaleX:0.3, scaleY:0.3});
      canvas.add(img); updateLayers();
    });
  }
  reader.readAsDataURL(e.target.files[0]);
});
function addImage() { document.getElementById('imgInput').click(); }

// AI REMOVE BG - Placeholder for now
function aiRemoveBg() { alert("AI Background Remover: Connect to remove.bg API next step"); }

function downloadCanvas() {
  const link = document.createElement('a');
  link.download = 'ai-design.png';
  link.href = canvas.toDataURL({multiplier:3}); // 3x HD
  link.click();
}

canvas.on('object:added', saveState);
canvas.on('object:modified', saveState);
loadAI('salon');
