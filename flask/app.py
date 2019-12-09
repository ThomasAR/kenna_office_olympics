from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
import json


@app.route('/UpdateScores', methods=['GET'])
@cross_origin()
def result2():
    data = []
    with open('../src/scores.json') as json_file:
        data = json.load(json_file)
        data.append({
            'nickname': 'Tim',
            'character': 'Tim Cook',
            'score': 40
        })
    json_file.close()
    with open('../src/scores.json', 'w+') as json_write:
        json.dump(data, json_write, indent=4)

    return "{response: 'success'}" # response to your request.

if __name__ == "__main__":
    app.run()