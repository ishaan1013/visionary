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
    prompt = f"Please analyze the provided data and generate concise notes summarizing the key insights, trends, and important details. Ensure that the notes are organized logically and follow a clear structure. Use bullet points or numbered lists where appropriate for easy readability. Please prioritize accuracy and clarity in the notes. If there are any critical recommendations or action points based on the analysis, include those as well. Include headers for the general topic and subtopics in markdown format.Consider the following parameters: \"size\" refers to the size and significance of the text so phrases with larger size are more important, use autocorrect.possibility as the extracted text, and autocorrect.confidence refers to the probability that text is accurate. \n {topic} {description} Data: {data}\n"

    headers = {
    'Authorization': 'BEARER '+config.cohere_key,
    'Content-Type': 'application/json',
    }

    # model/output parameters
    json_data = {
    'model': 'command-nightly',
    "preamble_override": "",
    "prompt": prompt,
    'max_tokens': 2048,
    'temperature': 0.1,
    'k': 0,
    'stop_sequences': [],
    'return_likelihoods': 'NONE',
    }

    response = requests.post('https://api.cohere.ai/v1/generate', headers=headers, json=json_data)
    response_dict = json.loads(response.text)
    return response_dict["generations"][0]["text"]


# comment this section out if you dont want the prompt to read from another file and remove +data from prompt variable
# choose data file

file_1_path = 'jsondata\\algebra.txt'
file_2_path = 'jsondata\\new_note.txt'
json_data = open(file_1_path,'r')
new_note = open(file_2_path, 'w')
datastring = ""
for line in json_data:
    datastring = datastring + line

notes = generate_notes(datastring, "abstract algebra and ring theory")
print(notes)

new_note.write(notes)
json_data.close()
new_note.close()