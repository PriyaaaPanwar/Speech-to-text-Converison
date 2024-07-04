// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const { Readable } = require('stream');
// const ffmpeg = require('fluent-ffmpeg');
// const ffmpegPath = require('ffmpeg-static');
// const ffmetadata = require('ffmetadata');
// const fs = require('fs');
// const ytdl = require('ytdl-core');
// const speech = require('@google-cloud/speech');

// const app = express();
// const client = new speech.SpeechClient();

// app.use(cors());

// const bufferToStream = (buffer) => {
//     return Readable.from(buffer);
// }

// /**
//  * Convert a time string of the format 'mm:ss' into seconds.
//  * @param {string} timeString - A time string in the format 'mm:ss'.
//  * @return {number} - The time in seconds.
//  */
// const parseTimeStringToSeconds = timeString => {
//     const [minutes, seconds] = timeString.split(':').map(tm => parseInt(tm));
//     return minutes * 60 + seconds;
// }

// const upload = multer();
// ffmpeg.setFfmpegPath(ffmpegPath);
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Welcome to the Speech-to-Text API!');
// });

// app.post('/api/transcribe', upload.single('file'), async (req, res) => {
//     const audioFile = req.file;
//     const youtubeUrl = req.body.youtubeUrl;
//     const startTime = req.body.startTime;
//     const endTime = req.body.endTime;

//     if (!audioFile && !youtubeUrl) {
//         res.status(400).json({ message: 'Audio file or YouTube URL is required.' });
//         return;
//     }

//     if (!startTime || !endTime) {
//         res.status(400).json({ message: 'Start and end times are required.' });
//         return;
//     }

//     // Parse and calculate the duration
//     const startSeconds = parseTimeStringToSeconds(startTime);
//     const endSeconds = parseTimeStringToSeconds(endTime);
//     const timeDuration = endSeconds - startSeconds;

//     try {
//         let audioStream;
//         if (audioFile) {
//             audioStream = bufferToStream(audioFile.buffer);
//         } else if (youtubeUrl) {
//             audioStream = ytdl(youtubeUrl, { filter: 'audioonly' });
//         }

//         const trimAudio = async (audioStream, endTime) => {
//             const tempFileName = `temp-${Date.now()}.mp3`;
//             const outputFileName = `output-${Date.now()}.mp3`;

//             return new Promise((resolve, reject) => {
//                 const tempFileStream = fs.createWriteStream(tempFileName);
//                 audioStream.pipe(tempFileStream)
//                     .on('finish', () => {
//                         ffmetadata.read(tempFileName, (err, metadata) => {
//                             if (err) {
//                                 console.error('Error reading metadata:', err);
//                                 return reject(err);
//                             }
//                             const duration = parseFloat(metadata.duration);
//                             if (endTime > duration) endTime = duration;

//                             ffmpeg(tempFileName)
//                                 .setStartTime(startSeconds)
//                                 .setDuration(timeDuration)
//                                 .output(outputFileName)
//                                 .on('end', () => {
//                                     fs.unlink(tempFileName, (err) => {
//                                         if (err) console.error('Error deleting temp file:', err);
//                                     });

//                                     const trimmedAudioBuffer = fs.readFileSync(outputFileName);
//                                     fs.unlink(outputFileName, (err) => {
//                                         if (err) console.error('Error deleting output file:', err);
//                                     });

//                                     resolve(trimmedAudioBuffer);
//                                 })
//                                 .on('error', (err) => {
//                                     console.error('Error during trimming audio:', err);
//                                     reject(err);
//                                 })
//                                 .run();
//                         });
//                     })
//                     .on('error', (err) => {
//                         console.error('Error during audio stream piping:', err);
//                         reject(err);
//                     });
//             });
//         };

//         const trimmedAudioBuffer = await trimAudio(audioStream, endTime);

//         // Call Google Cloud Speech-to-Text API to transcribe the audio file
//         const request = {
//             audio: {
//                 content: trimmedAudioBuffer.toString('base64'),
//             },
//             config: {
//                 encoding: 'MP3',
//                 sampleRateHertz: 16000,
//                 languageCode: 'en-US',
//             },
//         };

//         const [response] = await client.recognize(request);
//         const transcription = response.results
//             .map(result => result.alternatives[0].transcript)
//             .join('\n');

//         res.json({ transcription });
//     } catch (error) {
//         console.error('Error in /api/transcribe endpoint:', error);
//         res.status(500).json({ error: 'Error transcribing audio' });
//     }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const { Readable } = require('stream');
// const ffmpeg = require('fluent-ffmpeg');
// const ffmpegPath = require('ffmpeg-static');
// const fs = require('fs');
// const ytdl = require('ytdl-core');
// const speech = require('@google-cloud/speech');

// const app = express();
// const client = new speech.SpeechClient();

// app.use(cors());

// const bufferToStream = (buffer) => {
//     return Readable.from(buffer);
// }

// const upload = multer();
// ffmpeg.setFfmpegPath(ffmpegPath);
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Welcome to the Speech-to-Text API!');
// });

// app.post('/api/transcribe', upload.single('file'), async (req, res) => {
//     const audioFile = req.file;
//     const youtubeUrl = req.body.youtubeUrl;

//     if (!audioFile && !youtubeUrl) {
//         res.status(400).json({ message: 'Audio file or YouTube URL is required.' });
//         return;
//     }

//     try {
//         let audioStream;
//         if (audioFile) {
//             audioStream = bufferToStream(audioFile.buffer);
//         } else if (youtubeUrl) {
//             audioStream = ytdl(youtubeUrl, { filter: 'audioonly' });
//         }

//         const saveTempAudioFile = async (audioStream) => {
//             const tempFileName = `temp-${Date.now()}.mp3`;

//             return new Promise((resolve, reject) => {
//                 const tempFileStream = fs.createWriteStream(tempFileName);
//                 audioStream.pipe(tempFileStream)
//                     .on('finish', () => {
//                         resolve(tempFileName);
//                     })
//                     .on('error', (err) => {
//                         console.error('Error during audio stream piping:', err);
//                         reject(err);
//                     });
//             });
//         };

//         const tempFileName = await saveTempAudioFile(audioStream);

//         // Call Google Cloud Speech-to-Text API to transcribe the audio file
//         const audioBytes = fs.readFileSync(tempFileName).toString('base64');
//         const request = {
//             audio: {
//                 content: audioBytes,
//             },
//             config: {
//                 encoding: 'MP3',
//                 sampleRateHertz: 16000,
//                 languageCode: 'en-US',
//             },
//         };

//         const [response] = await client.recognize(request);
//         const transcription = response.results
//             .map(result => result.alternatives[0].transcript)
//             .join('\n');

//         fs.unlink(tempFileName, (err) => {
//             if (err) console.error('Error deleting temp file:', err);
//         });

//         res.json({ transcription });
//     } catch (error) {
//         console.error('Error in /api/transcribe endpoint:', error);
//         res.status(500).json({ error: 'Error transcribing audio' });
//     }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const projectRoutes = require('./routes/projectRoutes');
const speechRoutes = require('./routes/speechRoutes');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
var multer = require("multer");
var upload = multer();
const app = express();
app.use(
    bodyParser.json({
        limit: "500mb",
    })
);
// for parsing application/xwww-form-urlencoded
app.use(
    bodyParser.urlencoded({
        limit: "500mb",
        extended: true,
    })
);

// for parsing multipart/form-data
// app.use(upload.array());
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/speeches', speechRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
