import unittest
from unittest.mock import patch, MagicMock
from your_module import changeInfo  # Replace 'your_module' with the actual module name

class TestChangeInfo(unittest.TestCase):

    @patch('your_module.baseSelect')
    @patch('your_module.baseUpdate')
    def test_passenger_change(self, mock_baseUpdate, mock_baseSelect):
        mock_baseUpdate.return_value = None
        mock_baseSelect.return_value = [
            {
                'passenger_name': 'Alice',
                'passenger_no': 'passenger123',
                'passenger_phonenumber': '1234567890',
                'passenger_score': 4.5,
                'location_no': 'location456'
            }
        ]
        DR = changeInfo("passenger", "passenger123", "passenger_name", "New Name")

        self.assertEqual(DR.size(), 1)

    @patch('your_module.baseSelect')
    @patch('your_module.baseUpdate')
    def test_driver_change(self, mock_baseUpdate, mock_baseSelect):
        mock_baseUpdate.return_value = None
        mock_baseSelect.return_value = [
            {
                'driver_name': 'Bob',
                'driver_no': 'driver123',
                'driver_phonenumber': '9876543210',
                'driver_score': 4.2,
                'location_no': 'location789'
            }
        ]
        DR = changeInfo("driver", "driver123", "driver_phonenumber", "9998887777")

        self.assertEqual(DR.size(), 1)

if __name__ == '__main__':
    unittest.main()
