import numpy
from cv2 import cvtColor, COLOR_BGR2GRAY, GaussianBlur, THRESH_BINARY, threshold, cv2


class ImageContext:

    def __init__(self, image, s, s ,d):
        kernel = numpy.ones((5, 5), numpy.uint8)

        img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        img = img[120:120 + 60, 64:64 + 248]

        img = cv2.erode(img, kernel, iterations=1)

        img = cv2.dilate(img, kernel, iterations=1)

        img = cv2.GaussianBlur(img, (7, 7), 0)

        _, img = cv2.threshold(img, 50, 255, cv2.THRESH_BINARY_INV)
        self.image = img

