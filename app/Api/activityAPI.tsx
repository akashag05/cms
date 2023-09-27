export const fetchActivities = async () => {
    const res = await fetch("http://localhost:8080/activities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };
