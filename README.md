# Sistema de Gerenciamento de Entrega de Lanches

Este projeto é um sistema de gerenciamento de entrega de lanches desenvolvido para organizar e automatizar o processo de liberação e entrega de lanches para alunos. O sistema inclui funcionalidades completas para o registro de alunos, autorização de retirada de lanches e controle de entregas, garantindo eficiência e confiabilidade no processo.

---

## Funcionalidades

### 1. **CRUD de Alunos**
- Tela para cadastrar, editar, visualizar e excluir informações dos alunos.
- Dados requisitados:
  - **RA** (Registro Acadêmico)
  - **Nome**
  - **Foto do Aluno** (upload de imagem)
  
---

### 2. **Autorização de Lanches**
- Formulário para autorizar alunos a retirar lanches, com os seguintes campos:
  - **Data de liberação do lanche**
  - **Código do Aluno** (caixa de seleção com nomes e fotos dos alunos listados a partir do banco de dados)
  - **Quantidade de Lanches** (limite máximo de 3 lanches por autorização)
- Regras:
  - Impede múltiplas autorizações na mesma data para o mesmo aluno.
  - Permite consulta por data para listar os alunos autorizados a retirar lanches.
- Funcionalidades adicionais:
  - Alterar ou excluir autorizações já existentes.

---

### 3. **Controle de Entregas**
- Tela para gerenciar a entrega dos lanches autorizados:
  - Lista os alunos autorizados por data.
  - Permite marcar o lanche como entregue.
- Regras:
  - Proíbe a entrega de mais de um lanche por aluno em uma mesma data.

---

### 4. **Consulta de Lanches Entregues**
- Tela para listar todos os lanches entregues.
- Funcionalidades:
  - Filtro por data, permitindo consultar lanches entregues em uma data específica.
  - Exibição em formato **landscape** para facilitar a visualização.

---

### 5. **Demonstração em Vídeo**
- Vídeo de até **5 minutos** demonstrando todas as funcionalidades do sistema em funcionamento, disponível no repositório.

---

## Tecnologias Utilizadas
- **Frontend:** [especificar, ex.: React, HTML/CSS/JavaScript]
- **Backend:** [especificar, ex.: Node.js, Django, Laravel]
- **Banco de Dados:** [especificar, ex.: MySQL, MongoDB]
- **Outras Ferramentas:** [especificar, ex.: Bootstrap, Material-UI, etc.]

---

## Instalação e Execução
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-gerenciamento-lanches.git
   ```
2. Instale as dependências:
   ```bash
   npm install # ou o comando equivalente para sua stack
   ```
3. Configure o banco de dados no arquivo de configuração.
4. Inicie o servidor:
   ```bash
   npm start # ou o comando equivalente para sua stack
   ```
5. Acesse no navegador em `http://localhost:3000`.

---

## Contribuição
Sinta-se à vontade para abrir **issues** ou enviar **pull requests** para melhorias. Todo feedback é bem-vindo!

---

**Autor:** [Seu Nome](https://github.com/seu-usuario)  
**Licença:** [MIT License](LICENSE)

