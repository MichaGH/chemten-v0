const carouselContainer = document.getElementById('carousel-container');
const carouselItems = document.getElementsByClassName('carousel-item');
const leftBtn = document.getElementById('carousel-left');
const rightBtn = document.getElementById('carousel-right');

// Get exact card width with margin (Tailwind gap-6 = 1.5rem = 24px)
let scrollOffset;
const gap = 24; // tailwind gap 6 


function calculateCarousel() {
    let carouselWidth = carouselContainer.offsetWidth;
    let carouselItemWidth = carouselItems[0].offsetWidth;

    // for < sm - 2 items visible (idk how to do that)
    // for sm, md, lg size of window - 2 items visible
    // for > lg - 3 items

    let numberOfItems;
     if (carouselWidth < 768) {
        console.log('448<= w < 768')
        numberOfItems = 2;
    } else if (768 <= carouselWidth){
        console.log('> 768')
        numberOfItems = 3;
    }

    let itemWidth = (carouselWidth - (numberOfItems-1) * gap) / numberOfItems ;
    
    for(let i = 0; i < carouselItems.length; i++) {   
        carouselItems[i].style.width = `${itemWidth}px`
    }

    scrollOffset = itemWidth + gap;
    carouselContainer.scrollLeft = 0;

}



calculateCarousel();
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout); // cancel previous timeout
  resizeTimeout = setTimeout(() => {
    calculateCarousel(); // run only *once* after resize stops
  }, 200);
});

leftBtn.addEventListener('click', () => {
    carouselContainer.scrollBy({ left: -scrollOffset, behavior: 'smooth' });
  });
  
rightBtn.addEventListener('click', () => {
    carouselContainer.scrollBy({ left: scrollOffset, behavior: 'smooth' });
});