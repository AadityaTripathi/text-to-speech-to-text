"use client";
import React, { useState, useRef } from 'react';
import { MicrophoneIcon } from '@heroicons/react/solid'


const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const handleRecord = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech Recognition API is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    if (isRecording) {
      
      recognition.stop();
      setIsRecording(false);
    } else {
      
      setIsRecording(true);

      recognition.start();

      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript(speechToText);
        console.log("Spoken Text : ",speechToText);
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  };

  const handleSpeak = () => {
    const speechSynthesis = window.speechSynthesis;
    if (speechSynthesis.speaking) {
      console.error("Speech is already in progress.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen dark:bg-gray-900 bg-gray-100 p-12 transition duration-500">
      

      <div className="max-w-lg w-full">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleRecord}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-white font-semibold ${
              isRecording ? 'bg-red-500' : 'bg-green-500'
            } dark:bg-red-600 dark:hover:bg-red-700 dark:focus:bg-red-600 focus:outline-none shadow-lg transition duration-300 ease-in-out transform hover:scale-105`}
          >
            <MicrophoneIcon className="h-5 w-5 text-white" />  
            <span>{isRecording ? 'Recording...' : 'Record Audio'}</span>
          </button>
        </div>

        <div className="flex justify-start mb-4">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows="5"
            className="w-full p-4 dark:bg-gray-800 bg-white dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg text-gray-700 dark:focus:border-gray-500 focus:outline-none resize-none"
            placeholder="Speech to text will appear here..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSpeak}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-600 text-white font-semibold rounded-full shadow-lg focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
          >
            <span>Play Text</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
