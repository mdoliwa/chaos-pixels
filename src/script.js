document.addEventListener('DOMContentLoaded', () => {
    const pixelCanvas = document.getElementById('pixel-canvas');
    const saveButton = document.getElementById('save-artwork');
    const galleryContainer = document.getElementById('gallery-container');

    // Create pixel canvas
    const canvasSize = 32;
    const pixelSize = 10;

    for (let i = 0; i < canvasSize * canvasSize; i++) {
        const pixel = document.createElement('div');
        pixel.style.width = `${pixelSize}px`;
        pixel.style.height = `${pixelSize}px`;
        pixel.style.backgroundColor = '#fff';
        pixel.style.float = 'left';
        pixel.addEventListener('click', () => {
            pixel.style.backgroundColor = getRandomColor();
        });
        pixelCanvas.appendChild(pixel);
    }

    // Save artwork functionality
    saveButton.addEventListener('click', () => {
        const artwork = pixelCanvas.cloneNode(true);
        artwork.style.width = '160px';
        artwork.style.height = '160px';
        artwork.style.margin = '10px';
        galleryContainer.appendChild(artwork);
        clearCanvas();
    });

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function clearCanvas() {
        const pixels = pixelCanvas.children;
        for (let pixel of pixels) {
            pixel.style.backgroundColor = '#fff';
        }
    }
});
