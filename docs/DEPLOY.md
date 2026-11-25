# Publicar o playground para fora da VPS

A VPS serve o playground em HTTPS, com senha, pelo hostname público dela.

| | |
|---|---|
| App React, interativo | https://vmi3764524.contaboserver.net/ |
| Arquivo único | https://vmi3764524.contaboserver.net/estatico.html |
| Usuário | `caio` |
| Senha | `cat /root/.voga-preview-senha` |

## Republicar depois de mexer no sistema

```bash
sudo bun run publicar
```

Builda o pacote, builda o playground, regenera o `estatico.html`, copia para
`/srv/voga` e recarrega o Caddy. Leva uns 20 segundos.

## Como está montado

```
/etc/caddy/Caddyfile            → só um `import /etc/caddy/sites/*.caddy`
/etc/caddy/sites/voga.caddy     → este site (cópia versionada em deploy/)
/srv/voga/                       → o conteúdo servido, dono `caddy`
```

O conteúdo fica em `/srv/voga` e não em `/root/...` porque o Caddy roda como
usuário `caddy`, que não lê `/root`.

### Decisões

- **Só HTTPS.** O certificado é Let's Encrypt, renovado pelo Caddy sozinho.
  `http://` recebe 308 para `https://`. Não existe caminho em texto claro,
  porque basic auth em HTTP mandaria a senha aberta na rede.
- **Basic auth ligado.** É uma página pública na internet, no seu servidor.
  Para tirar, apague o bloco `basic_auth` de `/etc/caddy/sites/voga.caddy` e
  `systemctl reload caddy`.
- **API de admin ligada, em 127.0.0.1:2019.** É por ela que o
  `systemctl reload` aplica configuração sem derrubar conexão. Com `admin off`
  o reload falha — foi o primeiro erro desta montagem.
- **Build estático, não o servidor de desenvolvimento.** O que está exposto são
  arquivos; o Vite não roda em produção. O app continua interativo (é o bundle
  React compilado), só não tem recarga automática.

## Trocar a senha

```bash
caddy hash-password          # digite a nova senha
# cole o hash em /etc/caddy/sites/voga.caddy
systemctl reload caddy
```

## Adicionar outro projeto no mesmo Caddy

Um arquivo novo em `/etc/caddy/sites/`, por exemplo `outro.caddy`:

```caddy
outro.seudominio.com {
	root * /srv/outro
	encode zstd gzip
	file_server
}
```

E `systemctl reload caddy`. O `import` do Caddyfile principal pega sozinho.
