
# Front-end - Sistema de Gestão de Mercadorias da MStarSupply

## Stack utilizada

**Front-end:** React, TailwindCSS, Shadcn/Ui

**Back-end:** API Python Flask, MySQL, Docker

## Relacionados

Requisito para execução deste sistema:

[Integração com API](https://github.com/willamylp/mssupply-goods-frontend.git)


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/willamylp/mssupply-goods-frontend.git
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```
## Arquivo requests/apiConfig.ts 

Ajuste as configurações de **domain** e **port** arquivo com as configurações de execução da sua API.

```javascript
const domain = 'localhost'
const port = 5000
const apiVersion = '/api/v1/'
const apiConfig = {
  apiUrl: `http://${domain}:${port}${apiVersion}`,
}

export default apiConfig
```


# Algumas Telas

* Página de Login

![App Screenshot](https://i.imgur.com/fIj3Jfc.png)

* Gestão de Usuários

![App Screenshot](https://i.imgur.com/ic39lhC.png)

![App Screenshot](https://i.imgur.com/ZvAyH5m.png)

* Formulário de Cadastro de Mercadorias com Confirmação de Delete

![App Screenshot](https://i.imgur.com/iDUUiPS.png)

![App Screenshot](https://i.imgur.com/XhYDCMq.png)


