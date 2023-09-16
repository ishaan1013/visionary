import json
import requests
import os

# comment this section out if you dont want the prompt to read from another file
jsondata = open('jsondata.txt','r')
data = ""
for line in jsondata:
    data = data + line
#print("data:", data, "\n")
jsondata.close()

# write prompt here
prompt = "Generate notes about MUSIC HISTORY in point-form using the following data as hints about points from the lecture. extracted from a calculus lecture presentation. Consider the following parameters: \"size\" refers to the size and significance of the text, \"confidence\" refers to how likely the extracted text might match the original, and use autocorrect.possibility as the extracted text. Data: \n"+data

headers = {
    'Authorization': 'BEARER RmQ6r0yPvLmaghPGooXaIF4W8RrhlH8tJECl6dGz',
    'Content-Type': 'application/json',
}

json_data = {
    'model': 'command',
          "prompt": prompt,
    'max_tokens': 300,
    'temperature': 0.9,
    'k': 0,
    'stop_sequences': [],
    'return_likelihoods': 'NONE',
}

response = requests.post('https://api.cohere.ai/v1/generate', headers=headers, json=json_data)

response_dict = json.loads(response.text)

print(response_dict["generations"][0]["text"])

# Note: json_data will not be serialized by requests
# exactly as it was in the original request.
#data = '{\n      "model": "command",\n      "prompt": "tell me a joke",\n      "max_tokens": 300,\n      "temperature": 0.9,\n      "k": 0,\n      "stop_sequences": [],\n      "return_likelihoods": "NONE"\n    }'
#response = requests.post('https://api.cohere.ai/v1/generate', headers=headers, data=data)
