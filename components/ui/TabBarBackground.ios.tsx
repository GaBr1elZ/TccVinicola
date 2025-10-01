import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

export default function BlurTabBarBackground() {
  return (
    <BlurView
      tint="light"
      intensity={95}
      style={[StyleSheet.absoluteFill, styles.blur]}
    />
  );
}

const styles = StyleSheet.create({
  blur: {
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
