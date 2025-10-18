#!/bin/bash

# Script para build com Node.js 22.12
echo "Verificando versão do Node.js..."

# Verificar se nvm está disponível
if command -v nvm &> /dev/null; then
    echo "Usando nvm para trocar para Node.js 22.12..."
    nvm use 22.12.0
elif command -v n &> /dev/null; then
    echo "Usando n para trocar para Node.js 22.12..."
    n 22.12.0
else
    echo "NVM ou n não encontrado. Por favor, instale Node.js 22.12 manualmente."
    echo "Versão atual do Node.js:"
    node --version
    exit 1
fi

echo "Versão do Node.js após troca:"
node --version

echo "Instalando dependências..."
npm install

echo "Executando build..."
npm run build

echo "Build concluído!"
