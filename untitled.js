var container;
var camera, controls, scene, renderer;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = -1000;

	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );

	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog( "black", 0.002);

	var numCubes = 20;
	var cubeSize = 5;
	var space = 10;

	var d = (numCubes*(cubeSize+space) - space)/2 -cubeSize/2;
	
	var mainGeom =  new THREE.Geometry();
	
	var geometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
	
	var cube = new THREE.Mesh( geometry );
	for (var i = 0; i < numCubes; i++) {
		for (var j = 0; j < numCubes; j++) {
			for (var k = 0; k < numCubes; k++) {
				cube.position.set(i*(cubeSize + space) - d, j*(cubeSize + space) - d, k*(cubeSize + space) - d);
				THREE.GeometryUtils.merge( mainGeom, cube );
			} 
		}
	}
	scene.add(new THREE.Mesh( mainGeom,new THREE.MeshLambertMaterial( )));
	
	light = new THREE.SpotLight( "blue" );
	light.position.set(-d*2,-d*2,-d*2);
	scene.add( light );

	light = new THREE.SpotLight( "red" );
	light.position.set(d*2,d*2,d*2);
	scene.add( light );

	light = new THREE.SpotLight( "yellow" );
	light.position.set(-d*2,d*2,d*2);
	scene.add( light );

	light = new THREE.SpotLight( "white" );
	light.position.set(d*2,-d*2,d*2);
	light.intensity = 2;
	scene.add( light );

	light = new THREE.SpotLight( "green" );
	light.position.set(d*2,d*2,-d*2);
	scene.add( light );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( "black", 1 );
  	renderer.setSize( window.innerWidth, window.innerHeight );

  	container = document.getElementById( 'container' );
  	container.appendChild( renderer.domElement );
  	window.addEventListener( 'resize', onWindowResize, false );

  }

function onWindowResize() {

  	camera.aspect = window.innerWidth / window.innerHeight;
  	camera.updateProjectionMatrix();

  	renderer.setSize( window.innerWidth, window.innerHeight );
  	render();
}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
}

function render() {
	renderer.render( scene, camera );
}
