"use client";

import FormLogin from "../components/FormLogin/FormLogin";

export default function Login() {
  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>
          <FormLogin />
        </div>
      </div>
    </main>
  );
}
