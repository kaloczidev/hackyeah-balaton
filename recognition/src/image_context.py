from cv2 import cvtColor, COLOR_BGR2GRAY, GaussianBlur, THRESH_BINARY, threshold


class ImageContext:

    def __init__(self, image):
        _, self.image = threshold(
            GaussianBlur(
                cvtColor(image, COLOR_BGR2GRAY),
                (1, 51),
                0
            ),
            120, 255, THRESH_BINARY
        )

