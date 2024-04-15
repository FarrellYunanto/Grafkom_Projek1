// Kumpulan Shapes untuk digunakan
// nb : tinggal copas udah dlm bentuk vertex sama faces
// source modif dari https://www.songho.ca/opengl/gl_torus.html

// Code buat bikin Donut
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

  // bikin tabung
  function generateCylinder(radius, height, sectorCount){
    const PI = Math.PI;
    let sectorStep = 2 * PI / sectorCount;
    let sectorAngle;  // Radian
  
    let unitCircleVertices = []; // buat bikin vertice lingkaran
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
   let baseCenterIndex = vertices.length / 8; // soalnya ada 8 array per input dalam verticenya
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