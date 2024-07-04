// // // const Speech = require('../models/speechModel');
// // // const Project = require('../models/projectModel');
// // // const fs = require('fs');
// // // const { Readable } = require('stream');
// // // const ytdl = require('ytdl-core');
// // // const speech = require('@google-cloud/speech');
// // // const client = new speech.SpeechClient();

// // // const bufferToStream = (buffer) => {
// // //     return Readable.from(buffer);
// // // }

// // // exports.createSpeech = async (req, res) => {
// // //     const { projectId, youtubeUrl } = req.body;

// // //     try {
// // //         const project = await Project.findById(projectId);
// // //         if (!project) return res.status(404).json({ message: 'Project not found' });

// // //         let audioStream;
// // //         if (req.file) {
// // //             audioStream = bufferToStream(req.file.buffer);
// // //         } else if (youtubeUrl) {
// // //             audioStream = ytdl(youtubeUrl, { filter: 'audioonly' });
// // //         } else {
// // //             return res.status(400).json({ message: 'Audio file or YouTube URL is required.' });
// // //         }

// // //         const tempFileName = `temp-${Date.now()}.mp3`;
// // //         const tempFileStream = fs.createWriteStream(tempFileName);
// // //         audioStream.pipe(tempFileStream).on('finish', async () => {
// // //             const audioBytes = fs.readFileSync(tempFileName).toString('base64');

// // //             const request = {
// // //                 audio: { content: audioBytes },
// // //                 config: { encoding: 'MP3', sampleRateHertz: 16000, languageCode: 'en-US' },
// // //             };

// // //             const [response] = await client.recognize(request);
// // //             const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');

// // //             fs.unlink(tempFileName, err => {
// // //                 if (err) console.error('Error deleting temp file:', err);
// // //             });

// // //             const speech = new Speech({ projectId, text: transcription });
// // //             await speech.save();
// // //             res.status(201).json(speech);
// // //         }).on('error', (err) => {
// // //             console.error('Error during audio stream piping:', err);
// // //             res.status(500).json({ error: err.message });
// // //         });
// // //     } catch (error) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };

// // // exports.getSpeeches = async (req, res) => {
// // //     try {
// // //         const speeches = await Speech.find({ projectId: req.params.projectId });
// // //         res.status(200).json(speeches);
// // //     } catch (error) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };

// // // exports.updateSpeech = async (req, res) => {
// // //     try {
// // //         const speech = await Speech.findById(req.params.id);
// // //         if (!speech) return res.status(404).json({ message: 'Speech not found' });

// // //         speech.text = req.body.text || speech.text;
// // //         await speech.save();
// // //         res.status(200).json(speech);
// // //     } catch (error) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };

// // // exports.deleteSpeech = async (req, res) => {
// // //     try {
// // //         const speech = await Speech.findById(req.params.id);
// // //         if (!speech) return res.status(404).json({ message: 'Speech not found' });

// // //         await speech.remove();
// // //         res.status(200).json({ message: 'Speech deleted' });
// // //     } catch (error) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };
// // const Speech = require('../models/speechModel');
// // const Project = require('../models/projectModel');
// // const fs = require('fs');
// // const { Readable } = require('stream');
// // const ytdl = require('ytdl-core');
// // const speech = require('@google-cloud/speech');
// // const client = new speech.SpeechClient();

// // const bufferToStream = (buffer) => {
// //     return Readable.from(buffer);
// // };

// // exports.createSpeech = async (req, res) => {
// //     const { projectName, youtubeUrl, name } = req.body;
// //     console.log('Request Body:', req.body);

// //     try {
// //         // Log the project name being searched for
// //         console.log('Searching for project with name:', projectName);

// //         // Find the project by name
// //         const project = await Project.findOne({ name: projectName });
        
// //         // Log the project found or not
// //         if (project) {
// //             console.log('Project found:', project);
// //         } else {
// //             console.log('Project not found');
// //             return res.status(404).json({ message: 'Project not found' });
// //         }

// //         let audioStream;
// //         if (req.file) {
// //             audioStream = bufferToStream(req.file.buffer);
// //         } else if (youtubeUrl) {
// //             audioStream = ytdl(youtubeUrl, { filter: 'audioonly' });
// //         } else {
// //             return res.status(400).json({ message: 'Audio file or YouTube URL is required.' });
// //         }

