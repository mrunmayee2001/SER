# coding=utf8
from operator import mul
from re import S
from typing import no_type_check
from flask import Flask,jsonify
import librosa
import random
import numpy as np 
import torch
import torch.nn as nn
from sklearn.preprocessing import StandardScaler
import stanza
import pyrebase
from indic_transliteration import sanscript
from indic_transliteration.sanscript import SchemeMap, SCHEMES, transliterate
import speech_recognition as sr
import requests
from dotenv import load_dotenv
from time import sleep
from twilio.rest import Client
import os
import datetime
from keras.models import model_from_json
import pandas as pd
import pickle
from datetime import timezone

import firebase_admin
from firebase_admin import credentials,firestore
cred=credentials.Certificate('./cred.json')
firebase_admin.initialize_app(cred)
database=firestore.client()



config = {
  "apiKey": "AIzaSyBk-lVBMqrFFL72IOJ_jQcp9_v8e-xNBZc",
  "authDomain": "ser-nlp-project.firebaseapp.com",
  "projectId": "ser-nlp-project",
  "storageBucket": "ser-nlp-project.appspot.com",
  "messagingSenderId": "747419408969",
  "appId": "1:747419408969:web:46c3df7c795ce7a190bd98",
  "databaseURL":""
}
firebase=pyrebase.initialize_app(config)
storage=firebase.storage()



load_dotenv()
account_sid = os.getenv('ACCOUNT_SID')
auth_token = os.getenv('AUTH_TOKEN')
to_number = os.getenv('TO_NUMNBER')
client = Client(account_sid, auth_token)

app = Flask(__name__)
model=pickle.load(open('model1.pkl','rb'))

nlp = stanza.Pipeline('hi')

noOfCalls=9987





@app.route('/sendMessageDispatch', methods=['POST','GET'])
def sendMesaageDispatch():
    message = client.messages.create(  
                                from_='+12183535790',      
                              to='+918097467291',
                              body=f'This person is need of urgent help. Caller No -8097467291 . Location - [22.578648,88.475746]') 
    return 'done'


# @app.route('/start', methods=['POST','GET'])
# def start():
#     serResults=requests.get('http://127.0.0.1:5000/serModel').json()
#     return 'done'



@app.route('/FireService', methods=['POST','GET'])
def FireService():
    message = client.messages.create(  
                                 from_='+12183535790',      
                              to='+919011357564',
                              body="Fire service is on its way. Feedback Form - https://forms.gle/v84uQDDKtZsksjKk6") 
    return 'ok'
    
@app.route('/AmbulanceService', methods=['POST','GET'])
def AmbulanceService():
    message = client.messages.create(  
                                 from_='+12183535790',      
                              to='+919011357564',
                              body="Ambulance service is on its way. Feedback Form - https://forms.gle/v84uQDDKtZsksjKk6") 
    return 'ok'

@app.route('/PoliceService', methods=['POST','GET'])
def PoliceService():
    message = client.messages.create(  
                                 from_='+12183535790',      
                              to='+919011357564',
                              body="Police service is on its way. Feedback Form - https://forms.gle/v84uQDDKtZsksjKk6") 

    return 'ok'






@app.route('/subEmotion', methods=['POST','GET'])
def subEmotion():
    Sentiments = { 0 : "Female_angry",
                    1 : "Female Calm",
                    2 : "Female Fearful",
                    3 : "Female Happy",
                    4 : "Female Sad",
                    5 : "Male Angry",
                    6 : "Male calm",
                    7 : "Male Fearful",
                    8 : "Male Happy",
                    9 : "Male sad"}
        
    json_file = open('model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights("Emotion_Voice_Detection_Model.h5") 
    print("Loaded model from disk")
        
    X, sample_rate = librosa.load(f'rec{noOfCalls}.wav', res_type='kaiser_fast',duration=2.5,sr=22050*2,offset=0.5)
    sample_rate = np.array(sample_rate)
    mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13),axis=0)
    featurelive = mfccs
    livedf2 = featurelive
    livedf2= pd.DataFrame(data=livedf2)
    livedf2 = livedf2.stack().to_frame().T
    twodim= np.expand_dims(livedf2, axis=2)
    livepreds = loaded_model.predict(twodim, 
                                batch_size=32, 
                                verbose=1)
    livepreds1=livepreds.argmax(axis=1)
    liveabc = livepreds1.astype(int).flatten()
        
        
    Result = [emotions for (number,emotions) in Sentiments.items() if liveabc == number]
    return jsonify({"result":Result[0]})


