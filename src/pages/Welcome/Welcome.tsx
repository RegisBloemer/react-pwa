import { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Page1() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState('');
  const [name, set_name] = useState('');
  const [password, set_password] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect');
      setIsConnected(socket.connected);
    });
    socket.on('authenticated', () => {
      console.log('cliente foi autorizado');
    });

    socket.on('unauthorized', (err) => {
      console.log('Erro na autenticacao:', err.message);
    });

    socket.on('reconnecting', (err) => {
      console.log('reconectando...');
    });

    socket.on('msg', (data) => {
      console.log('recebeu mensagem adm:' + JSON.stringify(data));
      setLastPong('recebeu mensagem adm:' + JSON.stringify(data));
    });
    socket.on('normal', (data) => {
      console.log('recebeu mensagem normal:' + JSON.stringify(data));
    });

    socket.on('disconnect', () => {
      console.log('desconectou no servidor');
      setIsConnected(socket.connected);
    });
  }, []);

  const join_room = () => {
    console.log('join_room');
    socket.emit('authentication', { username: name, password: password });
    socket.emit('entraSala', { id: 'salaDisciplinaTOPICOS' });
    socket.emit('listaSalas', '');
  };

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <input type="text" name="name" id="name" onChange={(e) => set_name(e.target.value)} />
      <input type="password" name="password" id="password" onChange={(e) => set_password(e.target.value)} />
      <button onClick={join_room}>Send ping</button>
    </div>
  );
}

export default Page1;
