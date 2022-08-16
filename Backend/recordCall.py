import os
from datetime import datetime
from time import sleep
from twilio.rest import Client
import speech_recognition as sr
import os
from dotenv import load_dotenv
import pyrebase
from flask import Flask
import requests


# Setup firebase
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



# Setup the Twilio client.
load_dotenv()
account_sid = os.getenv('ACCOUNT_SID')
auth_token = os.getenv('AUTH_TOKEN')
to_number = os.getenv('TO_NUMNBER')
client = Client(account_sid, auth_token)





app = Flask(__name__)
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



#createRec('CAad274f3d54a8af7e64a5226b8c4c5b25')
#stopRec('CAad274f3d54a8af7e64a5226b8c4c5b25','RE08263db8036eb2faa19d9b109651e7d7')
# fetchRec('RE08263db8036eb2faa19d9b109651e7d7',5)






# recording = client.calls('CA203b40dc91bd650c32edac725b47ebfe') \
#                   .recordings \
#                   .create()

# recording = client.calls('CAd9a456fbd513307b843548df0075e9ba').recordings.create()




# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure

# call = client.calls('CA7a198cde97b35f6da6449f2b80d99130').fetch()


    




# print(call.from_formatted)










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


if __name__ == "__main__":
    app.run()