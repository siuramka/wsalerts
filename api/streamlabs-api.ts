import axios from "axios";


interface Response {
  speak_url: string;
  success: boolean;
}


async function getAudioUrlStreamlabs(message: string) {
  const { data, status } = await axios.post<Response>("https://us-central1-sunlit-context-217400.cloudfunctions.net/streamlabs-tts", { text: message, voice: "Brian" }, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

}

//   method: 'POST',
//   body: JSON.stringify({ text: message, voice: "Brian" })
// });