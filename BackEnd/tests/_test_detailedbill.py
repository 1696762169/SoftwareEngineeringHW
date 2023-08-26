import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from your_module import detailedbill  # Replace 'your_module' with the actual module name

class TestDetailedBillBlueprint(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(detailedbill)

    @patch('your_module.read.SearchOrderByOrderID')
    def test_successful_search(self, mock_SearchOrderByOrderID):
        mock_SearchOrderByOrderID.return_value.records.return_value = [
            {"order_id": 1, "status": "completed", "total_amount": 20.0},
            {"order_id": 2, "status": "cancelled", "total_amount": 15.0}
        ]
        with self.app.test_client() as client:
            response = client.post('/detailed-bill', json={
                'order_id': 1
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['status'], 'SEARCH_SUCCESS')
            self.assertEqual(len(data['data']), 2)

    @patch('your_module.read.SearchOrderByOrderID')
    def test_empty_search_result(self, mock_SearchOrderByOrderID):
        mock_SearchOrderByOrderID.return_value.records.return_value = []
        with self.app.test_client() as client:
            response = client.post('/detailed-bill', json={
                'order_id': 3
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['status'], 'SEARCH_SUCCESS')
            self.assertEqual(len(data['data']), 0)

    def test_exception_handling(self):
        with self.app.test_client() as client:
            response = client.post('/detailed-bill', json={
                'order_id': 1
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'MODIFY_UNKNOWN')

if __name__ == '__main__':
    unittest.main()
