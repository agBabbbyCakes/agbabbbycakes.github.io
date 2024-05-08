document.addEventListener('DOMContentLoaded', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Setup the Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.getElementById('v1ForceGraph').appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 50;

    // Data setup
    const data = {
        "nodes": [
            {"id": "1", "name": "Node1", "group": 1, "size": 10},
            {"id": "2", "name": "Node2", "group": 1, "size": 20},
            {"id": "3", "name": "Node3", "group": 2, "size": 15},
            {"id": "4", "name": "Node4", "group": 2, "size": 10},
            {"id": "5", "name": "Node5", "group": 3, "size": 25},
            {"id": "6", "name": "Node6", "group": 3, "size": 30}
        ],
        "links": [
            {"source": "1", "target": "2", "value": 1},
            {"source": "2", "target": "3", "value": 2},
            {"source": "3", "target": "4", "value": 3},
            {"source": "4", "target": "5", "value": 4},
            {"source": "5", "target": "6", "value": 5},
            {"source": "6", "target": "1", "value": 6}
        ]
    };

    // Create a lookup to find nodes by id to help with link indexing
    const nodeById = new Map(data.nodes.map(node => [node.id, node]));
    data.links.forEach(link => {
        link.source = nodeById.get(link.source);
        link.target = nodeById.get(link.target);
    });

    // D3 Force Simulation
    const simulation = d3.forceSimulation(data.nodes)
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink(data.links).id(d => d.id))
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Three.js objects
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const nodeGeometry = new THREE.SphereGeometry(1, 32, 32);

    data.nodes.forEach(node => {
        const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
        scene.add(mesh);
        node.mesh = mesh;
    });

    const linkMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

    data.links.forEach(link => {
        const points = [];
        points.push(new THREE.Vector3(link.source.x, link.source.y, 0));
        points.push(new THREE.Vector3(link.target.x, link.target.y, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, linkMaterial);
        scene.add(line);
        link.line = line;
    });

    // Update positions after simulation
    simulation.on("tick", () => {
        data.nodes.forEach(node => {
            node.mesh.position.x = node.x;
            node.mesh.position.y = node.y;
        });

        data.links.forEach(link => {
            link.line.geometry.vertices[0].set(link.source.x, link.source.y, 0);
            link.line.geometry.vertices[1].set(link.target.x, link.target.y, 0);
            link.line.geometry.verticesNeedUpdate = true;
        });
    });

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});
