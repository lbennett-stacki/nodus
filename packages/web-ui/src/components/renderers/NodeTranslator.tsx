import React, { useContext, useRef, useEffect } from "react";
import { extend, useThree, ReactThreeFiber } from "react-three-fiber";
import { Object3D } from "three";
import { DragControl } from "../controls/DragControl";
import NodeSelectionStore from "../../stores/nodes/NodeSelection.store";
import { observer } from "mobx-react-lite";
import { axisValueSnapper } from "../nodes/BaseNode";

extend({ DragControl });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      dragControl: ReactThreeFiber.Object3DNode<
        DragControl,
        typeof DragControl
      >;
    }
  }
}

export const NodeTranslator: React.FC = observer(() => {
  const {
    gl: { domElement },
    camera,
    scene
  } = useThree();
  const nodeSelectionStore = useContext(NodeSelectionStore);
  const instance = nodeSelectionStore.selectedNode
    ? [nodeSelectionStore.selectedNode.mesh]
    : [];
  const ref = useRef<DragControl>();

  useEffect(() => {
    ref.current?.addEventListener("dragstart", function(event: any) {
    });

    ref.current?.addEventListener("drag", function(event: any) {
      event.object.position.y = 1;
    });

    ref.current?.addEventListener("dragend", function(event: any) {
      event.object.position.y = 1;
      event.object.position.z = axisValueSnapper(event.object.position.z);
      event.object.position.x = axisValueSnapper(event.object.position.x);
    });
  }, [ref.current]);

  return (
    <dragControl
      ref={ref}
      args={[
        instance,
        scene.children[scene.children.length - 1],
        camera,
        domElement,
        { cancel: { onMouseLeave: false } }
      ]}
    />
  );
});
