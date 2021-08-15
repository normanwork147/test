function registeSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`./sw.js?${process.env.BUILD_TIME}`, {
      scope: '/',
    });
  }
}

function unRegisteSW() {
  navigator.serviceWorker?.getRegistrations().then((regs) => {
    for (const reg of regs) {
      reg.unregister();
    }
    return regs;
  });
}

function initpwa(flag) {
  if (flag) {
    registeSW();
  } else {
    unRegisteSW();
  }

  // Notification.requestPermission().then(function (result) {
  //   if (result === "granted") {
  //     randomNotification();
  //   }
  // });
}

if (process.env.NODE_ENV !== 'development') {
  initpwa(true);
} else {
  initpwa(false);
}
