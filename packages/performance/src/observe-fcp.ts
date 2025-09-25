export default function observeFCP() {
  const perfObsCb: PerformanceObserverCallback = (list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-contentful-paint") {
        observer.disconnect();
        const jsonObj = entry.toJSON();
        const reportData = {
          ...jsonObj,
          type: "performance",
          subType: entry.name,
          pageUrl: window.location.href,
        };

        console.log(reportData)
      }
    }
  };

  const observer = new PerformanceObserver(perfObsCb);
  observer.observe({ type: "paint", buffered: true });
}
