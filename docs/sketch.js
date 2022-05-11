main();

async function main() {
  let maxEscena = 0;
  const a = new Aventura('es',{
    defaultCSS: false,
    typewriterSpeed: 0,
    adventureContainer: 'general',
    sceneCallback: (escena) => {
      if (!isNaN(escena.key)) {
        if (+escena.key > maxEscena) {
          maxEscena = +escena.key;
          escenas.mapa.areas = linksImgs.slice(0, maxEscena+1);
          escenas.mapa.escena = maxEscena+1;
        }
      }
      if (escena.key === 'mapa') {
        const areas = document.getElementsByClassName('storyimage-area');
        const lastArea = areas[areas.length-1];
        lastArea.classList.add("lastArea");
      }
    }
  });

  const escenas = await a.cargarJSON('escenas.json');
  const linksImgs = await a.cargarJSON('linksImgs.json');
  a.fijarEscenas(escenas).probarEscenas().iniciarAventura('portada');
}

async function loadCSV(path) {
  const data = await d3.csv(path).then(d => d);
  return data
}

async function loadImg(path) {
  return new Promise(r => { loadImage(path, img => r(img)) })
}