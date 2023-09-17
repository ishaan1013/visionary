import os
import requests
import config
import json

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

 
open_format = open('jsondata\\jsonformat.txt','r')
open_note = open('jsondata\\new_note.txt', 'r')
format = ""
note = ""
for line in open_format:
    format = format + line
for line in open_note:
    note = note + line
open_format.close()
open_note.close()

generated_json = generate_json(note, format)
print(generated_json)