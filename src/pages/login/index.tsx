import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Page1() {
  const navigate = useNavigate();
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [cookies, set_cookie] = useCookies(['id']);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('email', email);
    console.log('pass', password);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          pass: password,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        if (data.id === undefined) {
          alert('Senha ou email incorreto!');
        } else {
          set_cookie('id', data.id, { path: '/' });
          navigate('/');
        }
      } else {
        console.log(data);
        alert(data.msg);
      }
    } catch (err) {
      console.log('fetch', err);
    }
  };

  return (
    <main className="container">
      <form className="needs-validation" id="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email-i" className="form-label">
            Endereço de e-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="email-i"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => set_email(e.target.value)}
            required
          />
          <div className="valid-feedback">Parece bom!</div>
          <div className="invalid-feedback">Por favor insira um e-mail válido</div>
        </div>
        <div className="mb-3">
          <label htmlFor="pass-i" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="pass-i"
            value={password}
            onChange={(e) => set_password(e.target.value)}
            required
          />
          <div className="valid-feedback">Parece bom!</div>
          <div className="invalid-feedback">Por favor insira uma senha válida</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </main>
  );
}

export default Page1;
