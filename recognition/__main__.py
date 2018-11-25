from argparse import ArgumentParser

from src.digit_utils import get_digits_from_digit_contours
from src.image_context import ImageContext
from src.image_utils import get_contours_of_image, \
    get_digit_contours
from src.utils import get_digit_map, load_image

if __name__ == "__main__":
    try:
        arg_parser = ArgumentParser()
        arg_parser.add_argument("image_path", type=str, help="Path of the image with numbers")
        args = arg_parser.parse_args()
        image_context = ImageContext(load_image(args.image_path))

        digitCnts = get_digit_contours(get_contours_of_image(image_context.image))
        digits = [str(digit) for digit in get_digits_from_digit_contours(get_digit_map(), digitCnts, image_context.image)]
        print(",".join(digits))
        exit()
    except Exception:
        exit(1)
