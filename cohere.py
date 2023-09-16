import json
import requests
import config

def generate_notes(data, topic="", description=""):
    #data is expected to be a string
    
    if topic!="":
        topic = f"Topic: {topic}\n"
    if description!="":
        description = f"Description: {topic}\n"
    
    #write prompt here
    prompt = f"Generate notes in point-form using the following data as hints about points from the lecture. Consider the following parameters: \"size\" refers to the size and significance of the text so phrases with larger size are more important, use autocorrect.possibility as the extracted text, and autocorrect.confidence refers to the probability that text is accurate. \n {topic} {description} Data: {data}\n"

    headers = {
    'Authorization': 'BEARER '+config.api_key,
    'Content-Type': 'application/json',
    }

    # model/output parameters
    json_data = {
    'model': 'command-nightly',
    "prompt": prompt,
    'max_tokens': 500,
    'temperature': 0.5,
    'k': 0,
    'stop_sequences': [],
    'return_likelihoods': 'NONE',
    }

    response = requests.post('https://api.cohere.ai/v1/generate', headers=headers, json=json_data)
    response_dict = json.loads(response.text)
    return response_dict["generations"][0]["text"]


# comment this section out if you dont want the prompt to read from another file and remove +data from prompt variable
# choose data file

filepath = 'jsondata\\algebra.txt'
jsondata = open(filepath,'r')
datastring = ""
for line in jsondata:
    datastring = datastring + line
jsondata.close()

x = generate_notes(datastring, "abstract algebra and ring theory")
print(x)