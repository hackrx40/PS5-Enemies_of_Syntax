import re
import nltk, os
from google.cloud import vision

def get_text_from_image(image_path):
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'hackrx-393212-93ebb5994abd.json'
    client = vision.ImageAnnotatorClient()

    with open(image_path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    all_text = ''

    for text in texts:
        all_text += text.description

    return all_text

def get_gov_doc(image_path):
    text = get_text_from_image(image_path)
    match = re.findall(r'\d+[/.-]\d+[/.-]\d{4}', text)

    dob = ""
    number = ""

    dob = dob.join(match)

    sent_tokens = nltk.sent_tokenize(text)
    number = sent_tokens[0].splitlines()[5]

    return dob, number
