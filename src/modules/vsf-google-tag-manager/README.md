# vsf-google-tag-manager

 📈 Google Tag Manager module for Vue Storefront 📊 

## Configuration
Inside the config add:
```
"googleTagManager": {
  "id": "GTM-XXXXXX"
}
```

## Installation
Inside modules/index.ts, add:
```
import { VsfGoogleTagManager } from './vsf-google-tag-manager'
```
And below, inside **registerModules**, add:
```
VsfGoogleTagManager
```
