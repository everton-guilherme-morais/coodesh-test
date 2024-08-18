# Coodesh Open Food Facts

Informações sobre alimentos diversos, busca feita diariamente dos alimentos da API Open Food Facts.

## Tecnologias Utilizadas

- **Axios**
- **Express**
- **MongoDB**
- **Node.js 20**
- **JavaScript (JS)**
- **Jest**

## Como Rodar o Projeto

### Pré-requisitos

- Node.js
- Ter uma chave SSH configurada na máquina para conseguir rodar o clone deste repositório.

### Instalação

```bash
# Clone do repositório
git clone git@github.com:everton-guilherme-morais/coodesh-test.git

# Entre no repositório
cd coodesh-test

# Abra o projeto no editor de código
code .

# Instale as dependências do projeto
npm i
```

# Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

MONGO_URI_TESTE="mongodb+srv://guilherme20silva99:coodesh@coodesh.0cb4g.mongodb.net/test?retryWrites=true&w=majority&appName=coodesh"
MONGO_URI_PROD="mongodb+srv://guilherme20silva99:coodesh@coodesh.0cb4g.mongodb.net/food-db?retryWrites=true&w=majority&appName=coodesh"

# Executando o projeto

```bash
    npm start
```

## Após executar o projeto, em outro terminal, execute os testes automatizados:

```bash
    npm test
```

# Arquitetura

O projeto foi desenvolvido com base em práticas de desenvolvimento como Design Patterns, DDD (Domain-Driven Design) e princípios SOLID. Isso garante um código mais modular, testável e de fácil manutenção, seguindo boas práticas de engenharia de software.

## Configuração do CRON

O serviço que roda o CRON realiza as seguintes etapas:

1. **Busca de Produtos**: Obtém uma lista de até 100 produtos utilizando uma stream da API Open Food Facts.
2. **Processamento de Dados**: Para cada produto, o serviço busca detalhes adicionais através de uma requisição específica para obter os dados completos.
3. **Inserção no Banco de Dados**: Os dados dos produtos são então inseridos no banco de dados. Se o produto já existir, ele é atualizado; se for novo, é criado.

**Obs:** Para uma melhor visualização dos dados do banco, baixe a extensão **MongoDB for VS Code**, insira a string de conexão de **PROD** e conecte ao banco.
