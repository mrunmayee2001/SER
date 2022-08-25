import pyrebase

config={
  "apiKey": "AIzaSyBUYUJvjLCR7Qx1aZE8kU5mMitnWfq6oXo",
  "authDomain": "sih2022-2de5b.firebaseapp.com",
  "projectId": "sih2022-2de5b",
  "storageBucket": "sih2022-2de5b.appspot.com",
  "messagingSenderId": "606919922552",
  "appId": "1:606919922552:web:5e6ca30ccd8fa8161dae8d",
  "measurementId": "G-4XSE0V9CR7"
}

firebase=pyrebase.initialize_app(config)
storage=firebase.storage()

#--------------------------------------# for Audio Files
# path_on_cloud="audio/test.wav"
# path_local="1_Drunk.wav"
# storage.child(path_on_cloud).put(path_local)                                #for storing
# storage.child(path_on_cloud).download("audio/test","download.wav")          #for downloading


#--------------------------------------# for Text Files
# path_on_cloud="text/test.txt"
# path_local="test.txt"
# storage.child(path_on_cloud).put(path_local)                          #for storing
# storage.child(path_on_cloud).download("text/test","download.txt")   #for downloading
