from cv2 import approxPolyDP, arcLength, findContours, contourArea, RETR_EXTERNAL, \
    CHAIN_APPROX_SIMPLE, morphologyEx, threshold, getStructuringElement, MORPH_ELLIPSE, THRESH_BINARY_INV, THRESH_OTSU, \
    MORPH_OPEN, boundingRect, THRESH_TRUNC, THRESH_TRIANGLE, THRESH_TOZERO_INV, THRESH_TOZERO, THRESH_MASK, \
    THRESH_BINARY, CHAIN_APPROX_NONE, RETR_TREE
from imutils.contours import sort_contours




def get_contours_of_image(image, *, sort_reverse: bool=True):
    # find contours in the edge map, then sort them by their
    # size in descending order
    _, contours, _ = findContours(image.copy(), RETR_TREE, CHAIN_APPROX_SIMPLE)
    if sort_reverse:
        contours = sorted(contours, key=contourArea, reverse=True)
    return contours


def get_threshold_of(image):
    # THRESH_TRUNC, THRESH_TRIANGLE, THRESH_TOZERO_INV, THRESH_TOZERO, THRESH_MASK, THRESH_BINARY
    _, _threshold = threshold(image, 120, 255, THRESH_BINARY)
    return _threshold


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
    (x, y, w, h) = boundingRect(contour)
    # print("_is_contour_in_size", list(contour), *(x, y, w, h))
    return w >= 40 and 120 <= h


def _get_two_max_heighted_contour(contours):
    for c in contours:
        print(boundingRect(c))

    h_map = {
        boundingRect(contour)[3]: contour
        for contour in contours
        if boundingRect(contour)[3] > 100
    }
    print([h for h in sorted(h_map.keys(), reverse=True)[:2]])
    return  [h_map[h] for h in sorted(h_map.keys(), reverse=True)[:2]]





