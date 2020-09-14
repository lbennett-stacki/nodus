import React from 'react';
import { Input } from './Input';

export interface NodeEditorFormProps {
  selectedNodeName?: string;
  onClose?: VoidFunction
}

const CloseButton: React.FC<{ onClick?: VoidFunction }> = ({ onClick }) => (
  <button 
    className="bg-transparent hover:bg-red-700 hover:bg-opacity-50 text-gray-800 font-semibold hover:text-white p-2 hover:border-transparent rounded"
    onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  </button>
)

export const NodeEditorForm: React.FC<NodeEditorFormProps> = ({ onClose, ...props }) => {
  return (
    <div className="px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div className="mt-6 m-6 absolute top-0 right-0">
        <CloseButton onClick={onClose}/>
      </div>
      <p className="text-base mb-8">Node editor</p>
      <Input
        label="Name"
        smallLabel="Make it as long and as crazy as you'd like" 
        passProps={{
          value: props.selectedNodeName,
          disabled: true
        }}/>
    </div>
  )
}