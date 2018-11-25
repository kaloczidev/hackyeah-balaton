from cv2 import cvtColor, COLOR_BGR2GRAY, GaussianBlur, THRESH_BINARY, threshold


class ImageContext:

    def __init__(self, image, g_h, g_w, tr):
        _, self.image = threshold(
            GaussianBlur(
                cvtColor(image, COLOR_BGR2GRAY),
                (g_w, g_h),
                0
            ),
            tr, 255, THRESH_BINARY
        )

