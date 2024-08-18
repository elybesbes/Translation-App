from flask import Flask, jsonify, request
from transformers import pipeline
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# linking with mongo database
client = MongoClient('mongodb://localhost:27017')
db = client.translationsDB
collection = db.translation

# specifing the huggin face repos
translator_IFRS = pipeline("translation", model="elybes/IFRS_en_ar_translation")
translator_ITIL = pipeline("translation", model="elybes/ITIL_en_ar_translation")
translator_Proc = pipeline("translation", model="elybes/Procurement_en_ar_translation")


@app.route('/')
def home():
    return "This is the Translation API"


@app.route('/api/translate', methods=['POST'])
def translate():
    data = request.json
    text = data['text']
    field = data['field']
    if field == 'IFRS':
        translated_text = translator_IFRS(text)[0]['translation_text']
    elif field == 'ITIL':
        translated_text = translator_ITIL(text)[0]['translation_text']
    elif field == 'Procurement':
        translated_text = translator_Proc(text)[0]['translation_text']
    return jsonify({'translated_text' : translated_text})


@app.route('/api/get_translation', methods=['GET'])
def get_translation():
    field_value = request.args.get('field')
    query = {"field": field_value}
    projection = {"_id": 0, "English Text": 1, "Translation": 1}
    documents = list(collection.find(query, projection))
    return jsonify(documents)

@app.route('/api/save_translation', methods=['PUT'])
def save_translation():
    data = request.json
    field = data.get('field')
    english_text = data.get('English Text')
    translation = data.get('Translation')
    document = {
        "field": field,
        "English Text": english_text,
        "Translation": translation
    }
    collection.insert_one(document)
    return jsonify({'message': 'Translation saved successfully'}), 201


if __name__ == '__main__':
    app.run(debug=True)