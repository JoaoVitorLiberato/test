#!/usr/bin/env bash
set -e

echo "Instalando dependências em todas as pastas do monorepo..."

# 1. Usa a versão do Node definida no .nvmrc (ou fallback para 22)
if [ -f ".nvmrc" ]; then
  NODE_VERSION=$(cat .nvmrc | tr -d '[:space:]')
  echo "Versão do Node no .nvmrc: $NODE_VERSION"
else
  NODE_VERSION="22"
  echo ".nvmrc não encontrado → usando Node 22"
fi

# 2. Carrega nvm se existir (Linux/macOS/WSL)
if command -v nvm >/dev/null 2>&1; then
  nvm install "$NODE_VERSION" --no-progress 2>/dev/null || true
  nvm use "$NODE_VERSION"
elif [ -f "$HOME/.nvm/nvm.sh" ]; then
  export NVM_DIR="$HOME/.nvm"
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
  nvm install "$NODE_VERSION" --no-progress 2>/dev/null || true
  nvm use "$NODE_VERSION"
else
  echo "nvm não encontrado → usando Node atual: $(node -v 2>/dev/null || echo 'desconhecido')"
fi

echo "Node ativo: $(node -v)"
echo

# 3. Instala em todas as pastas com package.json
find . -name "package.json" -not -path "*/node_modules/*" -exec dirname {} \; | while read -r dir; do
  echo "────────────────────────────────────────────────────────────"
  echo "Instalando em: $dir"
  echo "────────────────────────────────────────────────────────────"
  (cd "$dir" && bun install --frozen-lockfile)
done

echo
echo "TODAS AS DEPENDÊNCIAS INST foram instaladas com sucesso!"
echo "Node usado: $(node -v)"
  