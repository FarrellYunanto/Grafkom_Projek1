var GL;

function generateHalfSphere(xrad, yrad, zrad, stack, step, r,g,b){
  var vertices = [];
  var faces = [];

  var red=r;
  var green = g;
  var blue = b;

  for(var i = 0;i<=stack;i++){
    for(var j = 0;j<=step/2;j++){
      var v = i*1.0/stack * Math.PI - Math.PI/2;
      var u = j*1.0/step * 2*Math.PI - Math.PI;

      var x = xrad * Math.cos(v)*Math.cos(u);
      var y = yrad * Math.sin(v);
      var z = zrad * Math.cos(v)*Math.sin(u);

      v = i*1.0/stack;
      u = j*1.0/step;

      vertices.push(x,y,z,red,green,blue,v,u);
    }
  }

  for(var i = 0;i<=stack;i++){
    for(var j = 0;j<=step;j++){
      var a = i*step+j;
      var b = a+1;
      var c = a+step;
      var d = a+step+1;

      faces.push(a,b,c,d ,    a,d,c);
    }
  }

  return {"vertices": vertices, "faces": faces};
}


function generateTorus(majorRadius, minorRadius, sectorCount, sideCount,r,g,b) {
  var vertices = [];
  var faces = [];
  sectorAngle, sideAngle;
  var sectorStep = 2 * Math.PI / sectorCount;
  var sideStep = 2 * Math.PI / sideCount;

  for (var i = 0; i <= sideCount; ++i) {
    var sideAngle = Math.PI - i * sideStep;
    var xy = minorRadius * Math.cos(sideAngle);
    var z = minorRadius * Math.sin(sideAngle);

    for (var j = 0; j <= sectorCount; ++j) {
      var sectorAngle = j * sectorStep;

      var x = xy * Math.cos(sectorAngle);
      var y = xy * Math.sin(sectorAngle);
      
      x += majorRadius * Math.cos(sectorAngle);   // (R + r * cos(u)) * cos(v)
      y += majorRadius * Math.sin(sectorAngle);   // (R + r * cos(u)) * sin(v)

      s = j / sectorCount;
      t = i / sideCount;

      vertices.push(x, y, z,r,g,b, s, t);
    }
  }

  for (var i = 0; i < sideCount; ++i) {
    var k1 = i * (sectorCount + 1);
    var k2 = k1 + sectorCount + 1;

    for (var j = 0; j < sectorCount; ++j, ++k1, ++k2) {
      faces.push(k1, k2, k1 + 1, k1 + 1, k2, k2 + 1);
    }
  }

  return { "vertices": vertices, "faces": faces };
}

function generateWing(length, width, depth,r,g,b) {
  var vertices = [
      // Vertices sayap pesawat
      // Atas
      -length / 2, 0,      0, r, g, b, 0, 0,  // V0
       length / 2, 0,      0, r, g, b, 1, 0,  // V1
       length / 2, 0, -depth, r, g, b, 1, 1,  // V2
      -length / 2, 0, -depth, r, g, b, 0, 1,  // V3

      // Bawah
      -length / 2, -width,      0, r, g, b, 0, 0,  // V4
       length / 2, -width,      0, r, g, b, 1, 0,  // V5
       length / 2, -width, -depth, r, g, b, 1, 1,  // V6
      -length / 2, -width, -depth, r, g, b, 0, 1   // V7
  ];

  var faces = [
      // Atas
      0, 1, 2, 0, 2, 3,
      // Bawah
      4, 5, 6, 4, 6, 7,
      // Samping
      0, 1, 5, 0, 5, 4,
      1, 2, 6, 1, 6, 5,
      2, 3, 7, 2, 7, 6,
      3, 0, 4, 3, 4, 7
  ];

  return { "vertices": vertices, "faces": faces };
}

function generateRectangle3DGeometry(length, width, height,r,g,b) {
  var vertices = [
      // Sisi atas
      -length / 2, height / 2, -width / 2, r,g,b, 1,0, // Titik 0
      length / 2, height / 2, -width / 2,  r,g,b, 0,1, // Titik 1
      length / 2, height / 2, width / 2,   r,g,b, 1,1, // Titik 2
      -length / 2, height / 2, width / 2,  r,g,b, 0,0, // Titik 3
      // Sisi bawah
      -length / 2, -height / 2, -width / 2, r,g,b, 0,1,// Titik 4
      length / 2, -height / 2, -width / 2,  r,g,b, 1,0,// Titik 5
      length / 2, -height / 2, width / 2,   r,g,b, 0,0,// Titik 6
      -length / 2, -height / 2, width / 2,   r,g,b, 1,1// Titik 7
  ];

  // Definisikan indeks untuk dua segitiga yang membentuk persegi panjang
  var indices = [
      // Atas
      0, 1, 2,
      0, 2, 3,
      // Bawah
      4, 5, 6,
      4, 6, 7,
      // Samping
      0, 4, 1,
      1, 4, 5,
      1, 5, 2,
      2, 5, 6,
      2, 6, 3,
      3, 6, 7,
      3, 7, 0,
      0, 7, 4
  ];

  return { "vertices": vertices, "faces": indices };
}

function generate3DTrapesium(lengthTop, lengthBottom, height, depth, r, g, b) {
  var vertices = [
      // Vertices trapesium
      // Atas
      -lengthTop / 2,     height / 2, 0, r, g, b, 1, 1, // V0
       lengthTop / 2,     height / 2, 0, r, g, b, 1, 0, // V1
       lengthBottom / 2, -height / 2, 0, r, g, b, 0, 0, // V2
      -lengthBottom / 2, -height / 2, 0, r, g, b, 1, 1, // V3

      // Bawah
      -lengthTop / 2,     height / 2, -depth, r, g, b, 1, 0, // V4
       lengthTop / 2,     height / 2, -depth, r, g, b, 0, 1, // V5
       lengthBottom / 2, -height / 2, -depth, r, g, b, 1, 1, // V6
      -lengthBottom / 2, -height / 2, -depth, r, g, b, 0, 0 // V7
  ];

  var faces = [
      // Atas
      0, 1, 2, 0, 2, 3,
      // Bawah
      4, 5, 6, 4, 6, 7,
      // Samping
      0, 1, 5, 0, 5, 4,
      1, 2, 6, 1, 6, 5,
      2, 3, 7, 2, 7, 6,
      3, 0, 4, 3, 4, 7   
  ];

  return { "vertices": vertices, "faces": faces };
}

function generateCylinder(radius, height, sectorCount,r,g,b){
  const PI = Math.PI;
  let sectorStep = 2 * PI / sectorCount;
  let sectorAngle;  // Radian

  let unitCircleVertices = [];
  for (let i = 0; i <= sectorCount; ++i) {
      sectorAngle = i * sectorStep;
      unitCircleVertices.push(Math.cos(sectorAngle)); // x
      unitCircleVertices.push(Math.sin(sectorAngle)); // y
      unitCircleVertices.push(0);                    // z
  }
  let vertices = [];
  // Put side vertices to arrays
  for (let i = 0; i < 2; ++i) {
    let h = -height / 2.0 + i * height;           // z value; -h/2 to h/2
    let t = 1.0 - i;                              // vertical tex coord; 1 to 0

    for (let j = 0, k = 0; j <= sectorCount; ++j, k += 3) {
        let ux = unitCircleVertices[k];
        let uy = unitCircleVertices[k + 1];
        let uz = unitCircleVertices[k + 2]; // g dipake soal e buat garis normal
        // Position vector
        vertices.push(ux * radius);             // vx
        vertices.push(uy * radius);             // vy
        vertices.push(h);                       // vz
        // Texture coordinate
        vertices.push(r,g,b) // warna tabung
        vertices.push(j/sectorCount,t)
    }
}
 // The starting index for the base/top surface
 let baseCenterIndex = vertices.length / 8;
 let topCenterIndex = baseCenterIndex + sectorCount + 1; // Include center vertex

 // Put base and top vertices to arrays
 for (let i = 0; i < 2; ++i) {
     let h = -height / 2.0 + i * height;           // z value; -h/2 to h/2
     let nz = -1 + i * 2;                           // z value of normal; -1 to 1

     // Center point
     vertices.push(0,0,h); 
     vertices.push(r,g,b) // warna center
     vertices.push(0.5,0.5)
     

     for (let j = 0, k = 0; j < sectorCount; ++j, k += 3) {
         let ux = unitCircleVertices[k];
         let uy = unitCircleVertices[k + 1];
         // Position vector
         vertices.push(ux * radius);             // vx
         vertices.push(uy * radius);             // vy
         vertices.push(h);                       // vz
          vertices.push(r,g,b) // warna lingkaran atas bawah
         // Texture coordinate
         vertices.push(-ux * 0.5 + 0.5);        // s
         vertices.push(-uy * 0.5 + 0.5);        // t
     }

 }

 let indices = []; // sama kayak faces
    let k1 = 0;                         // 1st vertex index at base
    let k2 = sectorCount + 1;           // 1st vertex index at top

    // Indices for the side surface
    for (let i = 0; i < sectorCount; ++i, ++k1, ++k2) {
        // 2 triangles per sector
        // k1 => k1+1 => k2
        indices.push(k1);
        indices.push(k1 + 1);
        indices.push(k2);

        // k2 => k1+1 => k2+1
        indices.push(k2);
        indices.push(k1 + 1);
        indices.push(k2 + 1);
    }

    // Indices for the base surface
    for (let i = 0, k = baseCenterIndex + 1; i < sectorCount; ++i, ++k) {
        if (i < sectorCount - 1) {
            indices.push(baseCenterIndex);
            indices.push(k + 1);
            indices.push(k);
        } else { // Last triangle
            indices.push(baseCenterIndex);
            indices.push(baseCenterIndex + 1);
            indices.push(k);
        }
    }

    // Indices for the top surface
    for (let i = 0, k = topCenterIndex + 1; i < sectorCount; ++i, ++k) {
        if (i < sectorCount - 1) {
            indices.push(topCenterIndex);
            indices.push(k);
            indices.push(k + 1);
        } else { // Last triangle
            indices.push(topCenterIndex);
            indices.push(k);
            indices.push(topCenterIndex + 1);
        }
    }

 return { "vertices": vertices, "faces": indices };
}

function generateSphere(xrad, yrad, zrad, stack, step,r,g,b){
  var vertices = [];
  var faces = [];

  for(var i = 0;i<=stack;i++){
    for(var j = 0;j<=step;j++){
      var v = i*1.0/stack * Math.PI - Math.PI/2;
      var u = j*1.0/step * 2*Math.PI - Math.PI;

      var x = xrad * Math.cos(v)*Math.cos(u);
      var y = yrad * Math.sin(v);
      var z = zrad * Math.cos(v)*Math.sin(u);

      v = i*1.0/stack;
      u = j*1.0/step;

      vertices.push(x,y,z,r,g,b,v,u);
    }
  }

  for(var i = 0;i<=stack;i++){
    for(var j = 0;j<=step;j++){
      var a = i*step+j;
      var b = a+1;
      var c = a+step;
      var d = a+step+1;

      faces.push(a,b,c,d ,    a,d,c);
    }
  }

  return {"vertices": vertices, "faces": faces};
}

