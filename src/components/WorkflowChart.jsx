
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function WorkflowChart({ steps }) {
  const nodes = steps.map((step, index) => ({
    id: String(index + 1),
    position: { x: 100, y: index * 100 },
    data: { label: step }
  }));

  const edges = steps.slice(0, -1).map((_, index) => ({
    id: `e${index + 1}-${index + 2}`,
    source: String(index + 1),
    target: String(index + 2)
  }));

  return (
    <div style={{ height: 500, background: "white", borderRadius: "12px" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default WorkflowChart;