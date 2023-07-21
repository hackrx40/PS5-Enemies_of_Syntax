from paddleocr import PaddleOCR
import re
import nltk

ocr = PaddleOCR()

def get_text_from_image(image_path):
    img_path = image_path
    result = ocr.ocr(img_path)

    concat_output = "\n".join(row[1][0] for row in result[0])

    return concat_output

def get_gov_doc(image_path):
    text = get_text_from_image(image_path)
    match = re.findall(r'\d+[/.-]\d+[/.-]\d{4}', text)

    dob = ""
    number = ""

    dob = dob.join(match)

    sent_tokens = nltk.sent_tokenize(text)
    number = sent_tokens[0].splitlines()[5]

    return dob, number
