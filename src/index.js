import "./css/main.scss";

import "jquery";
import PhotoSwipe from "photoswipe";
import "./js/ui/photoswipe-ui-default";

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
        PhotoSwipeUI_Default,
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

var $pswp = $('.pswp')[0];
$('.album').each(function () {
  var image = [];
  var $pic = $(this);
  var items = getItems();
  console.log(items);
  function getItems() {
    var items = [];
    $pic.find('a').each(function () {
      var $href = $(this).attr('href');
      var $size = $(this).data('size').split('x');
      var $width = $size[0];
      var $height = $size[1];

      var item = {
        src: $href,
        w: $width,
        h: $height
      }

      items.push(item);
    });
    return items;
  }

  $.each(items, function (index, value) {
    image[index] = new Image();
    image[index].src = value['src'];
  });

  $pic.on('click', 'figure', function (event) {
    event.preventDefault();

    var $index = $(this).index();
    var options = {
      index: $index,
      bgOpacity: 0.95,
      showHideOpacity: true
    }

    var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
    lightBox.init();
  });
});