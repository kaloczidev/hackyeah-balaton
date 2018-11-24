from cv2.cv2 import approxPolyDP, arcLength, findContours, contourArea, RETR_EXTERNAL, \
    CHAIN_APPROX_SIMPLE, morphologyEx, threshold, getStructuringElement, MORPH_ELLIPSE, THRESH_BINARY_INV, THRESH_OTSU, \
    MORPH_OPEN
from imutils import is_cv2


def get_approximate_of_contours(contours):
    for contour in contours:
        approximate = _get_approximate_of_contour(contour)
        # if the contour has four vertices, then we have found
        # the thermostat display
        if len(approximate) == 4:
            return approximate
    return None


def get_contours_of_image(edged_image, *, sort_reverse: bool=True):
    # find contours in the edge map, then sort them by their
    # size in descending order
    cnts = findContours(edged_image.copy(), RETR_EXTERNAL, CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if is_cv2() else cnts[1]
    if sort_reverse:
        cnts = sorted(cnts, key=contourArea, reverse=True)
    return cnts


def get_treshold_of(image):
    return morphologyEx(
        threshold(
            image, 0, 255, THRESH_BINARY_INV | THRESH_OTSU
        )[1],
        MORPH_OPEN,
        getStructuringElement(MORPH_ELLIPSE, (1, 5))
    )


def _get_approximate_of_contour(contour):
    # approximate the contour
    return approxPolyDP(contour, 0.02 * arcLength(contour, True), True)


