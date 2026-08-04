import requests, json

payload = {"input":[[12000,110,"diesel","black","hatchback",1,1,0,0,1,1,0,150,2]]}
print(requests.post("http://localhost:8000/predict", json=payload).json())
