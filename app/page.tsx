import AudioRecorder from "./_Components/AudioRecorder";
export default function Home() {
  return (
    <div>
     <h1 className="text-3xl font-bold bg-gray-800 text-white text-center py-4">
        Text to Speech to Text
      </h1>
      <AudioRecorder></AudioRecorder>
      
    </div>
  );
}
