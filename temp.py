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
    prompt = f"Generate notes in point-form using the following data as hints about points from the lecture. Consider the following parameters: \"size\" refers to the size and significance of the text so phrases with larger size are more important, use autocorrect.possibility as the extracted text, and autocorrect.confidence refers to the probability that text is accurate. \n {topic} {description} Data: {data}\n Output in the format"

    headers = {
    'Authorization': 'BEARER '+config.api_key,
    'Content-Type': 'application/json',
    }

    # model/output parameters
    json_data = {
    'model': 'command-nightly',
    "message": '''Generate notes in point-form using the following data as hints about points from the lecture. Consider the following parameters: "size" refers to the size and significance of the text so phrases with larger size are more important, use autocorrect.possibility as the extracted text, and autocorrect.confidence refers to the probability that text is accurate.

Data:
[
  {
    "size": 12816,
    "text": "We have already discussed intervals in lectures Jnd yo1 should be farniliar with them,",
    "confidence": 0.4364647907712237,
    "pos": "[[212, 306], [746, 306], [746, 330], [212, 330]]",
    "autocorrect": {
      "possibility": "We have already discussed intervals in lectures and you should be familiar with them.",
      "confidence": 0.9
    }
  },
  {
    "size": 10200,
    "text": "The interior of an interval is that same intcrval but excluding the endpoints.",
    "confidence": 0.6005607207507742,
    "pos": "[[227, 555], [737, 555], [737, 575], [227, 575]]",
    "autocorrect": {
      "possibility": "The interior of an interval is that same interval but excluding the endpoints.",
      "confidence": 0.9
    }
  },
  {
    "size": 8964,
    "text": "Intervals that are emnply Or conitain exauily one point are called degenerate_",
    "confidence": 0.23809112164485136,
    "pos": "[[229, 499], [727, 499], [727, 517], [229, 517]]",
    "autocorrect": {
      "possibility": "Intervals that are empty or contain exactly one point are called degenerate.",
      "confidence": 0.8
    }
  },
  {
    "size": 3860,
    "text": "rlegenerste Jre called proper.",
    "confidence": 0.4581743885229282,
    "pos": "[[376, 528], [569, 528], [569, 548], [376, 548]]",
    "autocorrect": {
      "possibility": "degenerate are called proper.",
      "confidence": 0.7
    }
  },
  {
    "size": 2944,
    "text": "A half-cpen interval [a. 10}",
    "confidence": 0.38189969714097094,
    "pos": "[[235, 415], [419, 415], [419, 431], [235, 431]]",
    "autocorrect": {
      "possibility": "A half-open interval [a, 10]",
      "confidence": 0.8
    }
  },
  {
    "size": 2772,
    "text": "Some additional notes;",
    "confidence": 0.7172286013858477,
    "pos": "[[201, 469], [355, 469], [355, 487], [201, 487]]",
    "autocorrect": {
      "possibility": "Some additional notes:",
      "confidence": 1
    }
  },
  {
    "size": 2546,
    "text": "1. A closed interval",
    "confidence": 0.9362808404628626,
    "pos": "[[219, 359], [353, 359], [353, 378], [219, 378]]",
    "autocorrect": {
      "possibility": "1. A closed interval",
      "confidence": 1
    }
  },
  {
    "size": 2464,
    "text": "An unbounded interval",
    "confidence": 0.909065498423839,
    "pos": "[[235, 443], [389, 443], [389, 459], [235, 459]]",
    "autocorrect": {
      "possibility": "An unbounded interval",
      "confidence": 1
    }
  },
  {
    "size": 1920,
    "text": "Intervals that are",
    "confidence": 0.9140039018515786,
    "pos": "[[227, 529], [347, 529], [347, 545], [227, 545]]",
    "autocorrect": {
      "possibility": "Intervals that are",
      "confidence": 1
    }
  },
  {
    "size": 1704,
    "text": "Examples:",
    "confidence": 0.9495375843664952,
    "pos": "[[209, 329], [280, 329], [280, 353], [209, 353]]",
    "autocorrect": {
      "possibility": "Examples:",
      "confidence": 1
    }
  },
  {
    "size": 1568,
    "text": "An open interval",
    "confidence": 0.9816770189032805,
    "pos": "[[239, 389], [351, 389], [351, 403], [239, 403]]",
    "autocorrect": {
      "possibility": "An open interval",
      "confidence": 1
    }
  }
]''',
    # 'max_tokens': 400,
    'temperature': 0.3,
    'k': 0,
    "connectors" : [{"id": "web-search"}],
    "prompt_truncation": "auto",
    # 'stop_sequences': [],
    # 'return_likelihoods': 'NONE',
    }

    response = requests.post('https://api.cohere.ai/v1/chat', headers=headers, json=json_data)
    response_dict = json.loads(response.text)
    print(response_dict)
    #return response_dict["generations"][0]["text"]
    return response_dict["text"]


# comment this section out if you dont want the prompt to read from another file and remove +data from prompt variable
# choose data file

filepath = 'jsondata\\algebra.txt'
jsondata = open(filepath,'r')
datastring = ""
for line in jsondata:
    datastring = datastring + line
jsondata.close()

x = generate_notes(datastring)
print(x)