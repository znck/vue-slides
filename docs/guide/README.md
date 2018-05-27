# Getting Started

**Keynote** (`vue-keynote`) is a presentation library which enables you to declaratively create your slides using Vue.

## Using Keynote in browser (no build tool)

* Use script tag to include Keynote and Vue.

  ```html
  <html>
    <head>
      <title>My First Keynote</title>
      <script src="//unpkg.com/vue"></script>
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
  npm add --global vue-keynote
  ```

* Start development server

  ```bash
  keynote dev Presentation.vue
  ```

::: tip
Read [API docs](/api.md) to know available components.
:::
