# Деплой 24art-vision.ru

Сайт живёт на сервере **openclaw** (Timeweb Cloud «NikArt», 82.97.253.207) с 09.09.2026.
Старый домен art-vision.online (nic.ru, оплачен до 11.12.2026, не продлевается) только
отдаёт 301 на тот же путь нового домена (Plesk RusOnix → Node.js → `server.js`).

## Сборка и выкладка (с локальной машины)

```bash
npm run build                                   # output: 'standalone' в next.config.mjs
S=deploy-tmp; rm -rf $S; mkdir -p $S/.next
cp -a .next/standalone $S/.next/standalone
cp -a .next/static     $S/.next/standalone/.next/static
cp -a public           $S/.next/standalone/public
cp package.json $S/
tar --force-local -czf build.tar.gz -C $S .
scp build.tar.gz openclaw:/opt/art-vision/build.tar.gz
ssh openclaw /opt/art-vision/deploy-prebuilt.sh   # релиз в /opt/art-vision/releases, symlink current, restart
```

`npm ci` на сервере не используется: реестр npm оттуда тянется по 20–30 с на пакет.

## На сервере

- systemd: `art-vision.service` (user `art-vision`), слушает 127.0.0.1:3109
- окружение: `/opt/art-vision/environment` (PORT, EMAIL_TO, SMTP_* — письма формы уходят через SMTP RusOnix)
- nginx: `/etc/nginx/sites-available/24art-vision.ru.conf`, сертификат Let's Encrypt (`certbot certonly --webroot -w /var/www/art-vision-acme`)
- логи: `journalctl -u art-vision -n 50`

## Почта

`project@24art-vision.ru` — адрес-пересылка на RusOnix Plesk (без ящика) → личная почта владельца.
DNS домена — в панели Timeweb Cloud (A, MX → mail.24art-vision.ru, SPF, DKIM, DMARC).
