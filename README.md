<div class="text-xs-center" align="center" style="margin: 20px">
  <img src="https://github.com/znck/keynote/raw/master/docs/.vuepress/public/hero.png" height="300">
</div>

# Keynote

> Present with Vue

[https://keynote.sh](https://keynote.sh)

## Development

### To run the sample presentation

```bash
# Build the command-line tool.
cd packages/@keynote/cli 
yarn

# Use the command-line tool to serve the sample presentation.
cd bin
./keynote.js dev ../../../../example/Simple.vue
```

Visit http://localhost:8080 in a browser to view the sample presentation.

### To build the site (https://keynote.sh/)

```bash
# Install VuePress.
yarn global add vuepress

# Build the site.
yarn docs:dev
```

Visit http://localhost:8080 in a browser to view the Keynote web site.

## License

MIT
