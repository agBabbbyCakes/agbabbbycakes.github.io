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

    // Hardcoded JSON data
    const jsonData = [
        {"task_name":"app_startup","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:34.594024+00:00","block_number":null,"metrics":{"block_number":{"type":"scalar","data":0}}},
        {"task_name":"exec_event1","execution_time":0.0,"error":null,"completed":"2024-04-06T04:50:37.648587+00:00","block_number":19594412,"metrics":{"amount":{"type":"scalar","data":410694555}}},
        // Add all other objects similarly
    ];

    const data = {
        id: 'v1ForceGraph-data',
        nodes: jsonData.map((entry, index) => ({
            id: index,
            label: entry.task_name,
            x: Math.random() * width,
            y: Math.random() * height
        })),
        links: jsonData.map((entry, index, arr) => ({
            source: index,
            target: index + 1 < arr.length ? index + 1 : 0
        })).slice(0, -1)
    };

    // D3 Force Simulation
    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Three.js objects
    const nodeGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    data.nodes.forEach(node => {
        const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
        mesh.position.x = node.x;
        mesh.position.y = node.y;
        scene.add(mesh);
        node.mesh = mesh;
    });

    const linkMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

    data.links.forEach(link => {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(data.nodes[link.source].x, data.nodes[link.source].y, 0),
            new THREE.Vector3(data.nodes[link.target].x, data.nodes[link.target].y, 0)
        );
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
            link.line.geometry.vertices[0].set(data.nodes[link.source].x, data.nodes[link.source].y, 0);
            link.line.geometry.vertices[1].set(data.nodes[link.target].x, data.nodes[link.target].y, 0);
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