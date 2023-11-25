import React from 'react';
import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
}

export interface ButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
}

export function Button(props: ButtonProps) {
  const {
    style: $styleOverride,
    textStyle: $textStyleOverride,
    children,
    disabled,
    ...rest
  } = props;

  const $viewStyle = ({ pressed }: PressableStateCallbackType) => {
    return [
      $baseStyle, $styleOverride, pressed ? $basePressedStyle : {}, disabled && $baseDisabledStyle
    ]
  }

  return (
    <Pressable disabled={disabled} style={$viewStyle} accessibilityRole='button' {...rest}>
      <Text style={[$baseTextStyle, $textStyleOverride, disabled && $baseDisabledTextStyle]}>
        {children}
      </Text>
    </Pressable>
  )
}

export default Button;

const $baseStyle: ViewStyle = {
  width: '100%',
  backgroundColor: '#353ba7',
  justifyContent: 'center',
  paddingVertical: 15
}

const $baseDisabledStyle: ViewStyle = {
  backgroundColor: '#555555'
}

const $basePressedStyle: ViewStyle = {
  backgroundColor: '#698ae8'
}

const $baseTextStyle: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  alignSelf: 'center',
  color: '#ffffff'
}

const $baseDisabledTextStyle: TextStyle = {
  color: '#000000'
}