@app.route('/noiseModel',methods=['POST','GET'])
def noiseModel():
    noise={
        0:'air_conditioner',
        1:'car_horn',
        2:'children_playing',
        3:'dog_bark',
        4:'drilling',
        5:'engine_idling',
        6:'gun_shot',
        7:'jackHammer',
        8:'siren',
        9:'street_music'
    }
    json_file = open('noise_model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights("noise.h5") 
    print("Loaded model from disk")
    X, sample_rate = librosa.load(f'rec{noOfCalls}.wav', res_type='kaiser_fast')
    mfccs = np.mean(librosa.feature.melspectrogram(y=X, sr=sample_rate).T,axis=0)
    t = np.array(tuple(tuple([mfccs])))
    predict_x=loaded_model.predict(t) 
    classes_x=np.argmax(predict_x,axis=1)
    return jsonify({"result":noise[classes_x[0]]})

@app.route('/serModel', methods=['POST','GET'])
def passAudioToModel():
    try:
        EMOTIONS = {3:'Abusive', 1:'Drunk', 0:'Painful', 2:'Stressful'} 
        TEST_DATA_PATH = f'rec{noOfCalls}.wav'
        TEST_DATA_PATH = 'data\Pain-3.wav'
        SAMPLE_RATE = 48000
        identifiers = TEST_DATA_PATH
        emotion = (identifiers)

        mel_spectrograms = []
        signals = []
        audio, sample_rate = librosa.load(TEST_DATA_PATH, duration=3, offset=0.5, sr=SAMPLE_RATE)
        signal = np.zeros((int(SAMPLE_RATE*3,)))
        signal[:len(audio)] = audio
        signals.append(signal)
        signals = np.array(signals)

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

        signal = np.zeros((int(SAMPLE_RATE*3,)))
        signal[:len(audio)] = audio
        mel_spectrogram = getMELspectrogram(signal, SAMPLE_RATE)
        print('MEL spectrogram shape: ',mel_spectrogram.shape)


        single_test = []
        single_test_mean = []
        single_test_median=[]
        single_test_std=[]
        single_test_var=[]


        single_spectrogram = getMELspectrogram(signal, SAMPLE_RATE)
        mel_np = np.array(single_spectrogram)

        mel_np_mean = np.mean(mel_np)
        single_test_mean.append(mel_np_mean)

        mel_np_median=np.median(mel_np)
        single_test_median.append(mel_np_median)

        mel_np_std=np.std(mel_np)
        single_test_std.append(mel_np_std)

        mel_np_var=np.var(mel_np)
        single_test_var.append(mel_np_var)
            

        
        test_df=pd.DataFrame()
        test_df['mean']=single_test_mean
        test_df['median']=single_test_median
        test_df['std']=single_test_std
        test_df['var']=single_test_var
        X_test=test_df
        Y_pred = model.predict(X_test)
        print("Prediction by KNN",Y_pred)
        return jsonify({"result":EMOTIONS[Y_pred[0]] })

    except Exception as e:
        print(e)
        print("Ser model eroor")
        return jsonify({"result":"Abusive"})

        


    

    

    #mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
    #InputTensor = torch.tensor(mel_spec_db).float()


@app.route('/nlpModel', methods=['POST','GET'])
def nlpModel():

    fCount = 0
    aCount = 0
    pCount = 0
    painCount = 0
    stressCount = 0
    drunkCount = 0
    abusiveCount = 0
    # filename = f"rec{noOfCalls}.wav"
    filename=f'rec{noOfCalls}.wav'
    f=open(f"transcripts{noOfCalls}.txt", "a")
    r = sr.Recognizer()
    data=""
    try:
        with sr.AudioFile(filename) as source:
            try:
                r.adjust_for_ambient_noise(source,duration=1)
                audio_data = r.record(source)
                data= r.recognize_google(audio_data)
                f.write(" "+data)
            except:
                print("error")

        # doc_data = transliterate(data, sanscript.ITRANS, sanscript.DEVANAGARI)
        # print(doc_data)
        r = sr.Recognizer()
        with sr.AudioFile(filename) as source:
            try:
                r.adjust_for_ambient_noise(source,duration=1)
                audio_data = r.record(source)
                data= r.recognize_google(audio_data,language='hi-In')
                print(data)
            except:
                print("error")
    except:
        print("whileRecording")

    if data !="":
        
        doc_data=data
        doc=nlp(doc_data)
        fire = nlp('आग अग्नि रोशनी जलन ज्वाला फायर भट्टी पकाना प्रज्ज्वलित  अग्निशामक फायरमैन ताप ब्रिगदे smoke ')
        for i, sentence in enumerate(fire.sentences):
            f = [*[f'{token.text}' for token in sentence.tokens]]

        ambulance = nlp('अस्पताल ऐम्बुलेंस रोगीवाहन चिकित्सक इलाज डाक्टर परिचारिका उपचारिका नर्स उपचार पोषण अतिदक्षता ईछू Oट् ICU OT blood unconscious ')
        for i, sentence in enumerate(ambulance.sentences):
            a = [*[f'{token.text}' for token in sentence.tokens]]

        police = nlp('पुलिसविभाग पुलीस रक्षीदल शासन नगररक्षक व्यवस्थापक पुलिसवाला पुलिसकर्मियों पुलिसवाली थाना अनुरक्षक robbery steal accident ')
        for i, sentence in enumerate(police.sentences):
            p = [*[f'{token.text}' for token in sentence.tokens]]

        pain = nlp('अकरास अर्राब उकरीध उधिन कल्हरब कलपडाह चिल्हार दर्दीला दुःखद  दुखदायी  कष्टसाध्य  क्लेशकर  अप्रीतिकर  दुःखी कष्टजनक  पीड़ा  पीड़ापूर्ण अंगमर्ष आफ़त चोट मुसीबत वेदना सताना')
        for i, sentence in enumerate(pain.sentences):
            painful = [*[f'{token.text}' for token in sentence.tokens]]

        stress = nlp('तनाव तनावपूर्ण थकानेवाला जोर  दबाव  खिंचाव  प्रतिबल  बलाघात चिन्ता बेचैन जोर दबाव बलाघात बोझा')
        for i, sentence in enumerate(stress.sentences):
            stressful = [*[f'{token.text}' for token in sentence.tokens]]

        drunk = nlp('शराबी पियक्कड़ मदहोश नशा नशे शराब मद्य शीशी मदिरा')
        for i, sentence in enumerate(drunk.sentences):
            d = [*[f'{token.text}' for token in sentence.tokens]]

        abusive = nlp('अजार कछलम्पट कुकुरिया कोड़हा खउटहा गरिआउब चोट्टी पिण्डा पारब लोडू बाप साले चोदु चोदू चूदु गन्दु गान्दु गन्दू भोसद् भोसद भोसदा भोसदाअ भोसदी भोसदिक भोसदिक् भोसदिकि बोसदिके बक्रिचोद् बलत्कार् बेतिचोद् भय्न्चोद् बेहन्चोद् बेहेन्चोद् भोस्दि भोस्दिके रन्दि चुदसि चुतिअ चुतिय चूतिअ चुतिये चूत् चूतिय गान्द् गान्दु गन्द्मस्ति झतू झन्तु कुकर्चोद् लुन्द् लुह्न्द् लुन्ध् मादर्चोद् मादर् मदर् चोद् मदर्चोद् सुज़ित् भद्व भद्वे चोदिक भोसद्चोद् बुर्सुन्घ चमिन चुद्पगल् हरमि झात् कुथ्रि कुत्ते लव्दे लोदु भदव्य भिकार् बुल्लि चिनाल् चुत् गन्द् मादर्भगत् चोदुभगत् लुन्द्फ़किर् गन्दित् झवद्य लौदु लवद्य मुत्थ रान्दिच्य मदर्चोथ्')

        for i, sentence in enumerate(abusive.sentences):
            ab = [*[f'{token.text}' for token in sentence.tokens]]


        for i, sentence in enumerate(doc.sentences):
            t = [*[f'{token.text}' for token in sentence.tokens]]
            fcheck = any(item in t for item in f)
            if fcheck:
                fCount+=1
            else:
                pass
            acheck = any(item in t for item in a)
            if acheck:
                aCount+=1
            else:
                pass

            pcheck = any(item in t for item in p)
            if pcheck:
                pCount+=1
            else:
                pass

            paincheck = any(item in t for item in painful)
            if paincheck:
                painCount+=1
            else:
                pass

            stresscheck = any(item in t for item in stressful)
            if stresscheck:
                stressCount+=1
            else:
                pass

            drunkcheck = any(item in t for item in d)
            if drunkcheck:
                drunkCount+=1
            else:
                pass

            abusivecheck = any(item in t for item in ab)
            if abusivecheck:
                abusiveCount+=1
            else:
                pass

    solution = {"Fire": fCount, "Ambulance": aCount, "Police": pCount, "Painful": painCount, "Stressful": stressCount,"Abusive": abusiveCount, "Drunk": drunkCount}
    return jsonify(solution)






@app.route("/startRecording", methods=['GET','POST'])
def startRecording():
    graph={"Drunk":[0,0],"Abusive":[0,0],"Painful":[0,0],"Stressful":[0,0]}
    global noOfCalls
    i=0
    open(f"transcripts{noOfCalls}.txt", 'w')
    calls = client.calls.list(to=to_number)
    call_sid=calls[0].sid
    incomingNo=calls[0].from_formatted
    dateTime=calls[0].date_created
    carrierInfo= client.lookups.v1.phone_numbers(incomingNo).fetch(type=['carrier'])
    ref=database.collection("Call-Logs")
    newCall=ref.document(f'{noOfCalls}')
    latitude=22.578648
    longitude=88.475746
    result={"result":""}
    newCall.set({"Situation":"","SerEmotion":result,"City":"Kolkata","Service":"","SubEmotion":result,"PhoneNo":incomingNo,"StartDateTime":dateTime,"Carrier":carrierInfo.carrier["name"],"Emotion":{},"Latitude":latitude,"Longitude":longitude,"Transcripts":f'/transcripts/transcripts{noOfCalls}'})
    while(True):
        try:
            
            i=i+1
            rec_sid=createRec(call_sid)
            sleep(5)
            stopRec(call_sid,rec_sid)
            sleep(2)
            fetchRec(rec_sid,i)
            nlpData=requests.get('http://127.0.0.1:5000/nlpModel')
            nlpData.raise_for_status() 
            nlpResult=nlpData.json()
            serData=requests.get('http://127.0.0.1:5000/serModel')
            serData.raise_for_status()
            serResult=serData.json()
            subEmoData=requests.get('http://127.0.0.1:5000/subEmotion')
            subEmoData.raise_for_status()
            subEmoResult=subEmoData.json()
            situationData=requests.get('http://127.0.0.1:5000/noiseModel')
            situationData.raise_for_status()
            situationResult=situationData.json()
            print(situationData)
            print(situationResult)
            service={"Fire":nlpResult['Fire'],"Police":nlpResult['Police'],"Ambulance":nlpResult['Ambulance']}
            del nlpResult['Fire']
            del nlpResult['Police']
            del nlpResult['Ambulance']
            ref=database.collection("Live-Call")
            newLive=ref.document(f'live-{i}')
            latitude=22.578648
            longitude=88.475746

            
            
            



            
            newLive.set({"Status":"open","Situation":situationResult,"Service":service,"PhoneNo":incomingNo,"DateTime":dateTime,"Carrier":carrierInfo.carrier["name"],"NlpEmotion":nlpResult,"SerEmotion":serResult,"SubEmotion":subEmoResult,"Latitude":latitude,"Longitude":longitude,"Transcripts":f'/transcripts/transcripts{noOfCalls}'})
            print("Helloooo  -  ",nlpResult) 
            os.remove(f'rec{noOfCalls}.wav')
        except Exception as e: 
            print(e)
            print("Completed")

            print("error")
            docs = database.collection(u'Live-Call').stream()
            info=[]
            for doc in docs:
                info.append(doc.to_dict())
            NlpAbuse=0
            NlpPain=0
            NlpStress=0
            NlpDrunk=0    
            f=0
            p=0
            a=0
            subEmoDict=dict()
            situationList=[]
            SerDict={"Drunk":0,"Abusive":0,"Painful":0,"Stressful":0}
            for i in range(len(info)):
                NlpAbuse=NlpAbuse+info[i]['NlpEmotion']['Abusive']
                NlpPain=NlpPain+info[i]['NlpEmotion']['Painful']
                NlpStress=NlpStress+info[i]['NlpEmotion']['Stressful']
                NlpDrunk=NlpDrunk+info[i]['NlpEmotion']['Drunk']
                f=f+info[i]['Service']['Fire']
                p=p+info[i]['Service']['Police']
                a=a+info[i]['Service']['Ambulance']
                situationList.append(info[i]["Situation"])
                subEmotionValue=info[i]['SubEmotion']['result']
                if(subEmotionValue in subEmoDict):
                    subEmoDict[subEmotionValue]=subEmoDict[subEmotionValue]+1
                else:
                    subEmoDict[subEmotionValue]=1
                SerEmotionValue=info[i]['SerEmotion']['result']
                SerDict[SerEmotionValue]=SerDict[SerEmotionValue]+1

                        


            serviceDict={"Police":p,"Fire":f,"Ambulance":a}
            NlpDict={"Abusive":NlpAbuse,"Painful":NlpPain,"Stressful":NlpStress,"Drunk":NlpDrunk}
            NlpMax=max(NlpDict, key= lambda x: NlpDict[x])
            SerMax=max(SerDict, key= lambda x: SerDict[x])
            emotion={"Abusive":0,"Painful":0,"Stressful":0,"Drunk":0}
            sum=NlpAbuse+NlpStress+NlpDrunk+NlpPain
            for key in SerDict:
                if(key!=SerMax):
                    NlpDict[key]=NlpDict[key]+SerDict[key]

            if(NlpMax==SerMax):
                emotion[SerMax]=100
            elif(sum==0):
                emotion[SerMax]=100
            else:
                x=random.randint(60,70)
                emotion[SerMax]=x
                multiplier=100-x
                sum=sum-NlpDict[SerMax]
                for key in NlpDict:
                    if(key!=SerMax):
                        emotion[key]=NlpDict[key]*multiplier/sum
                

            service= max(serviceDict, key= lambda x: serviceDict[x])
            subEmoResult=max(subEmoDict, key= lambda x: subEmoDict[x],default="Male Fearful")
            newCall.update({"Situation":situationList,"EndDateTime":datetime.datetime.now(timezone.utc),"Service":service,"Emotion":emotion,"SubEmotion":{"result":subEmoResult}})
            docs = database.collection(u'Live-Call').stream()

            for doc in docs:
                doc.reference.delete()
            uploadTranscriptsInFirebase()
            message = client.messages.create(  
                                 from_='+12183535790',      
                              to=incomingNo,
                              body=f"{service} service is send to ur place") 
            break
        
    noOfCalls=noOfCalls-1  
    return str("Done")





def uploadTranscriptsInFirebase():
    try:
        path_on_cloud=f"transcripts/transcripts{noOfCalls}.txt"
        path_local=f"transcripts{noOfCalls}.txt"
        storage.child(path_on_cloud).put(path_local)
    except:
        print("uploadTranscriptsInFirebase") 


def stopRec(call_sid,rec_sid):
    try:
        client.calls(call_sid).recordings(rec_sid).update(status='stopped')
    except:
        print("stopRec")

def createRec(call_sid):
    try:
        recording = client.calls(call_sid).recordings.create()
        return recording.sid
    except:
        print("createRec") 


def fetchRec(rec_sid,i):
    try:
        recording = client.recordings(str(rec_sid)).fetch()
        response=requests.get(recording.media_url)
        with open(f"rec{noOfCalls}.wav", 'wb') as f:
            f.write(response.content)
        path_on_cloud=f"audio/rec{noOfCalls}_{i}.wav"
        path_local=f"rec{noOfCalls}.wav"
        storage.child(path_on_cloud).put(path_local)
    except:
        print("fetchRec") 






if __name__ == "__main__":
    app.run(host="0.0.0.0")





