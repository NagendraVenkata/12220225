

const API_URL = 'http://20.244.55.144/evaluation-service/logs'; // Correct URL

export async function Log({ stack, level, pkg, message }) {
  try {
    const token = localStorage.getItem('accessToken'); 
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });

    const data = await res.json();
    console.log("Logged:", data.message); 
    return data;
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
}
