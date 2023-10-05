export const getAllEventsNews = async () => {
    const res = await fetch("http://localhost:5000/events/getAllEventsNews", {
      method: "GET", // Use GET method for a GET request
    });
    const data = await res.json();
    return data;
  };