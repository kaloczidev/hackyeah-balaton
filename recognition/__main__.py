from argparse import ArgumentParser

from src.digit_utils import get_digits_from_digit_contours
from src.image_context import ImageContext
from src.image_utils import get_contours_of_image, \
    get_digit_contours
from src.utils import get_digit_map, load_image



def data_to_img(uri):
    import base64
    imgdata = base64.b64decode(uri)
    filename = '/tmp/some_image.jpg'  # I assume you have a way of picking unique filenames
    with open(filename, 'wb') as f:
        f.write(imgdata)
    return filename


if __name__ == "__main__":
    try:
        arg_parser = ArgumentParser()
        arg_parser.add_argument("--path", type=str, help="Path of the image with numbers")
        arg_parser.add_argument("--basepath", type=str, help="Path of the image with numbers")
        arg_parser.add_argument("--data", type=str, help="Base64 image bytes")
        args = arg_parser.parse_args()
        if args.path:
            image_context = ImageContext(load_image(args.path))

        if args.data:
            image_context = ImageContext(load_image(data_to_img(args.data)))

        if args.basepath:
            with open(args.basepath) as f:
                image_context = ImageContext(load_image(data_to_img(f.read())))

        digitCnts = get_digit_contours(get_contours_of_image(image_context.image))
        digits = [str(digit) for digit in get_digits_from_digit_contours(get_digit_map(), digitCnts, image_context.image)]
        print(",".join(digits))

        exit(0)
    except Exception:
        exit(1)
