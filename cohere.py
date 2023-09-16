import json
import requests
import config

# comment this section out if you dont want the prompt to read from another file and remove +data from prompt variable
# choose data file
filepath = 'jsondata\\algebra.txt'
jsondata = open(filepath,'r')
data = ""
for line in jsondata:
    data = data + line
jsondata.close()

# write prompt here
lecturetopic = "abstract algebra and ring theory"
prompt = "Generate notes about "+lecturetopic+" in point-form using the following data as hints about points from the lecture. extracted from a calculus lecture presentation. Consider the following parameters: \"size\" refers to the size and significance of the text, \"confidence\" refers to how likely the extracted text might match the original, and use autocorrect.possibility as the extracted text. Data: \n"+data

headers = {
    'Authorization': 'BEARER '+config.api_key,
    'Content-Type': 'application/json',
}

json_data = {
    'model': 'command-nightly',
    "prompt": prompt,
    'max_tokens': 400,
    'temperature': 0.5,
    'k': 0,
    'stop_sequences': [],
    'return_likelihoods': 'NONE',
}

response = requests.post('https://api.cohere.ai/v1/generate', headers=headers, json=json_data)

response_dict = json.loads(response.text)

print(response_dict["generations"][0]["text"])