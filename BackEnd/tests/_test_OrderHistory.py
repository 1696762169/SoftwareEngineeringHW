import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from your_module import orderhistory  # Replace 'your_module' with the actual module name

class TestOrderHistoryBlueprint(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(orderhistory)

    @patch('your_module.read.SearchHistoryOrdersByWeChatID')
    def test_successful_search(self, mock_SearchHistoryOrdersByWeChatID):
        mock_SearchHistoryOrdersByWeChatID.return_value.records.return_value = [
            {"order_id": 1, "status": "completed"},
            {"order_id": 2, "status": "cancelled"}
        ]
        with self.app.test_client() as client:
            response = client.post('/order-history', json={
                'userType': 'driver',
                'id': 'driver123'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['status'], 'SEARCH_SUCCESS')
            self.assertEqual(len(data['data']), 2)

    @patch('your_module.read.SearchHistoryOrdersByWeChatID')
    def test_empty_search_result(self, mock_SearchHistoryOrdersByWeChatID):
        mock_SearchHistoryOrdersByWeChatID.return_value.records.return_value = []
        with self.app.test_client() as client:
            response = client.post('/order-history', json={
                'userType': 'driver',
                'id': 'driver123'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['status'], 'SEARCH_SUCCESS')
            self.assertEqual(len(data['data']), 0)

    def test_exception_handling(self):
        with self.app.test_client() as client:
            response = client.post('/order-history', json={
                'userType': 'driver',
                'id': 'driver123'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'MODIFY_UNKNOWN')

if __name__ == '__main__':
    unittest.main()
