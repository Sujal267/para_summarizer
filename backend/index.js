const express = require("express")
const fs = require("fs")
require("dotenv").config();
const YoutubeMp3Downloader = require('youtube-mp3-downloader')
const { createClient } = require("@deepgram/sdk");
// const {OpenAI} = require("openai")
const ffmpeg = require('ffmpeg-static')
const axios = require("axios")
const cors = require("cors")

const app = express()

app.use(cors())

// const openai = new OpenAI({
//     apiKey:process.env.OPEN_AI_KEY
// })

let summarizedPara = ""

app.use(express.json())

app.post("/ytsummary", (req, res) => {
    const paragraph = req.body.url
    console.log(paragraph,"\n\n")

    // const deepgram = createClient('90240f08ce067105119d519198e4a242794b9554');

    // const YD = new YoutubeMp3Downloader({
    //     ffmpegPath: ffmpeg,
    //     outputPath: './',
    //     youtubeVideoQuality: 'highestaudio',
    // })

    // YD.download('ir-mWUYH_uo')

    // YD.on('progress', (data) => {
    //     console.log(data.progress.percentage + '% downloaded')
    // })

    // YD.on('finished', async (err, video) => {
    //     const videoFileName = video.videoTitle
    //     console.log(`Downloaded ${videoFileName}`)

    //     // Continue on to get transcript here

    //     const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    //         fs.readFileSync(`./${videoFileName}.mp3`),
    //         {
    //             smart_format: true,
    //             model: "nova",
    //         }
    //     );

        // if (error) throw error;
        // if (!error) {
        //     console.log(result.results.channels[0].alternatives[0].transcript, "transcribed successfully")
        // };
        // const text = "Gutenberg many contributions to printing are: the invention of a process for mass-producing movable type, the use of oil-based ink for printing books, adjustable molds, and the use of a wooden printing press. His truly epochal invention was the combination of these elements into a practical system that allowed the mass production of printed books and was economically viable for printers and readers alike."

        // try {
        //     const aiResponse = await openai.completions.create({
        //         model:"gpt-3.5-turbo",
        //         prompt:`summarize the following text : ${text}`,
        //         max_tokens:15,
        //     })
        //     console.log(aiResponse.data.choices[0].text)
        // } catch (e) {
        //     console.log("error", e)
        // }

        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/text/summarize",
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGE0NmYyMGMtYjllZS00ZDRlLTliYTMtOGJkYzgwZDBlZjEwIiwidHlwZSI6ImFwaV90b2tlbiJ9.atjdfzEXiFi-rmMtQbyAFkdUedkQKxwcRvBOBC6k13A",
            },
            data: {
                output_sentences: 3,
                providers: "cohere",
                text: paragraph,
                language: "en",
                fallback_providers: "",
            },
        };

        axios
            .request(options)
            .then((response) => {
                summarizedPara = response.data.cohere.result;
                console.log(response.data.cohere.result);
            })
            .catch((error) => {
                console.error(error);
            });




        // fs.unlinkSync(`./${videoFileName}.mp3`)

    // })


    res.status(200).json({
        msg: "url received"
    })
})

app.get("/getsummarizedpara",(req,res)=>{
    res.status(200).json({
        msg:summarizedPara
    })
})

app.listen(8080, (req, res) => {
    console.log("server is running on port 8080")
})

