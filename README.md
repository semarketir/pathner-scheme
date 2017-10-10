# Unmaintaine

# Pathner Scheme

Compose thought moment from web to Path apps.
`path://compose/thought?subject=subject&text=text`

## Installation

```html
<script src="vendors.js"></script> # jQuery & Lodash
<script src="bundle.js"></script>
```


## Basic use
```js
pathnerScheme({
    subject: 'subject',
    text: 'text',
    unsupportedHandler: function () {
        console.log('This browser does not support Path scheme.');
        // window.locations = 'http(s)://...'
        // Redirect to Path Partner's Page ( Post moment via web )
    }
});
```


MIT
