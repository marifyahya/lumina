FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    postgresql-dev \
    oniguruma-dev \
    linux-headers \
    $PHPIZE_DEPS

# Install PHP extensions helper
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions pdo_pgsql pgsql mbstring pcntl bcmath gd redis

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js and NPM
RUN apk add --no-cache nodejs npm

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . .

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
