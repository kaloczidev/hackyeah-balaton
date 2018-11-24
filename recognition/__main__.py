from argparse import ArgumentParser

from cv2.cv2 import imshow, waitKey
from imutils.perspective import four_point_transform

from src.digit_utils import get_digits_from_digit_contours
from src.image_context import ImageContext
from src.image_utils import get_treshold_of, get_approximate_of_contours, get_contours_of_image, \
    get_digit_contours
from src.utils import get_digit_map, load_image

#print(u"{}{}.{} \u00b0C".format(*digits))
#cv2.imshow("Input", image)
#cv2.imshow("Output", output)
#cv2.waitKey(0)

if __name__ == "__main__":
    arg_parser = ArgumentParser()
    arg_parser.add_argument("image_path", type=str, help="Path of the image with numbers")
    args = arg_parser.parse_args()
    image_context = ImageContext(load_image(args.image_path))
    displayCnt = get_approximate_of_contours(
        get_contours_of_image(image_context.edged_image)
    )

    # extract the thermostat display, apply a perspective transform
    # to it
    warped = four_point_transform(image_context.gray_image, displayCnt.reshape(4, 2))
    output = four_point_transform(image_context.image, displayCnt.reshape(4, 2))
    imshow('image', image_context.image)
    waitKey(0)
    # threshold the warped image, then apply a series of morphological
    # operations to cleanup the thresholded image

    thresh = get_treshold_of(warped)

    # find contours in the thresholded image, then initialize the
    # digit contours lists
    #print(get_digit_map())
    digitCnts = get_digit_contours(get_contours_of_image(thresh, sort_reverse=False))
    print(digitCnts)
    digits = [digit for digit in get_digits_from_digit_contours(get_digit_map(), digitCnts, thresh)]

    print(digits)
