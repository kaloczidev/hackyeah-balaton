from cv2.cv2 import cvtColor, COLOR_BGR2GRAY, GaussianBlur, Canny
from imutils import resize


class ImageContext:

    def __init__(self, image):
        self._image = resize(image, height=500)
        self._gray_image = cvtColor(image, COLOR_BGR2GRAY)
        self._blurred_image = GaussianBlur(self._gray_image, (5, 5), 0)
        self._edged_image = Canny(self._blurred_image, 50, 200, 255)

    @property
    def image(self):
        return self._image

    @property
    def gray_image(self):
        return self._gray_image

    @property
    def blurred_image(self):
        return self._blurred_image

    @property
    def edged_image(self):
        return self._edged_image
