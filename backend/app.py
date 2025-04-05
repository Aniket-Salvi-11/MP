from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # 0=all, 1=info, 2=warnings, 3=errors
from datetime import datetime
import numpy as np
from tensorflow.keras.models import load_model  # <-- Add this import
from tensorflow import keras  # Optional but recommended

app = Flask(__name__)
CORS(app)

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

# Mock database
diagnoses_db = []

# Load ML models (replace with your actual models)
# Model loading with proper error handling
try:
    skin_model = load_model('ml_models/oral_cancer_classification_modelV3.h5')
    fracture_model = load_model('ml_models/new_mrimodel.h5')
    mobilenet_model = load_model('ml_models/mobilenetv2_best_model.keras')
    print("✅ All models loaded successfully!")
except Exception as e:
    print(f"❌ Model loading failed: {str(e)}")
    print("⚠️ Running in mock mode without ML models")
    skin_model = None
    fracture_model = None
    mobilenet_model = None

# Add this to app.py before loading models
def check_model_file(path):
    if not os.path.exists(path):
        print(f"❌ File missing: {path}")
        return False
    if os.path.getsize(path) < 1024:  # Less than 1KB = likely corrupted
        print(f"❌ Suspiciously small file: {path}")
        return False
    return True

if not all(check_model_file(f"ml_models/{m}") for m in [
    "oral_cancer_classification_modelV3.h5",
    "new_mrimodel.h5",
    "mobilenetv2_best_model.keras"
]):
    exit(1)

@app.route('/api/analyze/symptoms', methods=['POST'])
def analyze_symptoms():
    data = request.json
    symptoms = data.get('symptoms', [])
    patient_info = data.get('patient_info', {})
    
    if not symptoms:
        return jsonify({'error': 'No symptoms provided'}), 400
    
    # Mock analysis - replace with actual model prediction
    diagnosis_id = f"DX-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    result = {
        'diagnosis_id': diagnosis_id,
        'conditions': ['Common Cold', 'Allergies'][:min(2, len(symptoms))],
        'confidence': 0.85,
        'recommendations': [
            'Get plenty of rest',
            'Drink fluids',
            'Consult a doctor if symptoms worsen'
        ],
        'urgency': 'low'
    }
    
    # Store in mock DB
    diagnoses_db.append({
        **result,
        'type': 'symptoms',
        'timestamp': datetime.now().isoformat(),
        'patient_info': patient_info
    })
    
    return jsonify(result)

@app.route('/api/analyze/image', methods=['POST'])
def analyze_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.split('.')[-1].lower() in app.config['ALLOWED_EXTENSIONS']:
        # Save file
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{file.filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Mock analysis - replace with actual model prediction
        diagnosis_id = f"IMG-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        analysis_type = request.form.get('type', 'skin')
        
        result = {
            'diagnosis_id': diagnosis_id,
            'analysis_type': analysis_type,
            'conditions': ['Benign Skin Lesion', 'Fracture Not Detected'],
            'confidence': 0.92,
            'recommendations': [
                'Follow up with a specialist',
                'Monitor for changes'
            ],
            'image_path': f"/uploads/{filename}"
        }
        
        # Store in mock DB
        diagnoses_db.append({
            **result,
            'type': 'image',
            'timestamp': datetime.now().isoformat()
        })
        
        return jsonify(result)
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/api/history', methods=['GET'])
def get_history():
    return jsonify({'history': diagnoses_db})

@app.route('/uploads/<filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)