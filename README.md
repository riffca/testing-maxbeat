## Boilerplates

Для реализации интерфейса был выбран **_nuxt3 minimal starter_** в режиме SPA.

Из коробки есть:

- поддержка **_typescript_**
- автогенерация роутинга из файлов
- автоимпорты переиспользуемых компонентов, composable фунциий и middlewares

В ручную были добавлены:

- eslint
- prettier
- husky, lint-staged

Не уверен, что подобный функционал является boilerplate кодом.
Например в файлe `./nuxt/tsconfig.json` содержатся настройки **_typesctipt_** по умолчанию. При валидации кода через линтер настройки можно переопределить или расширить через локальный файл `./eslint.config.mjs`, как и правила **_eslint_**. 

Большой плюс **_nuxt_** - это возможность легкого перехода на **_ssr_**.

## Css

Для реализаци стилей был выбран **_[tailwind](https://tailwindcss.com/)_**.
Большинство кейсов верстки можно покрыть с помощью этой библиотеки.
Для резиновой верстки и медиа запросов был создан оригинальный плагин, который переводит значения **_px_** в иные единицы измерения.
Данный плагин можно изменить опираясь на более детальные требования тз.

Например:

-  класс p-rem-[20] генерирует css

```
.p-rem-\[20\] {
   padding: 1.25rem /* 20px */;
}
```

-  класс p-mob-[20] генерирует css

```
.p-mob-\[20\] {
   padding: 5.555555555555555vw;
}
```

- класс p-adapt-[20,30,40] генерирует css

```
.p-adapt-\[20\2c 30\2c 40\] {
padding: 5.555555555555555vw;
}
@media (min-width: 640px) {
   .p-adapt-\[20\2c 30\2c 40\] {
       padding: 1.875rem /* 30px */;
   }
}
@media (min-width: 1024px) {
   .p-adapt-\[20\2c 30\2c 40\] {
       padding: 2.5rem /* 40px */;
   }
}
```

При более сложном случае описания стилей планируется использовать **_postcss_** c модулем **_css-nested_**

## Макет 

Макет показался мне более схематичным чем законченным.

По тз компонент **_drink-view-instructions_** необходимо разместить слева в пк версии, по-этому было принять решение вынести этот блок в отдельный компонент, чтобы иметь возможность удобно показывать блок в разных местах **_html_** исходя из размера экрана (например:```<drink-view-instructions class="max-tablet:hidden" />```). Но учитывая, что я использую картинку небольшого размера в круге для визуального эфеекта, блок все равно будет ниже картинки. В итоге решил отказаться от дублирования на данном этапе верстки.

## lazy-loading images

Не смотря на то, что vue3 использует **_proxy_**, который поддерживается только современными браузерами, атрибут `loading="lazy"` имеет еще меньшую поддержку, по-этому стоит использовать **_[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)_**

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
