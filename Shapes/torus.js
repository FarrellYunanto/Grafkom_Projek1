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

  // untuk buat cone
  // nb : sector count = basenya
  //      kalau sector count 3 = tetrahedron
  //      kalau sector count 4 = pyramid segi4
  //  dll      
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