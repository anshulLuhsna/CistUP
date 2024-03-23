
import cv2

import numpy as np



# Load the YOLOv3-tiny model

net = cv2.dnn.readNet("yolov3-tiny.weights", "yolov3-tiny.cfg")



# Load the COCO class labels

with open("coco.names", "r") as f:

    classes = [line.strip() for line in f.readlines()]



# Set the input image

image = cv2.imread("OIP.jpg")



# Get the dimensions of the input image

height, width, _ = image.shape



# Create a blob from the input image

blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), swapRB=True, crop=False)



# Set the input blob for the YOLOv3-tiny model

net.setInput(blob)



# Get the output layers of the YOLOv3-tiny model

output_layers = net.getUnconnectedOutLayersNames()



# Perform object detection

layer_outputs = net.forward(output_layers)



# Initialize lists to store the detected objects

boxes = []

confidences = []

class_ids = []



# Loop over each output layer

for output in layer_outputs:

    # Loop over each detection

    for detection in output:

        # Extract the class probabilities

        scores = detection[5:]

        # Get the class ID with the highest probability

        class_id = np.argmax(scores)

        # Get the confidence score

        confidence = scores[class_id]

        

        # Filter out weak detections

        if confidence > 0.3:

            # Get the bounding box coordinates

            center_x = int(detection[0] * width)

            center_y = int(detection[1] * height)

            w = int(detection[2] * width)

            h = int(detection[3] * height)

            x = int(center_x - w / 2)

            y = int(center_y - h / 2)

            

            # Add the bounding box coordinates and confidence to the lists

            boxes.append([x, y, w, h])

            confidences.append(float(confidence))

            class_ids.append(class_id)



print("Detected Classes:", class_ids)

print("Bounding Boxes:", boxes)



# Apply non-maximum suppression to remove overlapping bounding boxes

indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.3, 0.4)



# Draw the bounding boxes and labels on the image

for i in indexes:

    x, y, w, h = boxes[i]

    label = classes[class_ids[i]]

    confidence = confidences[i]

    

    # Draw the bounding box rectangle

    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

    

    # Put the class label and confidence score on the image

    label_text = f"{label}: {confidence:.2f}"

    cv2.putText(image, label_text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)



# Display the output image

cv2.imshow("Object Detection", image)

cv2.waitKey(0)

cv2.destroyAllWindows()

