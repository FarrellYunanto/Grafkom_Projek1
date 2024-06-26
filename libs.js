
var LIBS = {
  load_texture: function(image_URL){
    var texture = GL.createTexture();

    var image = new Image();
    image.src = image_URL;
    image.onload = function(e) {
      GL.bindTexture(GL.TEXTURE_2D, texture);
      GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
      GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);

      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);

      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
      // GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
      // GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);
      // GL.generateMipmap(GL.TEXTURE_2D);

      GL.bindTexture(GL.TEXTURE_2D, null);
    };

    return texture;
  },
    degToRad: function(angle){

      return(angle*Math.PI/180);

    },

 

    get_projection: function(angle, a, zMin, zMax) {

      var tan = Math.tan(LIBS.degToRad(0.5*angle)),

          A = -(zMax+zMin)/(zMax-zMin),

          B = (-2*zMax*zMin)/(zMax-zMin);

 

      return [

        0.5/tan, 0 ,   0, 0,

        0, 0.5*a/tan,  0, 0,

        0, 0,         A, -1,

        0, 0,         B, 0

      ];

    },

    get_I4: function() {

        return [1,0,0,0,

                0,1,0,0,

                0,0,1,0,

                0,0,0,1];

      },

   

      rotateX: function(m, angle) {

        var c = Math.cos(angle);

        var s = Math.sin(angle);

        var mv1=m[1], mv5=m[5], mv9=m[9];

        m[1]=m[1]*c-m[2]*s;

        m[5]=m[5]*c-m[6]*s;

        m[9]=m[9]*c-m[10]*s;

   

        m[2]=m[2]*c+mv1*s;

        m[6]=m[6]*c+mv5*s;

        m[10]=m[10]*c+mv9*s;

      },

   

      rotateY: function(m, angle) {

        var c = Math.cos(angle);

        var s = Math.sin(angle);

        var mv0=m[0], mv4=m[4], mv8=m[8];

        m[0]=c*m[0]+s*m[2];

        m[4]=c*m[4]+s*m[6];

        m[8]=c*m[8]+s*m[10];

   

        m[2]=c*m[2]-s*mv0;

        m[6]=c*m[6]-s*mv4;

        m[10]=c*m[10]-s*mv8;

      },

      multiply: function(m1,m2){
        var res = this.get_I4();
        var N = 4;
        for(var i = 0 ; i<N; i++){
            for(var j = 0; j<N;j++){
                res[i*N+j] = 0;
                for(var k = 0; k<N;k++){
                    res[i*N+j]+=m1[i*N+k] * m2[k*N+j];
                }
            }
        }
        return res;
      },

      rotateZ: function(m, angle) {

        var c = Math.cos(angle);

        var s = Math.sin(angle);

        var mv0=m[0], mv4=m[4], mv8=m[8];

        m[0]=c*m[0]-s*m[1];

        m[4]=c*m[4]-s*m[5];

        m[8]=c*m[8]-s*m[9];

   

        m[1]=c*m[1]+s*mv0;

        m[5]=c*m[5]+s*mv4;

        m[9]=c*m[9]+s*mv8;

      },

      translateZ: function(m, t){

        m[14]+=t;

      },
      translateX: function(m, t){

        m[12]+=t;

      },
      translateY: function(m, t){

        m[13]+=t;

      },
      setPosition: function(m,x,y,z){
        m[12]=x; m[13]=y; m[14]=z;
      },

      transformPoint: function(matrix, point) {
        var transformedPoint = [];
        transformedPoint[0] = matrix[0] * point[0] + matrix[4] * point[1] + matrix[8] * point[2] + matrix[12];
        transformedPoint[1] = matrix[1] * point[0] + matrix[5] * point[1] + matrix[9] * point[2] + matrix[13];
        transformedPoint[2] = matrix[2] * point[0] + matrix[6] * point[1] + matrix[10] * point[2] + matrix[14];
        return transformedPoint;
    },
    scale: function(m, scale) {
      m[0] *= scale;
      m[5] *= scale;
      m[10] *= scale;
  },
transpose: function(m) {
        var result = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                result.push(m[j * 4 + i]);
            }
        }
        return result;
    },
    scale: function(m, scaleX, scaleY, scaleZ) {
      m[0] *= scaleX;
      m[5] *= scaleY;
      m[10] *= scaleZ;
  },
  };
  