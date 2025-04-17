# Leo's Insight - Deployment Guide

This guide provides instructions for deploying Leo's Insight to production with optimizations for 52,000+ concurrent users.

## Prerequisites

- Node.js (v14+)
- npm (v6+)
- Web server (Apache, Nginx, etc.)
- HTTPS certificate

## Build Process

1. Install dependencies:

```bash
npm install
```

2. Build for production:

```bash
npm run build
```

This will create a `dist` directory with optimized files.

## Server Configuration

### Apache Server

1. Upload the contents of the `dist` directory to your web server.
2. Ensure the `.htaccess` file is included in the upload.
3. Make sure `mod_rewrite`, `mod_deflate`, and `mod_expires` are enabled:

```bash
a2enmod rewrite
a2enmod deflate
a2enmod expires
```

4. Restart Apache:

```bash
service apache2 restart
```

### Nginx Server

1. Upload the contents of the `dist` directory to your web server.
2. Configure Nginx with the following settings:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    root /path/to/dist;
    index index.html;

    # Compression
    gzip on;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Brotli if available
    brotli on;
    brotli_comp_level 6;
    brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache control
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000";
    }

    # Service worker
    location = /service-worker.js {
        expires off;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https: wss:; img-src 'self' https: data: blob:; media-src 'self' https: data: blob:; font-src 'self' https: data:; frame-src 'self' https:;" always;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. Restart Nginx:

```bash
service nginx restart
```

## Scaling Considerations

### Gun.js Scaling

The application is configured to handle 52,000+ concurrent users with the following Gun.js optimizations:

1. Connection pooling to limit concurrent connections
2. Multiple Gun.js peers for redundancy
3. Optimized Gun.js configuration parameters
4. Throttling to prevent overwhelming the servers

### CDN Integration (Optional)

For even better performance, consider using a CDN:

1. Configure your CDN to cache static assets (images, CSS, JS)
2. Set appropriate cache headers
3. Enable HTTP/2 and HTTP/3 if available
4. Enable Brotli compression if available

## Monitoring

After deployment, monitor the application with:

1. Server monitoring tools (New Relic, Datadog, etc.)
2. Web analytics (Google Analytics, Plausible, etc.)
3. Error tracking (Sentry, Rollbar, etc.)

## Performance Testing

Test the application's performance with:

1. Google PageSpeed Insights
2. WebPageTest
3. Lighthouse
4. Load testing tools (Apache JMeter, k6, etc.)

## Troubleshooting

### Common Issues

1. **Service Worker Not Working**
   - Make sure the service worker is served from the root directory
   - Check that the service worker has the correct MIME type (application/javascript)

2. **CORS Issues**
   - Check that the Content-Security-Policy header is correctly configured
   - Ensure all external resources are allowed in the CSP

3. **Gun.js Connection Issues**
   - Check that the Gun.js peers are accessible
   - Verify WebSocket connections are allowed by firewalls

4. **Compression Not Working**
   - Verify that compression modules are enabled on the server
   - Check that the correct MIME types are being compressed

## Support

For additional support, contact the Leo's Insight team at support@leosinsight.com.
