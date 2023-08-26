import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from your_module import AcceptOrder  # Replace 'your_module' with the actual module name

class TestAcceptOrderBlueprint(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(AcceptOrder)

    @patch('your_module.modify.acceptOrder')
    def test_successful_acceptance(self, mock_acceptOrder):
        mock_acceptOrder.return_value.size.return_value = 1
        with self.app.test_client() as client:
            response = client.post('/accept-order', json={
                'driver_no': 'driver123',
                'order_number': 1
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['status'], 'ACCEPT_ORDER_SUCCESS')

    @patch('your_module.modify.acceptOrder')
    def test_failed_acceptance(self, mock_acceptOrder):
        mock_acceptOrder.return_value.size.return_value = 0
        with self.app.test_client() as client:
            response = client.post('/accept-order', json={
                'driver_no': 'driver456',
                'order_number': 2
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'ACCEPT_ORDER_UNKNOWN')

    def test_exception_handling(self):
        with self.app.test_client() as client:
            response = client.post('/accept-order', json={
                'driver_no': 'driver123',
                'order_number': 1
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'ACCEPT_ORDER_UNKNOWN')

if __name__ == '__main__':
    unittest.main()
