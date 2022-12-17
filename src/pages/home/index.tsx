import { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Page1() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState('');
  const [msg, set_msg] = useState('');

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


  const emit_msg = () => {
    console.log('emit_msg');
    socket.emit('msg', msg);
  };

  return (
    <div className="container">
      <div className="row">
        <p>Connected: {'' + isConnected}</p>
        <p>Last pong: {lastPong || '-'}</p>
        <label className="form-label">MSG</label>
        <input
          className="form-control"
          type="text"
          name="msg"
          id="msg"
          onChange={(e) => set_msg(e.target.value)}
        />
        <button className="btn btn-primary" onClick={emit_msg}>
          Send ping
        </button>
      </div>
    </div>
  );
}

export default Page1;
