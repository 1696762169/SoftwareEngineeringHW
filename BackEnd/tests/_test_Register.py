import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from your_module import register  # Replace 'your_module' with the actual module name

class TestRegisterBlueprint(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(register)

    @patch('your_module.create.userInsert')
    def test_successful_registration(self, mock_userInsert):
        mock_userInsert.return_value.size.return_value = 1
        with self.app.test_client() as client:
            response = client.post('/apply-register', json={
                'userType': 'driver',
                'name': 'John Doe',
                'weChatID': 'driver123'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertTrue(data['flag'])
            self.assertEqual(data['message'], 'REGISTER_SUCCESS')

    @patch('your_module.create.userInsert')
    def test_failed_registration(self, mock_userInsert):
        mock_userInsert.return_value.size.return_value = 0
        with self.app.test_client() as client:
            response = client.post('/apply-register', json={
                'userType': 'driver',
                'name': 'John Doe',
                'weChatID': 'invalid_user'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'REGISTER_FAILURE')

    def test_exception_handling(self):
        with self.app.test_client() as client:
            response = client.post('/apply-register', json={
                'userType': 'driver',
                'name': 'John Doe',
                'weChatID': 'driver123'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'REGISTER_UNKNOWN')

if __name__ == '__main__':
    unittest.main()
