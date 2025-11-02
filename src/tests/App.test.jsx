import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('App Component', () => {
  test('renders login form initially', () => {
    render(<App />);
    const loginElements = screen.getAllByText(/Iniciar Sesión/i);
    expect(loginElements.length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  test('logs in with valid username and submits form', async () => {
    render(<App />);
    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Bienvenido, admin/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Tareas/i })).toBeInTheDocument();
  });

  test('navigates to Tasks view after login', async () => {
    render(<App />);
    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Bienvenido, admin/i)).toBeInTheDocument();
    });
    const tasksButton = screen.getByRole('button', { name: /Tareas/i });
    fireEvent.click(tasksButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Título de la tarea/i)).toBeInTheDocument();
    });
  });

  test('adds a new task', async () => {
    render(<App />);
    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Bienvenido, admin/i)).toBeInTheDocument();
    });
    const tasksButton = screen.getByRole('button', { name: /Tareas/i });
    fireEvent.click(tasksButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Título de la tarea/i)).toBeInTheDocument();
    });
    const titleInput = screen.getByPlaceholderText(/Título de la tarea/i);
    const dateInput = screen.getByTestId('due-date-input');
    const addButton = screen.getByText(/Agregar Tarea/i);

    fireEvent.change(titleInput, { target: { value: 'Nueva Tarea' } });
    fireEvent.change(dateInput, { target: { value: '2025-07-15' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Nueva Tarea/i)).toBeInTheDocument();
    });
  });

  test('shows Users view for admin', async () => {
    render(<App />);
    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Bienvenido, admin/i)).toBeInTheDocument();
    });
    const usersButton = screen.getByText(/Usuarios/i);
    fireEvent.click(usersButton);

    await waitFor(() => {
      expect(screen.getByText(/Gestión de Usuarios/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Lista de usuarios/i)).toBeInTheDocument();
  });
});