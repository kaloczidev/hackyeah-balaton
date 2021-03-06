import time
from argparse import ArgumentParser

import cv2 as cv
import imutils
import numpy as np
from imutils.contours import sort_contours
from matplotlib import pyplot as plt
import os


def get_contours_of_image(image, *, sort_reverse: bool=True):
    # find contours in the edge map, then sort them by their
    # size in descending order
    _, contours, _ = cv.findContours(image.copy(), cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    if sort_reverse:
        contours = sorted(contours, key=cv.contourArea, reverse=True)
    return contours


def get_digit_contours(im_contours):

    # generate list with contours in size
    # print("get_digit_contours", im_contours)

    digit_contours = [
        contour
        for contour in im_contours
        if _is_contour_in_size(contour)
    ]
    #print(digit_contours)
    if digit_contours:
        # sort the contours from left-to-right
        return sort_contours(
            digit_contours
        )[0]
    return digit_contours


def _is_contour_in_size(contour) -> bool:
    (x, y, w, h) = cv.boundingRect(contour)
    return 30 > w >= 5 and 10 <= h < 25


def get_digits_from_digit_contours(digit_contours, threshold):
    # loop over each of the digits
    names = []
    for c in digit_contours:
        (x, y, w, h) = cv.boundingRect(c)
        roi = threshold[y:y + h, x:x + w]
        name = "/tmp/{}.jpg".format(str(time.time()))
        #cv.imwrite(name, roi)
        names.append(name)
    print(",".join(names))


from src.image_utils import get_contours_of_image

arg_parser = ArgumentParser()
arg_parser.add_argument("--path", type=str, help="Path of the image with numbers")
args = arg_parser.parse_args()

kernel = np.ones((5,5), np.uint8)

img = cv.imread(args.path)

img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

img = img[120:120+60, 64:64+248]

img = cv.erode(img, kernel, iterations=1)

img = cv.dilate(img, kernel, iterations=1)

img = cv.GaussianBlur(img, (7,7), 0)

_, img = cv.threshold(img, 50, 255, cv.THRESH_BINARY_INV)
img = imutils.resize(img, width=100)
cv.imwrite(args.path, img)
# get_digits_from_digit_contours(get_digit_contours(get_contours_of_image(img)), img)

