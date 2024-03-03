const socket = io('http://localhost:9999');
let videoGrid; // Declare videoGrid variable

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
    // Select the video-grid element
    videoGrid = document.getElementById("video-grid");

    // Request access to user's media devices
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            // Create a video element for the user's stream
            const myVideo = document.createElement('video');
            myVideo.muted = true;
            myVideo.srcObject = stream;

            // Play the video once it's loaded
            myVideo.addEventListener("loadedmetadata", () => {
                myVideo.play();
            });

            // Append the video element to the video grid
            addVideoStream(myVideo);
        })
        .catch(error => {
            console.error('Error accessing media devices:', error);
        });
});

// Function to add video stream to the video grid
function addVideoStream(video) {
    // Check if videoGrid is initialized and not null
    if (videoGrid) {
        // Append the video element to the video grid
        videoGrid.append(video);
    } else {
        console.error('Video grid element not found');
    }
}












