import * as THREE from "three";
import React, { useContext, Suspense } from "react";
import { Canvas as THREECanvas } from "react-three-fiber";
import { ControlsProvider, Controls } from "react-three-gui";
import { MapControls } from "drei";

import { Floor } from "../Floor";
import { Outliner } from "../effects/Outline.effects";
import { NodeTranslator } from "./NodeTranslator";
import { observer } from "mobx-react-lite";
import NodeSelectionStore from "../../stores/nodes/NodeSelection.store";

export interface IsometricRendererProps {
  gridHelper?: boolean;
}

const Lights: React.FC = () => {
  return (
    <>
      <ambientLight intensity={3.5} />
      <spotLight
        intensity={2}
        position={[-35, 35, 35]}
        angle={1}
        penumbra={1}
        castShadow
      />
      <spotLight
        intensity={2}
        position={[-35, 0, 35]}
        angle={1}
        penumbra={1}
        castShadow
      />
    </>
  );
};

const PanControl = observer(() => {
  const zoomRange = { minZoom: 30, maxZoom: 40 };
  const store = useContext(NodeSelectionStore);
  return (
    <MapControls
      enabled={!!!store.selectedNode}
      enableRotate={false}
      dampingFactor={0.1}
      {...zoomRange}
      enablePan={!!!store.selectedNodeId}
    />
  );
});

export const IsometricRenderer: React.FC<IsometricRendererProps> = ({
  children,
  ...props
}) => {
  return (
    <ControlsProvider>
      <THREECanvas
        colorManagement
        orthographic
        camera={{
          zoom: 40,
          position: [35, 35, 35] as [number, number, number],
          rotation: [Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 20, "XYZ"]
        }}
        gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("white");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {props.gridHelper && <gridHelper args={[1000, 1000]} />}

        <NodeTranslator />

        <PanControl />

        <Lights />

        {children}

        <Floor />

        <Suspense fallback={null}>
          <Outliner />
        </Suspense>
      </THREECanvas>
      <Controls />
    </ControlsProvider>
  );
};
