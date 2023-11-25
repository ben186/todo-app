import React, { FC, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface CheckBoxProps {
  size: number,
  color?: string
  checked?: boolean,
  onCheckToggled?: (isChecked: boolean) => void;
}

const CheckBox: FC<CheckBoxProps> = ({ size, color, checked, onCheckToggled }) => {
  const [isChecked, setIsChecked] = useState(checked);

  if (isChecked !== checked) setIsChecked(checked);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
    
    if (onCheckToggled !== undefined) {
      onCheckToggled(!isChecked);
    }
  };

  return (
    <>
      {
        isChecked ? 
        <Ionicons name='checkmark-circle' size={size} color={color} onPress={toggleCheck}/> : 
        <Ionicons name='ellipse-outline' size={size} color={color} onPress={toggleCheck}/>
      }
    </>
  )
}

export default CheckBox;