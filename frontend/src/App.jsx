import { useState } from 'react'
import './App.css'
import bgVideo from "./assets/mixkit-bubbles-of-water-rising-to-the-surface-186-medium.mp4"
import axios from "axios"

function App() {
  const [url, setUrl] = useState("")
  const [summarizePara, setSummarizePara] = useState("")
  async function requestSummary() {
    try {
      await axios.post("http://localhost:8080/ytsummary", {
        url: url,
      });
      console.log("data posted")

      // Make the GET request after the POST request is complete
      const response = await axios.get("http://localhost:8080/getsummarizedpara");
      setSummarizePara(response.data.msg);
      console.log("data received on frontend");
      console.log(summarizePara)
    } catch (error) {
      console.error("Error occurred:", error);
    }

  }

  return (
    <>
      <video autoPlay muted loop style={{ position: "absolute", zIndex: "-1", top: "0", bottom: "0", width: "100%", height: "100%", objectFit: "cover" }}>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className='grid place-content-center place-items-center mt-10'>
        <div className='italic text-xl mt-2 text-slate-600 bg-slate-200 w-72 font-semibold p-2 text-center rounded-md'>Paragraph Summarizer</div>
        <textarea onChange={(e) => {
            setUrl(e.target.value)
          }} className='m-3 italic rounded-md focus:outline-none placeholder:text-center' placeholder='Enter The Paragraph' style={{ height: "200px", width: "500px" }}>
        </textarea>
        <button onClick={requestSummary} className='mt-2 p-1 italic rounded-md bg-slate-200 hover:bg-slate-300 w-32'>Summarize</button>
      </div>
      <br></br>
      <br></br>
      <div className='p-2 bg-slate-200 italic m-2'>{summarizePara}</div>
    </>
  )
}

export default App
