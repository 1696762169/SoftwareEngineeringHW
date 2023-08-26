from flask import Flask
from flask_cors import CORS

from routes import login 
# from driver import 
# from passenger import 

app = Flask(__name__)
app.register_blueprint(login.login)
# app.register_blueprint(login.register)

CORS(app, supports_credentials=True)

if __name__ == '__main__':
    app.run(port=50000, host='0.0.0.0', debug=True)