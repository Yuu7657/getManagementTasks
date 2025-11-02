import React, { useState } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('tasks');
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Tarea 1', status: 'pendiente', dueDate: '2025-07-15' },
    { id: 2, title: 'Tarea 2', status: 'en progreso', dueDate: '2025-07-20' },
  ]);

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    setUser({ username, role: username === 'admin' ? 'administrador' : 'empleado' });
  };
  const handleLogout = () => setUser(null);
  const handleAddTask = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const dueDate = event.target.elements.dueDate.value;
    setTasks([...tasks, { id: tasks.length + 1, title, status: 'pendiente', dueDate }]);
    event.target.reset();
  };

  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Tareas</h1>
          {user && (
            <div className="flex items-center space-x-4">
              <span>Bienvenido, {user.username}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </header>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex space-x-4">
          <button onClick={() => setCurrentView('tasks')} className={`px-4 py-2 rounded ${currentView === 'tasks' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
            Tareas
          </button>
          <button onClick={() => setCurrentView('calendar')} className={`px-4 py-2 rounded ${currentView === 'calendar' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
            Calendario
          </button>
          <button onClick={() => setCurrentView('reports')} className={`px-4 py-2 rounded ${currentView === 'reports' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
            Reportes
          </button>
          {user?.role === 'administrador' && (
            <button onClick={() => setCurrentView('users')} className={`px-4 py-2 rounded ${currentView === 'users' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
              Usuarios
            </button>
          )}
        </div>
      </nav>
      <main className="container mx-auto p-4">
        {!user ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        ) : currentView === 'tasks' ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Gestión de Tareas</h2>
            <form onSubmit={handleAddTask} className="mb-4"> {/* Simplificado el manejador */}
              <div className="flex space-x-4">
                <input type="text" name="title" placeholder="Título de la tarea" className="p-2 border rounded flex-1" required />
                <input type="date" name="dueDate" data-testid="due-date-input" className="p-2 border rounded" required />
                <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                  Agregar Tarea
                </button>
              </div>
            </form>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className="bg-white p-4 rounded shadow flex justify-between">
                  <div>
                    <span>{task.title}</span>
                    <span className="block text-sm text-gray-600">Estado: {task.status} | Vence: {task.dueDate}</span>
                  </div>
                  <select onChange={(e) => setTasks(tasks.map((t) => t.id === task.id ? { ...t, status: e.target.value } : t))} className="p-2 border rounded">
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En Progreso</option>
                    <option value="completada">Completada</option>
                  </select>
                </li>
              ))}
            </ul>
          </div>
        ) : currentView === 'calendar' ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Calendario</h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                <div key={day} className="font-bold">{day}</div>
              ))}
              {Array(35).fill().map((_, i) => (
                <div key={i} className="p-2 border rounded">
                  {tasks.some((task) => new Date(task.dueDate).getDate() === i + 1) ? (
                    <span className="text-blue-500">Tarea</span>
                  ) : i + 1}
                </div>
              ))}
            </div>
          </div>
        ) : currentView === 'reports' ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Reportes</h2>
            <div className="bg-white p-4 rounded shadow">
              <p>Tareas Completadas: {tasks.filter((t) => t.status === 'completada').length}</p>
              <p>Tareas Pendientes: {tasks.filter((t) => t.status === 'pendiente').length}</p>
              <p>Tareas en Progreso: {tasks.filter((t) => t.status === 'en progreso').length}</p>
            </div>
          </div>
        ) : currentView === 'users' && user?.role === 'administrador' ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>
            <div className="bg-white p-4 rounded shadow">
              <p>Lista de usuarios (simulada):</p>
              <ul className="space-y-2">
                <li>Usuario 1 - Rol: Administrador</li>
                <li>Usuario 2 - Rol: Empleado</li>
              </ul>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;