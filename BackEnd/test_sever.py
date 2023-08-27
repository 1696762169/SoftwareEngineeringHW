# from flask import Flask, request
 
# app = Flask("my-app")
 
 
# @app.route('/')
# def hello_world():
#     return 'Hello World!'
 
 
# @app.route('/add', methods=['POST'])
# def add():
#     print(request.headers)
#     print(type(request.json))
#     print(request.json)
#     result = request.json['a'] + request.json['b']
#     return str(result)
 
 
# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=5000, debug=True)

import sys
 
import logging
 
import os
 
# 把当前文件所在文件夹的父文件夹路径加入到PYTHONPATH
 
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath("../BackEnd"))))
print(sys.path)
# from conf.online_conf import *