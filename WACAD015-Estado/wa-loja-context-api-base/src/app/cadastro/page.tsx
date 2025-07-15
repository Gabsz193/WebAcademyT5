"use client";

import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  nome: string;
  email: string;
  emailConfirmar: string;
  senha: string;
};

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nome"
                  aria-describedby="nome"
                  {...register("nome", { required: true })}
                />
                {errors.nome && (
                  <span className="text-danger">Esse campo é obrigatório</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  aria-describedby="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-danger">Esse campo é obrigatório</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmarEmail" className="form-label">
                  Confirmar email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="confirmarEmail"
                  aria-describedby="confirmarEmail"
                  {...register("emailConfirmar", { required: true })}
                />
                {errors.email && (
                  <span className="text-danger">Esse campo é obrigatório</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="senha"
                  {...register("senha", { required: true, minLength: 6 })}
                />

                {errors.senha?.type === "required" && (
                  <span className="text-danger">Esse campo é obrigatório</span>
                )}

                {errors.senha?.type === "minLength" && (
                  <span className="text-danger">
                    Minímo de 6 (seis) caracteres{" "}
                  </span>
                )}
              </div>

              <div className="d-grid col-12">
                <button type="submit" className="btn btn-success">
                  Confirmar cadastro
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/login" className="btn btn-link">
                  já possuo cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