// //         const tempFileName = `temp-${Date.now()}.mp3`;
// //         const tempFileStream = fs.createWriteStream(tempFileName);
// //         audioStream.pipe(tempFileStream).on('finish', async () => {
// //             const audioBytes = fs.readFileSync(tempFileName).toString('base64');

// //             const request = {
// //                 audio: { content: audioBytes },
// //                 config: { encoding: 'MP3', sampleRateHertz: 16000, languageCode: 'en-US' },
// //             };

// //             const [response] = await client.recognize(request);
// //             const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');

// //             fs.unlink(tempFileName, err => {
// //                 if (err) console.error('Error deleting temp file:', err);
// //             });

// //             const newSpeech = new Speech({
// //                 projectId: project._id, // Use the project ID from the found project
// //                 name,
// //                 audioUrl: tempFileName, // You might want to store the actual path or a link to the audio file
// //                 transcription,
// //             });

// //             await newSpeech.save();
// //             res.status(201).json(newSpeech);
// //         }).on('error', (err) => {
// //             console.error('Error during audio stream piping:', err);
// //             res.status(500).json({ error: err.message });
// //         });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // exports.getSpeeches = async (req, res) => {
// //     try {
// //         const speeches = await Speech.find({ projectId: req.params.projectId });
// //         res.status(200).json(speeches);
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // exports.updateSpeech = async (req, res) => {
// //     try {
// //         const speech = await Speech.findById(req.params.id);
// //         if (!speech) return res.status(404).json({ message: 'Speech not found' });

// //         speech.name = req.body.name || speech.name;
// //         speech.text = req.body.text || speech.text;
// //         await speech.save();
// //         res.status(200).json(speech);
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // exports.deleteSpeech = async (req, res) => {
// //     try {
// //         const speech = await Speech.findById(req.params.id);
// //         if (!speech) return res.status(404).json({ message: 'Speech not found' });

// //         await speech.remove();
// //         res.status(200).json({ message: 'Speech deleted' });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };
// const Speech = require('../models/speechModel');
// const Project = require('../models/projectModel');
// const fs = require('fs');
// const { Readable } = require('stream');
// const ytdl = require('ytdl-core');
// const speech = require('@google-cloud/speech');
// const client = new speech.SpeechClient();
// const { Storage } = require('@google-cloud/storage');
// const storage = new Storage();

// const bufferToStream = (buffer) => {
//     return Readable.from(buffer);
// };

// exports.createSpeech = async (req, res) => {
//     const { projectName, youtubeUrl, name } = req.body;
//     console.log('Request Body:', req.body);

//     try {
//         // Log the project name being searched for
//         console.log('Searching for project with name:', projectName);

//         // Find the project by name
//         const project = await Project.findOne({ name: projectName });
        
//         // Log the project found or not
//         if (project) {
//             console.log('Project found:', project);
//         } else {
//             console.log('Project not found');
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         let audioStream;
//         if (req.file) {
//             audioStream = bufferToStream(req.file.buffer);
//         } else if (youtubeUrl) {
//             audioStream = ytdl(youtubeUrl, { filter: 'audioonly' });
//         } else {
//             return res.status(400).json({ message: 'Audio file or YouTube URL is required.' });
//         }

//         const tempFileName = `temp-${Date.now()}.mp3`;
//         const tempFileStream = fs.createWriteStream(tempFileName);
//         audioStream.pipe(tempFileStream).on('finish', async () => {
//             const audioBytes = fs.readFileSync(tempFileName).toString('base64');

//             const request = {
//                 audio: { content: audioBytes },
//                 config: { encoding: 'MP3', sampleRateHertz: 16000, languageCode: 'en-US' },
//             };

//             const [response] = await client.recognize(request);
//             const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');

//             fs.unlink(tempFileName, err => {
//                 if (err) console.error('Error deleting temp file:', err);
//             });

//             const newSpeech = new Speech({
//                 projectId: project._id, // Use the project ID from the found project
//                 name,
//                 audioUrl: tempFileName, // You might want to store the actual path or a link to the audio file
//                 transcription,
//             });

