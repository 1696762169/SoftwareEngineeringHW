import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from your_module import modify  # Replace 'your_module' with the actual module name

class TestModifyBlueprint(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(modify)

    @patch('your_module.modify.changeInfo')
    def test_successful_modify(self, mock_changeInfo):
        mock_changeInfo.return_value.size.return_value = 1
        with self.app.test_client() as client:
            response = client.post('/apply-modify-info', json={
                'userType': 'driver',
                'id': 'driver123',
                'modifyType': 'name',
                'modifyData': 'New Name'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertTrue(data['flag'])
            self.assertEqual(data['message'], 'MODIFY_SUCCESS')

    @patch('your_module.modify.changeInfo')
    def test_failed_modify(self, mock_changeInfo):
        mock_changeInfo.return_value.size.return_value = 0
        with self.app.test_client() as client:
            response = client.post('/apply-modify-info', json={
                'userType': 'driver',
                'id': 'invalid_user',
                'modifyType': 'name',
                'modifyData': 'New Name'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'MODIFY_FAILURE')

    @patch('your_module.modify.changeInfo')
    def test_exception_handling(self, mock_changeInfo):
        mock_changeInfo.side_effect = Exception("Something went wrong")
        with self.app.test_client() as client:
            response = client.post('/apply-modify-info', json={
                'userType': 'driver',
                'id': 'driver123',
                'modifyType': 'name',
                'modifyData': 'New Name'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'MODIFY_UNKNOWN')

if __name__ == '__main__':
    unittest.main()
