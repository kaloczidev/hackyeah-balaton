from cv2 import approxPolyDP, arcLength, findContours, contourArea, RETR_EXTERNAL, \
    CHAIN_APPROX_SIMPLE, morphologyEx, threshold, getStructuringElement, MORPH_ELLIPSE, THRESH_BINARY_INV, THRESH_OTSU, \
    MORPH_OPEN, boundingRect, moments, imshow
from imutils.contours import sort_contours


def get_approximate_of_contours(im_contours):
    for contour in im_contours:
        approximate = _get_approximate_of_contour(contour)
        # if the contour has four vertices, then we have found
        # the thermostat display
        if len(approximate) == 4:
            #print("get_approximate_of_contours", approximate)
            return approximate
    return None


def get_contours_of_image(image, *, sort_reverse: bool=True):
    # find contours in the edge map, then sort them by their
    # size in descending order
    _, contours, _ = findContours(image.copy(), RETR_EXTERNAL, CHAIN_APPROX_SIMPLE)
    if sort_reverse:
        contours = sorted(contours, key=contourArea, reverse=True)
    return contours


def get_treshold_of(image):
    _, _threshold = threshold(image, 127, 255, 0)
    return morphologyEx(
        _threshold,
        MORPH_OPEN,
        getStructuringElement(MORPH_ELLIPSE, (1, 5))
    )


def get_digit_contours(im_contours):

    # generate list with contours in size
    # print("get_digit_contours", im_contours)
    digit_contours = [
        contour
        for contour in im_contours
        if _is_contour_in_size(contour)
    ]

    if digit_contours:
        # sort the contours from left-to-right
        return sort_contours(
            digit_contours,
            method="left-to-right"
        )[0]
    return digit_contours


def _is_contour_in_size(contour) -> bool:
    (x, y, w, h) = boundingRect(contour)
    # print("_is_contour_in_size", list(contour), *(x, y, w, h))
    return w >= 15 and 30 <= h <= 40


def _get_approximate_of_contour(contour):
    # approximate the contour
    return approxPolyDP(contour, 0.1 * arcLength(contour, True), True)



