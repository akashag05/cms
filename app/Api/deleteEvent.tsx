
// export const getEventNewsById = async (props: any) => {
//     const res = await fetch(`http://localhost:5000//getEventsNewsById/${props}`, {
//       method: "GET", // Use GET method for a GET request
//     });
//     const data = await res.json();
//     return data[0];
//   };
export const deleteEventNews = async (props: any) => {
    const res = await fetch(
      `http://localhost:5000/events/deleteEvent/${props}`,
      {
        method: "DELETE", // Use GET method for a GET request
      }
    );
    const data = await res.json();
    return data;
  };