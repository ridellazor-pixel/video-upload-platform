// Initialize videos array from localStorage
function initializeVideos() {
    if (!localStorage.getItem('videos')) {
        localStorage.setItem('videos', JSON.stringify([]));
    }
}

// Load and display videos
function loadVideos(filter = '') {
    const videos = JSON.parse(localStorage.getItem('videos'));
    const container = document.getElementById('videosContainer');
    const noVideos = document.getElementById('noVideos');

    let filtered = videos;
    if (filter) {
        filtered = videos.filter(v =>
            v.title.toLowerCase().includes(filter.toLowerCase()) ||
            v.uploader.toLowerCase().includes(filter.toLowerCase())
        );
    }

    container.innerHTML = '';

    if (filtered.length === 0) {
        noVideos.style.display = 'block';
    } else {
        noVideos.style.display = 'none';
        filtered.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card';
            card.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
                <div class="video-info">
                    <div class="video-title">${video.title}</div>
                    <div class="video-uploader">by ${video.uploader}</div>
                    <a href="${video.url}" target="_blank" class="video-link">Watch Video ➤</a>
                </div>
            `;
            container.appendChild(card);
        });
    }
}

// Handle form submission
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const video = {
        uploader: document.getElementById('uploaderName').value,
        title: document.getElementById('videoTitle').value,
        thumbnail: document.getElementById('videoThumbnail').value,
        url: document.getElementById('videoUrl').value,
        timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    const videos = JSON.parse(localStorage.getItem('videos'));
    videos.unshift(video); // Add to beginning for most recent first
    localStorage.setItem('videos', JSON.stringify(videos));

    // Reset form
    this.reset();

    // Reload videos
    loadVideos();
    alert('Video uploaded successfully!');
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    loadVideos(e.target.value);
});

// Initialize on page load
window.addEventListener('load', function() {
    initializeVideos();
    loadVideos();
});
