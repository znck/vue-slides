# Getting Started

**Keynote** (`vue-keynote`) is a presentation library which enables you to declaratively create your slides using Vue.

## Using Keynote in browser (no build tool)

* Use script tag to include Keynote and Vue.

  ```html
  <html>
    <head>
      <title>My First Keynote</title>
      <!-- Keynote Styles -->
      <link rel="stylesheet" href="//unpkg.com/vue-keynote/dist/vue-keynote.css">
      <!-- Vue.js -->
      <script src="//unpkg.com/vue"></script>
      <!-- Keynote -->
      <script src="//unpkg.com/vue-keynote"></script>
    </head>

    <body>
      <div id="app">
        <Keynote>
          <!-- Declare slides here! -->
        </Keynote>
      </div>

      <script>
        new Vue({ el: '#app' }) // Create a vue app!
      </script>
    </body>
  </html>
  ```

## With build system

* Create a single file component with following content (say Presentation.vue).

  ```html
  <template>
    <Keynote>
      <!-- Declare slides here! -->
    </Keynote>
  </template>
  ```

* Install dependencies

  ```bash
  yarn add vue vue-keynote
  ```

* Start development server

  ```bash
  keynote serve -o Presentation.vue
  ```

::: tip
Read [API docs](/api.md) to know available components.
:::
