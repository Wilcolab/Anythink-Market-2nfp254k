# Environment Variables Configuration

This document describes all environment variables used in the Anythink Market Node.js backend.

## 📋 Available Environment Variables

### Server Configuration

#### `PORT`
- **Description**: The port number on which the server will listen
- **Type**: Integer
- **Default**: `8000`
- **Example**: `PORT=3000`
- **Usage**:
  ```bash
  PORT=3000 npm start
  ```

#### `NODE_ENV`
- **Description**: The environment in which the application is running
- **Type**: String
- **Default**: `development`
- **Allowed Values**: 
  - `development` - Enables request logging, detailed error messages
  - `production` - Disables verbose logging, minimal error details
  - `test` - Used for running automated tests
- **Example**: `NODE_ENV=production`
- **Usage**:
  ```bash
  NODE_ENV=production npm start
  ```

#### `CORS_ORIGIN`
- **Description**: Specifies which origins are allowed to access the API
- **Type**: String
- **Default**: `*` (allows all origins)
- **Example**: `CORS_ORIGIN=https://yourdomain.com`
- **Security Note**: In production, set this to your specific domain
- **Usage**:
  ```bash
  CORS_ORIGIN=https://example.com npm start
  ```

---

## 🔧 Configuration Files

### `.env` File (Optional)

You can create a `.env` file in the `node-server/` directory for local development:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=*

# Future configurations (examples)
# DATABASE_URL=postgresql://user:pass@localhost:5432/db
# API_KEY=your-api-key-here
# LOG_LEVEL=debug
```

### Loading Environment Variables

The application uses `dotenv` package to load environment variables from `.env` file:

```javascript
require('dotenv').config();
```

**Note**: The `.env` file is gitignored and should never be committed to version control.

---

## 🐳 Docker Environment Variables

When running with Docker Compose, environment variables are set in `docker-compose.yml`:

```yaml
node-server:
  environment:
    - NODE_ENV=development
    - PORT=8000
    - CORS_ORIGIN=*
```

---

## 📚 How Environment Variables are Used

### 1. Server Configuration (`src/config/config.js`)

```javascript
const config = {
  port: process.env.PORT || 8000,
  env: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
};
```

### 2. Application Entry Point (`src/index.js`)

```javascript
// CORS middleware uses corsOrigin
app.use(cors({ origin: config.corsOrigin }));

// Development logging based on env
if (config.env === 'development') {
  // Enable request logging
}

// Server listens on configured port
app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server is running on port ${config.port}`);
});
```

---

## 🚀 Usage Examples

### Development (Local)

```bash
cd node-server
npm install
npm run dev  # Uses default environment variables
```

### Production (Local)

```bash
cd node-server
NODE_ENV=production PORT=8080 npm start
```

### With .env File

```bash
cd node-server
echo "PORT=3000" > .env
echo "NODE_ENV=development" >> .env
npm start
```

### Docker Development

```bash
docker compose up node-server
# Uses environment variables from docker-compose.yml
```

### Docker with Custom Port

```bash
docker compose run -e PORT=9000 node-server
```

---

## 🔒 Security Best Practices

### Development
- ✅ Use `CORS_ORIGIN=*` for local testing
- ✅ Enable detailed logging with `NODE_ENV=development`
- ✅ Use `.env` file for convenience

### Production
- ⚠️ **NEVER** use `CORS_ORIGIN=*` in production
- ⚠️ Set `NODE_ENV=production` to disable verbose logging
- ⚠️ Use environment variables from hosting platform (not .env)
- ⚠️ Never commit `.env` files to git
- ⚠️ Use secrets management for sensitive data

---

## 🧪 Testing

For testing, set `NODE_ENV=test`:

```bash
NODE_ENV=test npm test
```

This ensures tests run with appropriate configuration.

---

## 📝 Adding New Environment Variables

When adding new environment variables:

1. **Add default in config.js**:
   ```javascript
   newSetting: process.env.NEW_SETTING || 'default-value',
   ```

2. **Document here** with:
   - Description
   - Type
   - Default value
   - Example usage
   - Security considerations (if applicable)

3. **Update docker-compose.yml** if needed:
   ```yaml
   environment:
     - NEW_SETTING=value
   ```

4. **Update README.md** with the new variable

---

## 🔗 Related Documentation

- [Main README](README.md) - General project information
- [Configuration Guide](src/config/config.js) - Configuration code
- [Docker Compose](../docker-compose.yml) - Container configuration

---

## ❓ Troubleshooting

### Port Already in Use

```bash
# Error: Port 8000 is already in use
# Solution: Use a different port
PORT=8001 npm start
```

### CORS Errors

```bash
# Error: CORS policy blocking requests
# Solution: Set appropriate CORS origin
CORS_ORIGIN=http://localhost:3000 npm start
```

### Environment Variables Not Loading

1. Check if `.env` file exists in `node-server/` directory
2. Verify `dotenv` is installed: `npm list dotenv`
3. Ensure `.env` is not in `.gitignore` locally (it should be in repo's .gitignore)
4. Restart the server after changing `.env`

---

**Last Updated**: January 14, 2026  
**Maintainer**: Anythink Market Team
