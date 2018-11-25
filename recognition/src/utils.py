import os
from json import load

from cv2 import imread

DIGITS_PATH = os.path.abspath(
    os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "assets", "digits.json"
    )
)


def get_digit_map():
    with open(DIGITS_PATH) as digit_json_file:
        return {
            tuple(value): idx
            for idx, value in enumerate(load(digit_json_file))
        }


def load_image(path: str):
    path = os.path.abspath(path)
    if os.path.isfile(path):
        return imread(path)
    raise Exception("Excuse me! watta fuck? path:{}".format(path))