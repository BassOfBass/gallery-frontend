import "./css/main.scss";

import "jquery";
import PhotoSwipe from "photoswipe";
import PhotoSwipeUIDefault from "photoswipe/dist/photoswipe-ui-default"

const photoSwipeRoot = document.querySelector(".pswp");
/**
 * @type {NodeListOf<HTMLElement>}
 */
const photoSwipeAlbums = document.querySelectorAll(".album");

photoSwipeAlbums.forEach((album) => {
  const image = [];
  const items = getItems(album);
  console.log(items);

  items.forEach((item, index) => {
    image[index] = new Image();
    image[index].src = item.src;
  });

  album.addEventListener("click", initPhotoSwipe)

  /**
   * @param {MouseEvent} event
   */
  function initPhotoSwipe(event) {
    event.preventDefault();

    /**
     * @type {HTMLElement}
     */
    const figure = event.target;

    if (figure.classList.contains("picture")) {
      const index = findElementIndex(figure);
      /**
       * @type {PhotoSwipe.Options}
       */
      const options = {
        index,
        bgOpacity: 0.95,
        showHideOpacity: true
      }

      const lightBox = new PhotoSwipe(
        photoSwipeRoot,
        PhotoSwipeUIDefault,
        items,
        options
      );
      lightBox.init();
    }
  }
});

/**
 * @param {HTMLElement} element 
 * @returns {number}
 */
function findElementIndex(element) {
  if (!element) return -1;

  let i = 0;
  while (element !== element.previousElementSibling) {
    i++
  }

  return i;
}

/**
 * @param {HTMLElement} album 
 * @returns {{ src: string, w: string, h: string }[]}
 */
function getItems(album) {
  const items = [];

  const links = album.querySelectorAll("a");
  links.forEach(({href, dataset}) => {
    const [width, height] = dataset.size.split('x');
    const item = {
      src: href,
      w: width,
      h: height
    }

    items.push(item);
  });

  return items;
}