import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from your_module import login  # Replace 'your_module' with the actual module name

class TestLoginBlueprint(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(login)

    @patch('your_module.read.checkExistByUsrNo')
    def test_valid_login(self, mock_checkExistByUsrNo):
        mock_checkExistByUsrNo.return_value.size.return_value = 1
        with self.app.test_client() as client:
            response = client.post('/apply-login', json={
                'userType': 'driver',
                'weChatID': 'driver123'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertTrue(data['flag'])
            self.assertEqual(data['message'], 'GET_SUCCESS')

    @patch('your_module.read.checkExistByUsrNo')
    def test_invalid_login(self, mock_checkExistByUsrNo):
        mock_checkExistByUsrNo.return_value.size.return_value = 0
        with self.app.test_client() as client:
            response = client.post('/apply-login', json={
                'userType': 'driver',
                'weChatID': 'invalid_user'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'INVALID_USER')

    @patch('your_module.read.checkExistByUsrNo')
    def test_exception_handling(self, mock_checkExistByUsrNo):
        mock_checkExistByUsrNo.side_effect = Exception("Something went wrong")
        with self.app.test_client() as client:
            response = client.post('/apply-login', json={
                'userType': 'driver',
                'weChatID': 'driver123'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'LOGIN_UNKNOWN')

if __name__ == '__main__':
    unittest.main()
