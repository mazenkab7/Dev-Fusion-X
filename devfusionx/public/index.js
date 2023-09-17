var scene = new THREE.Scene();
        document.addEventListener('mousemove', onMouseMove, false);
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var mouseX;
        var mouseY;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('scene-container').appendChild(renderer.domElement); // Append renderer to the scene-container div

        window.addEventListener("resize", function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        var distance = Math.min(200, window.innerWidth / 4);
        var geometry = new THREE.Geometry();

        for (var i = 0; i < 1600; i++) {
            var vertex = new THREE.Vector3();
            var theta = Math.acos(THREE.Math.randFloatSpread(2));
            var phi = THREE.Math.randFloatSpread(360);

            vertex.x = distance * Math.sin(theta) * Math.cos(phi);
            vertex.y = distance * Math.sin(theta) * Math.sin(phi);
            vertex.z = distance * Math.cos(theta);

            geometry.vertices.push(vertex);
        }

        var particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xff44ff, size: 2 }));
        particles.boundingSphere = 50;

        var renderingParent = new THREE.Group();
        renderingParent.add(particles);

        var resizeContainer = new THREE.Group();
        resizeContainer.add(renderingParent);
        scene.add(resizeContainer);

        camera.position.z = 400;

        var animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        var myTween;

        function onMouseMove(event) {
            if (myTween)
                myTween.kill();

            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            myTween = gsap.to(particles.rotation, { duration: 0.1, x: mouseY * -1, y: mouseX });
        }

        animate();

        // Scaling animation
        var animProps = { scale: 1, xRot: 0, yRot: 0 };
        gsap.to(animProps, {
            duration: 10,
            scale: 1.3,
            repeat: -1,
            yoyo: true,
            ease: "sine",
            onUpdate: function () {
                renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale);
            }
        });

        gsap.to(animProps, {
            duration: 120,
            xRot: Math.PI * 2,
            yRot: Math.PI * 4,
            repeat: -1,
            yoyo: true,
            ease: "none",
            onUpdate: function () {
                renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
            }
        });

        // Load the SVG texture and apply it to a mesh
        var svgImage = document.getElementById('svg-image');
        var texture = new THREE.Texture(svgImage);
        
        texture.needsUpdate = true;

        var svgMaterial = new THREE.MeshBasicMaterial({ map: texture });
        var svgGeometry = new THREE.PlaneGeometry(90, 90); // Adjust the size as needed
        var svgMesh = new THREE.Mesh(svgGeometry, svgMaterial);
        scene.add(svgMesh);

const fontLoader = new THREE.FontLoader();
let defaultFont;

fontLoader.load('https://cdn.rawgit.com/mrdoob/three.js/r127/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  defaultFont = font;

  // Call a function to add text to the scene once the font is loaded
  addTextToScene('DEV FUSION X', new THREE.Vector3(-85, -100, 0), 20); // Set the font size for the first text
  addTextToScene('Transforming Ideas into Innovation', new THREE.Vector3(-95, -100, 100), 10); // Set the font size for the second text
});

function addTextToScene(text, position, fontSize) {
  if (!defaultFont) return; // Wait for the font to load

  const textGeometry = new THREE.TextBufferGeometry(text, {
    font: defaultFont,
    size: fontSize, // Use the provided font size
    height: 0.1, // Adjust the extrusion thickness
    curveSegments: 12, // Number of segments in the text shape
    bevelEnabled: false, // Disable bevel for simplicity
  });

  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xb36bfa }); // Set the text color
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // Position the text
  textMesh.position.copy(position);

  // Add the text to the scene
  scene.add(textMesh);
}
