from flask import Flask
import librosa
import numpy as np 
import torch
import pyrebase
import torch
import torch.nn as nn
from sklearn.preprocessing import StandardScaler
import stanza
from indic_transliteration import sanscript
from indic_transliteration.sanscript import SchemeMap, SCHEMES, transliterate
import speech_recognition as sr
import requests
from dotenv import load_dotenv
from time import sleep
from twilio.rest import Client
import os

config={
  "apiKey": "AIzaSyBUYUJvjLCR7Qx1aZE8kU5mMitnWfq6oXo",
  "authDomain": "sih2022-2de5b.firebaseapp.com",
  "projectId": "sih2022-2de5b",
  "storageBucket": "sih2022-2de5b.appspot.com",
  "messagingSenderId": "606919922552",
  "appId": "1:606919922552:web:5e6ca30ccd8fa8161dae8d",
  "measurementId": "G-4XSE0V9CR7",
  "databaseURL": ""
}

load_dotenv()
account_sid = os.getenv('ACCOUNT_SID')
auth_token = os.getenv('AUTH_TOKEN')
to_number = os.getenv('TO_NUMNBER')
client = Client(account_sid, auth_token)

firebase=pyrebase.initialize_app(config)
storage=firebase.storage()
app = Flask(__name__)

def getAudioFromFirebase():
    path_on_cloud="audio/test.wav"
    storage.child(path_on_cloud).download("audio/test","testAudio.wav") 

@app.route('/getAudio', methods=['POST','GET'])
def getAudio():
    getAudioFromFirebase()
    return 'hello'

@app.route('/start', methods=['POST','GET'])
def start():
    requests.get('')
    return 'done'




@app.route('/passAudioToModel', methods=['POST','GET'])
def passAudioToModel():
    file_path='testDrunk.wav'
    PATH="cnn_transf_parallel_model_1500.pt"
    SAMPLE_RATE=48000
    def getMELspectrogram(audio, sample_rate):
        mel_spec = librosa.feature.melspectrogram(y=audio,
                                                sr=sample_rate,
                                                n_fft=1024,
                                                win_length = 512,
                                                window='hamming',
                                                hop_length = 256,
                                                n_mels=128,
                                                fmax=sample_rate/2
                                                )
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
        return mel_spec_db


    audio, sample_rate = librosa.load(file_path, duration=3, offset=0.5,sr=SAMPLE_RATE)
    signal = np.zeros((int(SAMPLE_RATE*3,)))
    signal[:len(audio)] = audio
    mel_spectrogram = getMELspectrogram(signal, SAMPLE_RATE)
   

    
    final=[[]]
    #input=np.stack(mel_spectrogram,axis=0)
    final[0].append(mel_spectrogram)
    final=np.array(final)
    final=np.stack(final,axis=0)
    print(final.shape)
    scaler = StandardScaler()
    final= np.expand_dims(final,1)
    b,t,c,h,w = final.shape
    final= np.reshape(final, newshape=(b,-1))
    final= scaler.fit_transform(final)
    final = np.reshape(final, newshape=(b,t,c,h,w))
    input=torch.tensor(final).float()
    input=torch.squeeze(input,1)
    print(input.size())
    model = ParallelModel(4)
    model.load_state_dict(torch.load(PATH,map_location='cpu'))
    model.eval()
    output=model(input)
    print(output)
    _, preds  = torch.max(output[0], dim=1)
    lastAndFinalOutput=preds[0].item()
    return f'{lastAndFinalOutput}'

    



class ParallelModel(nn.Module):
    def __init__(self,num_emotions):
        super().__init__()
        # conv block
        self.conv2Dblock = nn.Sequential(
            # 1. conv block
            nn.Conv2d(in_channels=1,
                       out_channels=16,
                       kernel_size=3,
                       stride=1,
                       padding=1
                      ),
            nn.BatchNorm2d(16),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Dropout(p=0.3),
            # 2. conv block
            nn.Conv2d(in_channels=16,
                       out_channels=32,
                       kernel_size=3,
                       stride=1,
                       padding=1
                      ),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=4, stride=4),
            nn.Dropout(p=0.3),
            # 3. conv block
            nn.Conv2d(in_channels=32,
                       out_channels=64,
                       kernel_size=3,
                       stride=1,
                       padding=1
                      ),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=4, stride=4),
            nn.Dropout(p=0.3),
            # 4. conv block
            nn.Conv2d(in_channels=64,
                       out_channels=64,
                       kernel_size=3,
                       stride=1,
                       padding=1
                      ),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=4, stride=4),
            nn.Dropout(p=0.3)
        )
        # Transformer block
        self.transf_maxpool = nn.MaxPool2d(kernel_size=[2,4], stride=[2,4])
        transf_layer = nn.TransformerEncoderLayer(d_model=64, nhead=4, dim_feedforward=512, dropout=0.4, activation='relu')
        self.transf_encoder = nn.TransformerEncoder(transf_layer, num_layers=4)
        # Linear softmax layer
        self.out_linear = nn.Linear(320,num_emotions)
        self.dropout_linear = nn.Dropout(p=0)
        self.out_softmax = nn.Softmax(dim=1)
    def forward(self,x):
        # conv embedding
        conv_embedding = self.conv2Dblock(x) #(b,channel,freq,time)
        conv_embedding = torch.flatten(conv_embedding, start_dim=1) # do not flatten batch dimension
        # transformer embedding
        x_reduced = self.transf_maxpool(x)
        x_reduced = torch.squeeze(x_reduced,1)
        x_reduced = x_reduced.permute(2,0,1) # requires shape = (time,batch,embedding)
        transf_out = self.transf_encoder(x_reduced)
        transf_embedding = torch.mean(transf_out, dim=0)
        # concatenate
        complete_embedding = torch.cat([conv_embedding, transf_embedding], dim=1) 
        # final Linear
        output_logits = self.out_linear(complete_embedding)
        output_logits = self.dropout_linear(output_logits)
        output_softmax = self.out_softmax(output_logits)
        return output_logits, output_softmax
    

    

    #mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
    #InputTensor = torch.tensor(mel_spec_db).float()


