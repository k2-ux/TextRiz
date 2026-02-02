import { AppState, AppStateStatus } from 'react-native';

export const watchAppState = (
  onForeground: () => void,
  onBackground: () => void,
) => {
  let currentState = AppState.currentState;

  const subscription = AppState.addEventListener(
    'change',
    (nextState: AppStateStatus) => {
      if (currentState.match(/inactive|background/) && nextState === 'active') {
        onForeground();
      }

      if (nextState.match(/inactive|background/)) {
        onBackground();
      }

      currentState = nextState;
    },
  );

  // ✅ RETURN CLEANUP FUNCTION
  return () => {
    subscription.remove();
  };
};
