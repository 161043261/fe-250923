export default function observeFP() {
  const perfObsCb: PerformanceObserverCallback = (list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-paint") {
        observer.disconnect();
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
    }
  };

  const observer = new PerformanceObserver(perfObsCb);
  observer.observe({ type: "paint", buffered: true });
}
