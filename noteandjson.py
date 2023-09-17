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
def generate_json(notes, json_format):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+config.openai_key,
    }

    json_data = {
        'model': 'gpt-4',
        'messages': [
            {
                'role': 'user',
                'content': f'Write the given text in a similar format as the given JSON. Use the markdown header information to determine what text is a header and what size the header should be. \n\nData: \n{notes} \n\nJSON: {json_format}\n',
            },
        ],
        'temperature': 0.5,
    }

    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=json_data)
    response_dict = json.loads(response.text)
    return(response_dict['choices'][0]['message']['content'])


data_path = 'jsondata\\algebra.txt'
format_path = 'jsondata\\jsonformat.txt'

open_format = open(format_path,'r')
open_data = open(data_path,'r')

data = ""
format = ""

for line in open_data:
    data = data + line
for line in open_format:
    format = format + line

open_data.close()
open_format.close()

notes = generate_notes(data, "abstract algebra and ring theory")
generated_json = generate_json(notes, format)

# print(notes)
# print(generated_json)