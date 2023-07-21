import { MeshReflectorMaterial, PresentationControls } from '@react-three/drei'
import React from 'react'
import { Stage } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { MeshBasicMaterial } from 'three'

// car
export const CarView = () => {
  const fbx = useLoader(FBXLoader, '/models/car scene.fbx')
  // const gltf = useLoader(GLTFLoader, './models/chair.gltf')
  return (
    <PresentationControls speed={1.5} global zoom={0.7}
      polar={[-0.1, Math.PI / 4]}>
      <Stage environment={"city"} intensity={0.6} contactShadow={false} >
        <Suspense fallback={null}>
          <primitive object={fbx} />
        </Suspense>
      </Stage>
    </PresentationControls>
  )
}


// art piece
export const ArtPiece = () => {
  const obj = useLoader(OBJLoader, '/models/Artifacts_Mesh.obj')
  // const gltf = useLoader(GLTFLoader, './models/chair.gltf')
  return (
    <PresentationControls speed={1.5} global zoom={0.7}
      polar={[-0.1, Math.PI / 4]}>
      <Stage environment={"city"} intensity={0.6} contactShadow={false} >
        <Suspense fallback={null}>
          <primitive object={obj} />
        </Suspense>
      </Stage>
    </PresentationControls>
  )
}

// export default Jewelry360View

// bike
// const Jewelry360View = () => {
//   const fbx = useLoader(FBXLoader, '/models/bike.fbx')
  
//   // Set material and color
//   const material = new MeshBasicMaterial({ color: 'yellow' });

//   // Traverse through all meshes in the FBX model
//   const setMaterial = (object) => {
//     if (object.isMesh) {
//       object.material = material;
//     }
//   };

//   fbx.traverse(setMaterial);
//   // const gltf = useLoader(GLTFLoader, './models/chair.gltf')
//   return (
//     <PresentationControls speed={1.5} global zoom={0.7}
//       polar={[-0.1, Math.PI / 4]}>
//       <Stage environment={"city"} intensity={0.6} contactShadow={false} >
//         <Suspense fallback={null}>
//           <primitive object={fbx} />
//         </Suspense>
//       </Stage>
//     </PresentationControls>
//   )
// }
