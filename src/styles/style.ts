import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ===== Layout =====
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // ===== Text =====
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 12,
  },

  text: {
    fontSize: 14,
    color: '#333333',
  },

  errorText: {
    color: '#d32f2f',
    marginTop: 8,
  },

  // ===== Inputs / Buttons =====
  buttonSpacer: {
    marginTop: 12,
  },

  // ===== Lists =====
  list: {
    flex: 1,
  },
});

export default styles;
