import * as THREE from 'three'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { useFrame, ReactThreeFiber, useThree } from 'react-three-fiber';
import NodeSelectionStore from '../../stores/nodes/NodeSelection.store';


import { Plane } from 'drei'
import { Floor } from '../Floor';


// type PlaneType = typeof Plane;

interface RCNodeTranslatorProps {
  detectionPlane: THREE.Object3D;
}

export const RCNodeTranslator: React.FC<RCNodeTranslatorProps> = (props) => {

//   const { gl, camera, raycaster, scene } = useThree()
//   const nodeSelectionStore = useContext(NodeSelectionStore)

//   const detectionPlane = useRef<any>()

//   const [offset, setOffset] = useState<THREE.Vector3>(new THREE.Vector3())

//   // const plane = useRef<THREE.Object3D>()
//   const [selection, setSelection] = useState<THREE.Object3D>();

//   const subscribeEvents = () => {
//     // window.addEventListener('mousedown', onDocumentMouseDown);
//     // window.addEventListener('mousemove', onDocumentMouseMove);
//     // window.addEventListener('mouseup', onDocumentMouseUp);
//     return unsubscribeEvents
//   }

//   const unsubscribeEvents = () => {
//     window.removeEventListener('mousedown', onDocumentMouseDown);
//     window.removeEventListener('mousemove', onDocumentMouseMove);
//     window.removeEventListener('mouseup', onDocumentMouseUp);
//   }

//   const getMouseXYandVector =  (event: any) => {
//     const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//     const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
//     const vector = new THREE.Vector3(mouseX, mouseY, 1);
//     // // Get 3D vector from 3D mouse position using 'unproject' function
//     // vector.unproject(camera);
//     // raycaster.set(camera.position, vector.sub(camera.position).normalize())

//     return { mouseX, mouseY, vector }
//   }

//   const onDocumentMouseDown = (event: any) => {
    
//     if (!detectionPlane.current) return 

//     const { mouseX, mouseY, vector } = getMouseXYandVector(event)
//     raycaster.set(camera.position, vector.sub(camera.position).normalize())
    
//     const intersects = raycaster.intersectObjects([detectionPlane.current]);
//     // if (intersects.length == 0) return
//     // if (intersects![0]) { setSelection(intersects![0].object) }
    
    
    
//     // plane.current
//     if (!nodeSelectionStore.selectedNode) return
//     // const intersects = raycaster.intersectObject(plane.current!);

//     console.log("onDocumentMouseDown", offset)

//     setOffset(offset.copy(intersects[0].point).sub(detectionPlane.current!.position));

//     console.log("onDocumentMouseDown", offset)

//   }

//   const onDocumentMouseMove = (event: any) => {
//     event.preventDefault();

    
//     // Get mouse position
//     const { mouseX, mouseY } = getMouseXYandVector(event)

    
    
//     if (detectionPlane.current && nodeSelectionStore.selectedNode) {
//       // Check the position where the plane is intersected
//       const intersects = raycaster.intersectObject(detectionPlane.current);
//       console.log( mouseX, mouseY )
//       console.log("onDocumentMouseMove", intersects[0].point)
//       // Reposition the object based on the intersection point with the plane
//       // nodeSelectionStore.selectedNode.position.copy(intersects[0].point);

  
// //@ts-ignore
//       nodeSelectionStore.selectedNode.position.copy( intersects[0].point ).normalize()
      
//       // .add(intersects![0]!.face.normal );
//       // nodeSelectionStore.selectedNode.position.divideScalar(0.25).floor().multiplyScalar(0).addScalar(0.25);
//       // nodeSelectionStore.selectedNode.position.y = 1
          
//     } else if (nodeSelectionStore.selectedNode) {
//       const intersects = raycaster.intersectObjects([nodeSelectionStore.selectedNode.mesh!]);
//       if (intersects.length > 0) {
//         // detectionPlane.current!.position.copy(intersects[0].object.position);
//         // detectionPlane.current.lookAt(camera.position)
//       }
//     }
//   }

//   const onDocumentMouseUp = (event: any) => {
//     console.log("onDocumentMouseUp")
//    // Enable the controls
//   //  lesson10.controls.enabled = true;
//   //  lesson10.selection = null;

//   // nodeSelectionStore.deSelectNode()
//   }

//   useEffect(() => subscribeEvents(), []);


  // return (
  //   <Plane ref={detectionPlane} rotation-x={- Math.PI / 2} receiveShadow>
  //     <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
  //     <meshPhongMaterial attach="material" color={Gray} />
  //   </Plane>
  // )

  return (
    <Plane rotation-x={- Math.PI / 2} receiveShadow >
      <planeBufferGeometry attach="geometry" args={[500, 500, 8, 8]} />
      <meshBasicMaterial attach="material" color="0xffffff" />
    </Plane>
  )
}

const Gray = "#2e2f33"
const Black = "#000000"
const White = "#e3e3e3"

// export const Floor=  React.forwardRef((props, ref) => {
//   return (
//     <Plane ref={ref} rotation-x={- Math.PI / 2} receiveShadow>
//       <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
//       <meshPhongMaterial attach="material" color={Gray} />
//     </Plane>
//   )
// })