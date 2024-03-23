
from flask import Flask, request, jsonify

from flask_cors import CORS

import cv2

import numpy as np

import base64



app = Flask(__name__)

CORS(app)



# Load the YOLOv3-tiny model

net = cv2.dnn.readNet("yolov3-tiny.weights", "yolov3-tiny.cfg")



# Load the COCO class labels

with open("coco.names", "r") as f:

    classes = [line.strip() for line in f.readlines()]



@app.route('/detect', methods=['POST'])

def detect_objects():

    # Check if an image file was uploaded

    if 'image' not in request.files:

        return jsonify({'error': 'No image file uploaded'})

    

    image_file = request.files['image']

    

    # Read the uploaded image file

    image = cv2.imdecode(np.fromstring(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    

    # Encode the original image as base64

    _, buffer = cv2.imencode('.jpg', image)

    original_image_base64 = base64.b64encode(buffer).decode('utf-8')

    

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

    

    # Apply non-maximum suppression to remove overlapping bounding boxes

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.3, 0.4)

    

    vehicle_count = 0

    

    # Draw the bounding boxes and labels on the image

    for i in indexes:

        x, y, w, h = boxes[i]

        label = classes[class_ids[i]]

        confidence = confidences[i]

        

        # Check if the detected object is a vehicle

        if label in ['car', 'truck', 'bus', 'motorcycle']:

            vehicle_count += 1

        

        # Draw the bounding box rectangle

        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

        

        # Put the class label and confidence score on the image

        label_text = f"{label}: {confidence:.2f}"

        cv2.putText(image, label_text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    

    # Encode the image with detected objects as base64

    _, buffer = cv2.imencode('.jpg', image)

    detected_image_base64 = base64.b64encode(buffer).decode('utf-8')

    

    # Return the base64-encoded images and vehicle count as JSON response with CORS header

    response = jsonify({

        'original_image_base64': original_image_base64,

        'detected_image_base64': detected_image_base64,

        'vehicle_count': vehicle_count

    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response



if __name__ == '__main__':

    app.run(debug=True)

