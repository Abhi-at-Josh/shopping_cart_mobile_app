import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screen/LoginSreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

const mockReset = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    reset: mockReset,
    navigate: mockNavigate,
  }),
}));

jest.spyOn(Alert, 'alert');

describe('LoginScreen', () => {
  const setIsLoggedInMock = jest.fn();

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen setIsLoggedIn={setIsLoggedInMock} />);
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('shows validation errors for empty inputs', async () => {
    const { getByText, getAllByText } = render(<LoginScreen setIsLoggedIn={setIsLoggedInMock} />);
    fireEvent.press(getByText('Sign In'));
    
    await waitFor(() => {
    const requiredTexts = getAllByText('Required');
    expect(requiredTexts.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('shows error alert for invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen setIsLoggedIn={setIsLoggedInMock} />);

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'wrong@email.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'wrongpass');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid email or password');
    });
  });

  it('logs in successfully with correct credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen setIsLoggedIn={setIsLoggedInMock} />);

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'Abhijeet@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), '123456');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
      expect(setIsLoggedInMock).toHaveBeenCalledWith(true);
      expect(mockReset).toHaveBeenCalled();
    });
  });
});
0