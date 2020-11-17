class Scene  {
    constructor(pDiv) {
        this.mScene = new THREE.Scene();
        this.mCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.mCamera.position.z = 50;
        this.mRenderer = new THREE.WebGLRenderer();
        this.mRenderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.mRenderer.domElement);

        const aDirectionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
        aDirectionalLight1.position.set(-6, 10, 50);
        this.mScene.add(aDirectionalLight1);

        const aDirectionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
        aDirectionalLight2.position.set(6, -10, -50);
        this.mScene.add(aDirectionalLight2);

        this.mCube = new Cube();
        this.mBall = new Ball();
        this.mScene.add(this.mCube);
        this.mScene.add(this.mBall);


        this.animate();
    }
    //_______________________________________________________

    gameLoop() {
        this.mBall.move(0.1, 0.05, 0);
    }
    //_______________________________________________________

    animate() {
        this.gameLoop();
        requestAnimationFrame(()=>this.animate());
        this.mRenderer.render(this.mScene, this.mCamera);
        
    }
}


//////////////////////////////////////////////////////////////

class Cube extends THREE.Object3D {
    constructor() {
        super();
        const aGeometry = new THREE.BoxGeometry(40,50,100,2,2,2);
        const aMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, opacity: 0.6, transparent: true, side: THREE.DoubleSide });
        const aBox = new THREE.Mesh(aGeometry, aMaterial);
        this.add(aBox)
    }
}


//////////////////////////////////////////////////////////////

class Ball extends THREE.Object3D {
    constructor() {
        super();
        const aGeometry = new THREE.SphereGeometry(3, 32, 32);
        const aMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.mSphere = new THREE.Mesh(aGeometry, aMaterial);
        this.add(this.mSphere)
    }
    //_______________________________
    move(pX, pY, pZ) {
        this.position.x += pX;
        this.position.y += pY;
        this.position.z += pZ;
    }

}

new Scene();