document.addEventListener('DOMContentLoaded', () => {
    const pixelCanvas = document.getElementById('pixel-canvas');
    const saveButton = document.getElementById('save-artwork');
    const galleryContainer = document.getElementById('gallery-container');
    const colorPalette = document.getElementById('color-palette');
    const artworkName = document.getElementById('artwork-name');
    const artworkDescription = document.getElementById('artwork-description');

    // Check if all elements are found
    if (!pixelCanvas) console.error('Pixel canvas not found');
    if (!saveButton) console.error('Save button not found');
    if (!galleryContainer) console.error('Gallery container not found');
    if (!colorPalette) console.error('Color palette not found');
    if (!artworkName) console.error('Artwork name input not found');
    if (!artworkDescription) console.error('Artwork description input not found');

    let currentColor = '#000000';

    const colors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];

    // Create color palette
    colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener('click', () => {
            currentColor = color;
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            colorOption.classList.add('selected');
        });
        colorPalette.appendChild(colorOption);
    });

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
            pixel.style.backgroundColor = currentColor;
        });
        pixelCanvas.appendChild(pixel);
    }

    // Save artwork functionality
    saveButton.addEventListener('click', () => {
        console.log('Save button clicked');
        const name = artworkName.value || 'Untitled';
        const description = artworkDescription.value || 'No description';

        const artworkContainer = document.createElement('div');
        artworkContainer.className = 'gallery-item';

        const artwork = document.createElement('div');
        artwork.style.width = '160px';
        artwork.style.height = '160px';
        artwork.style.display = 'grid';
        artwork.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;

        // Copy the current state of the canvas
        Array.from(pixelCanvas.children).forEach(pixel => {
            const newPixel = document.createElement('div');
            newPixel.style.backgroundColor = pixel.style.backgroundColor;
            artwork.appendChild(newPixel);
        });

        const info = document.createElement('div');
        info.className = 'gallery-item-info';
        info.innerHTML = `<strong>${name}</strong><br>${description}`;

        const shareButtons = document.createElement('div');
        shareButtons.className = 'share-buttons';
        ['facebook', 'twitter', 'pinterest'].forEach(platform => {
            const button = document.createElement('button');
            button.className = 'share-button';
            button.innerHTML = `<i class="fab fa-${platform}"></i>`;
            button.addEventListener('click', () => shareArtwork(platform, name));
            shareButtons.appendChild(button);
        });

        artworkContainer.appendChild(artwork);
        artworkContainer.appendChild(info);
        artworkContainer.appendChild(shareButtons);

        console.log('Attempting to append to gallery container');
        if (galleryContainer) {
            galleryContainer.appendChild(artworkContainer);
            console.log('Artwork appended to gallery');
        } else {
            console.error('Gallery container is null');
        }

        clearCanvas();
        artworkName.value = '';
        artworkDescription.value = '';
    });

    function clearCanvas() {
        const pixels = pixelCanvas.children;
        for (let pixel of pixels) {
            pixel.style.backgroundColor = '#fff';
        }
    }

    function shareArtwork(platform, name) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Check out my pixel art "${name}" on ChaosPiXELS!`);
        let shareUrl;

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'pinterest':
                shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
                break;
        }

        window.open(shareUrl, '_blank');
    }
});
