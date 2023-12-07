// JavaScript for text-to-speech conversion

// Populate the voice selection dropdown
const voiceSelect = document.getElementById("voice-select");
let voices = [];

function populateVoiceList() {
  voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Convert text to speech
const convertButton = document.getElementById("convert-button");
const textInput = document.getElementById("text-input");
const audioPlayer = document.getElementById("audio-player");

convertButton.addEventListener("click", () => {
  const selectedVoice = voices[voiceSelect.value];
  const textToSpeak = textInput.value;

  if (textToSpeak.trim() === "") {
    alert("Please enter some text to convert.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.voice = selectedVoice;
  speechSynthesis.speak(utterance);

  // Display audio for playback
  const blob = new Blob([textToSpeak], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);
  audioPlayer.src = url;
  audioPlayer.style.display = "block";
});

