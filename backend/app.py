from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import infoCompile

app = Flask(__name__)
CORS(app)


@app.route('/test-post', methods = ['POST'])
def test_post():
    todo_data = request.get_json()
    print(todo_data)
    try:
        print(todo_data['name']+ str(todo_data['age']))
    except:
        print("dictionary error")
    return 'hello world i hate programming', 200

@app.post('/post-suggestions')
def makeBackendRequest():
    todo_data = request.get_json()
    print(infoCompile.evalFood(todo_data['name'], todo_data['longitude'], todo_data['latitude']))
    return {'msg': 'hello world i hate programming'},200
    

if __name__ == '__main__':
    app.run(debug=True)

    # Initialize the hashmap 
    """
    structure of hashmap:
    {name of food : carbonFootprint}
    """
    infoCompile.initializeHashMap()


    print("Your server is running!")
