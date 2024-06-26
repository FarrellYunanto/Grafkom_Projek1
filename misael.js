var GL;
// generate curves
// function generateCurves(object, z, segments) {
//     var vertices = [];
//     var colors = [];
  
//     var rainbowColors = [[1, 1, 1]];
  
//     for (var i = 0; i <= segments; i++) {
//       var t = i / segments;
//       var x = Math.pow(1 - t, 3) * object[0][0] + 3 * Math.pow(1 - t, 2) * t * object[1][0] + 3 * (1 - t) * Math.pow(t, 2) * object[2][0] + Math.pow(t, 3) * object[3][0];
//       var y = Math.pow(1 - t, 3) * object[0][1] + 3 * Math.pow(1 - t, 2) * t * object[1][1] + 3 * (1 - t) * Math.pow(t, 2) * object[2][1] + Math.pow(t, 3) * object[3][1];
  
//       // Add vertices for the thicker lines
//       vertices.push(x - 0.01, y - 0.01, z); // offset for thickness
//       vertices.push(x + 0.01, y - 0.01, z);
//       vertices.push(x, y + 0.01, z);
  
//       for (var j = 0; j <= segments; j++) {
//         var colorIndex = j % rainbowColors.length;
//         colors = colors.concat(rainbowColors[colorIndex]);
//         vertices.push(colors);
//         // vertices.push(0,1)
//       }
//     }
  
//     var faces = [];
//     for (var i = 0; i < segments; i++) {
//       var index = i * 3;
//       faces.push(index, index + 1, index + 2); // create triangles for each vertex
//     }
  
//     return { "vertices": vertices, "faces": faces };
//   }