//             await newSpeech.save();
//             res.status(201).json(newSpeech);
//         }).on('error', (err) => {
//             console.error('Error during audio stream piping:', err);
//             res.status(500).json({ error: err.message });
//         });
//     } catch (error) {
//         console.error('Error in createSpeech:', error);
//         res.status(500).json({ error: error.message });
//     }
// };


// exports.getSpeeches = async (req, res) => {
//     const { name } = req.query;

//     try {
//         // Find the project by name
//         const project = await Project.findOne({ name });

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         // Fetch speeches associated with the project
//         const speeches = await Speech.find({ projectId: project._id });

//         res.status(200).json(speeches);
//     } catch (error) {
//         console.error('Error in getSpeeches:', error);
//         res.status(500).json({ error: error.message });
//     }
// };


// exports.updateSpeech = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, transcription } = req.body;

//         // Debugging: Log the incoming request body
//         console.log('Incoming request body:', req.body);

//         // Check if transcription field is being received
//         if (!transcription) {
//             console.log('Transcription field is missing');
//             return res.status(400).json({ message: 'Transcription field is required' });
//         }

//         const speech = await Speech.findByIdAndUpdate(id, { name, transcription }, { new: true });

//         // Debugging: Log the updated speech object
//         console.log('Updated speech:', speech);

//         if (!speech) {
//             return res.status(404).json({ message: 'Speech not found' });
//         }

//         res.status(200).json(speech);
//     } catch (error) {
//         console.error('Error in updateSpeech:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.deleteSpeech = async (req, res) => {
//     try {
//         console.log('Deleting speech with id:', req.params.id);
//         const speech = await Speech.findByIdAndDelete(req.params.id);
//         if (!speech) {
//             console.log('Speech not found');
//             return res.status(404).json({ message: 'Speech not found' });
//         }
//         res.status(200).json({ message: 'Speech deleted' });
//     } catch (error) {
//         console.error('Error in deleteSpeech:', error);
//         res.status({error: error.messag});
//     }
// };
// exports.getSpeechById = async (req, res) => {
//     const { id } = req.params;
//     console.log(id)
//     try {
//         const speech = await Speech.findById(id);

//         if (!speech) {
//             return res.status(404).json({ message: 'Speech not found' });
//         }

//         res.status(200).json(speech);
//     } catch (error) {
//         console.error('Error in getSpeechById:', error);
//         res.status(500).json({ error: error.message });
//     }
// };
const Speech = require('../models/speechModel');
const Project = require('../models/projectModel');
const fs = require('fs');
const { Readable } = require('stream');
const ytdl = require('ytdl-core');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
const multer = require('multer');
const upload = multer();

const bufferToStream = (buffer) => {
    return Readable.from(buffer);
};

