import os
from json import load

DIGITS_PATH = os.path.abspath(
    os.path.join(
        [os.path.dirname(os.path.abspath(__file__)), "assets", "digits.json"]
    )
)


def get_digit_map():
    return {
        tuple(value): idx
        for idx, value in enumerate(load(DIGITS_PATH))
    }
