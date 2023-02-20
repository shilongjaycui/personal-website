import { render, screen } from '@testing-library/react';
import App from './App';
import { Router } from "react-router-dom";

test('renders my name', () => {
  const name = 'jay'
  expect(name).toBe('jay')
});