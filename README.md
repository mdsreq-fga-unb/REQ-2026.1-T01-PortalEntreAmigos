# Projeto de Requisitos de Software 2026.1 - Grupo 1

<p align="center">
    <img src="docs/00_assets/imagens/logo_2.png" alt="Logo Ação Entre Amigos">
</p>
Fonte: Elaborada pelo Grupo

Bem-vindo ao repositório do **Grupo 01**, da disciplina **Requisitos de Software (2026.1)**, da Universidade de Brasília (FCTE-UnB). Nosso ambiente de documentação está hospedado usando **MkDocs**, e está disponível online em: [https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-PortalEntreAmigos/](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-PortalEntreAmigos/)

##  Como Executar o Projeto Localmente
Caso queira ver ou editar a documentação localmente:


### Pré-requisitos
- Python 3.6 ou superior
- pip (gerenciador de pacotes do Python)


### Clone este repositório:
   ```bash
   git clone https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos.git
   cd projeto_grupo01_2026.1

# Acesse a pasta do projeto
cd repositorio
   ```


### Instalação
   ```bash
# Instale o MkDocs
pip install mkdocs
```


### Configure o Ambiente Virtual (Recomendado)
 ```bash
# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# No Windows:
venv\Scripts\activate
# No macOS/Linux:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt
```


### Adicionar uma nova página:
1. Crie um novo arquivo .md na pasta docs/
2. Adicione ao menu no mkdocs.yml


### Visualize as Alterações Localmente
 ```bash
# Execute o servidor local
mkdocs serve

# Acesse no navegador:
# http://localhost:8000
```


### Deploy para Produção após o push
 ```bash
# Faça deploy para GitHub Pages
mkdocs gh-deploy
```

## Integrantes
<table>
  <tr>
    <td align="center"><a href="https://github.com/GuilhermeOliveira1327"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/185217197?v=4" width="100px;" alt=""/><br /><sub><b>GUILHERME OLIVEIRA</b></sub></a><br />
    <td align="center"><a href="https://github.com/ArturFGaldino"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/187340217?v=4" width="100px;" alt=""/><br /><sub><b>ARTUR FERNANDES GALDINO</b></sub></a><br />
    <td align="center"><a href="https://github.com/surpesaiajin"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/214191456?v=4" width="100px;" alt=""/><br /><sub><b>LEONARDO DE AQUINO SILVEIRA BRAGA</b></sub></a><br />
    <td align="center"><a href="https://github.com/KaioAmouryUnB"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/227636246?v=4" width="100px;" alt=""/><br /><sub><b>KAIO AMOURY SASAKI ACÁCIO</b></sub></a><br />
    <td align="center"><a href="https://github.com/edso-n"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/186978615?v=4" width="100px;" alt=""/><br /><sub><b>EDSON PEREIRA ROLDAO FILHO</b></sub></a><br />
    <td align="center"><a href="https://github.com/GUGOFO"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/181671242?v=4" width="100px;" alt=""/><br /><sub><b>GUSTAVO GOMES FORNACIARI</b></sub></a><br />
  </tr>
</table>