exports.createSpeech = async (req, res) => {
    const { projectName, youtubeUrl, name } = req.body;
    console.log('Request Body:', req.body);

    try {
        // Log the project name being searched for
        console.log('Searching for project with name:', projectName);

        // Find the project by name
        const project = await Project.findOne({ name: projectName });
        
        // Log the project found or not
        if (project) {
            console.log('Project found:', project);
        } else {
            console.log('Project not found');
            return res.status(404).json({ message: 'Project not found' });
        }

        let audioStream;
        if (req.file) {
            audioStream = bufferToStream(req.file.buffer);
        } else if (youtubeUrl) {
            audioStream = ytdl(youtubeUrl, { filter: 'audioonly' });
        } else {
            return res.status(400).json({ message: 'Audio file or YouTube URL is required.' });
        }

        const tempFileName = `temp-${Date.now()}.mp3`;
        const tempFileStream = fs.createWriteStream(tempFileName);
        audioStream.pipe(tempFileStream).on('finish', async () => {
            const audioBytes = fs.readFileSync(tempFileName).toString('base64');

            const request = {
                audio: { content: audioBytes },
                config: { encoding: 'MP3', sampleRateHertz: 16000, languageCode: 'en-US' },
            };

            const [response] = await client.recognize(request);
            const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');

            fs.unlink(tempFileName, err => {
                if (err) console.error('Error deleting temp file:', err);
            });

            const newSpeech = new Speech({
                projectId: project._id, // Use the project ID from the found project
                name,
                audioUrl: tempFileName, // You might want to store the actual path or a link to the audio file
                transcription,
            });

            await newSpeech.save();
            res.status(201).json(newSpeech);
        }).on('error', (err) => {
            console.error('Error during audio stream piping:', err);
            res.status(500).json({ error: err.message });
        });
    } catch (error) {
        console.error('Error in createSpeech:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.uploadFile = async (req, res) => {
    const { projectName, name } = req.body;
    console.log('Request Body:', req.body);

    try {
        // Log the project name being searched for
        console.log('Searching for project with name:', projectName);

        // Find the project by name
        const project = await Project.findOne({ name: projectName });
        
        // Log the project found or not
        if (project) {
            console.log('Project found:', project);
        } else {
            console.log('Project not found');
            return res.status(404).json({ message: 'Project not found' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'File is required.' });
        }

        const fileType = req.file.mimetype;

        if (fileType === 'audio/mpeg') {
            const tempFileName = `temp-${Date.now()}.mp3`;
            fs.writeFileSync(tempFileName, req.file.buffer);
            
            const audioBytes = fs.readFileSync(tempFileName).toString('base64');

            const request = {
                audio: { content: audioBytes },
                config: { encoding: 'MP3', sampleRateHertz: 16000, languageCode: 'en-US' },
            };

            const [response] = await client.recognize(request);
            const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');

            fs.unlink(tempFileName, err => {
                if (err) console.error('Error deleting temp file:', err);
            });

            const newSpeech = new Speech({
                projectId: project._id, // Use the project ID from the found project
                name,
                audioUrl: tempFileName, // You might want to store the actual path or a link to the audio file
                transcription,
            });

            await newSpeech.save();
            res.status(201).json(newSpeech);
        } else if (fileType === 'text/plain') {
            const text = req.file.buffer.toString('utf-8');

            const newSpeech = new Speech({
                projectId: project._id,
                name,
                transcription: text,
            });

            await newSpeech.save();
            res.status(201).json(newSpeech);
        } else {
            return res.status(400).json({ message: 'Unsupported file type. Only MP3 and text files are supported.' });
        }
    } catch (error) {
        console.error('Error in uploadFile:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.getSpeeches = async (req, res) => {
    const { projectId } = req.query; // Assuming projectId is passed in the query parameters

    try {
        // Find the speeches associated with the project by projectId
        const speeches = await Speech.find({ projectId });

        if (!speeches || speeches.length === 0) {
            return res.status(404).json({ message: 'No speeches found for the project' });
        }

        res.status(200).json(speeches);
    } catch (error) {
        console.error('Error in getSpeeches:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateSpeech = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, transcription } = req.body;

        // Debugging: Log the incoming request body
        console.log('Incoming request body:', req.body);

        // Check if transcription field is being received
        if (!transcription) {
            console.log('Transcription field is missing');
            return res.status(400).json({ message: 'Transcription field is required' });
        }

        const speech = await Speech.findByIdAndUpdate(id, { name, transcription }, { new: true });

        // Debugging: Log the updated speech object
        console.log('Updated speech:', speech);

        if (!speech) {
            return res.status(404).json({ message: 'Speech not found' });
        }

        res.status(200).json(speech);
    } catch (error) {
        console.error('Error in updateSpeech:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSpeech = async (req, res) => {
    try {
        console.log('Deleting speech with id:', req.params.id);
        const speech = await Speech.findByIdAndDelete(req.params.id);
        if (!speech) {
            console.log('Speech not found');
            return res.status(404).json({ message: 'Speech not found' });
        }
        res.status(200).json({ message: 'Speech deleted' });
    } catch (error) {
        console.error('Error in deleteSpeech:', error);
        res.status({error: error.messag});
    }
};

exports.getSpeechById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const speech = await Speech.findById(id);

        if (!speech) {
            return res.status(404).json({ message: 'Speech not found' });
        }

        res.status(200).json(speech);
    } catch (error) {
        console.error('Error in getSpeechById:', error);
        res.status(500).json({ error: error.message });
    }
};
