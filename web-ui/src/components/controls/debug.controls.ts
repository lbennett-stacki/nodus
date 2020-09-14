import * as THREE from 'three'
import { ControlsProvider, Controls, useControl, ControlOptions } from 'react-three-gui';

export const useVector3Controls = (
  name: string,
  groupBy: string,
  defaultValues?: THREE.Vector3
) => {
  const config: ControlOptions = {
    type: 'number',
    group: groupBy,
    distance: 1,
    scrub: true,
    min: -Infinity,
    max: Infinity,
    // spring: true,
  };

  const values = defaultValues ?? new THREE.Vector3(0,0,0)
  const x = useControl(`${name} X`, { ...config, value: values.x });
  const y = useControl(`${name} Y`, { ...config, value: values.y });
  const z = useControl(`${name} Z`, { ...config, value: values.z });
  return { x, y, z };
}

export const useBaseNodeControls = (
  name: string,
  defaultPosition?: THREE.Vector3
) => {
  const config: ControlOptions = {
    type: 'number',
    group: name,
    min: -20,
    max: 20,
  };
  const values = defaultPosition ?? new THREE.Vector3(0,0,0)
  const x = useControl(`${name} X`, { ...config, value: values.x });
  const z = useControl(`${name} Z`, { ...config, value: values.z });
  return { x, z };
}
