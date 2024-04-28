var GL;

class combinedObject{

 //Coordinates
 cube = [
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
   cube_faces = [
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

      //shaders
      shader_vertex_source=`
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
  
      shader_fragment_source =`
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
  
      shader_fragment_source_nt =`
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


  //Body
  fobject = new MyObject(this.cube, this.cube_faces, this.shader_vertex_source, this.shader_fragment_source, "resource/dwood.jpg");
      
  //paha kiri
  fsphere = generateHalfSphere(0.7,0.9,0.7,50,50);
  fobject2 = new MyObject(this.fsphere['vertices'], this.fsphere['faces'], this.shader_vertex_source, this.shader_fragment_source, "resource/dwood.jpg");

  //paha kanan
  fobject3 = new MyObject(this.fsphere['vertices'], this.fsphere['faces'], this.shader_vertex_source, this.shader_fragment_source, "resource/dwood.jpg");

  //betis kanan
  fcylinder = generateCylinder(0.5,2,50);
  fobject4 = new MyObject(this.fcylinder['vertices'], this.fcylinder['faces'], this.shader_vertex_source, this.shader_fragment_source, "resource/lwood.jpg");

  //betis kiri
  fobject5 = new MyObject(this.fcylinder['vertices'], this.fcylinder['faces'], this.shader_vertex_source, this.shader_fragment_source, "resource/lwood.jpg");

  //duri 1
  fcone = generateCone(0.6, 0.6,25,25);
  fobject6 = new MyObject(this.fcone['vertices'], this.fcone['faces'], this.shader_vertex_source, this.shader_fragment_source, "resource/lwood.jpg");
  //duri 2
  fcone = generateCone(0.6, 0.6,25,25);
  fobject7 = new MyObject(this.fcone['vertices'], this.fcone['faces'], this.shader_vertex_source, this.shader_fragment_source, "resource/lwood.jpg");
  //duri 3
  fcone = generateCone(0.6, 0.6,25,25);
  fobject8  = new MyObject(this.fcone['vertices'], this.fcone['faces'], this.shader_vertex_source, this.shader_fragment_source, "resource/lwood.jpg");

  //mata kanan
  fsphere = generateSphere(0.3,0.3,0.3,50,50);
  fobject9  = new MyObject(this.fsphere['vertices'], this.fsphere['faces'], this.shader_vertex_source, this.shader_fragment_source_nt, "resource/lwood.jpg");

  //mata kiri
  fsphere = generateSphere(0.3,0.3,0.3,50,50);
  fobject10 = new MyObject(this.fsphere['vertices'], this.fsphere['faces'], this.shader_vertex_source, this.shader_fragment_source_nt, "resource/lwood.jpg");

  //kaki kanan
  ftrapesium = generate3DTrapesium(1,2,1,1);
  fobject11 = new MyObject(this.ftrapesium['vertices'], this.ftrapesium['faces'], this.shader_vertex_source, this.shader_fragment_source, "resource/dwood.jpg");

  //kaki kiri
  fobject12 = new MyObject(this.ftrapesium['vertices'], this.ftrapesium['faces'], this.shader_vertex_source, this.shader_fragment_source, "resource/dwood.jpg");

  //setup
  pushChild(){
    this.fobject.childs.push(this.fobject2);
    this.fobject.childs.push(this.fobject3);
    this.fobject.childs.push(this.fobject4);
    this.fobject.childs.push(this.fobject5);
    this.fobject.childs.push(this.fobject6);
    this.fobject.childs.push(this.fobject7);
    this.fobject.childs.push(this.fobject8);
    this.fobject.childs.push(this.fobject9);
    this.fobject.childs.push(this.fobject10);
    this.fobject.childs.push(this.fobject11);
    this.fobject.childs.push(this.fobject12);
    this.fobject.setup();
  }

  multiRender(VIEW_MATRIX, PROJECTION_MATRIX){
    this.fobject.MODEL_MATRIX= fMODEL_MATRIX;
    this.fobject.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);


    this.fobject2.MODEL_MATRIX = fMODEL_MATRIX2;
    this.fobject2.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

    this.fobject3.MODEL_MATRIX=fMODEL_MATRIX3;
    this.fobject3.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

    this.fobject4.MODEL_MATRIX=fMODEL_MATRIX4;
    this.fobject4.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

    this.fobject5.MODEL_MATRIX=fMODEL_MATRIX5;
    this.fobject5.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

    //duri
    this.fobject6.MODEL_MATRIX=fMODEL_MATRIX6;
    this.fobject6.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

    this.fobject7.MODEL_MATRIX=fMODEL_MATRIX7;
    this.fobject7.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

    this.fobject8.MODEL_MATRIX=fMODEL_MATRIX8;
    this.fobject8.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

    // mata
    this.fobject9.MODEL_MATRIX=fMODEL_MATRIX9;
    this.fobject9.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

    this.fobject10.MODEL_MATRIX=fMODEL_MATRIX10;
    this.fobject10.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

    //kaki
    this.fobject11.MODEL_MATRIX=fMODEL_MATRIX11;
    this.fobject11.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);

    this.fobject12.MODEL_MATRIX=fMODEL_MATRIX12;
    this.fobject12.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);
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

function generateTorus(majorRadius, minorRadius, sectorCount, sideCount) {
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

      vertices.push(x, y, z,1,0,1, s, t);
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

function generateCylinder(radius, height, sectorCount){
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
        vertices.push(1,1,0) // warna tabung
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
     vertices.push(1,1,0) // warna center
     vertices.push(0.5,0.5)
     

     for (let j = 0, k = 0; j < sectorCount; ++j, k += 3) {
         let ux = unitCircleVertices[k];
         let uy = unitCircleVertices[k + 1];
         // Position vector
         vertices.push(ux * radius);             // vx
         vertices.push(uy * radius);             // vy
         vertices.push(h);                       // vz
          vertices.push(1,1,0) // warna lingkaran atas bawah
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
function generateSphere(xrad, yrad, zrad, stack, step){
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

  function generateCone(baseRadius, height, sectorCount, stackCount) {
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
            vertices.push(0,1,1) //warna cone
            vertices.push(j / sectorCount, t);
        }
    }

    // Remember where the base vertices start
    let baseVertexIndex = vertices.length / 8; // soal e vertice push sekali push ada 8 data

    // Build base vertices
    let z = -height * 0.5;
    vertices.push(0, 0, z);
    vertices.push(1,0,1);
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
    // this.texture = LIBS.load_texture("resource/beton.jpeg"); //buat kalo mau pake texture
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
 
        //   if(TYPE == 1){
        //     GL.drawElements(GL.TRIANGLES, this.faces.length, GL.UNSIGNED_SHORT, 0);
        //   } else if (TYPE == 2) {
        //     GL.drawElements(GL.TRIANGLE_FAN, this.faces.length, GL.UNSIGNED_SHORT, 0);
        //   }

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
            default:
                GL.drawElements(GL.TRIANGLES, this.faces.length, GL.UNSIGNED_SHORT, 0);
                break;
          }
         
          this.childs.forEach(child => {
            child.render(VIEW_MATRIX,PROJECTION_MATRIX)
          });

          GL.flush();
    }
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
    
      //================================= GENERATE OBJECT ==================================
      //matrix
      var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1,100);
      var VIEW_MATRIX = LIBS.get_I4();


      LIBS.translateZ(VIEW_MATRIX,-15);

      combined = new combinedObject();
      combined.pushChild();

      /*========================= DRAWING ========================= */
      GL.clearColor(0.0, 0.0, 0.0, 0.0);
      GL.enable(GL.DEPTH_TEST);
      GL.depthFunc(GL.LEQUAL);

      var time_prev = 0;
      var fi = 0;
      var fx = 0.001;

      var fi = 0;
      var fj = 1;
      var fk = 0;
      var fx = 0.01;
      var fy = 0.01;
      var fz = 0.01;

      var animate = function(time) {

          fi += fx;
          fj += -fx;
          fk +=fz;


          if(fi > 1.0){
            console.log("HIt")
            fx = -0.01;
          }
          else if (fi < 0){
            fx = 0.01;
          }

          if(fk > 5.0){
            console.log("HIt")
            fz = -0.01;
          }
          else if (fk < -5){
            fz = 0.01;
          }

          GL.viewport(0, 0, CANVAS.width, CANVAS.height);
          GL.clear(GL.COLOR_BUFFER_BIT | GL.D_BUFFER_BIT);
          time_prev=time;

          if(!drag){
            dX*=FRICTION;
            dY*=FRICTION;


            THETA += dX *2*Math.PI/CANVAS.width;
            ALPHA += dY * 2*Math.PI/CANVAS.height;
          }
          
          //ngukur pergerakan
          var radius = 2;
          var pos_x = radius * THETA;
          var pos_y = radius * -ALPHA;
          var pos_z = 0;
          
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
          

          // LIBS.setPosition(fMODEL_MATRIX,pos_x,pos_y,pos_z); // geser geser
          // LIBS.rotateX(fMODEL_MATRIX, time/1000)
          
          LIBS.translateX(fMODEL_MATRIX, fk); //puter objek kanan kiri
          LIBS.rotateY(fMODEL_MATRIX, THETA); //puter objek kanan kiri
          LIBS.rotateX(fMODEL_MATRIX, ALPHA); // puter objek atas bawah
          
          
          
          
          //atur posisi paha kiri
          LIBS.rotateY(fMODEL_MATRIX2, 4.8);
          LIBS.rotateX(fMODEL_MATRIX2, fi);
          LIBS.rotateY(fMODEL_MATRIX2, THETA);
          LIBS.rotateX(fMODEL_MATRIX2, ALPHA);
          
          //atur posisi paha kanan
          LIBS.rotateY(fMODEL_MATRIX3, -4.8);
          LIBS.rotateX(fMODEL_MATRIX3, fj);
          LIBS.rotateY(fMODEL_MATRIX3, THETA);
          LIBS.rotateX(fMODEL_MATRIX3, ALPHA);
          
          //atur posisi betis kanan
          LIBS.rotateY(fMODEL_MATRIX4, 0);
          LIBS.rotateX(fMODEL_MATRIX4, 1);
          LIBS.rotateY(fMODEL_MATRIX4, THETA);
          LIBS.rotateX(fMODEL_MATRIX4, ALPHA);
          
          //atur posisi betis kiri
          LIBS.rotateY(fMODEL_MATRIX5, 0);
          LIBS.rotateX(fMODEL_MATRIX5, 1);
          LIBS.rotateY(fMODEL_MATRIX5, THETA);
          LIBS.rotateX(fMODEL_MATRIX5, ALPHA);
          
          //atur posisi duri 1
          LIBS.rotateY(fMODEL_MATRIX6, 0);
          LIBS.rotateX(fMODEL_MATRIX6, 4.7);
          LIBS.rotateY(fMODEL_MATRIX6, THETA);
          LIBS.rotateX(fMODEL_MATRIX6, ALPHA);
          //atur posisi duri 2
          LIBS.rotateY(fMODEL_MATRIX7, 0);
          LIBS.rotateX(fMODEL_MATRIX7, 4.7);
          LIBS.rotateY(fMODEL_MATRIX7, THETA);
          LIBS.rotateX(fMODEL_MATRIX7, ALPHA);
          //atur posisi duri 3
          LIBS.rotateY(fMODEL_MATRIX8, 0);
          LIBS.rotateX(fMODEL_MATRIX8, 4.7);
          LIBS.rotateY(fMODEL_MATRIX8, THETA);
          LIBS.rotateX(fMODEL_MATRIX8, ALPHA);
          
          //atur kaki kanan
          LIBS.rotateY(fMODEL_MATRIX11, 1.6);
          LIBS.rotateX(fMODEL_MATRIX11, 0);
          LIBS.rotateY(fMODEL_MATRIX11, THETA);
          LIBS.rotateX(fMODEL_MATRIX11, ALPHA);
          //atur kaki kiri
          LIBS.rotateY(fMODEL_MATRIX12, 1.6);
          LIBS.rotateX(fMODEL_MATRIX12, 0);
          LIBS.rotateY(fMODEL_MATRIX12, THETA);
          LIBS.rotateX(fMODEL_MATRIX12, ALPHA);
          
          var objGroup = [
            fMODEL_MATRIX, fMODEL_MATRIX2, fMODEL_MATRIX3, 
            fMODEL_MATRIX4, fMODEL_MATRIX5, fMODEL_MATRIX6, 
            fMODEL_MATRIX7, fMODEL_MATRIX8, fMODEL_MATRIX9, 
            fMODEL_MATRIX10, fMODEL_MATRIX11, fMODEL_MATRIX12];
          rotateYGlobal(objGroup,1.4);

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
          //mata kiri terhadap badan
          transformedSpherePos = LIBS.transformPoint(fMODEL_MATRIX5, [0.5, 0.3, 1.4]);
          LIBS.setPosition(fMODEL_MATRIX12,transformedSpherePos[0], transformedSpherePos[1], transformedSpherePos[2]);

        //    LIBS.setPosition(fMODEL_MATRIX2,pos_x,pos_y,pos_z);
          // var temp = LIBS.get_I4();
          // LIBS.rotateY(temp,ALPHA);
          // LIBS.rotateX(temp,THETA);
         
          // fMODEL_MATRIX2= LIBS.multiply(fMODEL_MATRIX2,temp)
          
          combined.multiRender(VIEW_MATRIX, PROJECTION_MATRIX);

          window.requestAnimationFrame(animate);
      };
      animate(0);
      
  }
  window.addEventListener('load',main);