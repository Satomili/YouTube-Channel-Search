const apiKey = "AIzaSyCjSbXoXMkB7v7Zvf-YWrRuR3xh5y0v7FU"
const endpoint = "https://www.googleapis.com/youtube/v3/search"
let url = ""

const headerSelect = document.getElementById("header--select")
const headerInput = document.getElementById("header--input")
const headerButton = document.getElementById("header--button")

const mainTitle = document.getElementById("main--title")
const mainVideosContainer = document.getElementById("main--videos-container")

headerButton.addEventListener('click', () => {
    const inputValue = headerInput.value.trim()
    const selectedChannelId = headerSelect.value
    mainTitle.textContent = inputValue
    url = `${endpoint}?key=${apiKey}&channelId=${selectedChannelId}&part=snippet&type=video&q=${inputValue}&maxResults=30`
    fetchVideos(url)
    headerInput.value = ""
})

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function GenerateVideoUrl(videoId) {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    return videoUrl
}

function fetchVideos(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            const videoHtml = data.items.map(item => {
                return `
                <div class="main--video" onclick="window.open('${GenerateVideoUrl(item.id.videoId)}', '_blank')">
                    <img src=${item.snippet.thumbnails.medium.url} class="main--video-img">
                    <p class="main--video-date">${formatDate(item.snippet.publishedAt)}</p>
                    <h3 class="main--video-title">${item.snippet.title}</h3>
                </div>
                `
            }).join("")

            mainVideosContainer.innerHTML = videoHtml
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
        })
}
