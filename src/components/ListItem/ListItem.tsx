import { FC, ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';

export interface ListItemProps extends PressableProps {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  text: string,
  children?: ReactNode
}

const ListItem: FC<ListItemProps> = (props: ListItemProps) => {
  const {
    style: $styleOverride,
    textStyle: $textStyleOverride,
    children,
    ...rest
  } = props;

  return (
    <Pressable style={[$baseStyle, $styleOverride]} {...rest}>
      <Text numberOfLines={1} ellipsizeMode={'tail'} style={[$baseTextStyle, $textStyleOverride]}>{props.text}</Text>
      {children}
    </Pressable>
  );
}

export default ListItem;

const $baseStyle: ViewStyle = {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: 'white'
}

const $baseTextStyle: TextStyle = {
  flexShrink: 1,
  fontSize: 16
}