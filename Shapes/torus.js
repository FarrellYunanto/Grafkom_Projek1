// Kumpulan Shapes untuk digunakan
// nb : tinggal copas udah dlm bentuk vertex sama faces
// source modif dari https://www.songho.ca/opengl/gl_torus.html
function generateTorus(majorRadius, minorRadius, sectorCount, sideCount) { //generate untuk donut
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
  
        vertices.push(x, y, z,1,0,1, s, t); // push vertice
      }
    }
  
    for (var i = 0; i < sideCount; ++i) {
      var k1 = i * (sectorCount + 1);
      var k2 = k1 + sectorCount + 1;
  
      for (var j = 0; j < sectorCount; ++j, ++k1, ++k2) {
        faces.push(k1, k2, k1 + 1, k1 + 1, k2, k2 + 1); // push faces
      }
    }
  
    return { "vertices": vertices, "faces": faces };
  }