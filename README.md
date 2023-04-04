<h4 align="center">
  <img width="180px" alt="trybe wallet logo" src="https://user-images.githubusercontent.com/100851855/229935378-cc2d192a-c0a3-4243-8748-8a463124711d.png" />
  <br /><br />
</h4>

<hr />


# Projeto Trybe Futebol Clube
Projeto realizado durante módulo de Back-end do curso de desenvolvimento web da Trybe.

<details>
  <summary><strong>O que foi feito</strong></summary></br>

  Neste projeto desenvolvi um back-end dockerizado utilizando modelagem de dados através do Sequelize. Seu desenvolvimento respeitou as regras de negócio providas no projeto e API deve ser capaz de ser consumida por um front-end já provido nesse projeto, que foi desenvolvida pela Trybe em `React`.
  
  O aplicativo TFC é um site informativo sobre partidas e classificações de futebol! ⚽️
  
  Nesta aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: `CRUD`.
  
  A aplicação foi desenvolvida com:

- `Node.js`
- `TypeScript`
- `JWT`
- `Sequelize`
- `POO`
- `S.O.L.I.D`
- `Arquitetura MSC`
- `docker`
- `docker-compose`
- `MySql`
- `Express`;

![DER](./assets/front-example.png)

Diagrama ER e Entidades:

![DER](./assets/diagrama-er.png)

</details>
<details>
  <summary><strong>Como rodar o projeto</strong></summary></br>

 Configurações mínimas para execução do projeto:

- Sistema Operacional Distribuição Unix
- Node versão 16.14.0 LTS
- Docker
- Docker-compose versão >=1.29.2

  **Com Docker:**

  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

- `npm run compose:up` na raiz do projeto;
- `npm run install:apps` na raiz do projeto para instalar dependências do front e back-end;
- `docker exec -it app_backend bash` em ./app/backend;
- `npm run build` no container do backend;
- `npm run db:reset` no container do backend;

**Localmente:**

**Necessita ter um banco de dados(MySql) instalado localmente**

- `npm run install:apps` na raiz do projeto para instalar dependências do front e back-end;
- `npm run compose:up` na raiz do projeto;
- `npm run build`;
- `npm run db:reset`;

</details>

<details>
  <summary><strong>:memo: Tecnologias utilizadas</strong></summary><br />
  
- `Node.js`
- `TypeScript`
- `JWT`
- `Sequelize`
- `POO`
- `S.O.L.I.D`
- `Arquitetura MSC`
- `docker`
- `docker-compose`
- `MySql`
- `Express`;

</details>
<details>
  <summary><strong>:memo: Habilidades</strong></summary><br />

- A realização da `dockerização` dos apps, network, volume e compose;
- A modelagem de dados com `MySQL` através do `Sequelize`;
- A criação e associação de tabelas usando models do `sequelize`;
- A construção de uma `API REST` com endpoints para consumir os models criados;
- A construção de um CRUD com `TypeScript`, utilizando `ORM`;

</details>
