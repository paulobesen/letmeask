<h1 align="center">
  Let me ask!
</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-demo">Demo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-próximos-ajustes">Próximos ajustes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">
</p>

<br>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)

## 💻 Projeto

O LetMeAsk permite que usuário faça login com o gmail e crie uma sala para perguntas em live, seus espectadores podem por meio de um código, acessar essa sala para fazerem perguntas. Nessa sala, os espectadores podem criar perguntas e também votar em perguntas, onde o administrador poderá também gerir essas perguntas, detacando-a, anotando como respondida ou deletando a mesma.

## 🔖 Demo

Você pode visualizar uma demonstração do projeto através [desse link](https://letmeask-9b839.web.app/).

## 🚀 Como executar

- Clone o repositório
- Crie o arquivo .env.local na raiz do projeto (este arquivo terá informações de acesso ao firebase)
- Instale as dependências com `yarn`
- Inicie o servidor com `yarn start`

Exemplo de .env.local:
```sh
REACT_APP_API_KEY="xxxxxxx"
REACT_APP_AUTH_DOMAIN="xxxxxxx"
REACT_APP_DATABASE_URL="xxxxxxx"
REACT_APP_PROJECT_ID="xxxxxxx"
REACT_APP_STORAGE_BUCKET="xxxxxxx"
REACT_APP_MESSAGING_SENDER_ID="xxxxxxx"
REACT_APP_APP_ID="xxxxxxx"
```

Agora você pode acessar [`localhost:3000`](http://localhost:3000) do seu navegador.

## ❗❗ Próximos ajustes

- CSS na página de login e criação de salas
- Tema dark

## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
