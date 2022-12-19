import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Page1() {
  const navigate = useNavigate();
  const [salas, set_salas] = useState([
    [22, false],
    [42, false],
    [69, false],
  ]);

  const [cookies, set_cookie] = useCookies(['id']);

  useEffect(() => {
    console.log('cookies', cookies);
    if (cookies.id) {
      socket.on('connect', () => {
        console.log('connect');

        socket.emit('authentication', { id: cookies.id });
      });
      socket.on('authenticated', () => {
        console.log('cliente foi autorizado');
      });

      socket.on('unauthorized', (err) => {
        console.log('Erro na autenticacao:', err.message);
        navigate('/login');
      });

      socket.on('reconnecting', (err) => {
        console.log('reconectando...');
      });

      socket.on('room', (data) => {
        console.log('room:', data);
        salas[data[0]][1] = data[1];
        set_salas([...salas]);
      });

      socket.on('disconnect', () => {
        console.log('desconectou no servidor');
      });
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
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
