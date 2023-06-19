# PTS-Global

## Технологии
* [NextJS](https://nextjs.org/)
* [React](https://ru.reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [CSS-modules](https://github.com/css-modules/css-modules)
* [Strapi](https://strapi.io/)
* [Meilisearch](https://www.meilisearch.com/)

## Структура приложения

Приложение представляет из себя CMS для развертывания продающего сайта. 
Приложение состоит из трех отдельных сервисов:

- Веб-сайт (директория [frontend](./frontend)) 
- Админ-панель для управления контентом на сайте (директория [admin](./admin))
- Meilisearch - cервис для индексации данных сайта для поиска (подробнее в [admin/README.md](./admin/README.md))


### Веб-сайт

Main-стенд - https://main.pts-global.csssr.cloud/

Стенд фича-ветки - https://<branch-name>.pts-global.csssr.cloud/

Подробнее о сборке и запуске в [frontend/Readme](./frontend/README.md)

### Админ-панель

Main-стенд - https://main.pts-global-admin.csssr.cloud/admin/

Стенд фича-ветки - https://<branch-name>.pts-global-admin.csssr.cloud/admin/

Подробнее о сборке и запуске в [admin/Readme](./admin/README.md)

### Meilisearch

Сервис Meilisearch для тестовых стендов развернут в единственном экземпляре. 
Все тестовые стенды смотрят на него.
Адрес, на котором развернут Meilisearch, и api-ключ для него передаются в через переменные окружения в приложения веб-части и админки.
Значения этих переменных окружения можно посмотреть в [Vault](https://vault.csssr.com:8200/ui/vault/secrets/secret/list/k8s/gke-csssr-testing/)


## СI

### Стенды
Тестовые стенды для админки и для сайта раскатываются через [Kuberta](https://kuberta.csssr.cloud/r/pts-global/pts_global/pts-global-frontend)

Стенды для веток `main` и `preprod` раскатываются автоматически при пуше в них. Стенды фича-веток раскатываются при создании PRа.

### Переменные окружения
Переменные окружения, которые пробрасываются в приложения админки и сайта можно указываться через Vault:
* Для [админки](https://vault.csssr.com:8200/ui/vault/secrets/secret/show/k8s/gke-csssr-testing/pts-global-admin/everyone/secret) 
* Для [сайта](https://vault.csssr.com:8200/ui/vault/secrets/secret/list/k8s/gke-csssr-testing/pts-global-frontend/) 

Подробнее про нужные переменные окружения читай в [admin/Readme](./admin/README.md) и [frontend/Readme](./frontend/README.md)