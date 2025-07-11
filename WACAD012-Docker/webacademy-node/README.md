# Aplicação Node.js WebAcademy

Esta é uma aplicação web Node.js simples que exibe "Use Docker. Gostoso demais." em uma tag H1.

## 🚀 Primeiros Passos

Estas instruções ajudarão você a obter uma cópia do projeto em execução em sua máquina local para fins de desenvolvimento e teste.

---

### 📋 Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/download/) e o [npm](https://www.npmjs.com/get-npm) instalados. Se você planeja usar Docker, certifique-se de ter o [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.

---

### 💻 Instalação

1.  **Clone o repositório (se aplicável):**

    ```bash
    git clone <your-repository-url>
    cd webacademy-node
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

---

### ▶️ Executando a Aplicação

Você pode executar esta aplicação diretamente usando Node.js ou via Docker.

---

#### Executando com Node.js

Para iniciar a aplicação:

```bash
npm start
```

O servidor estará escutando em `http://localhost:8000/`.

---

#### Executando com Docker

1.  **Construa a imagem Docker:**

    ```bash
    docker build -t webacademy-node-app .
    ```

2.  **Execute o contêiner Docker:**

    ```bash
    docker run -p 8000:8000 webacademy-node-app
    ```

    A aplicação estará acessível em `http://localhost:8000/`.

---

## 📁 Estrutura do Projeto

- `index.js`: O arquivo principal da aplicação que cria um servidor HTTP.
- `package.json`: Define metadados e scripts do projeto.
- `Dockerfile`: Especifica como construir a imagem Docker para a aplicação.