@app.route('/nlpModel', methods=['POST','GET'])
def nlpModel():
    nlp = stanza.Pipeline('hi')
    filename = "TestAmb.wav"
    r = sr.Recognizer()
    with sr.AudioFile(filename) as source:
        audio_data = r.record(source)
        data= r.recognize_google(audio_data)
    doc_data = transliterate(data, sanscript.ITRANS, sanscript.DEVANAGARI)
    doc=nlp(doc_data)
    fire = nlp('आग अग्नि रोशनी जलन ज्वाला फायर भट्टी पकाना प्रज्ज्वलित  अग्निशामक फायरमैन ताप ब्रिगदे')
    for i, sentence in enumerate(fire.sentences):
        f = [*[f'{token.text}' for token in sentence.tokens]]

    ambulance = nlp('अस्पताल ऐम्बुलेंस रोगीवाहन चिकित्सक इलाज डाक्टर परिचारिका उपचारिका नर्स उपचार पोषण अतिदक्षता ईछू Oट् ICU OT')
    for i, sentence in enumerate(ambulance.sentences):
        a = [*[f'{token.text}' for token in sentence.tokens]]

    police = nlp('पुलिसविभाग पुलीस रक्षीदल शासन नगररक्षक व्यवस्थापक पुलिसवाला पुलिसकर्मियों पुलिसवाली थाना अनुरक्षक')
    for i, sentence in enumerate(police.sentences):
        p = [*[f'{token.text}' for token in sentence.tokens]]

    pain = nlp('दर्दीला दुःखद  दुखदायी  कष्टसाध्य  क्लेशकर  अप्रीतिकर  दुःखी कष्टजनक  पीड़ा  पीड़ापूर्ण')
    for i, sentence in enumerate(pain.sentences):
        painful = [*[f'{token.text}' for token in sentence.tokens]]

    stress = nlp('तनाव तनावपूर्ण थकानेवाला जोर  दबाव  खिंचाव  प्रतिबल  बलाघात चिन्ता')
    for i, sentence in enumerate(stress.sentences):
        stressful = [*[f'{token.text}' for token in sentence.tokens]]

    drunk = nlp('शराबी पियक्कड़ मदहोश नशा नशे शराब मद्य शीशी')
    for i, sentence in enumerate(drunk.sentences):
        d = [*[f'{token.text}' for token in sentence.tokens]]


    for i, sentence in enumerate(doc.sentences):
        t = [*[f'{token.text}' for token in sentence.tokens]]

    
    fcheck = any(item in t for item in f)
    if fcheck:
        print("fire time")
    else:
        pass

    acheck = any(item in t for item in a)
    if acheck:
        print("ambulance")
    else:
        pass

    pcheck = any(item in t for item in p)
    if pcheck:
        print("police")
    else:
        pass

    paincheck = any(item in t for item in painful)
    if paincheck:
        print("painful")
    else:
        pass

    stresscheck = any(item in t for item in stressful)
    if stresscheck:
        print("stressful")
    else:
        pass
    
    drunkcheck = any(item in t for item in d)
    if drunkcheck:
        print("drunk")
    else:
        pass


    return str("car")






@app.route("/startRecording", methods=['GET','POST'])
def startRecording():
    calls = client.calls.list(to=to_number)
    call_sid=calls[0].sid

    i=0

    while(True):
        i=i+1
        call=client.calls(call_sid).fetch()
        # if(call.status=="completed"):
        #     print("done")
        #     print("done")
        #     print("done")
        #     print("done")

        #     break
        rec_sid=createRec(call_sid)
        print(rec_sid)
        sleep(4)
        # if(call.status=="completed"):
        #     print("done")
        #     print("done")
        #     print("done")
        #     print("done")

        #     break
        stopRec(call_sid,rec_sid)
        sleep(2)
        fetchRec(rec_sid,i)
        
    return str("Done")





def stopRec(call_sid,rec_sid):
    client.calls(call_sid).recordings(rec_sid).update(status='stopped')

def createRec(call_sid):
    recording = client.calls(call_sid).recordings.create()
    return recording.sid

def fetchRec(rec_sid,i):
    recording = client.recordings(str(rec_sid)).fetch()
    response=requests.get(recording.media_url)
    with open(f"rec{i}.mp3", 'wb') as f:
        f.write(response.content)
    print(f)
    path_on_cloud=f"audio/rec{i}.mp3"
    path_local=f"rec{i}.mp3"
    storage.child(path_on_cloud).put(path_local) 



if __name__ == "__main__":
    app.run(debug=True)





