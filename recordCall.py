import os
from datetime import datetime
import re
from time import sleep
from twilio.rest import Client
import speech_recognition as sr
import os
from dotenv import load_dotenv
import pyrebase
from flask import Flask
import requests
import datetime

# from pydub import AudioSegment

# # Setup firebase
# config = {
#   "apiKey": "AIzaSyBk-lVBMqrFFL72IOJ_jQcp9_v8e-xNBZc",
#   "authDomain": "ser-nlp-project.firebaseapp.com",
#   "projectId": "ser-nlp-project",
#   "storageBucket": "ser-nlp-project.appspot.com",
#   "messagingSenderId": "747419408969",
#   "appId": "1:747419408969:web:46c3df7c795ce7a190bd98",
#   "databaseURL":""
# }
# firebase=pyrebase.initialize_app(config)
# storage=firebase.storage()

# for key in graph:
#                 if key==serData['result']:
#                     graph[key][0]=i
#                     graph[key][1]=graph[key][1]+1
#                 elif (graph[key][1]!=0):
#                     graph[key][1]=graph[key][1]-1

# # Setup the Twilio client.
# load_dotenv()
# account_sid = os.getenv('ACCOUNT_SID')
# auth_token = os.getenv('AUTH_TOKEN')
# to_number = os.getenv('TO_NUMNBER')
# client = Client(account_sid, auth_token)





# app = Flask(__name__)


# @app.route("/test", methods=['GET','POST'])
# def test():
    
#     sound1 = AudioSegment.from_wav("testAudio.wav")
#     sound2 = AudioSegment.from_wav("TestAmb.wav")
    

#     # Concatenation is just adding
#     second_half_3_times = sound1+sound2

#     # writing mp3 files is a one liner
#     second_half_3_times.export("testAudio.wav", format="wav")
#     return 'done'



# @app.route("/startRecording", methods=['GET','POST'])
# def startRecording():
#     calls = client.calls.list(to=to_number)
#     call_sid=calls[0].sid

#     i=0

#     while(True):
#         i=i+1
#         call=client.calls(call_sid).fetch()
#         # if(call.status=="completed"):
#         #     print("done")
#         #     print("done")
#         #     print("done")
#         #     print("done")

#         #     break
#         rec_sid=createRec(call_sid)
#         print(rec_sid)
#         sleep(4)
#         # if(call.status=="completed"):
#         #     print("done")
#         #     print("done")
#         #     print("done")
#         #     print("done")

#         #     break
#         stopRec(call_sid,rec_sid)
#         sleep(2)
#         fetchRec(rec_sid,i)
        
#     return str("Done")





# def stopRec(call_sid,rec_sid):
#     client.calls(call_sid).recordings(rec_sid).update(status='stopped')

# def createRec(call_sid):
#     recording = client.calls(call_sid).recordings.create()
#     return recording.sid

# def fetchRec(rec_sid,i):
#     recording = client.recordings(str(rec_sid)).fetch()
#     response=requests.get(recording.media_url)
#     with open(f"rec{i}.mp3", 'wb') as f:
#         f.write(response.content)
#     print(f)
#     path_on_cloud=f"audio/rec{i}.mp3"
#     path_local=f"rec{i}.mp3"
#     storage.child(path_on_cloud).put(path_local)  

# import firebase_admin
# from firebase_admin import credentials,firestore
# cred=credentials.Certificate('./cred.json')
# firebase_admin.initialize_app(cred)
# database=firestore.client()

#createRec('CAad274f3d54a8af7e64a5226b8c4c5b25')
#stopRec('CAad274f3d54a8af7e64a5226b8c4c5b25','RE08263db8036eb2faa19d9b109651e7d7')
# fetchRec('RE08263db8036eb2faa19d9b109651e7d7',5)


# phone_number = client.lookups \
#                      .v1 \
#                      .phone_numbers('+919011357564') \
#                      .fetch(type=['carrier'])

# print(phone_number.carrier["name"])

# ref=database.collection("Call-Logs")
# newCall=ref.document().id
# print(newCall)
# #ref.document('FiTjtsWM6oleyXPTf9Un').update({u'nlpEmotion': "car",'serEmotion':"dog"})


# recording = client.calls('CA203b40dc91bd650c32edac725b47ebfe') \
#                   .recordings \
#                   .create()

# recording = client.calls('CAd9a456fbd513307b843548df0075e9ba').recordings.create()


# database.collection(u'cities').document(u'LA').set({"car":"jay"})

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure

# call = client.calls('CA7a198cde97b35f6da6449f2b80d99130').fetch()

