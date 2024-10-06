const iconmenu = document.getElementById('icon-menu')
const sidebar = document.getElementById('sidebar')
const overlay = document.getElementById('overlay')
const notification = document.querySelector('.notification')
const notificationContainer = document.querySelector('.notification-container')

let menuOpen = false

function openMenu() {
  menuOpen = true
  overlay.style.display = 'block'
  sidebar.style.width = '250px'
}

function closeMenu() {
  menuOpen = false
  overlay.style.display = 'none'
  sidebar.style.width = '0px'
}

iconmenu.addEventListener('click', function () {
  if (!menuOpen) {
    openMenu()
  }
})

overlay.addEventListener('click', function () {
  if (menuOpen) {
    closeMenu()
  }
})

notification.addEventListener('click', function () {
  notificationContainer.style.display = notificationContainer.style.display === 'block' ? 'none' : 'block'
})
// Đóng notification khi nhấp ra ngoài
window.onclick = (e) => {
  if (notificationContainer.style.display === 'block' && !e.target.closest('.dropdown')) {
    notificationContainer.style.display = 'none'
  }
}

/*------------------------*/

/**888888888888888888888888888 */
const tabs = document.querySelectorAll('.tab')
const videos = document.querySelectorAll('.videos')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

// Biến để theo dõi chỉ số tab hiển thị
let currentTabIndex = 0
const tabsToShow = 6 // Số lượng tab hiển thị mặc định
const maxVideosToShow = 10 // Số lượng video tối đa hiển thị

// Hàm hiển thị tab
function showTabs() {
  tabs.forEach((tab, index) => {
    if (index >= currentTabIndex && index < currentTabIndex + tabsToShow) {
      tab.style.display = 'inline-block' // Hiển thị tab
    } else {
      tab.style.display = 'none' // Ẩn tab
    }
  })
  updateButtonStyles() // Cập nhật kiểu dáng cho nút
}

// Hàm hiển thị video dựa trên tab được chọn
function showVideos(tab) {
  const selectedTab = tab.getAttribute('data-tab')
  let videoCount = 0 // Biến đếm số lượng video hiển thị

  // Reset tất cả video
  videos.forEach((video) => {
    video.style.display = 'none' // Ẩn tất cả video ban đầu
  })

  if (selectedTab === 'all') {
    // Nếu chọn tab "all", chỉ hiển thị tối đa 10 video
    videos.forEach((video) => {
      if (videoCount < maxVideosToShow) {
        video.style.display = 'block' // Hiển thị tối đa 10 video
        videoCount++ // Tăng biến đếm video
      }
    })
  } else {
    // Nếu chọn các tab khác, chỉ hiển thị video của tab đó
    videos.forEach((video) => {
      if (video.getAttribute('data-content') === selectedTab) {
        if (videoCount < maxVideosToShow) {
          video.style.display = 'block' // Hiển thị tối đa 10 video của tab đó
          videoCount++ // Tăng biến đếm video
        }
      }
    })
  }
}

// Hàm cập nhật kiểu dáng cho nút
function updateButtonStyles() {
  // Nếu không còn tab để hiển thị
  if (currentTabIndex + tabsToShow >= tabs.length) {
    nextBtn.style.backgroundColor = '#ee3537' // Đổi màu nền nút Next
    nextBtn.disabled = true // Vô hiệu hóa nút Next
  } else {
    nextBtn.style.backgroundColor = '' // Trở về màu nền mặc định
    nextBtn.disabled = false // Kích hoạt nút Next
  }

  if (currentTabIndex === 0) {
    prevBtn.style.backgroundColor = '#ee3537' // Đổi màu nền nút Prev
    prevBtn.disabled = true // Vô hiệu hóa nút Prev
  } else {
    prevBtn.style.backgroundColor = '' // Trở về màu nền mặc định
    prevBtn.disabled = false // Kích hoạt nút Prev
  }
}

// Hàm thay đổi màu nền tab
function updateActiveTab() {
  tabs.forEach((tab) => tab.classList.remove('active')) // Xóa lớp active của tất cả tab
  tabs[currentTabIndex].classList.add('active') // Thêm lớp active cho tab hiện tại
}

// Hiển thị các tab và video khi tải trang
showTabs()
showVideos(tabs[0]) // Mặc định hiển thị video của tab đầu tiên

// Sự kiện cho nút Next
nextBtn.addEventListener('click', () => {
  if (currentTabIndex + tabsToShow < tabs.length) {
    currentTabIndex++ // Chuyển đến tab tiếp theo
    showTabs() // Hiển thị lại các tab
    showVideos(tabs[currentTabIndex]) // Hiển thị video của tab mới
    updateActiveTab() // Cập nhật màu nền cho tab
  }
})

// Sự kiện cho nút Prev
prevBtn.addEventListener('click', () => {
  if (currentTabIndex > 0) {
    currentTabIndex-- // Chuyển về tab trước
    showTabs() // Hiển thị lại các tab
    showVideos(tabs[currentTabIndex]) // Hiển thị video của tab mới
    updateActiveTab() // Cập nhật màu nền cho tab
  }
})

// Sự kiện cho tab
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'))
    tab.classList.add('active')
    showVideos(tab) // Hiển thị video khi click vào tab
    currentTabIndex = Array.from(tabs).indexOf(tab) // Cập nhật chỉ số tab hiện tại
  })
})

// Cập nhật màu nền cho tab hiện tại lúc bắt đầu
updateActiveTab()

/********************** */
new Splide('#splide01', {
  type: 'loop', // Carousel loop
  perPage: 3, // Show 3 slides per page
  perMove: 1, // Move 1 slide at a time
  gap: '1rem', // Gap between slides
  arrows: true, // Enable next/prev arrows
  autoplay: true, // Enable autoplay
  breakpoints: {
    1024: {
      perPage: 2, // Show 2 slides per view for screens between 768px and 1024px
    },
    768: {
      perPage: 2, // Also for screens 768px and below, still show 2 slides
    },
    500: {
      perPage: 1, // Show 1 slide per view on very small screens
    },
  },
}).mount()
