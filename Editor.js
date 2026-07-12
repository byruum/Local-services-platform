const canvas = new fabric.Canvas('c', {
  backgroundColor: '#ffffff',
  preserveObjectStacking: true
});

function saveAndUpdate() { updateLayers(); canvas.renderAll(); }

// AI GENERATE
function aiGenerate() {
  const prompt = document.getElementById('aiPrompt').value.toLowerCase();
  if(prompt.includes('salon')) loadAI('salon');
  else if(prompt.includes('mtumba') || prompt.includes('sale')) loadAI('mtumba');
  else if(prompt.includes('spa')) loadAI('spa');
  else loadAI('offer');
}

// AI SUGGEST TEXT
function aiSuggestText() {
  const captions = [
    "New Braids, New You! Book Today 💅",
    "MTUMBA BALE JUST LANDED! From Ksh 200",
    "Weekend Special: 20% Off All Services",
    "Glow Up Season at Ruth Styles Salon"
  ];
  addText(captions[Math.floor(Math.random() * captions.length)]);
}

// SMART TEMPLATES
function loadAI(type) {
  canvas.clear();
  canvas.backgroundColor = '#ffffff';

  if(type === 'salon') {
    canvas.add(new fabric.Rect({left:0, top:0, width:1080, height:1080, selectable: false, fill: new fabric.Gradient({type:'linear', coords:{x1:0,y1:0,x2:0,y2:1080}, colorStops:[{offset:0,color:'#FFD6E8'},{offset:1,color:'#F48FB1'}]})}));
    canvas.add(new fabric.Textbox('RUTH STYLES\nSALON', {left:540, top:120, fontSize:80, fontFamily:'Montserrat', fill:'#AD1457', textAlign:'center', originX:'center', fontWeight:'900'}));
    canvas.add(new fabric.Rect({left:100, top:320, width:880, height:400, fill:'#fff', rx:30}));
    canvas.add(new fabric.Textbox('Knotless Braids Ksh 2500\nGel Nails Ksh 800\nFacial Ksh 1200', {left:540, top:350, fontSize:38, fontFamily:'Poppins', fill:'#000', textAlign:'center', originX:'center'}));
    canvas.add(new fabric.Rect({left:0, top:950, width:1080, height:130, fill:'#AD1457', selectable: false}));
    canvas.add(new fabric.Text('Call/WhatsApp: 0712 345 678', {left:540, top:990, fontSize:34, fill:'#fff', fontFamily:'Montserrat', originX:'center'}));
  }

  if(type === 'mtumba') {
    canvas.add(new fabric.Rect({left:0, top:0, width:1080, height:1080, selectable: false, fill: new fabric.Gradient({type:'linear', coords:{x1:0,y1:0,x2:1080,y2:1080}, colorStops:[{offset:0,color:'#FFF3E0'},{offset:1,color:'#FFCC80'}]})}));
    canvas.add(new fabric.Circle({left:880, top:80, radius:100, fill:'#D32F2F'}));
    canvas.add(new fabric.Text('SALE', {left:880, top:130, fontSize:40, fill:'#fff', fontFamily:'Montserrat', originX:'center', originY:'center', fontWeight:'900'}));
    canvas.add(new fabric.Textbox('MTUMBA\nBALE SALE', {left:540, top:220, fontSize:90, fontWeight:'900', fill:'#E65100', textAlign:'center', originX:'center', fontFamily:'Montserrat'}));
    canvas.add(new fabric.Textbox('Ladies Jeans Ksh 500\nMen Shirts Ksh 300\nKids Mix Ksh 150', {left:540, top:500, fontSize:40, fontFamily:'Poppins', fill:'#000', textAlign:'center', originX:'center'}));
  }

  if(type === 'offer') {
    canvas.backgroundColor = '#2E7D32';
    canvas.add(new fabric.Textbox('WEEKEND\nSPECIAL OFFER', {left:540, top:300, fontSize:80, fontWeight:'900', fill:'#FFEB3B', textAlign:'center', originX:'center', fontFamily:'Montserrat'}));
    canvas.add(new fabric.Textbox('20% OFF ALL SERVICES', {left:540, top:550, fontSize:50, fill:'#fff', textAlign:'center', originX:'center', fontFamily:'Poppins'}));
  }

  if(type === 'spa') {
    canvas.backgroundColor = '#E8F5E9';
    canvas.add(new fabric.Textbox('RUTH STYLES SPA', {left:540, top:200, fontSize:70, fontWeight:'900', fill:'#2E7D32', textAlign:'center', originX:'center', fontFamily:'Montserrat'}));
  }
  saveAndUpdate();
}

// MAGIC RESIZE
function magicResize() {
  const [w,h] = document.getElementById('resize').value.split('x');
  canvas.setDimensions({width: parseInt(w), height: parseInt(h)});
  saveAndUpdate();
}

// APPLY AI STYLE
function applyAIStyle() {
  const style = document.getElementById('aiStyle').value;
  const obj = canvas.getActiveObject();
  if(!obj || obj.type!== 'textbox') return alert("Select text first");
  if(style === 'Luxury') obj.set({fontFamily:'Montserrat', fill:'#AD1457'});
  if(style === 'Bold Sale') obj.set({fontFamily:'Montserrat', fill:'#D32F2F', fontWeight:'900'});
  if(style === 'African') obj.set({fill:'#FF6F00'});
  if(style === 'Minimal') obj.set({fontFamily:'Poppins', fill:'#000'});
  saveAndUpdate();
}

// LAYER CONTROL
function updateLayers() {
  const list = document.getElementById('layerList');
  list.innerHTML = '';
  canvas.getObjects().forEach((obj, i) => {
    let name = obj.type === 'textbox'? obj.text.substring(0,15) + '...' : obj.type;
    list.innerHTML += `<div onclick="selectLayer(${i})">Layer ${i+1}: ${name}</div>`;
  })
}
function selectLayer(i) { canvas.setActiveObject(canvas.item(i)); }

// BASIC TOOLS
function addText(t='Click to edit') {
  canvas.add(new fabric.Textbox(t, {left:200, top:200, fontSize:60, width:600, fontFamily:'Montserrat'}));
  saveAndUpdate();
}

document.getElementById('imgInput').addEventListener('change', e => {
  const reader = new FileReader();
  reader.onload = event => {
    fabric.Image.fromURL(event.target.result, img => {
      img.set({left:200, top:200, scaleX:0.3, scaleY:0.3, borderColor: '#FFA500'});
      canvas.add(img); saveAndUpdate();
    });
  }
  reader.readAsDataURL(e.target.files[0]);
});
function addImage() { document.getElementById('imgInput').click(); }

// EXPORT
function downloadCanvas() {
  const link = document.createElement('a');
  link.download = 'webtool-ai-design.png';
  link.href = canvas.toDataURL({ format: 'png', multiplier: 2 });
  link.click();
}

canvas.on('object:added', saveAndUpdate);
canvas.on('object:modified', saveAndUpdate);
canvas.on('selection:cleared', updateLayers);

loadAI('salon'); // load default on start
