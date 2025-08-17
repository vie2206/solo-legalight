// Service Worker registration and management

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function registerSW() {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL || '', window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
        navigator.serviceWorker.ready.then(() => {
          console.log('Service Worker: Running in localhost mode');
        });
      } else {
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl: string) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker: Registered successfully', registration);
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('Service Worker: New content available, please refresh');
                // Could show update notification here
                showUpdateNotification();
              } else {
                console.log('Service Worker: Content cached for offline use');
              }
            }
          };
        }
      };
    })
    .catch((error) => {
      console.error('Service Worker: Registration failed', error);
    });
}

function checkValidServiceWorker(swUrl: string) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log('Service Worker: No internet connection, running offline');
    });
}

function showUpdateNotification() {
  // Create update notification
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
  notification.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex-1 mr-3">
        <p class="font-semibold">New Update Available!</p>
        <p class="text-sm opacity-90">Click to refresh and get the latest features</p>
      </div>
      <button id="refresh-btn" class="bg-white text-blue-600 px-3 py-1 rounded font-medium">
        Refresh
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Handle refresh button click
  const refreshBtn = notification.querySelector('#refresh-btn');
  refreshBtn?.addEventListener('click', () => {
    window.location.reload();
  });
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 10000);
}

export function unregisterSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('Service Worker: Unregistered');
      })
      .catch((error) => {
        console.error('Service Worker: Unregistration failed', error);
      });
  }
}

// Send performance metrics to service worker
export function sendPerformanceMetrics(metrics: any) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'PERFORMANCE_REPORT',
      metrics
    });
  }
}