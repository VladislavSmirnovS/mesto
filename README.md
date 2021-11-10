# Проект: Место. Интерактивное приложение.

## [Ссылка на проект](https://vladislavsmirnovs.github.io/mesto/)

## Третья проектная работа это сервис по обмену фотографиями. Данный проект предоставляет возможность делиться красивыми фотографиями, в которых побывал пользователь. Изначально проект был реализован на принципах функционального программирования, а затем выполнен рефакторинг на принципах ООП.

## Основной функционал

- Редактирование профиля
- Добавление новой фотографии
- Удаление карточки при клике на иконку (карточки созданной самим пользователем)
- Поставить / убрать лайк любой карточке
- Открытие фотографии в полном размере
- Все поля форм валидируются

## Код объектно-ориентирован

- Использованы ES6-классы
- Каждый класс описан в отдельном JS-файле и импортирован в index.js
- Каждый класс выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится в классе.
- Для описания взаимодействия между классами используется слабое связывание, т.е внутри классов напрямую не создаются экземпляры других классов.
- Экземпляр класса Card создаётся для каждой карточки.
- Экземпляр класса FormValidator создаётся для каждой проверяемой формы.
- Экземпляр класса UserInfo создается один раз.
- Класс Popup имеет двух наследников, создающихся для каждого модального окна.
- Слушатель событий, закрывающий модальное окно по нажатию на Esc, добавляется при открытии модального окна и удаляется при его закрытии.

## Применены технологии и инсрументы:

- HTML5,
- CSS3,
- JavaScript (ES6),
- OOП,
- Webpack
- Методология БЭМ (файловая структура)
- Адаптивная верстка (мобильные устройства, планшеты, десктопы)
- Flexbox
- GRID
- Позиционирование
- Все поля форм валидируются
- Модальные окна (реализовано закрытие по нажатию на Esc и клику по оверлею),