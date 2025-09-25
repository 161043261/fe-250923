export default function observeLCP() {
  const perfObsCb: PerformanceObserverCallback = (list) => {
    if (observer) {
      observer.disconnect();
    }
    for (const entry of list.getEntries()) {
      if (entry.name === "largest-contentful-paint") {
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
  observer.observe({ type: "largest-contentful-paint", buffered: true });
}
