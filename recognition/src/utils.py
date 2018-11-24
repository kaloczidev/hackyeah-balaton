import os
from json import load

DIGITS_PATH = os.path.abspath(
    os.path.join(
        [os.path.dirname(os.path.abspath(__file__)), "assets", "digits.json"]
    )
)

def load_digits():
    return load(DIGITS_PATH)


def get_digit_map(digit_json: dict):
    return {
        tuple(value): idx
        for idx, value in enumerate(digit_json)
    }
