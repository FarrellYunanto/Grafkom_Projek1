var GL;

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
    // uniform sampler2D sampler; // buat kalo mau pake texture


    void main(void) {
    float greyScaleValue = (vColor.r + vColor.g + vColor.b)/3.;
    vec3 greyScaleColor = vec3(greyScaleValue, greyScaleValue, greyScaleValue);
    vec3 color = mix(greyScaleColor, vColor, greyScality);
    gl_FragColor = vec4(color, 1.);
    // gl_FragColor = texture2D(sampler,vUV); buat kalo mau pake texture
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


      LIBS.translateZ(VIEW_MATRIX,-10);


      var object = new MyObject(cube, cube_faces, shader_vertex_source, shader_fragment_source);
      var sphere = generateSphere(2,2,2,50,50);
      var object2 = new MyObject(sphere['vertices'], sphere['faces'], shader_vertex_source, shader_fragment_source);
      object.childs.push(object2)
      object.setup();

      /*========================= DRAWING ========================= */
      GL.clearColor(0.0, 0.0, 0.0, 0.0);
      GL.enable(GL.DEPTH_TEST);
      GL.depthFunc(GL.LEQUAL);

      var time_prev = 0;
      var animate = function(time) {
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
          var pos_y = -radius * ALPHA;
          var pos_z = 0;
          
          MODEL_MATRIX = LIBS.get_I4(); //ngambil matrix normalnya biar bisa di transform
          MODEL_MATRIX2 = LIBS.get_I4();
          // LIBS.setPosition(MODEL_MATRIX,pos_x,pos_y,pos_z); // geser geser

          LIBS.rotateY(MODEL_MATRIX, THETA); //puter objek kanan kiri
          LIBS.rotateX(MODEL_MATRIX, ALPHA); // puter objek atas bawah


          LIBS.translateX(MODEL_MATRIX2,4);
          LIBS.rotateY(MODEL_MATRIX2, -THETA);
          LIBS.rotateX(MODEL_MATRIX2, -ALPHA);
        //   LIBS.setPosition(MODEL_MATRIX2,-pos_x,-pos_y,-pos_z);
          // var temp = LIBS.get_I4();
          // LIBS.rotateY(temp,ALPHA);
          // LIBS.rotateX(temp,THETA);
         
          // MODEL_MATRIX2= LIBS.multiply(MODEL_MATRIX2,temp)

          object.MODEL_MATRIX=MODEL_MATRIX;
          object.render(VIEW_MATRIX, PROJECTION_MATRIX, 1);


          object2.MODEL_MATRIX = MODEL_MATRIX2;
          object2.render(VIEW_MATRIX, PROJECTION_MATRIX, 2);


          window.requestAnimationFrame(animate);
      };
      animate(0);
      
  }
  window.addEventListener('load',main);