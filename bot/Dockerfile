FROM node:16-alpine

WORKDIR /app

# Копируем файлы package.json и package-lock.json (если он есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все остальные файлы в рабочую директорию контейнера
COPY . .

# Устанавливаем переменную окружения PORT
ENV PORT 3000

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
