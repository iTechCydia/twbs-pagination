# twbs-pagination
## Usage
Here is your starter template to get this pagination plugin working.
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link
              rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
              integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
              crossorigin="anonymous">
        <script
                src="https://code.jquery.com/jquery-3.3.1.min.js"
                integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                crossorigin="anonymous"></script>
    </head>
    <body>
        <div id="container">
            <!-- Place recursive content here -->
        </div>
        <div id="pagination"></div>
        <script src="src/pagination.js"></script>
        <script>
            $('#container').paginate('#pagination');
        </script>
    </body>
</html>
```

Yup, that's all.
```js
$('#container').paginate('#pagination');
```

More functionality are coming.