function generateCircle(x,y,rad){
    var list = []
    for(var i=0;i<360;i++){
      var a = rad*Math.cos((i/180)*Math.PI) + x;
      var b = rad*Math.sin((i/180)*Math.PI) + y;
      list.push(a);
      list.push(b);
    }
    return list;
  }

function generateCone(baseRadius, height, sectorCount, stackCount,r,g,b) {
  const PI = Math.acos(-1.0);
  let sectorStep = 2 * PI / sectorCount;
  let unitCircleVertices = [];

  // Build unit circle vertices on XY plane
  for (let i = 0; i <= sectorCount; ++i) {
      let sectorAngle = i * sectorStep;
      unitCircleVertices.push(Math.cos(sectorAngle)); // x
      unitCircleVertices.push(Math.sin(sectorAngle)); // y
      unitCircleVertices.push(0);                    // z
  }

  // Initialize arrays for vertices, normals, texture coordinates, and indices
  let vertices = [];
  let indices = []; //faces

  // Build side vertices
  for (let i = 0; i <= stackCount; ++i) {
      let z = -(height * 0.5) + i / stackCount * height;
      let radius = baseRadius * (1 - i / stackCount);
      let t = 1 - i / stackCount;

      for (let j = 0, k = 0; j <= sectorCount; ++j, k += 3) {
          let x = unitCircleVertices[k];
          let y = unitCircleVertices[k + 1];
          vertices.push(x * radius, y * radius, z);
          vertices.push(r,g,b) //warna cone
          vertices.push(j / sectorCount, t);
      }
  }

  // Remember where the base vertices start
  let baseVertexIndex = vertices.length / 8; // soal e vertice push sekali push ada 8 data

  // Build base vertices
  let z = -height * 0.5;
  vertices.push(0, 0, z);
  vertices.push(r,g,b);//warna cone
  vertices.push(0.5, 0.5);
  for (let i = 0, j = 0; i < sectorCount; ++i, j += 3) {
      let x = unitCircleVertices[j];
      let y = unitCircleVertices[j + 1];
      vertices.push(x * baseRadius, y * baseRadius, z);
      vertices.push(1,0,0)
      vertices.push(-x * 0.5 + 0.5, -y * 0.5 + 0.5);
  }

  // Build indices for side
  for (let i = 0; i < stackCount; ++i) {
      let k1 = i * (sectorCount + 1);
      let k2 = k1 + sectorCount + 1;
      for (let j = 0; j < sectorCount; ++j, ++k1, ++k2) {
          indices.push(k1, k1 + 1, k2);
          indices.push(k2, k1 + 1, k2 + 1);
      }
  }

  // Remember where the base indices start
  let baseIndex = indices.length;

  // Build indices for base
  for (let i = 0, k = baseVertexIndex + 1; i < sectorCount; ++i, ++k) {
      if (i < sectorCount - 1)
          indices.push(baseVertexIndex, k + 1, k);
      else
          indices.push(baseVertexIndex, baseVertexIndex + 1, k);
  }

  // Return the generated data
  return {"vertices": vertices, "faces": indices };
}
  class MyObject{
    canvas = null;
    vertex = [];
    faces = [];
    childs= [];

    SHADER_PROGRAM = null;
    _color = null;
    _position = null;


    _MMatrix = LIBS.get_I4();
    _PMatrix = LIBS.get_I4();
    _VMatrix = LIBS.get_I4();
    _greyScality = 0;


    TRIANGLE_VERTEX = null;
    TRIANGLE_FACES = null;


    MODEL_MATRIX = LIBS.get_I4();


    constructor(vertex, faces, source_shader_vertex, source_shader_fragment, texture){
      this.vertex = vertex;
      this.faces = faces;


      var compile_shader = function(source, type, typeString) {
        var shader = GL.createShader(type);
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
          alert("ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
          return false;
        }
        return shader;
       };
   
    var shader_vertex = compile_shader(source_shader_vertex, GL.VERTEX_SHADER, "VERTEX");
   
    var shader_fragment = compile_shader(source_shader_fragment, GL.FRAGMENT_SHADER, "FRAGMENT");
   
    this.SHADER_PROGRAM = GL.createProgram();
    GL.attachShader(this.SHADER_PROGRAM, shader_vertex);
    GL.attachShader(this.SHADER_PROGRAM, shader_fragment);
   
    GL.linkProgram(this.SHADER_PROGRAM);


    //vao
    this._color = GL.getAttribLocation(this.SHADER_PROGRAM, "color");
    this._position = GL.getAttribLocation(this.SHADER_PROGRAM, "position");
    this._uv = GL.getAttribLocation(this.SHADER_PROGRAM,'uv')

    //uniform
    this._PMatrix = GL.getUniformLocation(this.SHADER_PROGRAM,"PMatrix"); //projection
    this._VMatrix = GL.getUniformLocation(this.SHADER_PROGRAM,"VMatrix"); //View
    this._MMatrix = GL.getUniformLocation(this.SHADER_PROGRAM,"MMatrix"); //Model
    this._greyScality = GL.getUniformLocation(this.SHADER_PROGRAM, "greyScality");//GreyScality
    this._sampler = GL.getUniformLocation(this.SHADER_PROGRAM, "sampler"); //buat kalo mau pake texture


    GL.enableVertexAttribArray(this._color);
    GL.enableVertexAttribArray(this._position);

    GL.enableVertexAttribArray(this._uv);

    GL.useProgram(this.SHADER_PROGRAM);


    this.TRIANGLE_VERTEX = GL.createBuffer();
    this.TRIANGLE_FACES = GL.createBuffer();
    this.texture = LIBS.load_texture(texture); //buat kalo mau pake texture
    }

    setup(){
      GL.bindBuffer(GL.ARRAY_BUFFER, this.TRIANGLE_VERTEX);
      GL.bufferData(GL.ARRAY_BUFFER,
      new Float32Array(this.vertex),
      GL.STATIC_DRAW);


      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.TRIANGLE_FACES);
      GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this.faces),
      GL.STATIC_DRAW);
      this.childs.forEach(child => {
        child.setup()
      });
    }


    render(VIEW_MATRIX, PROJECTION_MATRIX, TYPE){
          GL.useProgram(this.SHADER_PROGRAM);  
          GL.activeTexture(GL.TEXTURE0);
          GL.bindTexture(GL.TEXTURE_2D, this.texture);
          GL.bindBuffer(GL.ARRAY_BUFFER, this.TRIANGLE_VERTEX);

          GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 4*(3+3 +2), 0);
          GL.vertexAttribPointer(this._color, 3, GL.FLOAT, false, 4*(3+3 + 2), 3*4);
          GL.vertexAttribPointer(this._uv,2,GL.FLOAT,false,4*(3+3+2),(3+3)*4)
          
          GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.TRIANGLE_FACES);

          GL.uniformMatrix4fv(this._PMatrix,false,PROJECTION_MATRIX);
          GL.uniformMatrix4fv(this._VMatrix,false,VIEW_MATRIX);
          GL.uniformMatrix4fv(this._MMatrix,false,this.MODEL_MATRIX);
          GL.uniform1f(this._greyScality, 1);
          GL.uniform1i(this._sampler,0);

 
          switch (TYPE) {
            case 1:
                GL.drawElements(GL.TRIANGLES, this.faces.length, GL.UNSIGNED_SHORT, 0);
                break;
            case 2: 
                GL.drawElements(GL.TRIANGLE_FAN, this.faces.length, GL.UNSIGNED_SHORT, 0);
                break;
            case 3:
                GL.drawElements(GL.LINES, this.faces.length, GL.UNSIGNED_SHORT, 0);
                break;
            // default:
            //   GL.drawElements(GL.TRIANGLES, this.faces.length, GL.UNSIGNED_SHORT, 0);
          }

          if(TYPE == 5){
            GL.drawElements(GL.TRIANGLES, this.faces.length, GL.UNSIGNED_SHORT, 0);
          }
           else if (TYPE == 6) {
            GL.drawElements(GL.TRIANGLE_FAN, this.faces.length, GL.UNSIGNED_SHORT, 0);
          }



          this.childs.forEach(child => {
            child.render(VIEW_MATRIX,PROJECTION_MATRIX)
          });

          GL.flush();
    }
  }
  
  //FUNCTION GERAK GERAK GROUP OBJ
  function rotateXGlobal(obj,rotation){
    obj.forEach(child => {
      LIBS.rotateX(child,rotation)
    });
  }
  function rotateYGlobal(obj,rotation){
    obj.forEach(child => {
      LIBS.rotateY(child,rotation)
    });
  }
  function rotateZGlobal(obj,rotation){
    obj.forEach(child => {
      LIBS.rotateZ(child,rotation)
    });
  }

  function translateX(obj,translation){
    obj.forEach(child => {
      LIBS.translateX(child,rotation)
    });
  }

  function translateYGlobal(obj,translation){
    obj.forEach(child => {
      LIBS.translateY(child,rotation)
    });
  }

  function translateZGlobal(obj,translation){
    obj.forEach(child => {
      LIBS.translateZ(child,rotation)
    });
  }
 
  function main(){
      var CANVAS = document.getElementById("myCanvas");

      CANVAS.width = window.innerWidth;
      CANVAS.height = window.innerHeight;

      //Movement
      var drag = false;
      var dX =0;
      var dY=0;

      var X_prev = 0;
      var Y_prev=0;

      var THETA = 0;
      var ALPHA = 0;

      var FRICTION= 0.9;

      var mouseDown = function(e){
        drag = true;
        X_prev = e.pageX;
        Y_prev = e.pageY;
      }


      var mouseUp = function(e){
        drag = false;
      }


      var mouseMove = function(e){
        if(!drag){return false;}
        dX = e.pageX - X_prev;
        dY = e.pageY- Y_prev;
        console.log(dX+" "+dY);
        X_prev = e.pageX;
        Y_prev = e.pageY;

        THETA += dX * 2*Math.PI / CANVAS.width;
        ALPHA += dY * 2*Math.PI / CANVAS.height;
      }

      var keyDown = function(e){
        e.preventDefault();
        console.log(e);
      }

      CANVAS.addEventListener("mousedown", mouseDown, false);
      CANVAS.addEventListener("mouseup", mouseUp, false);
      CANVAS.addEventListener("mouseout", mouseUp,false);
      CANVAS.addEventListener("mousemove", mouseMove, false);
      CANVAS.addEventListener("keydown", keyDown);

      try{
        GL = CANVAS.getContext("webgl", {antialias: true});
    }catch(e){
        alert("WebGL context cannot be initialized");
        return false;
    }

    //shaders
    var shader_vertex_source=`
    attribute vec3 position;
    attribute vec3 color;
    attribute vec2 uv;

    uniform mat4 PMatrix;
    uniform mat4 VMatrix;
    uniform mat4 MMatrix;
   
    varying vec3 vColor;
    varying vec2 vUV;
    void main(void) {
    gl_Position = PMatrix*VMatrix*MMatrix*vec4(position, 1.);
    vColor = color;
    vUV = uv;

    gl_PointSize=20.0;
    }`;

    var shader_fragment_source =`
    precision mediump float;
    varying vec3 vColor;
    varying vec2 vUV;
    // uniform vec3 color;


    uniform float greyScality;
   


    void main(void) {
    float greyScaleValue = (vColor.r + vColor.g + vColor.b)/3.;
    vec3 greyScaleColor = vec3(greyScaleValue, greyScaleValue, greyScaleValue);
    vec3 color = mix(greyScaleColor, vColor, greyScality);
    gl_FragColor = vec4(color, 1.);
    }`;

    var shader_fragment_source_nt =`
    precision mediump float;
    varying vec3 vColor;
    varying vec2 vUV;
    // uniform vec3 color;


    uniform float greyScality;
    uniform sampler2D sampler; //buat kalo mau pake texture


    void main(void) {
    float greyScaleValue = (vColor.r + vColor.g + vColor.b)/3.;
    vec3 greyScaleColor = vec3(greyScaleValue, greyScaleValue, greyScaleValue);
    vec3 color = mix(greyScaleColor, vColor, greyScality);
    gl_FragColor = vec4(color, 1.);
    gl_FragColor = texture2D(sampler,vUV); //buat kalo mau pake texture
    }`;


    //Coordinates
    var cube = [
      //belakang
      -1,-1,-1,   1,1,0, 0,0,
      1,-1,-1,    1,1,0, 1,0,
      1,1,-1,     1,1,0, 1,1,
      -1,1,-1,    1,1,0, 0,1,


      //depan
      -1,-1,1,    0,0,1, 0,0,
      1,-1,1,     0,0,1, 1,0,
      1,1,1,      0,0,1, 1,1,
      -1,1,1,     0,0,1, 0,1,


      //kiri
      -1,-1,-1,   0,1,1, 0,0,
      -1,1,-1,    0,1,1, 1,0,
      -1,1,1,     0,1,1, 1,1,
      -1,-1,1,    0,1,1, 0,1,


      //kanan
      1,-1,-1,    1,0,0, 0,0,
      1,1,-1,     1,0,0, 1,0,
      1,1,1,      1,0,0, 1,1,
      1,-1,1,     1,0,0, 0,1,


      //bawah
      -1,-1,-1,   1,0,1, 0,0,
      -1,-1,1,    1,0,1, 1,0,
      1,-1,1,     1,0,1, 1,1,
      1,-1,-1,    1,0,1, 0,1,


      //atas
      -1,1,-1,    0,1,0, 0,0,
      -1,1,1,     0,1,0, 1,0,
      1,1,1,      0,1,0, 1,1,
      1,1,-1,     0,1,0, 0,1
    ]
    var moonVertex = [
      //belakang
      -10,-1,-10,   1,1,0, 0,0,
      10,-1,-10,    1,1,0, 1,0,
      10,1,-10,     1,1,0, 1,1,
      -10,1,-10,    1,1,0, 0,1,

      //depan
      -10,-1,10,    0,0,1, 0,0,
      10,-1,10,     0,0,1, 1,0,
      10,1,10,      0,0,1, 1,1,
      -10,1,10,     0,0,1, 0,1,


      //kiri
      -10,-1,-10,   0,1,1, 0,0,
      -10,1,-10,    0,1,1, 1,0,
      -10,1,10,     0,1,1, 1,1,
      -10,-1,10,    0,1,1, 0,1,


      //kanan
      10,-1,-10,    1,0,0, 0,0,
      10,1,-10,     1,0,0, 1,0,
      10,1,10,      1,0,0, 1,1,
      10,-1,10,     1,0,0, 0,1,


      //bawah
      -10,-1,-10,   1,0,1, 0,0,
      -10,-1,10,    1,0,1, 1,0,
      10,-1,10,     1,0,1, 1,1,
      10,-1,-10,    1,0,1, 0,1,


      //atas
      -10,1,-10,    0,1,0, 0,0,
      -10,1,10,     0,1,0, 1,0,
      10,1,10,      0,1,0, 1,1,
      10,1,-10,     0,1,0, 0,1
    ]
   
      // FACES:
      var cube_faces = [
        0,1,2,
        0,2,3,


        4,5,6,
        4,6,7,


        8,9,10,
        8,10,11,


        12,13,14,
        12,14,15,


        16,17,18,
        16,18,19,


        20,21,22,
        20,22,23
      ];

      //BLOCK CUBE FARRELL
      var block = [
        //belakang
        -1,-1,-1.5,   1,1,0, 0,0,
        1,-1,-1.5,    1,1,0, 1,0,
        1,1,-1.5,     1,1,0, 1,1,
        -1,1,-1.5,    1,1,0, 0,1,
  
  
        //depan
        -1,-1,1.5,    0,0,1, 0,0,
        1,-1,1.5,     0,0,1, 1,0,
        1,1,1.5,      0,0,1, 1,1,
        -1,1,1.5,     0,0,1, 0,1,
  
  
        //kiri
        -1,-1,-1.5,   0,1,1, 0,0,
        -1,1,-1.5,    0,1,1, 1,0,
        -1,1,1.5,     0,1,1, 1,1,
        -1,-1,1.5,    0,1,1, 0,1,
  
  
        //kanan
        1,-1,-1.5,    1,0,0, 0,0,
        1,1,-1.5,     1,0,0, 1,0,
        1,1,1.5,      1,0,0, 1,1,
        1,-1,1.5,     1,0,0, 0,1,
  
  
        //bawah
        -1,-1,-1.5,   1,0,1, 0,0,
        -1,-1,1.5,    1,0,1, 1,0,
        1,-1,1.5,     1,0,1, 1,1,
        1,-1,-1.5,    1,0,1, 0,1,
  
  
        //atas
        -1,1,-1.5,    0,1,0, 0,0,
        -1,1,1.5,     0,1,0, 1,0,
        1,1,1.5,      0,1,0, 1,1,
        1,1,-1.5,     0,1,0, 0,1
      ]
     
        // FACES:
        var block_faces = [
          0,1,2,
          0,2,3,
  
  
          4,5,6,
          4,6,7,
  
  
          8,9,10,
          8,10,11,
  
  
          12,13,14,
          12,14,15,
  
  
          16,17,18,
          16,18,19,
  
  
          20,21,22,
          20,22,23
        ];

      //MATRIX
      var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1,100);
      var VIEW_MATRIX = LIBS.get_I4();

      //NORM ERIK
        var E_MODEL_MATRIX = LIBS.get_I4();
        var E_MODEL_MATRIX2 = LIBS.get_I4();
        var E_MODEL_MATRIX3 = LIBS.get_I4();
        var E_MODEL_MATRIX4 = LIBS.get_I4();
        var E_MODEL_MATRIX5 = LIBS.get_I4();
        var E_MODEL_MATRIX6 = LIBS.get_I4();
      //   var E_MODEL_MATRIX7 = LIBS.get_I4();
        var E_MODEL_MATRIX_OBSTACLE = LIBS.get_I4();
        var E_MODEL_MATRIX_RING = LIBS.get_I4(); 
        var E_MODEL_MATRIX_RING2 = LIBS.get_I4(); 
      //   var E_MODEL_MATRIX_LANTAI = LIBS.get_I4();

      //NORM MISAEL 
        var mMODEL_MATRIX = LIBS.get_I4(); 
        var mMODEL_MATRIX2 = LIBS.get_I4();
        var mMODEL_MATRIX3 = LIBS.get_I4();
        var mMODEL_MATRIX4 = LIBS.get_I4();
        var mMODEL_MATRIX5 = LIBS.get_I4();
        var mMODEL_MATRIX6 = LIBS.get_I4();
        var mMODEL_MATRIX7 = LIBS.get_I4();
        var mMODEL_MATRIX8 = LIBS.get_I4();
        var mMODEL_MATRIX9 = LIBS.get_I4();
        var mMODEL_MATRIX10 = LIBS.get_I4();
        var mMODEL_MATRIX11 = LIBS.get_I4();
      
      //NORM FARRELL 
        var fMODEL_MATRIX = LIBS.get_I4(); 
        var fMODEL_MATRIX2 = LIBS.get_I4();
        var fMODEL_MATRIX3 = LIBS.get_I4();
        var fMODEL_MATRIX4 = LIBS.get_I4();
        var fMODEL_MATRIX5 = LIBS.get_I4();
        var fMODEL_MATRIX6 = LIBS.get_I4();
        var fMODEL_MATRIX7 = LIBS.get_I4();
        var fMODEL_MATRIX8 = LIBS.get_I4();
        var fMODEL_MATRIX9 = LIBS.get_I4();
        var fMODEL_MATRIX10 = LIBS.get_I4();
        var fMODEL_MATRIX11 = LIBS.get_I4();
        var fMODEL_MATRIX12 = LIBS.get_I4();
        var fMODEL_MATRIX13 = LIBS.get_I4();
        var fMODEL_MATRIX14 = LIBS.get_I4();
        var fMODEL_MATRIX15 = LIBS.get_I4();

      // NORM MOON
      var MOON_MODEL_MATRIX = LIBS.get_I4();
      var MOON_MODEL_MATRIX2 = LIBS.get_I4();
      var MOON_MODEL_MATRIX3 = LIBS.get_I4();
      var MOON_MODEL_MATRIX4 = LIBS.get_I4();
      var MOON_MODEL_MATRIX5 = LIBS.get_I4();
      var MOON_MODEL_MATRIX6 = LIBS.get_I4();
      var MOON_MODEL_MATRIX7 = LIBS.get_I4();
      
      //NORM STAR
      


      LIBS.translateZ(VIEW_MATRIX,-60);
      // LIBS.translateY(VIEW_MATRIX, -2);
      // LIBS.rotateY(VIEW_MATRIX, 0.9);

      //=========================OBJECT ERIK================================
        //badan pesawat
        var EbadanPesawat = generateCylinder(0.75,5,100,1,0,1)
        var Eobject = new MyObject(EbadanPesawat['vertices'], EbadanPesawat['faces'], shader_vertex_source, shader_fragment_source);
        
        // mancung pesawat
        var EmancungPesawat = generateSphere(0.75,0.7,1,100,100,1,1,0)
        var EobjMancungPesawat = new MyObject(EmancungPesawat['vertices'],EmancungPesawat['faces'],shader_vertex_source,shader_fragment_source)
        
        // bokong pesawat
        var EtailMancungPesawat = generateCone(0.75,2,100,100,0,1,1)
        var EobjTailPesawat = new MyObject(EtailMancungPesawat['vertices'], EtailMancungPesawat['faces'], shader_vertex_source, shader_fragment_source);
        
        var Esayap = generateWing(-2,0.2,3,1,1,0);
        var EobjSayap = new MyObject(Esayap['vertices'],Esayap['faces'], shader_vertex_source, shader_fragment_source);
        
        var Esayap2 = generateWing(-2,0.2,3,1,1,0);
        var EobjSayap2 = new MyObject(Esayap2['vertices'],Esayap2['faces'], shader_vertex_source, shader_fragment_source);
        
        var Epucuk = generateCone(0.5,2,4,100,1,1,0);
        var EobjPucuk = new MyObject(Epucuk['vertices'],Epucuk['faces'], shader_vertex_source, shader_fragment_source);
        
        var Eobs = generateTorus(0.4,0.2,100,100,1,1,0);
        var EobjObs = new MyObject(Eobs['vertices'],Eobs['faces'],shader_vertex_source, shader_fragment_source)

        var Elantai = generateRectangle3DGeometry(2,200,200,0,1,0);
        var EobjLantai = new MyObject(Elantai['vertices'],Elantai['faces'],shader_vertex_source, shader_fragment_source)
        
        var ERing = generateTorus(0.5,0.1,100,100,1,0,0);
        var EobjRing = new MyObject(ERing['vertices'],ERing['faces'],shader_vertex_source, shader_fragment_source)
      
        var ERing2 = generateTorus(0.7,0.1,100,100,1,0,0);
        var EobjRing2 = new MyObject(ERing2['vertices'],ERing2['faces'],shader_vertex_source, shader_fragment_source)

    //     var testTrapesium = generate3DTrapesium(0,2,1,1,0,1,0)
    //     var objTrapesium = new MyObject(testTrapesium['vertices'],testTrapesium['faces'], shader_vertex_source, shader_fragment_source)
    //   // var donut = generateTorus(1,0.3,72,24)
      // var tabung = generateCylinder(0.5,1,50) // kalo base radius 0 jadi cone
      // var tri = generateCone(1,1,3,40) // kalo sector count 3 jaditetra hedron, kalao 4 jadi square pyramid
      // var cone = generateCone(1,1,3,40) // kalo sector count 3 jaditetra hedron, kalao 4 jadi square pyramid
      // var sphere = generateSphere(0.5,0.5,0.5,50,50);
      
      // var obj4 = new MyObject(tabung['vertices'],tabung['faces'],shader_vertex_source,shader_fragment_source)
      // var obj5 = new MyObject(cone['vertices'],cone['faces'],shader_vertex_source,shader_fragment_source)

      Eobject.childs.push(EobjTailPesawat)
      Eobject.childs.push(EobjMancungPesawat)
      Eobject.childs.push(EobjSayap)
      Eobject.childs.push(EobjSayap2)
      Eobject.childs.push(EobjPucuk)
    //   Eobject.childs.push(objTrapesium)
      Eobject.childs.push(EobjObs)
      Eobject.childs.push(EobjRing)
      Eobject.childs.push(EobjRing2)
      // EobjLantai.setup()
      // objObs.setup();
      Eobject.setup();

      /*==============================OBJECT MISAEL================================*/
      var mobject = new MyObject(cube, cube_faces, shader_vertex_source, shader_fragment_source);
      var donut1 = generateTorus(3,0.8,72,24,1,0,1)
      var objectm2 = new MyObject(donut1['vertices'], donut1['faces'], shader_vertex_source, shader_fragment_source);
      var donut2 = generateTorus(2,0.5,72,24,0.8,1,0)
      var objectm3 = new MyObject(donut2['vertices'], donut2['faces'], shader_vertex_source, shader_fragment_source);
      var donut3 = generateTorus(1,0.35,72,24,0,1,0)
      var objectm4 = new MyObject(donut3['vertices'], donut3['faces'], shader_vertex_source, shader_fragment_source);
      var halfSphere = generateHalfSphere(3, 3 , 3, 80, 80, 0,0,1);
      var objectm5 = new MyObject(halfSphere['vertices'], halfSphere['faces'], shader_vertex_source ,shader_fragment_source);

        //trail 
        var donut4 = generateTorus(2,0.2,72,24, 0.8,0.8,0.8)
        var objectm6 = new MyObject(donut4['vertices'], donut4['faces'], shader_vertex_source, shader_fragment_source);
        var donut5 = generateTorus(1,0.1,72,24, 0.8,0.8,0.8)
        var objectm7 = new MyObject(donut5['vertices'], donut5['faces'], shader_vertex_source, shader_fragment_source);
        
        //antenna
        var cone1 = generateCone(0.3, 3, 20, 20, 0, 1, 1);
        var objectm8 = new MyObject(cone1['vertices'], cone1['faces'], shader_vertex_source, shader_fragment_source);
        var sphere1 = generateSphere(0.3,0.3,0.3, 30, 30, 1, 0 ,1)
        var objectm9 = new MyObject(sphere1['vertices'], sphere1['faces'], shader_vertex_source, shader_fragment_source);
        
        var cone2 = generateCone(0.3, 3, 20, 20, 0,1, 1);
        var objectm10 = new MyObject(cone2['vertices'], cone2['faces'], shader_vertex_source, shader_fragment_source);
        var sphere2 = generateSphere(0.3,0.3,0.3, 30, 30, 1,0,1)
        var objectm11 = new MyObject(sphere2['vertices'], sphere2['faces'], shader_vertex_source, shader_fragment_source);

        mobject.childs.push(objectm2);
        mobject.childs.push(objectm3);
        mobject.childs.push(objectm4);
        mobject.childs.push(objectm5);
        mobject.childs.push(objectm6);
        mobject.childs.push(objectm7);
        mobject.childs.push(objectm8);
        mobject.childs.push(objectm9);
        mobject.childs.push(objectm10);
        mobject.childs.push(objectm11);
        
        mobject.setup();

        //======================================OBJECT FARRELL=====================================
        //Body
        var fobject = new MyObject(block, block_faces, shader_vertex_source, shader_fragment_source_nt, "resource/dwood.jpg");
        
        //paha kiri
        var fsphere = generateHalfSphere(0.7,0.9,0.7,50,50);
        var fobject2 = new MyObject(fsphere['vertices'], fsphere['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/dwood.jpg");

        //paha kanan
        var fobject3 = new MyObject(fsphere['vertices'], fsphere['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/dwood.jpg");

        //betis kanan
        var fcylinder = generateCylinder(0.5,2,50);
        var fobject4 = new MyObject(fcylinder['vertices'], fcylinder['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/lwood.jpg");

        //betis kiri
        var fobject5 = new MyObject(fcylinder['vertices'], fcylinder['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/lwood.jpg");

        //duri 1
        var fcone = generateCone(0.6, 0.6,25,25);
        var fobject6 = new MyObject(fcone['vertices'], fcone['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/lwood.jpg");
        //duri 2
        var fcone = generateCone(0.6, 0.6,25,25);
        var fobject7 = new MyObject(fcone['vertices'], fcone['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/lwood.jpg");
        //duri 3
        var fcone = generateCone(0.6, 0.6,25,25);
        var fobject8  = new MyObject(fcone['vertices'], fcone['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/lwood.jpg");

        //mata kanan
        var fsphere = generateSphere(0.3,0.3,0.3,50,50);
        var fobject9  = new MyObject(fsphere['vertices'], fsphere['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/lwood.jpg");

        //mata kiri
        var fsphere = generateSphere(0.3,0.3,0.3,50,50);
        var fobject10 = new MyObject(fsphere['vertices'], fsphere['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/lwood.jpg");

        //kaki kanan
        var ftrapesium = generate3DTrapesium(1,2,1,1);
        var fobject11 = new MyObject(ftrapesium['vertices'], ftrapesium['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/dwood.jpg");

        //kaki kiri
        var fobject12 = new MyObject(ftrapesium['vertices'], ftrapesium['faces'], shader_vertex_source, shader_fragment_source_nt, "resource/dwood.jpg");

        //Jet Booster
        var firefly = generateTorus(1,0.1,100,100,0.5,0.1,0.3);
        var fobject13 = new MyObject(firefly['vertices'], firefly['faces'], shader_vertex_source, shader_fragment_source);
        var firefly2 = generateTorus(0.5,0.1,100,100,0.5,0.1,0.3);
        var fobject14 = new MyObject(firefly2['vertices'], firefly2['faces'], shader_vertex_source, shader_fragment_source);
        var firefly3 = generateTorus(1.5,0.1,100,100,0.5,0.1,0.3);
        var fobject15 = new MyObject(firefly3['vertices'], firefly3['faces'], shader_vertex_source, shader_fragment_source);

        //setup
        fobject.childs.push(fobject2);
        fobject.childs.push(fobject3);
        fobject.childs.push(fobject4);
        fobject.childs.push(fobject5);
        fobject.childs.push(fobject6);
        fobject.childs.push(fobject7);
        fobject.childs.push(fobject8);
        fobject.childs.push(fobject9);
        fobject.childs.push(fobject10);
        fobject.childs.push(fobject11);
        fobject.childs.push(fobject12);
        fobject.childs.push(fobject13);
        fobject.childs.push(fobject14);
        fobject.childs.push(fobject15);
        fobject.setup();

//======================================OBJECT ENVIRONMENT=====================================//
        var moon = generateSphere(1,1,1,100,100,1,1,1)
        var objMoon = new MyObject(moonVertex, cube_faces, shader_vertex_source, shader_fragment_source_nt, "resource/moon.jpeg");
        var moon2 = generateSphere(0.2,0.2,0.2,100,100,0.128,0.128,0.128)
        var objMoon2= new MyObject(moon2['vertices'], moon2['faces'], shader_vertex_source, shader_fragment_source);
        var objMoon3 = objMoon2
        var objMoon4 = objMoon2
        var objMoon5 = objMoon2
        var objMoon6 = objMoon2
        var objMoon7 = objMoon2


        // setup
        objMoon.childs.push(objMoon2)
        objMoon.childs.push(objMoon3)
        objMoon.childs.push(objMoon4)
        objMoon.childs.push(objMoon5)
        objMoon.childs.push(objMoon6)
        objMoon.childs.push(objMoon7)
        objMoon.setup()
//======================================OBJECT ENVIRONMENT END=====================================//
      /*========================= DRAWING ========================= */
      GL.clearColor(0.0, 0.0, 0.0, 0.0);
      GL.enable(GL.DEPTH_TEST);
      GL.depthFunc(GL.LEQUAL);
      
      //VAR ERICK
      var time_prev_E = 0;
      var iE = 0;
      var jE = 0;
      var kE = 0;
      var xE = 0.01;
      var tempE = 0;
      var yE = 0.03;
      var zE = 0.02;
      var t_objE = 0;
      var scaleE = 0;
      var scale2E = 0;

      var countScaleE = 1;
      var countScale2E = 1.7;
      var t_obsE = 0;
      var xrotE = 0;
      var zrotE = 0;
      var yrotE = 0;
      var xcountE = 0.01;
      var zcountE = 0.01;
      var ycountE = 0.01;
      var temp_countE = 0.01;
      //END VAR ERICK

      //VAR MISAEL
      var prev_time = 0;
      var i = 0; //buat translate smoke
      var j = 0; //buat rotate di y axis 
      var k = 0; //buat gerak gerak 
      var kt = 0;
      var r =0;
      var rx = 0.01;
      var kz =0;
      var zz = 0.02;
      var zt = 0.03;
      var x = 0.01;
      var y = 0.01;
      var z = 0.01;
      //END VAR MIS
      
      //VAR REL
      var time_prev = 0;
      var fi = 0;
      var fx = 0.001;

      var fi = 0;
      var fj = 1;
      var fk = 0;
      var fx = 0.05;
      var fy = 0.01;
      var fz = 0.1;
      var fMR = 1;
      //END VAR REL

      var animate = function(time) {
        //rik
        tempE += temp_countE;
        iE += xE;
        jE += yE;
        kE += zE;
        scaleE +=countScaleE;
        scale2E += countScale2E;

        t_objE += t_obsE;
        zrotE +=zcountE;
        xrotE += xcountE;
        var dt =  time - time_prev_E;
        time_prev_E=time;
        //end rik 

        //mis
        var dt = time-prev_time;
        prev_time = time;

        // // LIBS.rotateZ(VIEW_MATRIX, LIBS.degToRad(90*dt/1000));        
        // LIBS.rotateY(VIEW_MATRIX, LIBS.degToRad(90*dt/400));
        // // LIBS.translateY(VIEW_MATRIX, LIBS.degToRad(90*dt/400))
     
          i += x; 
          j += y;
          k += z; 
          kt += zt;
          kz += zz;
          r += rx; 
        //end mis

        //rel
        fi += fx;
        fj += -fx;
        fk +=fz;

        if(fi > 1.0){
          console.log("HIt")
          fx = -0.05;
        }
        else if (fi < 0){
          fx = 0.05;
        }

        if(fk > 10){
          console.log("HIt")
          fz = -0.1;
          fMR = -1.4
        }
        else if (fk < -30){
          fz = 0.1;
          fMR = 1.4
        }
        //end rel 

          GL.viewport(0, 0, CANVAS.width, CANVAS.height);
          GL.clear(GL.COLOR_BUFFER_BIT | GL.D_BUFFER_BIT);
          
          now = time/1000;

          if(!drag){
            dX*=FRICTION;
            dY*=FRICTION;

            THETA += dX *2*Math.PI/CANVAS.width;
            ALPHA += dY * 2*Math.PI/CANVAS.height;
          }
          // VIEW_MATRIX = LIBS.get_I4();
          LIBS.rotateX(VIEW_MATRIX, ALPHA/1000);
          LIBS.rotateY(VIEW_MATRIX, THETA/1000);
          // console.log("Detik : ",now)

          //ngukur pergerakan
          var radius = 2;
          var pos_x = radius * now/1000;
          var pos_y = -radius * now/1000;
          var pos_z = 0;

          //====================================SETPOS ERICK==============================
          //MATRIX NORM
          //badan pesawat
          E_MODEL_MATRIX = LIBS.get_I4();

          E_MODEL_MATRIX2 = LIBS.get_I4();
          E_MODEL_MATRIX3 = LIBS.get_I4();
          E_MODEL_MATRIX4 = LIBS.get_I4();
          E_MODEL_MATRIX5 = LIBS.get_I4();
          E_MODEL_MATRIX6 = LIBS.get_I4();
        //   E_MODEL_MATRIX7 = LIBS.get_I4();
          E_MODEL_MATRIX_OBSTACLE = LIBS.get_I4();
          E_MODEL_MATRIX_RING = LIBS.get_I4();
          E_MODEL_MATRIX_RING2 = LIBS.get_I4();
        //   E_MODEL_MATRIX_LANTAI = LIBS.get_I4();
          // LIBS.setPosition(MODEL_MATRIX,pos_x,pos_y,pos_z); // geser geser
          // LIBS.rotateX(MODEL_MATRIX,10)
          LIBS.translateY(E_MODEL_MATRIX, 10);
          LIBS.translateX(E_MODEL_MATRIX, -15);

          // LIBS.rotateY(E_MODEL_MATRIX, THETA); //puter objek kanan kiri
          // LIBS.rotateX(E_MODEL_MATRIX, ALPHA); // puter objek atas bawah

          LIBS.rotateY(E_MODEL_MATRIX2,-9.425)
          // LIBS.rotateY(E_MODEL_MATRIX2, THETA);
          // LIBS.rotateX(E_MODEL_MATRIX2, ALPHA);   
 
          // LIBS.rotateY(E_MODEL_MATRIX3, THETA);
          // LIBS.rotateX(E_MODEL_MATRIX3, ALPHA);
 
          LIBS.rotateY(E_MODEL_MATRIX4,-21)
          // LIBS.rotateY(E_MODEL_MATRIX4, THETA);
          // LIBS.rotateX(E_MODEL_MATRIX4, ALPHA);

          LIBS.rotateY(E_MODEL_MATRIX5,21)
          // LIBS.rotateY(E_MODEL_MATRIX5, THETA);
          // LIBS.rotateX(E_MODEL_MATRIX5, ALPHA);

          LIBS.rotateX(E_MODEL_MATRIX6,LIBS.degToRad(215))
          // LIBS.rotateY(E_MODEL_MATRIX6, THETA);
          // LIBS.rotateX(E_MODEL_MATRIX6, ALPHA);
          
        //   LIBS.rotateX(E_MODEL_MATRIX7,90)
        // //   LIBS.translateX(E_MODEL_MATRIX7,-5)
        //   LIBS.rotateY(E_MODEL_MATRIX7, THETA);
        //   LIBS.rotateX(E_MODEL_MATRIX7, ALPHA);
          
          // LIBS.rotateY(E_MODEL_MATRIX_OBSTACLE, THETA);
          // LIBS.rotateX(E_MODEL_MATRIX_OBSTACLE, ALPHA);
          LIBS.rotateY(E_MODEL_MATRIX_OBSTACLE,yrotE* 6)
          LIBS.rotateX(E_MODEL_MATRIX_OBSTACLE,xrotE* 6)

          // LIBS.rotateY(E_MODEL_MATRIX_RING,LIBS.degToRad(90))
          // LIBS.rotateY(E_MODEL_MATRIX_RING, THETA);
          // LIBS.rotateX(E_MODEL_MATRIX_RING, ALPHA);
        
          // LIBS.rotateY(E_MODEL_MATRIX_RING2,LIBS.degToRad(180==))
          // LIBS.rotateY(E_MODEL_MATRIX_RING2, THETA);
          // LIBS.rotateX(E_MODEL_MATRIX_RING2, ALPHA);
          
        //   LIBS.translateX(E_MODEL_MATRIX_OBSTACLE,t_objE*10)
        //   LIBS.translateY(E_MODEL_MATRIX_LANTAI,-10)
        //   LIBS.rotateX(E_MODEL_MATRIX_LANTAI,LIBS.degToRad(90))
        //   LIBS.rotateZ(E_MODEL_MATRIX_LANTAI,LIBS.degToRad(90))
        //   LIBS.rotateY(E_MODEL_MATRIX_LANTAI, THETA);
        //   LIBS.rotateX(E_MODEL_MATRIX_LANTAI, ALPHA);
        //===========================================END ERICK=================================
          
        //=========================================SETPOS MISAEL======================================
          mMODEL_MATRIX = LIBS.get_I4(); 
          mMODEL_MATRIX2 = LIBS.get_I4();
          mMODEL_MATRIX3 = LIBS.get_I4();
          mMODEL_MATRIX4 = LIBS.get_I4();
          mMODEL_MATRIX5 = LIBS.get_I4();
          mMODEL_MATRIX6 = LIBS.get_I4();
          mMODEL_MATRIX7 = LIBS.get_I4();
          mMODEL_MATRIX8 = LIBS.get_I4();
          mMODEL_MATRIX9 = LIBS.get_I4();
          mMODEL_MATRIX10 = LIBS.get_I4();
          mMODEL_MATRIX11 = LIBS.get_I4();
      
          //SET ROTATE UNTUK POSISI AWAL
          //cube head
          LIBS.translateY(mMODEL_MATRIX, 10);
          LIBS.translateZ(mMODEL_MATRIX, 10);
          LIBS.rotateX(mMODEL_MATRIX, -4.7);
          LIBS.rotateY(mMODEL_MATRIX, 1.2);
          // LIBS.rotateX(mMODEL_MATRIX, ALPHA); 
          // LIBS.rotateY(mMODEL_MATRIX, THETA); 
          
          //body donut
          LIBS.rotateX(mMODEL_MATRIX2, -4.7);
          LIBS.rotateY(mMODEL_MATRIX2, 1.2);
          // LIBS.rotateX(mMODEL_MATRIX2, ALPHA);
          // LIBS.rotateY(mMODEL_MATRIX2, THETA);
          
          //body donut2
          LIBS.rotateX(mMODEL_MATRIX3, -4.7);
          LIBS.rotateY(mMODEL_MATRIX3, 1.2);
          // LIBS.rotateX(mMODEL_MATRIX3, ALPHA);
          // LIBS.rotateY(mMODEL_MATRIX3, THETA);
          
          //body donut3
          LIBS.rotateX(mMODEL_MATRIX4, -4.7);
          LIBS.rotateY(mMODEL_MATRIX4, 1.2);
          // LIBS.rotateX(mMODEL_MATRIX4, ALPHA);
          // LIBS.rotateY(mMODEL_MATRIX4, THETA);
          
          //halfsphere glass
          LIBS.rotateX(mMODEL_MATRIX5, -4.7);
          LIBS.rotateY(mMODEL_MATRIX5, 1.2);
          // LIBS.rotateX(mMODEL_MATRIX5, ALPHA);
          // LIBS.rotateY(mMODEL_MATRIX5, THETA);

              //donut trail big
              LIBS.rotateX(mMODEL_MATRIX6, -4.7);
              LIBS.rotateY(mMODEL_MATRIX6, 1.2);
              // LIBS.rotateX(mMODEL_MATRIX6, ALPHA);
              // LIBS.rotateY(mMODEL_MATRIX6, THETA);
      
              //donut trail small
              LIBS.rotateX(mMODEL_MATRIX7, -4.7);
              LIBS.rotateY(mMODEL_MATRIX7, 1.2);
              // LIBS.rotateX(mMODEL_MATRIX7, ALPHA);
              // LIBS.rotateY(mMODEL_MATRIX7, THETA);
              
          //antenna right
          LIBS.rotateX(mMODEL_MATRIX8, -7.4);
          LIBS.rotateY(mMODEL_MATRIX8, 1.2);
          // LIBS.rotateX(mMODEL_MATRIX8, ALPHA);
          // LIBS.rotateY(mMODEL_MATRIX8, THETA);
          
          LIBS.rotateX(mMODEL_MATRIX9, -7.4);
          LIBS.rotateY(mMODEL_MATRIX9, 1,5);
          // LIBS.rotateX(mMODEL_MATRIX9, ALPHA);
          // LIBS.rotateY(mMODEL_MATRIX9, THETA);
  
          //antenna left
          LIBS.rotateX(mMODEL_MATRIX10, -14.6);
          LIBS.rotateY(mMODEL_MATRIX10, 1.2);
          // LIBS.rotateX(mMODEL_MATRIX10, ALPHA);
          // LIBS.rotateY(mMODEL_MATRIX10, THETA);

          LIBS.rotateX(mMODEL_MATRIX11, -14.6);
          LIBS.rotateY(mMODEL_MATRIX11, 1,5);
          // LIBS.rotateX(mMODEL_MATRIX11, ALPHA);
          // LIBS.rotateY(mMODEL_MATRIX11, THETA);

          //=============================================END SETPOS MISAEL==============================================
          // 
          //=====================================SETPOS FARRELL================================================
          fMODEL_MATRIX = LIBS.get_I4(); //ngambil matrix normalnya biar bisa di transform
          fMODEL_MATRIX2 = LIBS.get_I4();
          fMODEL_MATRIX3 = LIBS.get_I4();
          fMODEL_MATRIX4 = LIBS.get_I4();
          fMODEL_MATRIX5 = LIBS.get_I4();
          fMODEL_MATRIX6 = LIBS.get_I4();
          fMODEL_MATRIX7 = LIBS.get_I4();
          fMODEL_MATRIX8 = LIBS.get_I4();
          fMODEL_MATRIX9 = LIBS.get_I4();
          fMODEL_MATRIX10 = LIBS.get_I4();
          fMODEL_MATRIX11 = LIBS.get_I4();
          fMODEL_MATRIX12 = LIBS.get_I4();
          fMODEL_MATRIX13 = LIBS.get_I4();
          fMODEL_MATRIX14 = LIBS.get_I4();
          fMODEL_MATRIX15 = LIBS.get_I4();
          
          // LIBS.setPosition(fMODEL_MATRIX,pos_x,pos_y,pos_z); // geser geser
          // LIBS.rotateX(fMODEL_MATRIX, time/1000)
          
          LIBS.translateX(fMODEL_MATRIX, fk); //puter objek kanan kiri
          LIBS.translateX(fMODEL_MATRIX, 10); //puter objek kanan kiri
          // LIBS.rotateY(fMODEL_MATRIX, THETA); //puter objek kanan kiri
          // LIBS.rotateX(fMODEL_MATRIX, ALPHA); // puter objek atas bawah
          
          //atur posisi paha kiri
          LIBS.rotateY(fMODEL_MATRIX2, 4.8);
          LIBS.rotateX(fMODEL_MATRIX2, fi);
          // LIBS.rotateY(fMODEL_MATRIX2, THETA);
          // LIBS.rotateX(fMODEL_MATRIX2, ALPHA);
          
          //atur posisi paha kanan
          LIBS.rotateY(fMODEL_MATRIX3, -4.8);
          LIBS.rotateX(fMODEL_MATRIX3, fj);
          // LIBS.rotateY(fMODEL_MATRIX3, THETA);
          // LIBS.rotateX(fMODEL_MATRIX3, ALPHA);
          
          //atur posisi betis kanan
          LIBS.rotateY(fMODEL_MATRIX4, 0);
          LIBS.rotateX(fMODEL_MATRIX4, 1);
          // LIBS.rotateY(fMODEL_MATRIX4, THETA);
          // LIBS.rotateX(fMODEL_MATRIX4, ALPHA);
          
          //atur posisi betis kiri
          LIBS.rotateY(fMODEL_MATRIX5, 0);
          LIBS.rotateX(fMODEL_MATRIX5, 1);
          // LIBS.rotateY(fMODEL_MATRIX5, THETA);
          // LIBS.rotateX(fMODEL_MATRIX5, ALPHA);
          
          //atur posisi duri 1
          LIBS.rotateY(fMODEL_MATRIX6, 0);
          LIBS.rotateX(fMODEL_MATRIX6, 4.7);
          // LIBS.rotateY(fMODEL_MATRIX6, THETA);
          // LIBS.rotateX(fMODEL_MATRIX6, ALPHA);
          //atur posisi duri 2
          LIBS.rotateY(fMODEL_MATRIX7, 0);
          LIBS.rotateX(fMODEL_MATRIX7, 4.7);
          // LIBS.rotateY(fMODEL_MATRIX7, THETA);
          // LIBS.rotateX(fMODEL_MATRIX7, ALPHA);
          //atur posisi duri 3
          LIBS.rotateY(fMODEL_MATRIX8, 0);
          LIBS.rotateX(fMODEL_MATRIX8, 4.7);
          // LIBS.rotateY(fMODEL_MATRIX8, THETA);
          // LIBS.rotateX(fMODEL_MATRIX8, ALPHA);
          
          //atur kaki kanan
          LIBS.rotateY(fMODEL_MATRIX11, 1.6);
          LIBS.rotateX(fMODEL_MATRIX11, 0);
          // LIBS.rotateY(fMODEL_MATRIX11, THETA);
          // LIBS.rotateX(fMODEL_MATRIX11, ALPHA);
          //atur kaki kiri
          LIBS.rotateY(fMODEL_MATRIX12, 1.6);
          LIBS.rotateX(fMODEL_MATRIX12, 0);
          // LIBS.rotateY(fMODEL_MATRIX12, THETA);
          // LIBS.rotateX(fMODEL_MATRIX12, ALPHA);

          //atur ring 1
          LIBS.rotateY(fMODEL_MATRIX13, 3.13);
          LIBS.rotateX(fMODEL_MATRIX13, 0);
          // LIBS.rotateY(fMODEL_MATRIX13, THETA);
          // LIBS.rotateX(fMODEL_MATRIX13, ALPHA);
          //atur ring 2
          LIBS.rotateY(fMODEL_MATRIX14, 3.13);
          LIBS.rotateX(fMODEL_MATRIX14, 0);
          // LIBS.rotateY(fMODEL_MATRIX14, THETA);
          // LIBS.rotateX(fMODEL_MATRIX14, ALPHA);
          //atur ring 3
          LIBS.rotateY(fMODEL_MATRIX15, 3.13);
          LIBS.rotateX(fMODEL_MATRIX15, 0);
          // LIBS.rotateY(fMODEL_MATRIX15, THETA);
          // LIBS.rotateX(fMODEL_MATRIX15, ALPHA);

        //======================================OBJ GROUP=======================================
        var obj = [E_MODEL_MATRIX, E_MODEL_MATRIX2,E_MODEL_MATRIX3,E_MODEL_MATRIX4,E_MODEL_MATRIX5,E_MODEL_MATRIX6,E_MODEL_MATRIX_RING,E_MODEL_MATRIX_RING2] //erick
        
        var UFO = [mMODEL_MATRIX, mMODEL_MATRIX2, mMODEL_MATRIX3, mMODEL_MATRIX4, 
          mMODEL_MATRIX5, mMODEL_MATRIX6, mMODEL_MATRIX7, mMODEL_MATRIX8, mMODEL_MATRIX9, 
          mMODEL_MATRIX10, mMODEL_MATRIX11]; //misael
        
        var objGroup = [
          fMODEL_MATRIX, fMODEL_MATRIX2, fMODEL_MATRIX3, 
          fMODEL_MATRIX4, fMODEL_MATRIX5, fMODEL_MATRIX6, 
          fMODEL_MATRIX7, fMODEL_MATRIX8, fMODEL_MATRIX9, 
          fMODEL_MATRIX10, fMODEL_MATRIX11, fMODEL_MATRIX12, 
          fMODEL_MATRIX13, fMODEL_MATRIX14, fMODEL_MATRIX15];
          
          // rotateYGlobal(objGroup,1.4); //farrell
          rotateYGlobal(objGroup,fMR); //farrell
        
        //======================================MOVESET MISAEL==============================
          rotateYGlobal(UFO, j*10);
          LIBS.translateY(mMODEL_MATRIX, k*10) 
          LIBS.translateX(mMODEL_MATRIX, kt*10)
          LIBS.translateZ(mMODEL_MATRIX, kz*10)

          rotateXGlobal(UFO, r*0.2)
          rotateZGlobal(UFO, r*0.2)
        
          
          if(k > 0.7){
            z = -0.01;
            rx = -0.01;
          } else if (k < -0.5){
            z = 0.01
            rx = 0.01
          } if (kt > 1.8){
            zt = -0.01;
            rx = -0.02
          } else if (kt < -0.3){
            zt = 0.01;
            rx = 0.01
          }
          if (kz > 1.2){
            zz = -0.02;
            rx = -0.01
          } else if (kz < -0.5){
            zz = 0.02;
            rx = 0.01
          } if (rx>0.4){
            rx = -0.01;
          } else if(rx < -0.4){
            rx = 0.01;
          }

        //=======================================MOVESET ERICK================================

          rotateYGlobal(obj,LIBS.degToRad(90))
          // rotateYGlobal(obj,LIBS.degToRad(yrot))
          rotateZGlobal(obj,LIBS.degToRad(zrotE))
          if(iE > 1.0){
           
            xE = -0.01;
          }
          else if (iE < -1){
            xE = 0.01;
          }
          if(jE > 1){
            
            yE = -0.03;
          }

          else if (jE < -1){
            yE = 0.03;
          }
          if(kE > 1){
            
            zE = -0.02;
          }

          else if (kE < -1){
            zE = 0.02;
          }
          if(zrotE > 1){
            
            zcountE = -0.01;
            
          }
          else if (zrotE < -1){
            zcountE = 0.01;
            
          }
          if(zrotE > 1){
            
            zcountE = -0.01;
            
          }
          else if (zrotE < -1){
            zcountE = 0.01;
            
          }
          if(xrotE > 1){
            
            xcountE = -0.01;
            
          }
          else if (zrotE < -1){
            xcountE = 0.01;
            
          }
          if(yrotE > 1){
            
            ycountE = -0.01;
            
          }
          else if (yrotE < -1){
            ycountE = 0.01;
            
          }

          if(scaleE > 1.7){
            
            countScaleE = -0.026;
            
          }
          else if (scaleE < 1){
            countScaleE = 0.026;
          }
          if(scale2E >= 1.7){
            
            countScale2E = -0.026;
            
          }
          else if (scale2E < 1){
            countScale2E = 0.026;
            
          }
          // console.log(i)
          // console.log(j)
          // if(now > 5 && now < 7){
          //   x = -0.01;
          // }
          // else if (now  >7 && now < 10){
          //   x = 0.01;
          // }
          // else if (now  >10 && now < 13){
          //   xcount  = 0.01;
          // }
          // else if (now  >13 && now < 15){
          //   xcount = -0.01;
          // }
          // else if (now  >15 && now < 19){
          //   ycount  = 0.01;

           
          // }
          // else if (now  >19 && now < 22){
          //   ycount = -0.01;
          // }
          // else if (now  >22 && now < 25){
          //   z = 0.01
          // }
          // else if (now  >25 && now < 33){
          //   z = -0.01;
          // }
          // else{
          //   x = -0.01;
          //   xcount = 0;
          //   ycount = 0;
          //   z = 0;
          //   if (i < 0){
          //     x = 0;
          //     xcount = 0;
          //     ycount = 0;
          //     z = 0;
          //     zcount = 0;
          //     time = 0;
          //     time_prev = 0;
          //   }
           
          // }
          // if (now > 33){
          //   xcount = 0.01;
          //   z = 0.01
          //   if (xrot*2 > 45){
          //     xcount = -0.01
          //   }
          //   else if (xrot *2 < 0){
          //     xcount = 0
          //   }
          //   if (k > 1){
          //     z = -0.01
          //   }
          //   else{
          //     // console.log("HITK")
          //     z = 0.01
          //   }
           
          //   // rotateXGlobal(obj,xrot*2)
          //   // LIBS.translateZ(MODEL_MATRIX,k*5)
          // }
        //   console.log(xrotE *2)     
          // if (now > 20){
          //   // console.log("HIT!10")
          //     t_obs = -0.01;
          //     // console.log(t_obj)
          // }
         
          // if (t_obj< -30){
          //   t_obs = 0;
          // }
          // rotateYGlobal(obj,LIBS.degToRad(90*-j*2))
          // rotateXGlobal(obj,LIBS.degToRad(yrot*10))
          // rotateZGlobal(obj,i/2)
          // LIBS.translateX(MODEL_MATRIX,i* 10)
          LIBS.translateY(E_MODEL_MATRIX,jE*5)
          LIBS.translateX(E_MODEL_MATRIX,iE*5)
          // console.log("i : ", iE*10)s
          LIBS.translateZ(E_MODEL_MATRIX,kE*7)
          rotateZGlobal(obj,LIBS.degToRad(zrotE))
          rotateXGlobal(obj,xrotE)

          LIBS.scale(E_MODEL_MATRIX_RING,scaleE,scaleE,scaleE)
          LIBS.scale(E_MODEL_MATRIX_RING2,scale2E,scale2E,scale2E)
        
          // if (xrot < 0){
          //   xcount = 0.01
          // }
          // else if (xrot > 0){
          //   xcount = 0;
          // }
        //==================================END MOVESET ERICK=======================

        //===============================SETPOS RELATIVE ERICK====================
          var transformedBadanPesawat = LIBS.transformPoint(E_MODEL_MATRIX, [0, 0, 0]);
          LIBS.setPosition(E_MODEL_MATRIX,transformedBadanPesawat[0], transformedBadanPesawat[1], transformedBadanPesawat[2]);
          
          var transformedMancungPesawat = LIBS.transformPoint(E_MODEL_MATRIX, [0, 0, -3.5]);
          LIBS.setPosition(E_MODEL_MATRIX2,transformedMancungPesawat[0], transformedMancungPesawat[1], transformedMancungPesawat[2]);

          var transformedHidungPesawat = LIBS.transformPoint(E_MODEL_MATRIX, [0, 0, 2.5]);
          LIBS.setPosition(E_MODEL_MATRIX3,transformedHidungPesawat[0], transformedHidungPesawat[1], transformedHidungPesawat[2]);
          

          var transformedSayap = LIBS.transformPoint(E_MODEL_MATRIX, [-2, -0.25, -1]);
          LIBS.setPosition(E_MODEL_MATRIX4,transformedSayap[0], transformedSayap[1], transformedSayap[2]);

          var transformedSayap2 = LIBS.transformPoint(E_MODEL_MATRIX, [2, -0.25, -1]);
          LIBS.setPosition(E_MODEL_MATRIX5,transformedSayap2[0], transformedSayap2[1], transformedSayap2[2]);
          
          var transformedPucuk = LIBS.transformPoint(E_MODEL_MATRIX, [0, 0.8, -1.8]);
          LIBS.setPosition(E_MODEL_MATRIX6,transformedPucuk[0], transformedPucuk[1], transformedPucuk[2]);

          var transformedObs = LIBS.transformPoint(E_MODEL_MATRIX, [0, 0, 0]);
          LIBS.setPosition(E_MODEL_MATRIX_OBSTACLE,transformedObs[0], transformedObs[1], transformedObs[2]);

          var transformedRing = LIBS.transformPoint(E_MODEL_MATRIX, [0, 0, -4]);
          LIBS.setPosition(E_MODEL_MATRIX_RING,transformedRing[0], transformedRing[1], transformedRing[2]);

          var transformedRing2 = LIBS.transformPoint(E_MODEL_MATRIX, [0, 0, -4.6]);
          LIBS.setPosition(E_MODEL_MATRIX_RING2,transformedRing2[0], transformedRing2[1], transformedRing2[2]);
      
          // var transformedSpherePos = LIBS.transformPoint(MODEL_MATRIX, [1, -1, 0]);
          // LIBS.setPosition(MODEL_MATRIX5,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);
        //============================END SETPOS RELATIVE ERICK==========================

        //==============================SETPOS RELATIVE MISAEL===========================
        //TRANSFORM POSITION : FIXED TO CUBE
          var transformPosCube = LIBS.transformPoint(mMODEL_MATRIX,[0,0,0]);
          LIBS.setPosition(mMODEL_MATRIX, transformPosCube[0], transformPosCube[1], transformPosCube[2]);
          
          var transformPosDonut = LIBS.transformPoint(mMODEL_MATRIX,[0,0,1]);
          LIBS.setPosition(mMODEL_MATRIX2, transformPosDonut[0], transformPosDonut[1], transformPosDonut[2]);
          
          var transformPosDonut_2= LIBS.transformPoint(mMODEL_MATRIX,[0,0,1.8]);
          LIBS.setPosition(mMODEL_MATRIX3, transformPosDonut_2[0], transformPosDonut_2[1], transformPosDonut_2[2]);

          var transformPosDonut_3= LIBS.transformPoint(mMODEL_MATRIX,[0,0,2.3]);
          LIBS.setPosition(mMODEL_MATRIX4, transformPosDonut_3[0], transformPosDonut_3[1], transformPosDonut_3[2]);

          var transformPosGlass= LIBS.transformPoint(mMODEL_MATRIX,[0,0,0.4]);
          LIBS.setPosition(mMODEL_MATRIX5, transformPosGlass[0], transformPosGlass[1], transformPosGlass[2]);

          var transformPosDonut_4= LIBS.transformPoint(mMODEL_MATRIX,[0,0,4]);
          LIBS.setPosition(mMODEL_MATRIX6, transformPosDonut_4[0], transformPosDonut_4[1], transformPosDonut_4[2]);
          
          var transformPosDonut_5= LIBS.transformPoint(mMODEL_MATRIX,[0,0,5]);
          LIBS.setPosition(mMODEL_MATRIX7, transformPosDonut_5[0], transformPosDonut_5[1], transformPosDonut_5[2]);
          
          var transformPosCone= LIBS.transformPoint(mMODEL_MATRIX,[0,2,-2.2]);
          LIBS.setPosition(mMODEL_MATRIX8, transformPosCone[0], transformPosCone[1], transformPosCone[2]);
          
          var transformPosSphere= LIBS.transformPoint(mMODEL_MATRIX,[0,2.55,-3.4]);
          LIBS.setPosition(mMODEL_MATRIX9, transformPosSphere[0], transformPosSphere[1], transformPosSphere[2]);
          
          var transformPosConeLeft= LIBS.transformPoint(mMODEL_MATRIX,[0,-2,-2,24]);
          LIBS.setPosition(mMODEL_MATRIX10, transformPosConeLeft[0], transformPosConeLeft[1], transformPosConeLeft[2]);
          
          var transformPosSphereRight= LIBS.transformPoint(mMODEL_MATRIX,[0,-2.7,-3.39]);
          LIBS.setPosition(mMODEL_MATRIX11, transformPosSphereRight[0], transformPosSphereRight[1], transformPosSphereRight[2]);
        //=================================END SETPOS MISAEL=================================================

        //================================================SETPOS FARRELL===============================================
          //paha kiri terhadap badan
          var transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX, [1, -1, -1]);
          LIBS.setPosition(fMODEL_MATRIX2,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);
          
          //duri terhadap badan
          var transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX, [0, 1.2, 0.9]);
          LIBS.setPosition(fMODEL_MATRIX6,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);
          
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX, [0, 1.2, 0]);
          LIBS.setPosition(fMODEL_MATRIX7,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);
          
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX, [0, 1.2, -0.9]);
          LIBS.setPosition(fMODEL_MATRIX8,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);
          
          //paha kanan terhadap badan
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX, [-1, -1, -1]);
          LIBS.setPosition(fMODEL_MATRIX3,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);

          //betis kanan terhadap paha kanan
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX3, [-1, -0.7, 0]);
          LIBS.setPosition(fMODEL_MATRIX4,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);

          //betis kiri terhadap paha kiri
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX2, [1, -0.7, 0]);
          LIBS.setPosition(fMODEL_MATRIX5,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);

          //mata kanan terhadap badan
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX, [-0.8, 0.4, 0.9]);
          LIBS.setPosition(fMODEL_MATRIX9,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);

          //mata kiri terhadap badan
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX, [0.8, 0.4, 0.9]);
          LIBS.setPosition(fMODEL_MATRIX10,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);

          //kaki kanan terhadap betis kanan
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX4, [0.5, 0.3, 1.4]);
          LIBS.setPosition(fMODEL_MATRIX11,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);
          //kaki kiri terhadap betis kiri
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX5, [0.5, 0.3, 1.4]);
          LIBS.setPosition(fMODEL_MATRIX12,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);

          //ring 1 terhadap badan
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX, [-0.1, 0.3, -2.5]);
          LIBS.setPosition(fMODEL_MATRIX13,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);
          //ring 2 terhadap badan
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX, [-0.1, 0.3, -2]);
          LIBS.setPosition(fMODEL_MATRIX14,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);
          //ring 3 terhadap badan
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX, [-0.1, 0.3, -3]);
          LIBS.setPosition(fMODEL_MATRIX15,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);

        //    LIBS.setPosition(fMODEL_MATRIX2,pos_x,pos_y,pos_z);
          // var temp = LIBS.get_I4();
          // LIBS.rotateY(temp,ALPHA);
          // LIBS.rotateX(temp,THETA);
          
          // fMODEL_MATRIX2= LIBS.multiply(fMODEL_MATRIX2,temp)
        //===============================================END SETPOS FARRELL=============================================

        //==========================================MOVESET TRANSLATE ERICK============================================
          if(now > 10){
            t_obsE = -0.01
        transformedObs = LIBS.transformPoint(E_MODEL_MATRIX_OBSTACLE,[0,0,0]);
        // LIBS.setPosition(E_MODEL_MATRIX_OBSTACLE,transformedObs[0], transformedObs[1], transformedObs[2]);
            
          }
          if (now > 15){
            t_obsE = 0;
          }
          LIBS.translateY(E_MODEL_MATRIX_OBSTACLE,t_objE*100 )
     
          LIBS.rotateY(E_MODEL_MATRIX_OBSTACLE,yrotE*6)
          
          //   LIBS.setPosition(MODEL_MATRIX2,-pos_x,-pos_y,-pos_z);
          // var temp = LIBS.get_I4();
          // LIBS.rotateY(temp,ALPHA);
          // LIBS.rotateX(temp,THETA);
          
          // MODEL_MATRIX2= LIBS.multiply(MODEL_MATRIX2,temp)
         
        //==========================================END MOVESET TRANSLATE ERICK============================================
        
        //==========================================MOVESET TRANSLATE MISAEL============================================
          //TRANSLATE SMOKE TRAIL
          LIBS.translateY(mMODEL_MATRIX6, i*5);
          LIBS.translateY(mMODEL_MATRIX7, i*3);
          LIBS.scale(mMODEL_MATRIX6, scaleE, scaleE, scaleE);
          LIBS.scale(mMODEL_MATRIX7, scale2E, scale2E, scale2E);
          if (i > 0.08){
              x = -0.01;
          } 
          else if (i < -0.12){
              x = 0.01;
          }

          //TRANSLATE ALL
        

        //==========================================END MOVESET TRANSLATE MISAEL============================================
        //==========================================MOVESET FARRELL ========================================================

        LIBS.scale(fMODEL_MATRIX13,scaleE,scaleE,scaleE);
        LIBS.scale(fMODEL_MATRIX14,scale2E,scale2E,scale2E);
        LIBS.scale(fMODEL_MATRIX15,scaleE,scaleE,scaleE);
          
        //==========================================RENDER ERICK================================================
          Eobject.MODEL_MATRIX=E_MODEL_MATRIX;
          Eobject.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);


          EobjTailPesawat.MODEL_MATRIX = E_MODEL_MATRIX2;
          EobjTailPesawat.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          EobjMancungPesawat.MODEL_MATRIX = E_MODEL_MATRIX3;
          EobjMancungPesawat.render(VIEW_MATRIX, PROJECTION_MATRIX, 6);


          EobjSayap.MODEL_MATRIX = E_MODEL_MATRIX4;
          EobjSayap.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          EobjSayap2.MODEL_MATRIX = E_MODEL_MATRIX5;
          EobjSayap2.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          EobjPucuk.MODEL_MATRIX = E_MODEL_MATRIX6;
          EobjPucuk.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          // objTrapesium.MODEL_MATRIX = MODEL_MATRIX7;
          // objTrapesium.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          EobjObs.MODEL_MATRIX = E_MODEL_MATRIX_OBSTACLE;
          EobjObs.render(VIEW_MATRIX,PROJECTION_MATRIX, 1)

          EobjRing.MODEL_MATRIX = E_MODEL_MATRIX_RING;
          EobjRing.render(VIEW_MATRIX,PROJECTION_MATRIX,1)

          EobjRing2.MODEL_MATRIX = E_MODEL_MATRIX_RING2;
          EobjRing2.render(VIEW_MATRIX,PROJECTION_MATRIX,1)
          
          
          // objLantai.MODEL_MATRIX = MODEL_MATRIX_LANTAI;
          // objLantai.render(VIEW_MATRIX,PROJECTION_MATRIX,2)
          
          // obj4.MODEL_MATRIX = MODEL_MATRIX4;
          // obj4.render(VIEW_MATRIX, PROJECTION_MATRIX, 5);

          // obj5.MODEL_MATRIX = MODEL_MATRIX5;
          // obj5.render(VIEW_MATRIX, PROJECTION_MATRIX, 5);
        //===================================================END RENDER ERICK============================================

        //=============================================RENDER MISAEL=====================================================
        //cube 
        mobject.MODEL_MATRIX=mMODEL_MATRIX;
        mobject.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);
        //donut body1
        objectm2.MODEL_MATRIX = mMODEL_MATRIX2;
        objectm2.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);
        //donut body2
        objectm3.MODEL_MATRIX = mMODEL_MATRIX3;
        objectm3.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);
        //donut body3
        objectm4.MODEL_MATRIX = mMODEL_MATRIX4;
        objectm4.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);
        //glass
        objectm5.MODEL_MATRIX = mMODEL_MATRIX5;
        objectm5.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);
        //smoke trail
        objectm6.MODEL_MATRIX = mMODEL_MATRIX6;
        objectm6.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);
        //smoke trail
        objectm7.MODEL_MATRIX = mMODEL_MATRIX7;
        objectm7.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);
        //cone right
        objectm8.MODEL_MATRIX = mMODEL_MATRIX8;
        objectm8.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);
        //sphere right
        objectm9.MODEL_MATRIX = mMODEL_MATRIX9;
        objectm9.render(VIEW_MATRIX, PROJECTION_MATRIX, 3);
        //cone left
        objectm10.MODEL_MATRIX = mMODEL_MATRIX10;
        objectm10.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);
        //sphere left
        objectm11.MODEL_MATRIX = mMODEL_MATRIX11;
        objectm11.render(VIEW_MATRIX, PROJECTION_MATRIX, 3);
        
          // GL.drawArrays(GL.LINE_STRIP, 0, mouth.vertices.length / 6);
        //===============================================END RENDER MISAEL===============================================

        //===============================================RENDER FARRELL====================================================
          fobject.MODEL_MATRIX= fMODEL_MATRIX;
          fobject.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);


          fobject2.MODEL_MATRIX = fMODEL_MATRIX2;
          fobject2.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          fobject3.MODEL_MATRIX=fMODEL_MATRIX3;
          fobject3.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          fobject4.MODEL_MATRIX=fMODEL_MATRIX4;
          fobject4.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          fobject5.MODEL_MATRIX=fMODEL_MATRIX5;
          fobject5.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          //duri
          fobject6.MODEL_MATRIX=fMODEL_MATRIX6;
          fobject6.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          fobject7.MODEL_MATRIX=fMODEL_MATRIX7;
          fobject7.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          fobject8.MODEL_MATRIX=fMODEL_MATRIX8;
          fobject8.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          // mata
          fobject9.MODEL_MATRIX=fMODEL_MATRIX9;
          fobject9.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          fobject10.MODEL_MATRIX=fMODEL_MATRIX10;
          fobject10.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          //kaki
          fobject11.MODEL_MATRIX=fMODEL_MATRIX11;
          fobject11.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          fobject12.MODEL_MATRIX=fMODEL_MATRIX12;
          fobject12.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          fobject13.MODEL_MATRIX=fMODEL_MATRIX13;
          fobject13.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          fobject14.MODEL_MATRIX=fMODEL_MATRIX14;
          fobject14.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          fobject15.MODEL_MATRIX=fMODEL_MATRIX15;
          fobject15.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);
        //=================================================END RENDER FARRELL==============================================
        //=================================================START RENDER MOON==============================================
        MOON_MODEL_MATRIX = LIBS.get_I4();
        MOON_MODEL_MATRIX2 = LIBS.get_I4();
        MOON_MODEL_MATRIX3 = LIBS.get_I4();
        MOON_MODEL_MATRIX4 = LIBS.get_I4();
        MOON_MODEL_MATRIX5 = LIBS.get_I4();
        MOON_MODEL_MATRIX6 = LIBS.get_I4();
        MOON_MODEL_MATRIX7 = LIBS.get_I4();
        
          LIBS.scale(MOON_MODEL_MATRIX,10,10,10)
          LIBS.translateY(MOON_MODEL_MATRIX,-14)
          LIBS.translateX(MOON_MODEL_MATRIX,25)

        
        var fullMoon = [MOON_MODEL_MATRIX,MOON_MODEL_MATRIX2,MOON_MODEL_MATRIX3,MOON_MODEL_MATRIX4,MOON_MODEL_MATRIX5,MOON_MODEL_MATRIX6,MOON_MODEL_MATRIX7]
        
        // rotateYGlobal(fullMoon,xrotE*2)
        // rotateXGlobal(fullMoon,-xrotE*2)
        


        var transformMoon = LIBS.transformPoint(MOON_MODEL_MATRIX,[0,0,0]);
        LIBS.setPosition(MOON_MODEL_MATRIX, transformMoon[0], transformMoon[1], transformMoon[2]);

        var transformMoon2 = LIBS.transformPoint(MOON_MODEL_MATRIX,[0,-1,0]);
        LIBS.setPosition(MOON_MODEL_MATRIX2, transformMoon2[0], transformMoon2[1], transformMoon2[2]);

        var transformMoon3 = LIBS.transformPoint(MOON_MODEL_MATRIX,[1,-0,0]);
        LIBS.setPosition(MOON_MODEL_MATRIX3, transformMoon3[0], transformMoon3[1], transformMoon3[2]);

        var transformMoon4 = LIBS.transformPoint(MOON_MODEL_MATRIX,[-0,0,1]);
        LIBS.setPosition(MOON_MODEL_MATRIX4, transformMoon4[0], transformMoon4[1], transformMoon4[2]);

        var transformMoon5 = LIBS.transformPoint(MOON_MODEL_MATRIX,[-1,-0,-0]);
        LIBS.setPosition(MOON_MODEL_MATRIX5, transformMoon5[0], transformMoon5[1], transformMoon5[2]);

        var transformMoon6 = LIBS.transformPoint(MOON_MODEL_MATRIX,[-0,0,-1]);
        LIBS.setPosition(MOON_MODEL_MATRIX6, transformMoon6[0], transformMoon6[1], transformMoon6[2]);

        var transformMoon7 = LIBS.transformPoint(MOON_MODEL_MATRIX,[0,1,0]);
        LIBS.setPosition(MOON_MODEL_MATRIX7, transformMoon7[0], transformMoon7[1], transformMoon7[2]);

        objMoon.MODEL_MATRIX=MOON_MODEL_MATRIX;
        objMoon.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

        objMoon2.MODEL_MATRIX=MOON_MODEL_MATRIX2;
        objMoon2.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

        objMoon3.MODEL_MATRIX=MOON_MODEL_MATRIX3;
        objMoon3.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

        objMoon4.MODEL_MATRIX=MOON_MODEL_MATRIX4;
        objMoon4.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

        objMoon5.MODEL_MATRIX=MOON_MODEL_MATRIX5;
        objMoon5.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

        objMoon6.MODEL_MATRIX=MOON_MODEL_MATRIX6;
        objMoon6.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

        objMoon7.MODEL_MATRIX=MOON_MODEL_MATRIX7;
        objMoon7.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);
        
        //=================================================END RENDER MOON==============================================

          window.requestAnimationFrame(animate);
      };
      animate(0);
      
  }
  window.addEventListener('load',main);