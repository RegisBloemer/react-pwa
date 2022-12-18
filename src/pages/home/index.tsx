import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Page1() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState('');
  const [msg, set_msg] = useState('');
  const [salas, set_salas] = useState([
    [22, false],
    [42, false],
    [69, false],
  ]);
  const [cookies, set_cookie] = useCookies(['id']);

  useEffect(() => {
    console.log('cookies', cookies);
    socket.on('connect', () => {
      console.log('connect');
      setIsConnected(socket.connected);
      socket.emit('authentication', { id: cookies.id });
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
        <p>ID: {cookies.id}</p>
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

        <ul className="list-group list-group-flush list-group-numbered">
          {salas
            ? salas.map((e, i) => {
                return (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    Sala {e[0]}{' '}
                    <button
                      className="btn btn-primary rounded-pill"
                      onClick={() => {
                        const status = !salas[i][1];
                        salas[i][1] = status;
                        set_salas([...salas]);
                        socket.emit('room', [i, status]);
                      }}
                    >
                      {e[1] ? 'Aberto' : 'Fechada'}
                    </button>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}

export default Page1;
