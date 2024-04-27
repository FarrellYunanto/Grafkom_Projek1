var GL;

function generateHalfSphere(xrad, yrad, zrad, stack, step){
  var vertices = [];
  var faces = [];

  for(var i = 0;i<=stack;i++){
    for(var j = 0;j<=step/2;j++){
      var v = i*1.0/stack * Math.PI - Math.PI/2;
      var u = j*1.0/step * 2*Math.PI - Math.PI;

      var x = xrad * Math.cos(v)*Math.cos(u);
      var y = yrad * Math.sin(v);
      var z = zrad * Math.cos(v)*Math.sin(u);

      v = i*1.0/stack;
      u = j*1.0/step;

      vertices.push(x,y,z,1,1,1,v,u);
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


    constructor(vertex, faces, source_shader_vertex, source_shader_fragment){
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
    // this._sampler = GL.getUniformLocation(this.SHADER_PROGRAM, "sampler"); //buat kalo mau pake texture


    GL.enableVertexAttribArray(this._color);
    GL.enableVertexAttribArray(this._position);

    GL.enableVertexAttribArray(this._uv);

    GL.useProgram(this.SHADER_PROGRAM);




    this.TRIANGLE_VERTEX = GL.createBuffer();
    this.TRIANGLE_FACES = GL.createBuffer();
    // this.texture = LIBS.load_texture("resource/semen.jpg"); //buat kalo mau pake texture
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
 
          if(TYPE == 1){
            GL.drawElements(GL.TRIANGLES, this.faces.length, GL.UNSIGNED_SHORT, 0);
          } else if (TYPE == 2) {
            GL.drawElements(GL.TRIANGLE_FAN, this.faces.length, GL.UNSIGNED_SHORT, 0);
          }
         
          this.childs.forEach(child => {
            child.render(VIEW_MATRIX,PROJECTION_MATRIX)
          });

          GL.flush();
    }
  }
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

      var FRICTION= 0.95;

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
    //uniform sampler2D sampler; //buat kalo mau pake texture


    void main(void) {
    float greyScaleValue = (vColor.r + vColor.g + vColor.b)/3.;
    vec3 greyScaleColor = vec3(greyScaleValue, greyScaleValue, greyScaleValue);
    vec3 color = mix(greyScaleColor, vColor, greyScality);
    gl_FragColor = vec4(color, 1.);
    //gl_FragColor = texture2D(sampler,vUV); //buat kalo mau pake texture
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

      //matrix
      var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1,100);
      var VIEW_MATRIX = LIBS.get_I4();
      var MODEL_MATRIX = LIBS.get_I4();
      var MODEL_MATRIX2 = LIBS.get_I4();
      var MODEL_MATRIX3 = LIBS.get_I4();
      var MODEL_MATRIX4 = LIBS.get_I4();
      var MODEL_MATRIX5 = LIBS.get_I4();
      var MODEL_MATRIX6 = LIBS.get_I4();
      var MODEL_MATRIX7 = LIBS.get_I4();
      var MODEL_MATRIX_OBSTACLE = LIBS.get_I4();
      var MODEL_MATRIX_LANTAI = LIBS.get_I4();


      LIBS.translateZ(VIEW_MATRIX,-25);

      //badan pesawat
      var badanPesawat = generateCylinder(0.75,5,100,1,0,1)
      var object = new MyObject(badanPesawat['vertices'], badanPesawat['faces'], shader_vertex_source, shader_fragment_source);
      
      // mancung pesawat
      var mancungPesawat = generateSphere(0.75,0.7,1,100,100,1,1,0)
      var objMancungPesawat = new MyObject(mancungPesawat['vertices'],mancungPesawat['faces'],shader_vertex_source,shader_fragment_source)
      
      // bokong pesawat
      var tailMancungPesawat = generateCone(0.75,2,100,100,0,1,1)
      var objTailPesawat = new MyObject(tailMancungPesawat['vertices'], tailMancungPesawat['faces'], shader_vertex_source, shader_fragment_source);
      
      var sayap = generateWing(-2,0.2,3,1,1,0);
      var objSayap = new MyObject(sayap['vertices'],sayap['faces'], shader_vertex_source, shader_fragment_source);
      
      var sayap2 = generateWing(-2,0.2,3,1,1,0);
      var objSayap2 = new MyObject(sayap2['vertices'],sayap2['faces'], shader_vertex_source, shader_fragment_source);
      

      var pucuk = generateCone(0.5,2,4,100,1,1,0);
      var objPucuk = new MyObject(pucuk['vertices'],pucuk['faces'], shader_vertex_source, shader_fragment_source);
      
      var obs = generateSphere(0.5,0.5,0.5,100,100,1,1,0);
      var objObs = new MyObject(obs['vertices'],obs['faces'],shader_vertex_source, shader_fragment_source)

      var lantai = generateRectangle3DGeometry(2,200,200,0,1,0);
      var objLantai = new MyObject(lantai['vertices'],lantai['faces'],shader_vertex_source, shader_fragment_source)


      var testTrapesium = generate3DTrapesium(5,2,1,1,0,1,0)
      var objTrapesium = new MyObject(testTrapesium['vertices'],testTrapesium['faces'], shader_vertex_source, shader_fragment_source)
      var donut = generateTorus(1,0.3,72,24)
      var tabung = generateCylinder(0.5,1,50) // kalo base radius 0 jadi cone
      var tri = generateCone(1,1,3,40) // kalo sector count 3 jaditetra hedron, kalao 4 jadi square pyramid
      var cone = generateCone(1,1,3,40) // kalo sector count 3 jaditetra hedron, kalao 4 jadi square pyramid
      var sphere = generateSphere(0.5,0.5,0.5,50,50);
      
      var obj4 = new MyObject(tabung['vertices'],tabung['faces'],shader_vertex_source,shader_fragment_source)
      var obj5 = new MyObject(cone['vertices'],cone['faces'],shader_vertex_source,shader_fragment_source)
      object.childs.push(objTailPesawat)
      object.childs.push(objMancungPesawat)
      object.childs.push(objSayap)
      object.childs.push(objSayap2)
      object.childs.push(objPucuk)
      object.childs.push(objTrapesium)
      object.childs.push(objObs)
      objLantai.setup()
      // objObs.setup();
      object.setup();

      /*========================= DRAWING ========================= */
      GL.clearColor(0.0, 0.0, 0.0, 0.0);
      GL.enable(GL.DEPTH_TEST);
      GL.depthFunc(GL.LEQUAL);

      var time_prev = 0;
      var i = 0;
      var j = 0;
      var k = 0;
      var x = 0;
      var temp = 0;
      var y = 0.01;
      var z = 0.01;
      var t_obj = 0;

      var t_obs = 0;
      var xrot = 0;
      var zrot = 0;
      var xcount = 0.01;
      var zcount = 0.01;
      var ycount = 0.01;
      var temp_count = 0.01;



      var animate = function(time) {
        temp += temp_count;
        i += x;
        j += y;
        k += z;

        t_obj += t_obs;
        zrot +=zcount;
        xrot += xcount;
        var dt =  time - time_prev;
        time_prev=time;
          GL.viewport(0, 0, CANVAS.width, CANVAS.height);
          GL.clear(GL.COLOR_BUFFER_BIT | GL.D_BUFFER_BIT);
          
          now = time/1000;
          if(!drag){
            dX*=FRICTION;
            dY*=FRICTION;


            THETA += dX *2*Math.PI/CANVAS.width;
            ALPHA += dY * 2*Math.PI/CANVAS.height;
          }
          console.log(temp)
          //ngukur pergerakan
          var radius = 2;
          var pos_x = radius * now/1000;
          var pos_y = -radius * now/1000;
          var pos_z = 0;
          //badan pesawat
          MODEL_MATRIX = LIBS.get_I4();
           //ngambil matrix normalnya biar bisa di transform

          MODEL_MATRIX2 = LIBS.get_I4();
          MODEL_MATRIX3 = LIBS.get_I4();
          MODEL_MATRIX4 = LIBS.get_I4();
          MODEL_MATRIX5 = LIBS.get_I4();
          MODEL_MATRIX6 = LIBS.get_I4();
          MODEL_MATRIX7 = LIBS.get_I4();
          MODEL_MATRIX_OBSTACLE = LIBS.get_I4();
          MODEL_MATRIX_LANTAI = LIBS.get_I4();
          // LIBS.setPosition(MODEL_MATRIX,pos_x,pos_y,pos_z); // geser geser
          // LIBS.rotateX(MODEL_MATRIX,10)
          
          LIBS.rotateY(MODEL_MATRIX, THETA); //puter objek kanan kiri
          LIBS.rotateX(MODEL_MATRIX, ALPHA); // puter objek atas bawah
          

          LIBS.rotateY(MODEL_MATRIX2,-9.425)
          LIBS.rotateY(MODEL_MATRIX2, THETA);
          LIBS.rotateX(MODEL_MATRIX2, ALPHA);
          
 
          LIBS.rotateY(MODEL_MATRIX3, THETA);
          LIBS.rotateX(MODEL_MATRIX3, ALPHA);
 
          LIBS.rotateY(MODEL_MATRIX4,-21)
          LIBS.rotateY(MODEL_MATRIX4, THETA);
          LIBS.rotateX(MODEL_MATRIX4, ALPHA);

          LIBS.rotateY(MODEL_MATRIX5,21)
          LIBS.rotateY(MODEL_MATRIX5, THETA);
          LIBS.rotateX(MODEL_MATRIX5, ALPHA);

          LIBS.rotateX(MODEL_MATRIX6,LIBS.degToRad(215))
          LIBS.rotateY(MODEL_MATRIX6, THETA);
          LIBS.rotateX(MODEL_MATRIX6, ALPHA);
          
          
          LIBS.rotateX(MODEL_MATRIX7,90)
          LIBS.translateX(MODEL_MATRIX7,-5)
          LIBS.rotateY(MODEL_MATRIX7, THETA);
          LIBS.rotateX(MODEL_MATRIX7, ALPHA);

          LIBS.translateX(MODEL_MATRIX_OBSTACLE,30)
          LIBS.rotateY(MODEL_MATRIX_OBSTACLE, THETA);
          LIBS.rotateX(MODEL_MATRIX_OBSTACLE, ALPHA);

          LIBS.translateY(MODEL_MATRIX_LANTAI,-10)
          LIBS.rotateX(MODEL_MATRIX_LANTAI,LIBS.degToRad(90))
          LIBS.rotateZ(MODEL_MATRIX_LANTAI,LIBS.degToRad(90))
          LIBS.rotateY(MODEL_MATRIX_LANTAI, THETA);
          LIBS.rotateX(MODEL_MATRIX_LANTAI, ALPHA);


          var obj = [MODEL_MATRIX, MODEL_MATRIX2,MODEL_MATRIX3,MODEL_MATRIX4,MODEL_MATRIX5,MODEL_MATRIX6]



          rotateYGlobal(obj,LIBS.degToRad(90))
          // rotateYGlobal(obj,LIBS.degToRad(yrot))
          rotateZGlobal(obj,LIBS.degToRad(zrot))
          if(i > 2.0){
            console.log("HIt")
            x = -0.01;
          }
          else if (i < -2){
            x = 0.01;
          }
          if(j > 1){
            console.log("HIt")
            y = -0.01;
          }

          else if (j < -1){
            y = 0.01;
          }
          if(zrot > 1){
            console.log("HIt")
            zcount = -0.01;
            
          }
          else if (zrot < -1){
            zcount = 0.01;
            
          }
          // console.log(i)
          // console.log(j)
          if(now > 5 && now < 7){
            x = -0.01;
          }
          else if (now  >7 && now < 10){
            x = 0.01;
          }
          else if (now  >10 && now < 13){
            xcount  = 0.01;
          }
          else if (now  >13 && now < 15){
            xcount = -0.01;
          }
          else if (now  >15 && now < 19){
            ycount  = 0.01;

            xcount = 0;
          }
          else if (now  >19 && now < 22){
            ycount = -0.01;
          }
          else if (now  >22 && now < 25){
            z = 0.01
          }
          else if (now  >25 && now < 33){
            z = -0.01;
          }
          else{
            x = -0.01;
            xcount = 0;
            ycount = 0;
            z = 0;
            if (i < 0){
              x = 0;
              xcount = 0;
              ycount = 0;
              z = 0;
              zcount = 0;
              time = 0;
              time_prev = 0;
            }
          }

        
          if (now > 20){
            console.log("HIT!10")
              t_obs = -0.01;
              console.log(t_obj)
          }
         
          if (t_obj< -30){
            t_obs = 0;
          }
          // rotateYGlobal(obj,LIBS.degToRad(90*-j*2))
          // rotateXGlobal(obj,LIBS.degToRad(yrot*10))
          // rotateZGlobal(obj,i/2)
          // LIBS.translateX(MODEL_MATRIX,i* 10)
          LIBS.translateY(MODEL_MATRIX,j*10)
          LIBS.translateX(MODEL_MATRIX,i*10)
          LIBS.translateZ(MODEL_MATRIX,k*5)
          rotateZGlobal(obj,LIBS.degToRad(zrot))
          rotateXGlobal(obj,xrot*10)
          // if(now > 30 ){
          //   object = null;
          // }
          // LIBS.rotateX(MODEL_MATRIX,i)
          // LIBS.rotateX(MODEL_MATRIX2,i)
          // LIBS.rotateX(MODEL_MATRIX3,i)
          // LIBS.rotateX(MODEL_MATRIX4,i)
          // LIBS.rotateX(MODEL_MATRIX5,i)
          // LIBS.rotateX(MODEL_MATRIX6,i)

          // LIBS.rotateY(MODEL_MATRIX,i)
          // LIBS.rotateY(MODEL_MATRIX2,i)
          // LIBS.rotateY(MODEL_MATRIX3,i)
          // LIBS.rotateY(MODEL_MATRIX4,i)
          // LIBS.rotateY(MODEL_MATRIX5,i)
          // LIBS.rotateY(MODEL_MATRIX6,i)
          // LIBS.translateX(MODEL_MATRIX,time/-1000)
          // LIBS.rotateY(MODEL_MATRIX,LIBS.degToRad(180*dt/100))
          // LIBS.translateX(MODEL_MATRIX4,-6);
          // LIBS.rotateY(MODEL_MATRIX4, -THETA);
          // LIBS.rotateX(MODEL_MATRIX4, -ALPHA);

          // LIBS.translateY(MODEL_MATRIX5,-3);
          // LIBS.rotateY(MODEL_MATRIX5, -THETA);
          // LIBS.rotateX(MODEL_MATRIX5, -ALPHA);
          LIBS.translateY(MODEL_MATRIX_OBSTACLE,t_obj*10)
          var transformedBadanPesawat = LIBS.transformPoint(MODEL_MATRIX, [0, 0, 0]);
          LIBS.setPosition(MODEL_MATRIX,transformedBadanPesawat[0], transformedBadanPesawat[1], transformedBadanPesawat[2]);
          
          var transformedMancungPesawat = LIBS.transformPoint(MODEL_MATRIX, [0, 0, -3.5]);
          LIBS.setPosition(MODEL_MATRIX2,transformedMancungPesawat[0], transformedMancungPesawat[1], transformedMancungPesawat[2]);

          var transformedHidungPesawat = LIBS.transformPoint(MODEL_MATRIX, [0, 0, 2.5]);
          LIBS.setPosition(MODEL_MATRIX3,transformedHidungPesawat[0], transformedHidungPesawat[1], transformedHidungPesawat[2]);
          

          var transformedSayap = LIBS.transformPoint(MODEL_MATRIX, [-2, -0.25, -1]);
          LIBS.setPosition(MODEL_MATRIX4,transformedSayap[0], transformedSayap[1], transformedSayap[2]);

          var transformedSayap2 = LIBS.transformPoint(MODEL_MATRIX, [2, -0.25, -1]);
          LIBS.setPosition(MODEL_MATRIX5,transformedSayap2[0], transformedSayap2[1], transformedSayap2[2]);
          
          var transformedPucuk = LIBS.transformPoint(MODEL_MATRIX, [0, 0.8, -1.8]);
          LIBS.setPosition(MODEL_MATRIX6,transformedPucuk[0], transformedPucuk[1], transformedPucuk[2]);

          var transformedObs = LIBS.transformPoint(MODEL_MATRIX, [0, 0, 0]);
          LIBS.setPosition(MODEL_MATRIX_OBSTACLE,transformedObs[0], transformedObs[1], transformedObs[2]);
          // var transformedSpherePos = LIBS.transformPoint(MODEL_MATRIX, [1, -1, 0]);
          // LIBS.setPosition(MODEL_MATRIX5,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);
          
          
          LIBS.translateX(MODEL_MATRIX_OBSTACLE,t_obj*10)

        //   LIBS.setPosition(MODEL_MATRIX2,-pos_x,-pos_y,-pos_z);
          // var temp = LIBS.get_I4();
          // LIBS.rotateY(temp,ALPHA);
          // LIBS.rotateX(temp,THETA);
         
          // MODEL_MATRIX2= LIBS.multiply(MODEL_MATRIX2,temp)

          object.MODEL_MATRIX=MODEL_MATRIX;
          object.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);


          objTailPesawat.MODEL_MATRIX = MODEL_MATRIX2;
          objTailPesawat.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          objMancungPesawat.MODEL_MATRIX = MODEL_MATRIX3;
          objMancungPesawat.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);


          objSayap.MODEL_MATRIX = MODEL_MATRIX4;
          objSayap.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          objSayap2.MODEL_MATRIX = MODEL_MATRIX5;
          objSayap2.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          objPucuk.MODEL_MATRIX = MODEL_MATRIX6;
          objPucuk.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          // objTrapesium.MODEL_MATRIX = MODEL_MATRIX7;
          // objTrapesium.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

          objObs.MODEL_MATRIX = MODEL_MATRIX_OBSTACLE;
          objObs.render(VIEW_MATRIX,PROJECTION_MATRIX,2)
          
          // objLantai.MODEL_MATRIX = MODEL_MATRIX_LANTAI;
          // objLantai.render(VIEW_MATRIX,PROJECTION_MATRIX,2)
          
          // obj4.MODEL_MATRIX = MODEL_MATRIX4;
          // obj4.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

          // obj5.MODEL_MATRIX = MODEL_MATRIX5;
          // obj5.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);


          window.requestAnimationFrame(animate);
      };
      animate(0);
      
  }
  window.addEventListener('load',main);