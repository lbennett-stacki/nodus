import React, { useState, useContext } from 'react'
import { NodeEditorForm } from '../forms/NodeEditor'
import NodeSelectionStore from '../../stores/nodes/NodeSelection.store';
import { observer } from "mobx-react-lite";

interface SideMenuProps {
  isOpen?: boolean;
}

export const SideMenu: React.FC<SideMenuProps> = observer(({ ...props }) => {

  const nodeSelectionStore = useContext(NodeSelectionStore)
  const { selectedNode, selectedNodeId, deSelectNode } = nodeSelectionStore

  // const [isOpen, setIsOpen] = useState<boolean>(true);
  const isOpen = selectedNode
  const className = "transform top-0 left-0 min-w-1/4 max-w-2xl bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
  const isOpenClass = isOpen ? 'translate-x-0' : '-translate-x-full'

  
  const editorOnClose = () => { 
    // setIsOpen(false) 
    deSelectNode()
  }

  return (
    <aside className={`${className} ${isOpenClass}`}>
      <NodeEditorForm
        onClose={editorOnClose}
        selectedNodeName={selectedNodeId}/>
      {/* <span>hello</span>
      <div className="absolute bottom-0 right-0">
        <HoverScaleUp>
          <button className="rounded-full h-24 w-24 bg-red-100 mr-8 mb-8">
            Hover me
          </button>
        </HoverScaleUp> */}
      {/* </div> */}
    </aside>
  )
})