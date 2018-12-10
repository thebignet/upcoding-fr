# Upcoding site

## Install requirements

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

Install node modules:

```bash
npm install
```

## Package

```bash
npm run package
```

Archive `upcoding.zip` is ready to be deployed

## Deploy

```bash
scp upcoding.zip pi@cozy.local:/tmp && ssh pi@cozy.local 'cd /var/www/presentation && rm -Rf * && unzip /tmp/upcoding.zip'
```