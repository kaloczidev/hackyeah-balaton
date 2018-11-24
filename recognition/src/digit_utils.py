from cv2.cv2 import boundingRect, countNonZero


def get_digits_from_digit_contours(digit_map, digit_contours, threshold):
    # loop over each of the digits
    for c in digit_contours:
        # extract the digit ROI
        (x, y, w, h) = boundingRect(c)
        roi = threshold[y:y + h, x:x + w]

        # compute the width and height of each of the 7 segments
        # we are going to examine
        (roiH, roiW) = roi.shape

        # define the set of 7 segments
        segments = _get_segments(w, h, int(roiH * 0.15), int(roiW * 0.25), int(roiH * 0.05))
        visible_segments = _get_visible_segments_from_segments(roi, segments)
        # lookup the digit and draw it on the image
        digit = digit_map[tuple(visible_segments)]
        # print(digit)
        yield digit
#        cv2.rectangle(output, (x, y), (x + w, y + h), (0, 255, 0), 1)
#        cv2.putText(output, str(digit), (x - 10, y - 10),
#                   cv2.FONT_HERSHEY_SIMPLEX, 0.65, (0, 255, 0), 2)


def _get_visible_segments_from_segments(roi, segments):
    visible_segments = [0] * len(segments)
    # loop over the segments
    for i, ((xA, yA), (xB, yB)) in enumerate(segments):
        # extract the segment ROI, count the total number of
        # thresholded pixels in the segment, and then compute
        # the area of the segment
        segROI = roi[yA:yB, xA:xB]
        total = countNonZero(segROI)
        area = (xB - xA) * (yB - yA)

        # if the total number of non-zero pixels is greater than
        # 50% of the area, mark the segment as "on"
        if total / float(area) > 0.5:
            visible_segments[i] = 1
    return visible_segments


def _get_segments(width, height, delta_height, delta_width, dHC):
    return [
        ((0, 0), (width, delta_height)),  # top
        ((0, 0), (delta_width, height // 2)),  # top-left
        ((width - delta_width, 0), (width, height // 2)),  # top-right
        ((0, (height // 2) - dHC), (width, (height // 2) + dHC)),  # center
        ((0, height // 2), (delta_width, height)),  # bottom-left
        ((width - delta_width, height // 2), (width, height)),  # bottom-right
        ((0, height - delta_height), (width, height))  # bottom
    ]