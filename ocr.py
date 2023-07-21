from paddleocr import PaddleOCR
import re
import nltk
from nltk.corpus import wordnet

ocr = PaddleOCR()


def get_text_from_image(image_path):
    img_path = image_path
    result = ocr.ocr(img_path)

    concat_output = "\n".join(row[1][0] for row in result[0])

    return concat_output


def get_details(concat_output):
    match = re.findall(r'\d+[/.-]\d+[/.-]\d{4}', concat_output)

    bill_date = ""
    reciever = ""
    total_bill = 0

    bill_date = bill_date.join(match)

    sent_tokens = nltk.sent_tokenize(concat_output)
    reciever = sent_tokens[0].splitlines()[0]

    price = re.findall(r'[\$\$\£\€\₹](\d+(?:\.\d{1,2})?)', concat_output)
    price = list(map(float, price))
    total_bill = max(price)

    return reciever, bill_date, total_bill


def process_text(concat_output):
    # we will remove punctuation
    tokenizer = nltk.RegexpTokenizer(r"\w+")
    new_words = tokenizer.tokenize(concat_output)

    nltk.download('stopwords')
    stop_words = set(nltk.corpus.stopwords.words('english'))

    filtered_list = [w.lower() for w in new_words if w not in stop_words]

    return filtered_list


def get_category(filtered_list):
    # entertainment
    entertainment = []
    for syn in wordnet.synsets("entertainment"):
        for l in syn.lemmas():
            entertainment.append(l.name())

    l = ['happy', 'restaurant', 'food', 'kitchen', 'hotel',
         'room', 'park', 'movie', 'cinema', 'popcorn', 'combo meal']
    entertainment = entertainment+l

    # home utility
    home_utility = []
    for syn in wordnet.synsets("home"):
        for l in syn.lemmas():
            home_utility.append(l.name())
    l2 = ['internet', 'telephone', 'elecricity', 'meter', 'wifi', 'broadband',
          'consumer', 'reading', 'gas', 'water', 'postpaid', 'prepaid']
    home_utility += l2

    # grocery

    grocery = []
    for syn in wordnet.synsets("grocery"):
        for l in syn.lemmas():
            grocery.append(l.name())
    l3 = ['bigbasket', 'milk', 'atta', 'sugar', 'suflower',
          'oil', 'bread', 'vegetabe', 'fruit', 'salt', 'paneer']
    grocery += l3

    # investment
    investment = []
    for syn in wordnet.synsets("investment"):
        for l in syn.lemmas():
            investment.append(l.name())
    l1 = ['endowment', 'grant', 'loan', 'applicant', 'income', 'expenditure', 'profit',
          'interest', 'expense', 'finance', 'property', 'money', 'fixed', 'deposit', 'kissan', 'vikas']
    investment = investment+l1

    #travel and transportation
    transport = []
    for syn in wordnet.synsets("car"):
        for l in syn.lemmas():
            transport.append(l.name())
    l4 = ['cab', 'ola', 'uber', 'autorickshaw', 'railway', 'air',
          'emirates', 'aerofloat', 'taxi', 'booking', 'road', 'highway']
    transport += l4

    # shopping
    shopping = []
    for syn in wordnet.synsets("dress"):
        for l in syn.lemmas():
            shopping.append(l.name())
    l4 = ['iphone', 'laptop', 'saree', 'max', 'pantaloons', 'westside', 'vedic', 'makeup',
          'lipstick', 'cosmetics', 'mac', 'facewash', 'heels', 'crocs', 'footwear', 'purse']
    shopping += l4

    category = 'others'
    for word in filtered_list:
        if word in entertainment:
            category = 'entertainment'
            break
        elif word in investment:
            category = 'investment'
            break
        elif word in grocery:
            category = 'grocery'
            break
        elif word in shopping:
            category = 'shopping'
            break
        elif word in transport:
            category = 'transport'
            break
        elif word in home_utility:
            category = 'home_utility'
            break

    return category


def get_bill_details(image_path):
    text = get_text_from_image(image_path)
    reciever, bill_date, total_bill = get_details(text)
    filtered_list = process_text(text)
    category = get_category(filtered_list)

    return reciever, bill_date, total_bill, category


def get_gov_doc(image_path):
    text = get_text_from_image(image_path)
    match = re.findall(r'\d+[/.-]\d+[/.-]\d{4}', text)

    dob = ""
    number = ""

    dob = dob.join(match)

    sent_tokens = nltk.sent_tokenize(text)
    number = sent_tokens[0].splitlines()[5]

    return dob, number


reciever, bill_date, total_bill, category = get_bill_details('test.png')
dob, number = get_gov_doc('doc.jpg')
# print(reciever, bill_date, total_bill, category)
# print(dob, number)
