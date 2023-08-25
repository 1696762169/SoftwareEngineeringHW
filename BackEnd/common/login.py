from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from ..db import read  

login = Blueprint('login', __name__, url_prefix='/login')

@login.route('', methods=['POST'])
def login():
    try:
        data = request.get_json() # get json
        print("data:", data)
        user_type = data['userType']
        wechat_id = data['weChatID']
        tablename=user_type
        DR= read.checkExistByUsrNo(Type=user_type,id=wechat_id,tablename=tablename)

        if DR.size() != 1:#没有找到
            return jsonify({"status": 'NAME_PASSWORD_WRONG'})
        else:#用户存在
            return jsonify({"status": 'GET_SUCCESS'})
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'status': 'LOGIN_UNKNOWN'
        })