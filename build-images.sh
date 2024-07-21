#!/bin/sh
set -e

echo "Gerando a build da imagem: nina/backend..."
docker build -t nina/backend ./back

echo "Gerando a build da imagem: nina/frontend ..."
docker build -t nina/frontend ./front

echo "Geração das imagens finalizada."

