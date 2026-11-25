#!/usr/bin/env bash
#
# Publica o playground em https://vmi3764524.contaboserver.net
# Builda, copia para /srv/voga e recarrega o Caddy. Precisa de root.
#
#   bun run publicar
#
set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DESTINO=/srv/voga
SITE=vmi3764524.contaboserver.net

if [[ $EUID -ne 0 ]]; then
  echo "Precisa de root para escrever em $DESTINO e recarregar o Caddy." >&2
  exit 1
fi

cd "$RAIZ"

echo "→ build do pacote e do playground"
bun run build > /dev/null
bun run playground:build > /dev/null
bun scripts/estatico.tsx > /dev/null

echo "→ copiando para $DESTINO"
mkdir -p "$DESTINO"
# --delete para o hash antigo dos assets não acumular lixo.
rm -rf "$DESTINO"/assets
cp -r playground/dist/. "$DESTINO"/
cp playground/estatico.html "$DESTINO"/estatico.html

chown -R caddy:caddy "$DESTINO"
find "$DESTINO" -type d -exec chmod 755 {} +
find "$DESTINO" -type f -exec chmod 644 {} +

echo "→ recarregando o Caddy"
systemctl reload caddy

echo
echo "  https://$SITE/              app React, interativo"
echo "  https://$SITE/estatico.html arquivo único"
echo "  usuário: caio · senha em /root/.voga-preview-senha"
echo
