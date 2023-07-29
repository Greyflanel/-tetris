var scene, camera, renderer, controls, fontLoader, textMesh, moonMesh, stars = [];
var canvas = document.getElementById('canvas');
var splashText = document.getElementById('splash-text');

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);

    loadFont();
    createMoon();
    createStars();

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

function loadFont() {
    fontLoader = new THREE.FontLoader();
    fontLoader.load('assets/fonts/helvetiker_regular.typeface.json', function (font) {
        var geometry = new THREE.TextGeometry('Richard Lovelace', {
            font: font,
            size: 0.5,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 5
        });
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        textMesh = new THREE.Mesh(geometry, material);
        scene.add(textMesh);
    });
}

function createMoon() {
    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var texture = new THREE.TextureLoader().load('assets/images/moon_texture.jpg');
    var material = new THREE.MeshBasicMaterial({ map: texture });
    moonMesh = new THREE.Mesh(geometry, material);
    scene.add(moonMesh);
}

function createStars() {
    var geometry = new THREE.SphereGeometry(0.01, 32, 32);
    var texture = new THREE.TextureLoader().load('assets/images/star_texture.jpg');
    var material = new THREE.MeshBasicMaterial({ map: texture });

    for (var i = 0; i < 1000; i++) {
        var starMesh = new THREE.Mesh(geometry, material);
        starMesh.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
        stars.push(starMesh);
        scene.add(starMesh);
    }
}

window.onload = init;
window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

animate();