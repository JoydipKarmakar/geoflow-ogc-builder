document.addEventListener("DOMContentLoaded", () => {
    const runBtn = document.getElementById("runWorkflowBtn");
    const outputConsole = document.getElementById("outputConsole");
    const canvas = document.getElementById("workflowCanvas");
    const sidebarNodes = document.querySelectorAll(".node-item");

    // ==========================================
    // 1. DRAG AND DROP LOGIC
    // ==========================================

    // Tell the browser what data we are dragging when we pick up a sidebar item
    sidebarNodes.forEach(node => {
        node.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("nodeType", node.getAttribute("data-type"));
            e.dataTransfer.setData("nodeText", node.innerText);
        });
    });

    // We must prevent default behavior on dragover to allow dropping
    canvas.addEventListener("dragover", (e) => {
        e.preventDefault(); 
    });

    // Handle what happens when we drop the item onto the canvas
    canvas.addEventListener("drop", (e) => {
        e.preventDefault();
        
        // Remove the "Drag nodes here..." placeholder text
        const placeholder = canvas.querySelector('.placeholder-text');
        if (placeholder) placeholder.style.display = 'none';

        // Retrieve the data we saved during dragstart
        const nodeType = e.dataTransfer.getData("nodeType");
        const nodeText = e.dataTransfer.getData("nodeText");

        // Create a brand new visual node for the canvas
        const newCanvasNode = document.createElement("div");
        newCanvasNode.classList.add("canvas-node");
        newCanvasNode.innerText = nodeText;
        newCanvasNode.dataset.type = nodeType;

        // Calculate exactly where the mouse was dropped relative to the canvas
        const rect = canvas.getBoundingClientRect();
        const dropX = e.clientX - rect.left - 50; // Center the node roughly on mouse X
        const dropY = e.clientY - rect.top - 20;  // Center the node roughly on mouse Y

        newCanvasNode.style.left = `${dropX}px`;
        newCanvasNode.style.top = `${dropY}px`;

        // Add the new node to the screen
        canvas.appendChild(newCanvasNode);
    });

    // ==========================================
    // 2. API EXECUTION LOGIC
    // ==========================================
    runBtn.addEventListener("click", () => {
        outputConsole.innerHTML += "<p>> Compiling workflow...</p>";
        
        // Mock data to simulate compiling the nodes on the canvas
        const workflowData = {
            nodes: [
                { id: "node1", type: "buffer", params: { distance: 100 } },
                { id: "node2", type: "intersect" }
            ],
            edges: [
                { from: "node1", to: "node2" }
            ]
        };

        fetch('/api/execute/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workflowData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                outputConsole.innerHTML += `<p style="color: #00ff00;">> Success! Job ID: ${data.job_id}</p>`;
                outputConsole.innerHTML += `<p style="color: #00ff00;">> ${data.message}</p>`;
            } else {
                outputConsole.innerHTML += `<p style="color: red;">> Error: ${data.message}</p>`;
            }
            // Auto-scroll console to the bottom
            outputConsole.scrollTop = outputConsole.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
            outputConsole.innerHTML += `<p style="color: red;">> Server connection failed.</p>`;
        });
    });
});