# 📸 Revela

> **Reviva suas memórias em álbuns digitais analógicos.**

Revela é um aplicativo desktop projetado para organizar e exibir suas fotos com uma estética nostálgica e moderna. Fuja das galerias digitais frias e organize suas memórias em álbuns que trazem de volta a sensação de folhear um álbum de fotos real, com a flexibilidade da tecnologia moderna.

## ✨ Funcionalidades

- **Álbuns Personalizados:** Organize suas fotos em álbuns temáticos.
- **Interface Minimalista:** Foco total nas suas fotos com um design limpo e elegante.
- **Interação Fluida:** Animações suaves de hover e transições de layout usando Framer Motion.
- **Arranjo Livre:** Reorganize suas fotos facilmente com suporte a drag-and-drop.
- **Estética "Papel":** Visual inspirado em álbuns físicos com texturas e sombras sutis.

## 🚀 Tecnologias

Este projeto foi construído utilizando as seguintes tecnologias:

- **[Electron](https://www.electronjs.org/):** Framework para aplicações desktop cross-platform.
- **[React](https://reactjs.org/):** Biblioteca para interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para maior segurança no desenvolvimento.
- **[Vite](https://vitejs.dev/):** Build tool ultra-rápida.
- **[SASS/SCSS](https://sass-lang.com/):** Pré-processador CSS para estilos dinâmicos e organizados.
- **[Framer Motion](https://www.framer.com/motion/):** Biblioteca de animações para React.
- **[dnd-kit](https://dndkit.com/):** Kit de ferramentas para funcionalidades de arrastar e soltar.

## 🛠️ Começando

Siga as instruções abaixo para rodar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm (geralmente vem com o Node.js)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/revela.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

### Execução

Para iniciar o aplicativo em modo de desenvolvimento:
```bash
npm start
```

## 📦 Scripts Disponíveis

- `npm start`: Inicia o aplicativo Electron usando o Electron Forge.
- `npm run lint`: Executa o ESLint para verificar erros de estilo no código.
- `npm run test`: Executa os testes unitários usando Jest.
- `npm run package`: Empacota o aplicativo para distribuição.
- `npm run make`: Gera os instaladores do aplicativo.

## 📂 Estrutura do Projeto

- `src/main.ts`: Ponto de entrada do processo principal do Electron.
- `src/renderer.tsx`: Ponto de entrada do processo de renderização (React).
- `src/components`: Componentes React reutilizáveis.
- `src/styles`: Arquivos SCSS para estilização global e de componentes.
- `src/assets`: Recursos estáticos como ícones e texturas.

---

Desenvolvido com ❤️ por [Lucas Torres](https://github.com/lucas-torres-dev)
