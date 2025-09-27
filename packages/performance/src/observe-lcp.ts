export default function observeLCP() {
  const perfObsCb: PerformanceObserverCallback = (list) => {
    if (observer) {
      observer.disconnect();
    }
    for (const entry of list.getEntries()) {
      const jsonObj = entry.toJSON();
      const reportData = {
        ...jsonObj,
        type: "performance",
        pageUrl: window.location.href,
        name: entry.name,
        duration: entry.duration,
        entryType: entry.entryType,
        startTime: entry.startTime,
      };

      console.log(reportData);
    }
  };

  const observer = new PerformanceObserver(perfObsCb);
  observer.observe({ type: "largest-contentful-paint", buffered: true });
}
