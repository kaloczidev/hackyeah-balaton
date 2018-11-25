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


def try_to_ocr(path, gauss_w, gauss_h, treshold):
    try:
        image_context = ImageContext(load_image(path), gauss_h, gauss_w, treshold)
        digitCnts = get_digit_contours(get_contours_of_image(image_context.image))
        digits = [str(digit) for digit in get_digits_from_digit_contours(get_digit_map(), digitCnts, image_context.image)]
        return digits
    except Exception:
        return []


if __name__ == "__main__":
    try:
        arg_parser = ArgumentParser()
        arg_parser.add_argument("--path", type=str, help="Path of the image with numbers")
        arg_parser.add_argument("--basepath", type=str, help="Path of the image with numbers")
        arg_parser.add_argument("--data", type=str, help="Base64 image bytes")
        args = arg_parser.parse_args()
        digits = None
        if args.path:
            for g_h in range(1, 15):
                for g_w in range(1, 15):
                    for th in range(90, 120):
                        digits = try_to_ocr(args.path, g_h, g_w, th)
                        if digits:
                            break
                    if digits:
                        break
                if digits:
                    break

        print(",".join(digits) if digits else "Unrecognizable :(")
        exit(0)
    except Exception:
        exit(1)
