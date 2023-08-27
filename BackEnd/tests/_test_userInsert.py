import unittest
from unittest.mock import patch, MagicMock
from your_module import userInsert  # Replace 'your_module' with the actual module name

class TestUserInsert(unittest.TestCase):

    @patch('your_module.baseSelect')
    @patch('your_module.baseUpdate')
    def test_passenger_insert(self, mock_baseUpdate, mock_baseSelect):
        mock_baseUpdate.return_value = None
        mock_baseSelect.return_value = [
            {
                'passenger_name': 'Alice',
                'passenger_no': 'passenger123'
            }
        ]
        DR = userInsert("passenger", "Alice", "passenger123")

        self.assertEqual(DR.size(), 1)

    @patch('your_module.baseSelect')
    @patch('your_module.baseUpdate')
    def test_driver_insert(self, mock_baseUpdate, mock_baseSelect):
        mock_baseUpdate.return_value = None
        mock_baseSelect.return_value = [
            {
                'driver_name': 'Bob',
                'driver_no': 'driver123'
            }
        ]
        DR = userInsert("driver", "Bob", "driver123")

        self.assertEqual(DR.size(), 1)

if __name__ == '__main__':
    unittest.main()
