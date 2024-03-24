
from flask import Flask, request, jsonify

from flask_cors import CORS

import cv2

import numpy as np

import base64



app = Flask(__name__)

CORS(app)




net = cv2.dnn.readNet("yolov3-tiny.weights", "yolov3-tiny.cfg")



with open("coco.names", "r") as f:

    classes = [line.strip() for line in f.readlines()]



@app.route('/detect', methods=['POST'])

def detect_objects():

    

    if 'image' not in request.files:

        return jsonify({'error': 'No image file uploaded'})

    

    image_file = request.files['image']

    

 

    image = cv2.imdecode(np.fromstring(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    


    _, buffer = cv2.imencode('.jpg', image)

    original_image_base64 = base64.b64encode(buffer).decode('utf-8')

    


    height, width, _ = image.shape

    


    blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), swapRB=True, crop=False)

    

    net.setInput(blob)

    

    output_layers = net.getUnconnectedOutLayersNames()

    


    layer_outputs = net.forward(output_layers)

    boxes = []

    confidences = []

    class_ids = []

    
    for output in layer_outputs:

      

        for detection in output:


            scores = detection[5:]


            class_id = np.argmax(scores)

           

            confidence = scores[class_id]

            

          

            if confidence > 0.3:

            

                center_x = int(detection[0] * width)

                center_y = int(detection[1] * height)

                w = int(detection[2] * width)

                h = int(detection[3] * height)

                x = int(center_x - w / 2)

                y = int(center_y - h / 2)

                

              

                boxes.append([x, y, w, h])

                confidences.append(float(confidence))

                class_ids.append(class_id)

    

   

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.3, 0.4)

    

    vehicle_count = 0

    


    for i in indexes:

        x, y, w, h = boxes[i]

        label = classes[class_ids[i]]

        confidence = confidences[i]

        

     

        if label in ['car', 'truck', 'bus', 'motorcycle']:

            vehicle_count += 1


        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)


        label_text = f"{label}: {confidence:.2f}"

        cv2.putText(image, label_text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)


    _, buffer = cv2.imencode('.jpg', image)

    detected_image_base64 = base64.b64encode(buffer).decode('utf-8')


    response = jsonify({

        'original_image_base64': original_image_base64,

        'detected_image_base64': detected_image_base64,

        'vehicle_count': vehicle_count

    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response



if __name__ == '__main__':

    app.run(debug=True)

