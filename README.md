# Falabella Web

## API Rest desarrollada en express

### requisitos

- nodejs v14.9.0

### Instalación

1. Descargar repositorio <br>
2. Abril terminal e ingresar al directorio asociado <br>
3. instalar módulos a través del comando "npm install" <br>
4. verificar que el puerto 4100 no esté ocupado <br>
5. Iniciar servicio con el comando "npm run start" <br>

**Este servicio es un complemento del proyecto falabella_react_web**

### Estructura POST

```json
  "url": "http://localhost:4100/api/users",
  "method": "POST",
  "data": {
    "rut": "11.111.111-1",
    "celular": "123456789",
    "correo": "correo@correo.cl",
    "renta": "400000",
    "x-user-browser": "Mozilla - 5.0 (Macintosh; Intel Mac OS X 10_15_6)",
    "x-user-os": "MacIntel"
  }
```

  ### Estructura GET (Para verificar los campos)

```json
  "url": "http://localhost:4100/api/users",
  "method": "GET"
```