# docs = database.collection(u'Live-Call').stream()
# info=[]
# for doc in docs:
#     info.append(doc.to_dict())
# abuse=0
# pain=0
# stress=0
# drunk=0    
# f=0
# p=0
# a=0
# for i in range(len(info)):
#    abuse=abuse+info[i]['NlpEmotion']['Abusive']
#    pain=pain+info[i]['NlpEmotion']['Painful']
#    stress=stress+info[i]['NlpEmotion']['Stressful']
#    drunk=drunk+info[i]['NlpEmotion']['Drunk']
#    f=f+info[i]['Service']['Fire']
#    p=p+info[i]['Service']['Police']
#    a=a+info[i]['Service']['Ambulance']
# # serviceDict={"Fire":f,"Police":p,"Ambulance":a}   
# # sum=abuse+stress+drunk+pain
# # abuse=abuse*100/sum
# # pain=pain*100/sum
# # stress=stress*100/sum
# # drunk=drunk*100/sum
# # service= max(serviceDict, key= lambda x: serviceDict[x])
# # print(abuse,pain,stress,drunk)

# # docs = database.collection(u'Live-Call').stream()
# # for doc in docs:
# #     doc.reference.delete()

# # ct = datetime.datetime.now()
# # print(ct)


# # print(call.from_formatted)





# # Message after call
# # from twilio.rest import Client 
 
# # account_sid = os.getenv('ACCOUNT_SID')
# # auth_token = os.getenv('AUTH_TOKEN')
# # to_number = os.getenv('TO_NUMNBER')
# # client = Client(account_sid, auth_token)
# # client = Client(account_sid, auth_token) 
 
# # message = client.messages.create(  
# #                                 from_='+12183535790',      
# #                               to='+919011357564',
# #                               body="Police service is send to ur place"
# #                           ) 
 
# # print(message.sid)
# import random
# docs = database.collection(u'Live-Call').stream()
# info=[]
# for doc in docs:
#    info.append(doc.to_dict())
# NlpAbuse=0
# NlpPain=0
# NlpStress=0
# NlpDrunk=0    
# f=0
# p=0
# a=0
# subEmoDict=dict()
# SerDict={"Drunk":0,"Abusive":0,"Painful":0,"Stressful":0}
# for i in range(len(info)):
#     NlpAbuse=NlpAbuse+info[i]['NlpEmotion']['Abusive']
#     NlpPain=NlpPain+info[i]['NlpEmotion']['Painful']
#     NlpStress=NlpStress+info[i]['NlpEmotion']['Stressful']
#     NlpDrunk=NlpDrunk+info[i]['NlpEmotion']['Drunk']
#     f=f+info[i]['Service']['Fire']
#     p=p+info[i]['Service']['Police']
#     a=a+info[i]['Service']['Ambulance']
#     subEmotionValue=info[i]['SubEmotion']['result']
#     if(subEmotionValue in subEmoDict):
#         subEmoDict[subEmotionValue]=subEmoDict[subEmotionValue]+1
#     else:
#         subEmoDict[subEmotionValue]=1
#     SerEmotionValue=info[i]['SerEmotion']['result']
#     SerDict[SerEmotionValue]=SerDict[SerEmotionValue]+1

            


# serviceDict={"Fire":f,"Police":p,"Ambulance":a}
# NlpDict={"Abusive":NlpAbuse,"Painful":NlpPain,"Stressful":NlpStress,"Drunk":NlpDrunk}
# NlpMax=max(NlpDict, key= lambda x: NlpDict[x])
# SerMax=max(SerDict, key= lambda x: SerDict[x])
# emotion={"Abusive":0,"Painful":0,"Stressful":0,"Drunk":0}
# sum=NlpAbuse+NlpStress+NlpDrunk+NlpPain
# if(NlpMax==SerMax):
#     emotion[SerMax]=100
# elif(sum==0):
#     emotion[SerMax]=100
# else:
#     x=random.randint(60,70)
#     emotion[SerMax]=x
#     multiplier=100-x
#     sum=sum-NlpDict[SerMax]
#     for key in NlpDict:
#         if(key!=SerMax):
#             emotion[key]=NlpDict[key]*multiplier/sum

#     print(emotion)





# Get the calls to our phone number.
# calls = client.calls.list(
#     to=to_number
# )


# #Start a recording
# recording = client.calls('CAe13864a1e96dfeefd87fdc367a865f13').recordings.create()



# Stop a recording
# recording = client.calls('CAe13864a1e96dfeefd87fdc367a865f13').recordings('RE58053a3e6dff9b784b788a8f3e155ded').update(status='stopped')



# fetch and download a recording
# response = requests.get('https://api.twilio.com/2010-04-01/Accounts/AC6985a5adca5b9739905689e03330ab92/Recordings/RE094a5a6c4c0ed52cdd2d75aa91952b57.mp3?requestedChannels=2')
# with open('myfile.mp3', 'wb') as f:
#     f.write(response.content)


# Speech to text
# filename = "speechToText.wav"
# r = sr.Recognizer()
# with sr.AudioFile(filename) as source:
#     audio_data = r.record(source)
#     text = r.recognize_google(audio_data)
#     print(text)


# if __name__ == "__main__":
#     app.run()

# from googleplaces import GooglePlaces, types, lang

# google_places = GooglePlaces("AIzaSyBcitF-IltB1TfEY4C5XMAe1q2zfKmRd9Y")

# query_result = google_places.nearby_search(
#     lat_lng={'lat':19.148320, 'lng': 72.888794},
#     radius=20000, types=[types.TYPE_RESTAURANT])

# # if query_result.has_attributions:
# print(query_result.places)