function generateTorus(majorRadius, minorRadius, sectorCount, sideCount, red, green, blue) {
  var vertices = [];
  var faces = [];
  var r = red;
  var g = green;
  var b = blue;
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

      vertices.push(x, y, z, r,g,b, s, t);
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
    this._sampler = GL.getUniformLocation(this.SHADER_PROGRAM, "sampler"); //buat kalo mau pake texture


    GL.enableVertexAttribArray(this._color);
    GL.enableVertexAttribArray(this._position);

    GL.enableVertexAttribArray(this._uv);

    GL.useProgram(this.SHADER_PROGRAM);




    this.TRIANGLE_VERTEX = GL.createBuffer();
    this.TRIANGLE_FACES = GL.createBuffer();
    // this.texture = LIBS.load_texture("resource/images.jpg"); //buat kalo mau pake texture
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
        //   GL.activeTexture(GL.TEXTURE0);
        //   GL.bindTexture(GL.TEXTURE_2D, this.texture);
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

    //FUNCTION ROTATE ALL OBJECT seanak anak e 
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

      //MATRIX
      var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1,100);
      var VIEW_MATRIX = LIBS.get_I4();

      LIBS.translateZ(VIEW_MATRIX, -25);

      //CREATE OBJECT
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
        var cone1 = generateCone(0.3, 3, 20, 20);
        var objectm8 = new MyObject(cone1['vertices'], cone1['faces'], shader_vertex_source, shader_fragment_source);
        var sphere1 = generateSphere(0.3,0.3,0.3, 30, 30)
        var objectm9 = new MyObject(sphere1['vertices'], sphere1['faces'], shader_vertex_source, shader_fragment_source);
        
        var cone2 = generateCone(0.3, 3, 20, 20);
        var objectm10 = new MyObject(cone2['vertices'], cone2['faces'], shader_vertex_source, shader_fragment_source);
        var sphere2 = generateSphere(0.3,0.3,0.3, 30, 30)
        var objectm11 = new MyObject(sphere2['vertices'], sphere2['faces'], shader_vertex_source, shader_fragment_source);

        //spline
        // var mouth = generateCurves(
        //     [
        //       [-0.15, -0.1],
        //       [-0.12, -0.3],
        //       [0.12, -0.3],
        //       [0.15, -0.1],
        //     ],
        //     1,
        //     100
        //   );
        //   var objMouth = new MyObject(mouth['vertices'], mouth['faces'], shader_vertex_source, shader_fragment_source);

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

      /*========================= DRAWING ========================= */
      GL.clearColor(0.0, 0.0, 0.0, 0.0);
      GL.enable(GL.DEPTH_TEST);
      GL.depthFunc(GL.LEQUAL);

      var prev_time = 0;
      var i = 0; //buat translate smoke
      var j = 0; //buat rotate di y axis 
      var k = 0; //buat gerak gerak 
      var x = 0.01;
      var y = 0.01;
      var z = 0.01;
      var animate = function(time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.D_BUFFER_BIT);
        
        var dt = time-prev_time;
        prev_time = time;

        // // LIBS.rotateZ(VIEW_MATRIX, LIBS.degToRad(90*dt/1000));        
        // LIBS.rotateY(VIEW_MATRIX, LIBS.degToRad(90*dt/400));
        // // LIBS.translateY(VIEW_MATRIX, LIBS.degToRad(90*dt/400))
     
          i += x; 
          j += y;
          k += z;  

        if(!drag){
        dX*=FRICTION;
        dY*=FRICTION;

        THETA += dX *2*Math.PI/CANVAS.width;
        ALPHA += dY * 2*Math.PI/CANVAS.height;
        }
        
        //ngukur pergerakan
        var radius = 2;
        var pos_x = radius * THETA;
        var pos_y = radius * ALPHA;
        var pos_z = 0;
        
        //MATRIX NORM MODEL
        mMODEL_MATRIX = LIBS.get_I4(); //ngambil matrix normalnya biar bisa di transform
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
        
        // LIBS.setPosition(mMODEL_MATRIX,0, 1, 0); // geser geser

        //SET ROTATE UNTUK POSISI AWAL
        //cube head
        LIBS.rotateX(mMODEL_MATRIX, -4.7);
        LIBS.rotateY(mMODEL_MATRIX, 1.2);
        LIBS.rotateX(mMODEL_MATRIX, ALPHA); // puter objek atas bawah
        LIBS.rotateY(mMODEL_MATRIX, THETA); //puter objek kanan kiri
        
        //body donut
        LIBS.rotateX(mMODEL_MATRIX2, -4.7);
        LIBS.rotateY(mMODEL_MATRIX2, 1.2);
        LIBS.rotateX(mMODEL_MATRIX2, ALPHA);
        LIBS.rotateY(mMODEL_MATRIX2, THETA);
        
        //body donut2
        LIBS.rotateX(mMODEL_MATRIX3, -4.7);
        LIBS.rotateY(mMODEL_MATRIX3, 1.2);
        LIBS.rotateX(mMODEL_MATRIX3, ALPHA);
        LIBS.rotateY(mMODEL_MATRIX3, THETA);
        
        //body donut3
        LIBS.rotateX(mMODEL_MATRIX4, -4.7);
        LIBS.rotateY(mMODEL_MATRIX4, 1.2);
        LIBS.rotateX(mMODEL_MATRIX4, ALPHA);
        LIBS.rotateY(mMODEL_MATRIX4, THETA);
        
        //halfsphere glass
        LIBS.rotateX(mMODEL_MATRIX5, -4.7);
        LIBS.rotateY(mMODEL_MATRIX5, 1.2);
        LIBS.rotateX(mMODEL_MATRIX5, ALPHA);
        LIBS.rotateY(mMODEL_MATRIX5, THETA);

            //donut trail big
            LIBS.rotateX(mMODEL_MATRIX6, -4.7);
            LIBS.rotateY(mMODEL_MATRIX6, 1.2);
            LIBS.rotateX(mMODEL_MATRIX6, ALPHA);
            LIBS.rotateY(mMODEL_MATRIX6, THETA);
    
            //donut trail small
            LIBS.rotateX(mMODEL_MATRIX7, -4.7);
            LIBS.rotateY(mMODEL_MATRIX7, 1.2);
            LIBS.rotateX(mMODEL_MATRIX7, ALPHA);
            LIBS.rotateY(mMODEL_MATRIX7, THETA);
            
        //antenna right
        LIBS.rotateX(mMODEL_MATRIX8, -7.4);
        LIBS.rotateY(mMODEL_MATRIX8, 1.2);
        LIBS.rotateX(mMODEL_MATRIX8, ALPHA);
        LIBS.rotateY(mMODEL_MATRIX8, THETA);
        
        LIBS.rotateX(mMODEL_MATRIX9, -7.4);
        LIBS.rotateY(mMODEL_MATRIX9, 1,5);
        LIBS.rotateX(mMODEL_MATRIX9, ALPHA);
        LIBS.rotateY(mMODEL_MATRIX9, THETA);
 
        //antenna left
        LIBS.rotateX(mMODEL_MATRIX10, -14.6);
        LIBS.rotateY(mMODEL_MATRIX10, 1.2);
        LIBS.rotateX(mMODEL_MATRIX10, ALPHA);
        LIBS.rotateY(mMODEL_MATRIX10, THETA);

        LIBS.rotateX(mMODEL_MATRIX11, -14.6);
        LIBS.rotateY(mMODEL_MATRIX11, 1,5);
        LIBS.rotateX(mMODEL_MATRIX11, ALPHA);
        LIBS.rotateY(mMODEL_MATRIX11, THETA);

        //ROTATE GROUP
        var UFO = [mMODEL_MATRIX, mMODEL_MATRIX2, mMODEL_MATRIX3, mMODEL_MATRIX4, 
            mMODEL_MATRIX5, mMODEL_MATRIX6, mMODEL_MATRIX7, mMODEL_MATRIX8, mMODEL_MATRIX9, 
            mMODEL_MATRIX10, mMODEL_MATRIX11];
        rotateYGlobal(UFO, j*10); 
        // rotateXGlobal(UFO, i*10); 
        // rotateZGlobal(UFO, i*10); 
        
        //GERAK GERAK TRANSLATE
        // LIBS.translateZ(mMODEL_MATRIX, k*10);
        
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
        
        //TRANSLATE SMOKE TRAIL
        LIBS.translateY(mMODEL_MATRIX6, i*10);
        LIBS.translateY(mMODEL_MATRIX7, i*10);
        if (i > 0.08){
            x = -0.01;
        } 
        else if (i < -0.25){
            x = 0.01;
        }


        //RENDER
        mobject.MODEL_MATRIX=mMODEL_MATRIX;
        mobject.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);

        objectm2.MODEL_MATRIX = mMODEL_MATRIX2;
        objectm2.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);
        
        objectm3.MODEL_MATRIX = mMODEL_MATRIX3;
        objectm3.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);
        
        objectm4.MODEL_MATRIX = mMODEL_MATRIX4;
        objectm4.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);
     
        objectm5.MODEL_MATRIX = mMODEL_MATRIX5;
        objectm5.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);
       
        objectm6.MODEL_MATRIX = mMODEL_MATRIX6;
        objectm6.render(VIEW_MATRIX, PROJECTION_MATRIX, 3);
        
        objectm7.MODEL_MATRIX = mMODEL_MATRIX7;
        objectm7.render(VIEW_MATRIX, PROJECTION_MATRIX, 3);
        
        objectm8.MODEL_MATRIX = mMODEL_MATRIX8;
        objectm8.render(VIEW_MATRIX, PROJECTION_MATRIX, 3);

        objectm9.MODEL_MATRIX = mMODEL_MATRIX9;
        objectm9.render(VIEW_MATRIX, PROJECTION_MATRIX, 3);
        
        objectm10.MODEL_MATRIX = mMODEL_MATRIX10;
        objectm10.render(VIEW_MATRIX, PROJECTION_MATRIX, 3);
    
        objectm11.MODEL_MATRIX = mMODEL_MATRIX11;
        objectm11.render(VIEW_MATRIX, PROJECTION_MATRIX, 3);
       
        // GL.drawArrays(GL.LINE_STRIP, 0, mouth.vertices.length / 6);

        window.requestAnimationFrame(animate);
      };
      animate(0);
      
  }
  window.addEventListener('load',main);