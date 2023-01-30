async function getAudioUrl(message) {
    const response = await fetch("https://us-central1-sunlit-context-217400.cloudfunctions.net/streamlabs-tts", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ text: message, voice: "Brian" })
    });
    return response.json()
  }

  
module.exports = {
    getAudioUrl
}